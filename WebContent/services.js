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
    
    ngStudentsAPI.addStudent = function(){
    	console.log("ADD SERVICES.JS");
    	//var String data=null;
    	return $http.post('http://localhost:8080/ngStudents/api/v1/students/add');
    }
    
    ngStudentsAPI.deleteStudent = function(id){
    	console.log("DELETE SERVICES.JS");
    	return $http({
    		method: 'DELETE',
    		url: 'http://localhost:8080/ngStudents/api/v1/students/delete/'+id
    	});
    }
    return ngStudentsAPI;
  });