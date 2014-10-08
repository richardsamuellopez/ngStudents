package ngStudents.jdbc.db;

import java.sql.*;

import org.codehaus.jettison.json.JSONArray;

import ngStudents.util.ToJSON;

public class Schema{

	public int addStudent(String Student_name, String Student_DOB)throws Exception{
		
		PreparedStatement query = null;
		Connection conn = null;
		
		try{
			conn = JDBCMySQLConnection.getConnection();
			query = conn.prepareStatement("insert into students "+
						"(name, dob)"+
						"values (?,?)");
			query.setString(1, Student_name);
			query.setString(2, Student_DOB);
			query.executeUpdate();
		}catch(Exception e){
			e.printStackTrace();
			return 500;
		}finally{
			if(conn != null) conn.close();
		}
		return 200;
	}
	
	public int deleteStudent(int id)throws Exception{
		PreparedStatement query = null;
		Connection conn = null;

		try{
			
			conn = JDBCMySQLConnection.getConnection();
			query = conn.prepareStatement("delete from students where id = ?");
			query.setInt(1, id);
			query.executeUpdate();
			
		}catch(Exception e){
			e.printStackTrace();
			return 500;
		}finally{
			if(conn !=null)conn.close();
		}
		
		return 200;
	}
	
}
