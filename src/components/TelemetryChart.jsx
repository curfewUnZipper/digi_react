import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function TelemetryChart({ data }) {

  return (

    <div className="glass rounded-3xl p-6 h-[400px]">

      <div className="mb-6">

        <div className="text-sm opacity-60 mb-1">
          RPM Prediction Analysis
        </div>

        <div className="text-2xl font-semibold">
          Actual vs Predicted RPM
        </div>

      </div>

      <ResponsiveContainer width="100%" height="80%">

        <LineChart data={data}>

          <CartesianGrid
            stroke="rgba(255,255,255,0.05)"
          />

          <XAxis
            dataKey="id"
            stroke="#888"
          />

          <YAxis stroke="#888" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="fan_rpm"
            stroke="#06b6d4"
            strokeWidth={3}
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="predicted_rpm"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={false}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}