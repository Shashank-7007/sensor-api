using System;

namespace SensorAPI.Models
{
    public class SensorData
    {
        public int Id { get; set; }

        public double Temperature { get; set; }
        public double Pressure { get; set; }
        public double Vibration { get; set; }

        public DateTime Timestamp { get; set; }
    }
}
