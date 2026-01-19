using RabbitMQ.Client;
using System.Text;
using System.Text.Json;

var factory = new ConnectionFactory() { HostName = "localhost" };
using var connection = factory.CreateConnection();
using var channel = connection.CreateModel();

channel.QueueDeclare("sensor-queue", false, false, false, null);

var random = new Random();

while (true)
{
    var data = new
    {
        Temperature = random.Next(20, 40),
        Pressure = random.Next(900, 1100),
        Vibration = random.NextDouble() * 10,
        Timestamp = DateTime.Now
    };

    var message = JsonSerializer.Serialize(data);
    var body = Encoding.UTF8.GetBytes(message);

    channel.BasicPublish("", "sensor-queue", null, body);
    Console.WriteLine($"Sent → {message}");

    Thread.Sleep(2000);
}
