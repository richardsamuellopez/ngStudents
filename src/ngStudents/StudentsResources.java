package ngStudents;


import javax.ws.rs.*;
import javax.ws.rs.core.*;

import ngStudents.jdbc.db.JDBCMySQLConnection;

import java.sql.*;

import ngStudents.jdbc.db.*;

@Path("/v1/students")
public class StudentsResources {

	
	// Return all students
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String returnTitle(){
		return "<p>Java Web Service</p>";
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
