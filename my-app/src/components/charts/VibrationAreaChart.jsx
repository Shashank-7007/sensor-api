import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function VibrationAreaChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={[0, 10]} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#52c41a"
          fill="rgba(82,196,26,0.3)"
          strokeWidth={2}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
