var data = require('../dataservice');
var router = require('express').Router();

module.exports = router;

router.use(notImplemented);

/* First match wins so the order of routes really matters! */

// GET /api/projects/summaries?sort={time|votes}&limit={integer}&offset={integer}
router.get('/projects/summaries', data.getProjectSummaries);

// GET /api/projects/:id
router.get('/projects/:id', data.getProjectById);

//GET /api/projects?sort={time|votes}&limit={integer}&offset={integer}
router.get('/projects', data.getProjects);

// POST /api/projects
router.post('/projects', data.createProject);

// DELETE /api/projects/{:id
router.delete('/projects/:id', data.deleteProject);

/////////////

function notImplemented(req, res, next) {
    next(new Error(
        req.method + ' ' +
        req.originalUrl + ' API is not implemented'
    ));
}
