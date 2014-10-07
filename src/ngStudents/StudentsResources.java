package ngStudents;


import javax.ws.rs.*;
import javax.ws.rs.core.*;

import ngStudents.jdbc.db.JDBCMySQLConnection;

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

import org.codehaus.jettison.json.JSONArray;

import ngStudents.util.ToJSON;


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
	@Produces(MediaType.TEXT_HTML)
	public String getStudent(@PathParam("id") int id) throws Exception{
		
		
		PreparedStatement query = null;
		String myString = null;
		String returnString = null;
		Connection conn = null;
		Statement statement = null;
		ResultSet rs = null;


		//query = "Select * From students";
		
		try{
			
			conn = JDBCMySQLConnection.getConnection();
			query = conn.prepareStatement("select * from students where id="+id);
			rs = query.executeQuery();
			//statement = conn.createStatement();
			//rs = statement.executeQuery(query);
			while(rs.next()){
				myString = rs.getString("name");
			}
			query.close();
			returnString = "<p>Student ID: "+id+" Name: "+ myString+"</p>";
			
		}catch(Exception e){
			e.printStackTrace();
		}
		finally{
			if(conn != null) conn.close();
		}
		return returnString;
		
	}
}
