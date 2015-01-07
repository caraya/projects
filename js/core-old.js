/*jslint node: true */
/*jshint strict:false */
'use strict';
// Defining the core of the application
// Handles mongolab connection and directives used in more than
// one module. We might want to move the directives to their
// own file but let's make sure they work first
var projectApp = angular.module('projectCore', ['ngRoute', 'mongolabResourceHttp', 'hc.commonmark'],
    function ($routeProvider) {
      $locationProvider.html5Mode(true);
      $routeProvider.when('/list', {
        templateUrl: '/app/views/list.html',
        controller: 'ProjectListController',
        resolve: {
          projects: function (Project) {
            return Project.all();
          }
        }
      })
      // Grid uses the grid view we generated using non-table
      // layout. This uses the same controller as the list
      // because they use the same data.
        .when('/grid', {
          templateUrl: 'views/grid.html',
          controller: 'ProjectListController',
          resolve: {
            projects: function (Project) {
              return Project.all();
            }
          }
        })
        // Brings up the form to edit a specific project
        .when('/edit/:id', {
          templateUrl: 'views/form.html',
          controller: 'ProjectFormController',
          resolve: {
            project: function (Project, $route) {
              return Project.getById($route.current.params.id);
            }
          }
        })
        // Brings up the form to create a new project
        .when('/new', {
          templateUrl: 'views/form.html',
          controller: 'ProjectFormController',
          resolve: {
            project: function (Project) {
              return new Project();
            }
          }
        })
        // All other URLs will redirect to grid
        .otherwise({
          redirectTo: 'grid'
        })
});


