/* jshint undef: true, unused: true, strict:false */
/* global angular:true */
/*jslint node: true */
'use strict';
// Defining the core of the application
// Handles mongolab connection and directives used in more than
// one module. We might want to move everything  to their
// own files but let's make sure they work first
var projectApp = angular.module('projectCore', ['mongolabResourceHttp', 'hc.marked']);

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
