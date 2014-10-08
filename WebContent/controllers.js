angular.module('ngStudentsApp.controllers', []).
  controller('studentsController', function($scope, ngStudentsAPIservice) {
//	$scope.id = $routeParams.id;
    $scope.nameFilter = null;
    $scope.studentssList = [];

    $scope.searchFilter = function (student) {
        var keyword = new RegExp($scope.nameFilter, 'i');
        return !$scope.nameFilter || keyword.test(student.name);
    };
    
    ngStudentsAPIservice.getStudents().success(function (response) {
        //Dig into the respond to get the relevant data
    	console.log("HELLO");
    	//console.lgo(response);
    	$scope.studentsList = response;
    	console.log(response);
        //$scope.studentsList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    }).error(function(response){
    
    	console.log("ERROR");
    });
    

    $scope.newPerson = null;
    $scope.addStudent = function(){
    	console.log("ADD STUDENT");
    	ngStudentsAPIservice.addStudent().success(function(response){
    		console.log("NEW STUDENT ADDED: ");
    	}).error(function(response){
    		console.log("ADD STUDENT ERROR");
    	});
    };
    
    $scope.deleteStudent = function(studentid){
    	console.log("DELETE STUDENT");
    	ngStudentsAPIservice.deleteStudent(studentid).success(function(response){
    		console.log("STUDENT DELETED");
    		 ngStudentsAPIservice.getStudents().success(function (response) {
    		        //Find a better way to reload the list
    		    	$scope.studentsList = response;
    		    }).error(function(response){
    		    
    		    	console.log("ERROR");
    		    });
    	}).error(function(response){
    		console.log("DELETE ERROR");
    	});
    };

  });