projectApp = angular.module("projectList", ["firebase"]);

projectApp.controller("projectListCtrl", ['$scope', '$firebase',
function ($scope, $firebase) {
  //Firebase-related
  var ref = new Firebase("https://project-list.firebaseio.com/");
  $scope.projects = $firebase(ref).$asArray();
  
  // First pass at twitter auth 
  ref.authWithOAuthPopup("github", function(error, authData) {
    if (!authData) {
      console.log(error);
    }
  });

  // project attributes
  $scope.appTitle = "Portfolio Project List";
  $scope.appAuthor = "Carlos Araya";
  }
]);