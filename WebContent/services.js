'use strict';

angular.module('ngStudentsApp.services', []).
  factory('ngStudentsAPIservice', function($http) {

    var ngStudentsAPI = {};
    
    ngStudentsAPI.getStudents = function() {
      return $http({
        method: 'GET', 
        url: 'http://localhost:8080/ngStudents/api/v1/students/'
        //url: 'http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK'
      });
    }
    
    ngStudentsAPI.getStudent = function(id) {
        return $http({
          method: 'GET', 
          url: 'http://localhost:8080/ngStudents/api/v1/students/'+id
          //url: 'http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK'
       });
     }

    ngStudentsAPI.addStudent = function(data){
    	return $http({
    		method: 'POST',
    		url: 'http://localhost:8080/ngStudents/api/v1/students/add/',
    		data: data
    	});
    }
    
    ngStudentsAPI.deleteStudent = function(id){
    	return $http({
    		method: 'DELETE',
    		url: 'http://localhost:8080/ngStudents/api/v1/students/delete/'+id
    	});
    }
    
    ngStudentsAPI.editStudent = function(id){
    	console.log("EDIT SERVICES.JS")
    	return $http({
    		method: 'PUT',
    		url: 'http://localhost:8080/ngStudents/api/v1/students/update/'+id
    	})
    }
    return ngStudentsAPI;
  });