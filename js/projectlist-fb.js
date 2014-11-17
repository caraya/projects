projectApp = angular.module("projectList", ["firebase"]);

projectApp.controller("projectListCtrl", ['$scope', '$firebase',
function ($scope, $firebase) {
  var ref = new Firebase("https://project-list.firebaseio.com/");
  $scope.projects = $firebase(ref).$asArray();
  $scope.appTitle = "Portfolio Project List";
  $scope.appAuthor = "Carlos Araya";
  }
]);