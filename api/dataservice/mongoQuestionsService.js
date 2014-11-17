var ObjectID = require('mongodb').ObjectID;
var notifier = require('./notifier');
var db, Projects;

module.exports = {
  createProject: createProject,
  deleteProject: deleteProject,
  getProjects: getProjects,
  getProjectById: getProjectById,
  getProjectSummaries: getProjectSummaries,
  ready: ready
};

////////////////////

function ready(cb) { // ready when MongoDb is initialize
  var database = require('./database').start(function () {
    db = database.db;
    Projects = db.collection('projects');
    cb();
  });
  return module.exports;
}

// Prepare a "Get Projects" query based on request parameters and optional 'fields'
function getProjectsQuery(req, fields) {

  var options = {};
  var query = req.query; // request query string params

  if (query.limit) {
    options.limit = parseInt(query.limit, 10);
  }
  if (query.offset) {
    options.skip = parseInt(query.offset, 10);
  }

  if (query.sort) {
    var sort = query.sort;
    if (sort === 'name') {
      options.sort = {
        name: 1
      };
    }
    if (sort === 'type') {
      options.sort = {
        type: 1
      };
    }


    // Could sort on _id as proxy for the created property, e.g.
    //   if(sort === 'time') { query.sort({_id: 1}); }
    // This assumes that created and _id are in sync.
    // _id is very fast because it's the key and there's an index
    // but note that ObjectID lacks sub-second time resolution.
    // Let's keep it obvious and sort on created.
  }

  return Projects.find({}, fields, options);
}


function getProjects(req, res, next) {

  var query = getProjectsQuery(req);
  query.toArray(function (err, quests) {
    if (err) {
      return next(err);
    }

    return res.send(quests);
  });
}


function getProjectSummaries(req, res, next) {

  // Keep only the "summary" fields
  var fields = {
    _id: 1,
    name: 1,
    description: 1,
    type: 1
  };

  var query = getProjectsQuery(req, fields);
  query.toArray(function (err, quests) {
    if (err) {
      return next(err);
    }

    return res.send(quests);
  });
}


function getProjectById(req, res, next) {

  Projects.findOne({
    _id: ObjectID(req.params.id)
  }, function (err, project) {
    if (err) {
      return next(err);
    }

    if (project) {
      return res.send(project);
    } else {
      projectNotFound(next);
    }
  });
}


function createProject(req, res, next) {

  // get the new data from the POST body
  var body = req.body || {};

  if (createBodyHasError(body, next)) {
    return;
  }

  // Check for duplicate; save project if not duplicate
  Projects.findOne({
    text: body.text
  }, function (err, project) {
    if (err) {
      return next(err);
    }

    if (project) {
      err = new Error('That project has been asked already');
      err.status = 403; // forbidden
      next(err);
      return;
    }

    saveProject();
  });

  ///////////


  function saveProject() {
    // Build the project and save it
    // let MongoDb generate the ObjectID
    var project = {
      created: Date.now(),
      name: body.name,
      writeup: body.url.writeup,
      code: body.url.code,
      other: body.url.other,
      type: body.type,
      stage: body.stage,
      notes: body.notes
    };

    Projects.insert(project, {
      w: 1
    }, function (err) {
      if (err) {
        return next(err);
      }

      notifier.projectAdded(project);
      return res.send(project);
    });
  }

    /*
       {
      "name": "CSS shapes: an update and an expansion",
      "description": "Update on CSS Shapes, browser support and what we can do with the technology",
      "url": {
        "writeup": "http://publishing-project.rivendellweb.net/css-shapes-an-update-and-an-expansion/",
        "code": "http://codepen.io/caraya/pen/eDgoJ",
        "other": ""
      },
      "type": "Code / Writeup",
      "stage": "Published",
      "notes": ""
  },
  */
  function createBodyHasError(body, next) {
    var name = body.name = (body.name || '').trim();
    body.description = (body.description || 'unknown').trim();
    body.type = (body.type || '').trim();
    body.stage = (body.stage || '').trim();
    
    // Error checking
    if (!name) {
      var err = new Error('New project must have text');
      err.status = 400;
      next(err);
      return true;
    }

    // defer duplicate checking to MongoDb
  }
}

function deleteProject(req, res, next) {

  Projects.findAndRemove({
      _id: ObjectID(req.params.id)
    }, [], {
      w: 1
    },

    function (err, project) {
      if (err) {
        return next(err);
      }

      if (project) {
        notifier.projectDeleted(project);
        // respond with status and no content.
        res.status(204).end();
      } else {
        projectNotFound(next);
      }
    });
}

////////////////////

function notImplemented(req, res, next) {
  next(new Error(
    req.method + ' ' +
    req.originalUrl + ' is not implemented'
  ));
}

function projectNotFound(next) {
  // Create an error and let downstream middleware handle it.
  var err = new Error('Project not found');
  err.status = 404;
  next(err);
}