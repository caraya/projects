/* jshint undef: true, unused: true, strict:false */
/* jslint node: true */
/* global angular:true */

'use strict';
// Defining the core of the application
// Handles mongolab connection and directives used in more than
// one module. We might want to move everything  to their
// own files but let's make sure they work first
var projectApp = angular.module('projectCore', ['mongolabResourceHttp', 'hc.marked', 'ngRoute'], function ($routeProvider) {

  $routeProvider
    .when('/grid', {templateUrl: 'partials/grid.html', controller: 'ProjectListController', resolve: {
      projects: function (Project) {return Project.all(); }
    }})
    .when('/table', {templateUrl: 'partials/table.html', controller: 'ProjectListController', resolve: {
      projects: function (Project) {return Project.all(); }
    }})
    .when('/edit/:id', {templateUrl: 'partials/form.html', controller: 'ProjectFormController', resolve: {
      project: function (Project, $route) {return Project.getById($route.current.params.id); }
    }})

    .when('/new', {templateUrl: 'partials/form.html', controller: 'ProjectFormController', resolve: {
      project: function (Project) {return new Project(); }
    }})

    .otherwise({redirectTo: '/grid'});
});

projectApp.constant('MONGOLAB_CONFIG', {
  API_KEY: '3n08EN4F5HQ2ndsob7ZA2o2xxRX1FuTq',
  DB_NAME: 'angular'
});

projectApp.factory('Project', function ($mongolabResourceHttp) {
  return $mongolabResourceHttp('projects');
});

projectApp.config(['markedProvider',
  function (markedProvider) {
    markedProvider.setOptions({
      gfm: true,
      tables: true,
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    });
  }]);

projectApp.controller('ProjectListController', function ($scope, Project) {
  Project.all().then(function (projects) {
    $scope.projects = projects;
  });
  $scope.appTitle = 'Project List';
});

projectApp.controller('ProjectFormController', function($scope, $location, project) {

    var projectCopy = angular.copy(project);

    var changeSuccess = function() {
      $location.path('/grid');
    };

    var changeError = function() {
      throw new Error('Shit went wrong...');
    };

    $scope.project = project;

    $scope.save = function(){
      $scope.project.$saveOrUpdate(changeSuccess, changeSuccess, changeError, changeError);
      $location.path('/grid');
    };

    $scope.remove = function() {
      $scope.project.$remove(changeSuccess, changeError);
    };

    $scope.hasChanges = function(){
      return !angular.equals($scope.project, projectCopy);
    };
});
