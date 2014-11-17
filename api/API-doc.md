REST API for Project list

/*
  This is the model we'll work with

{
	// _id is assigned by MongoDB when object is insterted
    // do we want to create a separate secondary ID?
    // "_id" : ObjectId("546091819575d6fa5a9c1027"),
	"name" : "Project list in Angular",
	"description" : "Create an Angular project thatt will display my project list from a JSON file",
	"url" : {
		"writeup" : "",
		"code" : "https://github.com/caraya/project-list-angular",
		"other" : "http://labs.rivendellweb.net/angular/project-list-angular/"
	},
	"type" : "Code / Weiteup",
	"stage" : "Early Research and code",
	"notes" : "You're looking at the first revision. Further work in inserting new entries and integrating with the MEAN stack "
}
*/

// get reads content, either all the projects or a project by ID
get/project
get/project/:id


// post creates a new project, different than ID below
post/project

// put updates an existing project and fails if project doesn't already exists
put/project/:id

delete/project
