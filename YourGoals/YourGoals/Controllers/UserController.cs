using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using YourGoals.Models;

namespace YourGoals.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("{name}")]
        public JsonResult Get(string name)
        {
            // sql query
            string query = @"select UserId, UserName, UserPassword 
                             from dbo.Users where UserName = @UserName";
            // store data in data table
            DataTable dataTable = new DataTable();
            // connection string
            string sqlDataSource = _configuration.GetConnectionString("YourGoalCon");

            SqlDataReader reader;

            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                // open DB connection
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@UserName", name);
                    // start read data from DB (start reading)
                    reader = command.ExecuteReader();
                    // load data into data table
                    dataTable.Load(reader);
                    // stop reading
                    reader.Close();
                }
                // close DB connection
                connection.Close();
            }

            return new JsonResult(dataTable);
        }

        [HttpPost]
        public JsonResult Post(User user)
        {
            // sql query
            string query = @"insert dbo.Users (UserName, UserPassword) 
                             values (@UserName, @UserPassword)";
            // store data in data table
            DataTable dataTable = new DataTable();
            // connection string
            string sqlDataSource = _configuration.GetConnectionString("YourGoalCon");

            SqlDataReader reader;

            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                // open DB connection
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    // add parametrs to query
                    command.Parameters.AddWithValue("@UserName", user.UserName);
                    command.Parameters.AddWithValue("@UserPassword", user.UserPassword);
                    // start read data from DB (start reading)
                    reader = command.ExecuteReader();
                    // load data into data table
                    dataTable.Load(reader);
                    // stop reading
                    reader.Close();
                }
                // close DB connection
                connection.Close();
            }

            return new JsonResult("Posted!");
        }

        [HttpPut]
        public JsonResult Put(User user)
        {
            // sql query
            string query1 = @"update dbo.Users set 
                             UserName = @UserName,
                             UserPassword = @UserPassword 
                             where UserId = @UserId";
            string query2 = @"update dbo.Goal set userName = @UserName where userName = @OldUserName";
            string oldName = GetUserNameById(user.UserId);
            // store data in data table
            DataTable dataTable = new DataTable();
            // connection string
            string sqlDataSource = _configuration.GetConnectionString("YourGoalCon");

            SqlDataReader reader;

            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                // open DB connection
                connection.Open();
                using (SqlCommand command = new SqlCommand(query1, connection))
                {
                    // add parametrs to query
                    command.Parameters.AddWithValue("@UserId", user.UserId);
                    command.Parameters.AddWithValue("@UserName", user.UserName);
                    command.Parameters.AddWithValue("@UserPassword", user.UserPassword);
                    // start read data from DB (start reading)
                    reader = command.ExecuteReader();
                    // load data into data table
                    dataTable.Load(reader);
                    // stop reading
                    reader.Close();
                }
                using (SqlCommand command = new SqlCommand(query2, connection))
                {
                    // add parametrs to query
                    command.Parameters.AddWithValue("@UserName", user.UserName);
                    command.Parameters.AddWithValue("@OldUserName", oldName);
                    // start read data from DB (start reading)
                    reader = command.ExecuteReader();
                    // load data into data table
                    dataTable.Load(reader);
                    // stop reading
                    reader.Close();
                }
                // close DB connection
                connection.Close();
            }

            return new JsonResult("State updated!");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            // sql query
            string query1 = @"delete from dbo.Users where UserId = @UserId";
            string query2 = @"delete from dbo.Goal where UserName = @UserName";

            string name = GetUserNameById(id);
            // store data in data table
            DataTable dataTable = new DataTable();
            // connection string
            string sqlDataSource = _configuration.GetConnectionString("YourGoalCon");

            SqlDataReader reader;

            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                // open DB connection
                connection.Open();
                using (SqlCommand command = new SqlCommand(query1, connection))
                {
                    // add parametrs to query
                    command.Parameters.AddWithValue("@UserId", id);
                    // start read data from DB (start reading)
                    reader = command.ExecuteReader();
                    // load data into data table
                    dataTable.Load(reader);
                    // stop reading
                    reader.Close();
                }
                using (SqlCommand command = new SqlCommand(query2, connection))
                {
                    // add parametrs to query
                    command.Parameters.AddWithValue("@UserName", name);
                    // start read data from DB (start reading)
                    reader = command.ExecuteReader();
                    // load data into data table
                    dataTable.Load(reader);
                    // stop reading
                    reader.Close();
                }
                // close DB connection
                connection.Close();
            }

            return new JsonResult("Deleted!");
        }
        
        private string GetUserNameById (int id)
        {
            string name = "";
            string query = @"select UserName from dbo.Users where UserId = @UserId";

            // store data in data table
            DataTable dataTable = new DataTable();
            // connection string
            string sqlDataSource = _configuration.GetConnectionString("YourGoalCon");

            SqlDataReader reader;

            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                // open DB connection
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    // add parametrs to query
                    command.Parameters.AddWithValue("@UserId", id);
                    // start read data from DB (start reading)
                    reader = command.ExecuteReader();
                    // load data into data table
                    dataTable.Load(reader);
                    // save user
                    name = (string)dataTable.Rows[0].ItemArray[0];
                    // stop reading
                    reader.Close();
                }
                // close DB connection
                connection.Close();
            }

            return name;
        }
    }
}
