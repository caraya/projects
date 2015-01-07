var projectApp = angular.module('projectCore');

projectApp.controller('ProjectListController', function ($scope, Project) {
  Project.query(function (projects) {
    // Bind projects to the scope
    $scope.projects = projects;
  });
});
