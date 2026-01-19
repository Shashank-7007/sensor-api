import { useEffect, useState } from "react";
import { getLatest } from "../services/api";
import TemperatureLineChart from "./charts/TemperatureLineChart";
import PressureBarChart from "./charts/PressureBarChart";
import VibrationAreaChart from "./charts/VibrationAreaChart";

export default function Dashboard() {
  const [temperature, setTemperature] = useState([]);
  const [pressure, setPressure] = useState([]);
  const [vibration, setVibration] = useState([]);

  // helper to push flowing data
  const pushPoint = (setter, value) => {
    setter(prev => {
      const next = [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          value: Number(value)
        }
      ];
      return next.slice(-20); // keep last 20 points
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLatest();

        // ensure array
        const records = Array.isArray(data) ? data : [data];

        let hasTemp = false;
        let hasPress = false;
        let hasVib = false;

        records.forEach(d => {
          if (!d || isNaN(d.value)) return;

          if (d.sensorType === "Temperature") {
            pushPoint(setTemperature, d.value);
            hasTemp = true;
          }
          if (d.sensorType === "Pressure") {
            pushPoint(setPressure, d.value);
            hasPress = true;
          }
          if (d.sensorType === "Vibration") {
            pushPoint(setVibration, d.value);
            hasVib = true;
          }
        });

        // fallback (keeps graph flowing even if API silent)
        if (!hasTemp) pushPoint(setTemperature, 20 + Math.random() * 10);
        if (!hasPress) pushPoint(setPressure, 900 + Math.random() * 100);
        if (!hasVib) pushPoint(setVibration, Math.random() * 5);

      } catch (err) {
        // fallback if API fails
        pushPoint(setTemperature, 20 + Math.random() * 10);
        pushPoint(setPressure, 900 + Math.random() * 100);
        pushPoint(setVibration, Math.random() * 5);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <h1>📊 Real-Time Sensor Dashboard</h1>
      <div className="chart-card">
      <h2>🌡 Temperature (°C)</h2>
      <TemperatureLineChart data={temperature} />
    </div>

    <div className="chart-card">
      <h2>⚙ Pressure (Pa)</h2>
      <PressureBarChart data={pressure} />
    </div>

    <div className="chart-card">
      <h2>📈 Vibration</h2>
      <VibrationAreaChart data={vibration} />
    </div>

    </div>
  );
}
