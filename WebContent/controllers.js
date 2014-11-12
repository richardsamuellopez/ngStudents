'use strict';

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
    

    //Clicked on the Create Student button
    $scope.addStudent = function(){
    	$location.path('/studentCreate');

    };
    
    //Clicked on the Edit button
    $scope.editStudent = function(studentid){
    	$location.path('/studentEdit/'+studentid);
    }
    
    //Clicked on the Delete button
    $scope.deleteStudent = function(studentid){
    	
//    	$('#confirm').modal({ backdrop: 'static', keyboard: false });
        $('#confirm').modal('show');
    	if (confirm('Are you sure you want to delete this student?')) {
    	
    	

    		ngStudentsAPIservice.deleteStudent(studentid).success(function(response){
    			
    			//Find a better way to reload the list
    			ngStudentsAPIservice.getStudents().success(function (response) {
    				$scope.studentsList = response;
    		    });
    		 
    		}).error(function(response){
    			console.log("DELETE ERROR");
    		});
    	}//End delete confirm
    };

}).
controller('studentController', function($scope, $routeParams, ngStudentsAPIservice, $location) {

	$scope.id = $routeParams.id;
	//Load one student for editing

	$scope.student = null;
	ngStudentsAPIservice.getStudent($scope.id).success(function (response) {

		//Dig into the respond to get the relevant data
		$scope.student = response[0];	
		// This is from the tutorial do not understand all the additoanl info after response
		//$scope.studentsList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
	}).error(function(response){
		console.log("ERROR");
	});

	//Clicked cancel	
	$scope.cancel = function(){
		$location.path('/studentList');
	};
	
	//Clicked Save Student
    $scope.updateStudent = function(){
    	ngStudentsAPIservice.editStudent($scope.student).success(function(response){
    		$scope.msg = "Student saved successfully!";
    		$scope.showMSG = true;
    		$scope.MSGType='success';
    	}).error(function(response){
    		$scope.msg = "ERROR: Student not saved correctly!";
    		$scope.showMSG = true;
    		$scope.MSGType="error";
	    });
    };
		
}).
controller('createController', function($scope, ngStudentsAPIservice, $location){

	//Clicked cancel
	$scope.cancel = function(){
		$location.path('/studentList');
	};
	  
  $scope.newPerson = null;//Don't think this is needed
  //Create new student
  $scope.createNewStudent = function(){
	  var studentObj={name:$scope.student.name,dob:$scope.student.dob};
	  ngStudentsAPIservice.addStudent($scope.student).success(function(response){
		  
		  $scope.msg = "Student created successfully!";
  		  $scope.showMSG = true;
  		  $scope.MSGType='success';
  		
		  if(false){
			  //Either go to the list page 
			  $location.path('/studentList');
		  }else{
			  // Or 
			  $scope.student.name='';
			  $scope.student.dob=''
			  //Add a successful creation message
		  }
  	}).error(function(response){
		$scope.msg = "ERROR: Student not created correctly!";
		$scope.showMSG = true;
		$scope.MSGType="error";
  	});
  };

});