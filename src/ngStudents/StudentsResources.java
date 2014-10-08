package ngStudents;


import javax.ws.rs.*;
import javax.ws.rs.core.*;

import ngStudents.jdbc.db.JDBCMySQLConnection;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.sql.*;

import ngStudents.jdbc.db.*;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;

import ngStudents.util.ToJSON;
import ngStudents.jdbc.db.Schema;


@Path("/v1/students")
public class StudentsResources {

	
	// Return all students
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response returnAllStudents() throws Exception{
		
		PreparedStatement query = null;
		Connection conn = null;
		String returnString = null;
		Response rb = null;
		
		try{
			conn = JDBCMySQLConnection.getConnection();
			query = conn.prepareStatement("select * from students");
			ResultSet rs = query.executeQuery();
			
			ToJSON converter = new ToJSON();
			JSONArray json = new JSONArray();
			
			json = converter.toJSONArray(rs);
			query.close();
			
			returnString = json.toString();
			rb = Response.ok(returnString).build();
			
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			if(conn != null)conn.close();
		}
		
		return rb;
	}
	
	@Path("{id}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getStudent(@PathParam("id") int id) throws Exception{
		
		
		PreparedStatement query = null;
		String returnString = null;
		Connection conn = null;
		ResultSet rs = null;
		Response rb = null;

		//query = "Select * From students";
		
		try{
			
			conn = JDBCMySQLConnection.getConnection();
			query = conn.prepareStatement("select * from students where id="+id);
			rs = query.executeQuery();
	
			ToJSON converter = new ToJSON();
			JSONArray json = new JSONArray();
			
			json = converter.toJSONArray(rs);
			query.close();
			
			returnString = json.toString();
			rb = Response.ok(returnString).build();
			
		}catch(Exception e){
			e.printStackTrace();
		}
		finally{
			if(conn != null) conn.close();
		}
		
		return rb;
	}
	
	@POST
	@Path("/add/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON})
	public Response addStudent(String incomingData) throws Exception {
		System.out.println("incomingData: " + incomingData);

		String returnString = null;
		Connection conn = null;
		PreparedStatement query = null;
		
		JSONArray jsonArray = new JSONArray();
		JSONObject jsonObject = new JSONObject();
		
		Schema dbSchema = new Schema(); 
		
		
		try{

			JSONObject studentData = new JSONObject(incomingData);
			System.out.println("jsonData: "+studentData.toString());
			
			int http_code = dbSchema.addStudent(studentData.optString("name"),studentData.optString("dob"));
			
		if( http_code == 200 ) {
			/*
			 * The put method allows you to add data to a JSONObject.
			 * The first parameter is the KEY (no spaces)
			 * The second parameter is the Value
			 */
			jsonObject.put("HTTP_CODE", "200");
			jsonObject.put("MSG", "Item has been entered successfully, Version 3");
			/*
			 * When you are dealing with JSONArrays, the put method is used to add
			 * JSONObjects into JSONArray.
			 */
			returnString = jsonArray.put(jsonObject).toString();
		} else {
			return Response.status(500).entity("Unable to enter Item").build();
		}
		
		System.out.println( "returnString: " + returnString );
		
	} catch(Exception e) {
		e.printStackTrace();
		return Response.status(500).entity("Server was not able to process your request").build();
	}
	
		
		return Response.ok(returnString).build();

	}

	/*@PUT
	@Path("update")
	@Produces("text/html")
	@Consumes("application/xml")
	public String updateStudent() {
		throw new UnsupportedOperationException("Not yet implemented.");
	}*/

	@DELETE
	@Path("/delete/{id}")
	@Consumes({MediaType.APPLICATION_FORM_URLENCODED,MediaType.APPLICATION_JSON})
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteStudent(@PathParam("id") int studentid, String incomingData)throws Exception {
		System.out.println("incomingData: " + incomingData);
System.out.println("student id: "+studentid);
		//int studentId;
		int http_code;
		String returnString = null;
		JSONArray jsonArray = new JSONArray();
		JSONObject jsonObject = new JSONObject();
		
		Schema dbSchema = new Schema(); 
		
		

		try{
			//JSONObject studentsData = new JSONObject(incomingData);
			
			//studentId = studentsData.optInt("student_ID",0);
			
			http_code = dbSchema.deleteStudent(studentid);
			
			if(http_code==200){
				jsonObject.put("HTTP_CODE", "200");
				jsonObject.put("MSG", "Item has been deleted successfully");
			}else{
				return Response.status(500).entity("Server1 was not able to process your request").build();
			}
			
			returnString = jsonArray.put(jsonObject).toString();
		}catch(Exception e){
			e.printStackTrace();
			return Response.status(500).entity("Server2 was not able to process your request").build();
		}
		
		return Response.ok(returnString).build();
	}
	
	
}

class StudentEntry{
	public String student_name;
}
