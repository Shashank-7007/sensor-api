import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function PressureBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={[800, 1200]} />
        <Tooltip />
        <Bar
          dataKey="value"
          fill="#1890ff"
          radius={[6, 6, 0, 0]}
          isAnimationActive={false}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
