module.exports.load = load;
//////////////////////
function load(db, callback){

    if (process.env.NODE_ENV === 'production') {
        // DO NOT RE-INITIALIZE PRODUCTION DB
        callback();
        return;
    }

    var col = db.collection('projectlist');

    // Remove all existing projects
    col.remove({}, function(err){
        if (err){
            callback(err);
            return;
        }
        initialize();
    });

    // Initialize with sample projects
    function initialize(){
        var projects = require('./sampleData').projects;
        var bulk = col.initializeUnorderedBulkOp();
        var count = projects.length;
        for (var i = 0; i < count; i++) {
            bulk.insert(projects[i]);
        }
        bulk.execute(function(err){
            if (err){
                callback(err);
                return;
            }
            console.log('Initialized database with '+count+' projects');
            callback();
        });
    }
}
