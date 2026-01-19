using System.Text;
using System.Text.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

class Program
{
    static async Task Main()
    {
        var factory = new ConnectionFactory
        {
            HostName = "localhost"
        };

        await using var connection = await factory.CreateConnectionAsync();
        await using var channel = await connection.CreateChannelAsync();

        await channel.QueueDeclareAsync(
            queue: "sensor-queue",
            durable: false,
            exclusive: false,
            autoDelete: false,
            arguments: null
        );

        Console.WriteLine("📥 Waiting for messages...");

        var consumer = new AsyncEventingBasicConsumer(channel);

        consumer.ReceivedAsync += async (sender, ea) =>
        {
            var message = Encoding.UTF8.GetString(ea.Body.ToArray());
            var data = JsonSerializer.Deserialize<SensorDto>(message);

            if (data != null)
            {
                Console.WriteLine($"Temperature={data.Temperature}, Pressure={data.Pressure}, Vibration={data.Vibration}");

                // Save to DB here
                // databaseHandler.Save(data.Temperature, data.Pressure, data.Vibration);
            }

            await Task.CompletedTask;
        };

        await channel.BasicConsumeAsync(
            queue: "sensor-queue",
            autoAck: true,
            consumer: consumer
        );

        Console.ReadLine();
    }
}

public class SensorDto
{
    public double Temperature { get; set; }
    public double Pressure { get; set; }
    public double Vibration { get; set; }
}
