angular.module('ngStudentsApp.controllers', []).
  controller('studentsController', function($scope, ngStudentsAPIservice, $location) {
    $scope.nameFilter = null;
    $scope.studentssList = [];

    //Filter students
    $scope.searchFilter = function (student) {
        var keyword = new RegExp($scope.nameFilter, 'i');
        return !$scope.nameFilter || keyword.test(student.name);
    };
    
    //Load the list of students
    ngStudentsAPIservice.getStudents().success(function (response) {
        //Dig into the respond to get the relevant data
    	$scope.studentsList = response;
        //$scope.studentsList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    }).error(function(response){
    
    	console.log("ERROR");
    });
    

    $scope.newPerson = null;
    $scope.addStudent = function(){
    	$location.path('/studentCreate');

    };
    $scope.editStudent = function(studentid){
    	$location.path('/studentEdit/'+studentid);
    }
    
    $scope.deleteStudent = function(studentid){
    	ngStudentsAPIservice.deleteStudent(studentid).success(function(response){
	        
    		//Find a better way to reload the list
    		 ngStudentsAPIservice.getStudents().success(function (response) {
    		    	$scope.studentsList = response;
    		    });
    		 
    	}).error(function(response){
    		console.log("DELETE ERROR");
    	});
    };

  }).
  controller('studentController', function($scope, $routeParams, ngStudentsAPIservice, $location) {
		$scope.id = $routeParams.id;

		$scope.cancel = function(){
	    	$location.path('/studentList');
	    };
	    $scope.editStudent = function(){
	    	console.log("EDIT STUDENT");
	    	ngStudnetsAPIService.editStudent.success(function(response){
	    		console.log("EDIT STUDENT DONE");
	    	}).error(function(response){
	    		console.log("EDIT STUENT ERROR");
	    	});
	    };
		
  }).
  controller('createController', function($scope, ngStudentsAPIservice, $location){

		$scope.cancel = function(){
	    	$location.path('/studentList');
	    };
	  
	  
  $scope.newPerson = null;
  $scope.createNewStudent = function(){
  	console.log("ADD STUDENT");
  	console.log($scope.student);
  	var studentObj={name:$scope.student.name,dob:$scope.student.dob};
  	ngStudentsAPIservice.addStudent($scope.student).success(function(response){
  		console.log("NEW STUDENT ADDED: ");
  		//Either go to the list page or clear values
  		//$location.path('/studentList');
  		$scope.student.name='';
  		$scope.student.dob=''
  		//If clearing values add a confirm message
  	}).error(function(response){
  		console.log("ADD STUDENT ERROR");
  	});
  };

});