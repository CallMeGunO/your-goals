using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using YourGoals.Models;

namespace YourGoals.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoalController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public GoalController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("{name}")]
        public JsonResult Get(string name)
        {
            // sql query
            string query = @"select GoalId, GoalName, GoalDate, 
                            GoalState, UserName from dbo.Goal where UserName = @UserName";
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
        public JsonResult Post(Goal goal)
        {
            goal.GoalDate = goal.GoalDate.Substring(0, 10);
            // sql query
            string query = @"insert dbo.Goal (GoalName, GoalDate, GoalState, UserName) 
                             values (@GoalName, @GoalDate, @GoalState, @UserName)";
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
                    command.Parameters.AddWithValue("@GoalName", goal.GoalName);
                    command.Parameters.AddWithValue("@GoalDate", goal.GoalDate);
                    command.Parameters.AddWithValue("@GoalState", goal.GoalState);
                    command.Parameters.AddWithValue("@UserName", goal.UserName);
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
        public JsonResult Put(Goal goal)
        {
            // sql query
            goal.GoalDate = goal.GoalDate.Substring(0, 10);
            string query = @"update dbo.Goal set 
                             GoalName = @GoalName,
                             GoalDate = @GoalDate,
                             GoalState = @GoalState,
                             UserName = @UserName
                             where GoalId = @GoalId";
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
                    command.Parameters.AddWithValue("@GoalId", goal.GoalId);
                    command.Parameters.AddWithValue("@GoalName", goal.GoalName);
                    command.Parameters.AddWithValue("@GoalDate", goal.GoalDate);
                    command.Parameters.AddWithValue("@GoalState", goal.GoalState);
                    command.Parameters.AddWithValue("@UserName", goal.UserName);
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
            string query = @"delete from dbo.Goal where GoalId = @GoalId";
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
                    command.Parameters.AddWithValue("@GoalId", id);
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
    }
}