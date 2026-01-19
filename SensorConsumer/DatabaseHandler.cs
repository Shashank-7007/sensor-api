using Microsoft.Data.SqlClient;
using System.Text.Json;

public static class DatabaseHandler
{
    public static void Save(string json)
    {
        dynamic d = JsonSerializer.Deserialize<dynamic>(json)!;

        using var con = new SqlConnection("Server=localhost\\SQLEXPRESS;Database=SensorDB_New;Trusted_Connection=True;TrustServerCertificate=True");
        con.Open();

        var cmd = new SqlCommand(
            "INSERT INTO SensorData (Temperature,Pressure,Vibration,Timestamp) VALUES (@t,@p,@v,@ts)", con);

        cmd.Parameters.AddWithValue("@t", (double)d.Temperature);
        cmd.Parameters.AddWithValue("@p", (double)d.Pressure);
        cmd.Parameters.AddWithValue("@v", (double)d.Vibration);
        cmd.Parameters.AddWithValue("@ts", DateTime.Now);
        cmd.ExecuteNonQuery();
    }
}
