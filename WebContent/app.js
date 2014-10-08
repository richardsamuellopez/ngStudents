/*
angular.module('ngStudentsApp', [
  'ngStudentsApp.controllers',
  'ngStudentsApp.services'
]);
*/

angular.module('ngStudentsApp', [
	'ngStudentsApp.controllers',
    'ngStudentsApp.services',
    'ngRoute'
]).
config(['$routeProvider', function($routeProvider){
    $routeProvider.
    when("/studentList", {templateUrl: "partials/studentList.html", controller: "studentsController"}).
    when("/studentEdit/:id", {templateUrl: "partials/studentEdit.html", controller: "studentController"}).
    when("/studentCreate", {templateUrl: "partials/studentCreate.html", controller: "createController"}).
    otherwise({redirectTo: '/studentList'});
}]);//createController studentController