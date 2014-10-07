package ngStudents.status;

import javax.ws.rs.*;
import javax.ws.rs.core.*;

import ngStudents.jdbc.db.JDBCMySQLConnection;

import java.sql.*;

import ngStudents.jdbc.db.*;

@Path("/v1/status")
public class V1_status {

	public static final String api_version="14.10.06.01";
	
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String returnTitle(){
		return "<p>Java Web Service</p>";
	}
	
	@Path("/version")
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String returnVersion(){
		return "<p>Version: "+api_version+"</p>";
	}
	
	@Path("/database")
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String returnDatabasesStatus() throws Exception{
		
		PreparedStatement query = null;
		String myString = null;
		String returnString = null;
		Connection conn = null;
		Statement statement = null;
		ResultSet rs = null;


		//query = "Select * From students";
		
		try{
			
			conn = JDBCMySQLConnection.getConnection();
			query = conn.prepareStatement("select * from students");
			rs = query.executeQuery();
			//statement = conn.createStatement();
			//rs = statement.executeQuery(query);
			while(rs.next()){
				myString = rs.getString("name");
			}
			query.close();
			returnString = "<p>Database Status</p>"+ myString;
			
		}catch(Exception e){
			e.printStackTrace();
		}
		finally{
			if(conn != null)conn.close();
		}
		return returnString;
		
	}
}
