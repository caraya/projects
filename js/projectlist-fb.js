/*jslint browser: true, devel: true, node: true*/

// Just to make jshint happy, shouldn't hurt anything
var projectApp,
  projectListCtrl,
  angular,
  Firebase,
  projects;

projectApp = angular.module('projectList', ['firebase', 'ngAria', 'ngSanitize',
  'btford.markdown'])
  .controller('projectListCtrl', ['$scope', '$firebase', projectListCtrl]);

function projectListCtrl($scope, $firebase) {
  // project attributes
  $scope.appTitle = 'Project List';
  $scope.appAuthor = 'Carlos Araya';

  // FIREBASE RELATED
  // Reference to the Firebase instance hosting project data
  var ref = new Firebase('https://project-list.firebaseio.com/');
  // create an AngularFire reference to the data
  var sync = $firebase(ref);
  // download the data into a (psuedo read-only), sorted array
  // all server changes are applied in realtime
  var projectsArray = sync.$asArray();
  // place the list into $scope for use in the DOM
  $scope.projects = projectsArray;
  console.log(projectsArray);

  // Reference to object where we'll put login-related and other messages
  var message = document.getElementById('message-window');

  // github auth based login
  $scope.logIn = function () {
    ref.authWithOAuthPopup('github', function (error, authData) {
      if (!authData) {
        message.innerHTML = '';
        var errorSpan = document.createElement('span');
        errorSpan.innerHTML = error;
        message.appendChild(errorSpan);
        console.log(error);

      } else {
        message.innerHTML = '';
        var successSpan = document.createElement('span');
        successSpan.innerHTML = 'Login Successful';
        message.appendChild(successSpan);
        message.innerHTML.append('Login Successful');
        /*console.log(
        'User ID: ' + authData.uid + ', Provider: ' + authData.provider);*/

      }
    });
  };

  // github auth log out
  $scope.logOut = function (error, authData) {
    ref.unauth();
    if (authData) {
      message.innerHTML = '';
      var errorLoSpan = document.createElement('span');
      errorLoSpan.innerHTML = error;
      message.appendChild(errorLoSpan);
    } else {
      message.innerHTML = '';
      var successLoSpan = document.createElement('span');
      successLoSpan.innerHTML = 'Logout Successful';
      message.appendChild(successLoSpan);
    }
  };

  // Show the new project form, if it's show
  $scope.showProjectForm = function () {
    var addPanel = document.getElementById('newProjectPanel');
    var formButton = document.getElementById('show-form-btn');
    if (addPanel.style.display === 'block') {
      // This shouldn't be necessaryy but it it stays vissible when
      // you change the status
      formButton.innerHTML = ''; // Reset
      formButton.innerHTML = 'Show Project Form'; // New text
      addPanel.style.display = 'none'; // 
    } else {
      formButton.innerHTML = '';
      formButton.innerHTML = 'Hide Project Form';
      addPanel.style.display = 'block';
    }
  };

  // add new project to firebase
  $scope.createProject = function () {
    var NP = {
      //id: projectsArray.length + 1,
      name: newProject.name.value,
      description: newProject.description.value,
      type: newProject.type.value,
      url: {
        code: newProject.codeURL.value,
        writeup: newProject.writeupURL.value,
        other: newProject.otherURL.value
      },
      notes: newProject.notes.value,
      stage: newProject.status.value,

    };
    projectsArray.$add(NP);
    message.innerHTML = '';
    message.innerHTML = 'New Project ' + newProject.name.value + ' added successfully';
    console.log(NP);
  };

  // edit and existing project
  $scope.editProject = function () {};

  $scope.removeProject = function (index) {
    var id = projectsArray[index];
  };
}
