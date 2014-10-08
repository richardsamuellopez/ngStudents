angular.module('ngStudentsApp.services', []).
  factory('ngStudentsAPIservice', function($http) {

    var ngStudentsAPI = {};

    ngStudentsAPI.getStudent = function(id) {
    	console.log("GET STUDENT SERVICES.JS" + id);
        return $http({
          method: 'GET', 
          url: 'http://localhost:8080/ngStudents/api/v1/students/'+id
          //url: 'http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK'
       });
     }
    
    ngStudentsAPI.getStudents = function() {
      return $http({
        method: 'GET', 
        url: 'http://localhost:8080/ngStudents/api/v1/students/'
        //url: 'http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK'
      });
    }
    
    ngStudentsAPI.addStudent = function(data){
    	console.log("ADD SERVICES.JS");
    	console.log(data);
    	//var String data=null;
    	return $http({
    		method: 'POST',
    		url: 'http://localhost:8080/ngStudents/api/v1/students/add/',
    		data: data
    	});
    }
    
    ngStudentsAPI.deleteStudent = function(id){
    	console.log("DELETE SERVICES.JS");
    	return $http({
    		method: 'DELETE',
    		url: 'http://localhost:8080/ngStudents/api/v1/students/delete/'+id
    	});
    }
    
    ngStudentsAPI.editStudent = function(id){
    	console.log("EDIT SERVICES.JS")
    }
    return ngStudentsAPI;
  });