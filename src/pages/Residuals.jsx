import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  getHistory
} from "../services/api";

export default function Residuals() {

  const [history, setHistory] = useState([]);

  const fetchData = async () => {

    try {

      const data = await getHistory();

      setHistory(data.reverse());

    } catch (err) {

      console.error(err);

    }
  };

  useEffect(() => {

    fetchData();

    const interval = setInterval(
      fetchData,
      3000
    );

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="space-y-6">

      {/* RESIDUAL CHART */}

      <div className="glass rounded-3xl p-6 h-[420px]">

        <div className="mb-6">

          <div className="text-sm opacity-60 mb-1">
            Digital Twin Deviation
          </div>

          <div className="text-3xl font-semibold">
            Residual Trend Analysis
          </div>

        </div>

        <ResponsiveContainer width="100%" height="80%">

          <LineChart data={history}>

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
              dataKey="residual"
              stroke="#f97316"
              strokeWidth={3}
              dot={false}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* COMPARISON */}

      <div className="glass rounded-3xl p-6 h-[420px]">

        <div className="mb-6">

          <div className="text-sm opacity-60 mb-1">
            Prediction Accuracy
          </div>

          <div className="text-3xl font-semibold">
            Actual vs Predicted RPM
          </div>

        </div>

        <ResponsiveContainer width="100%" height="80%">

          <LineChart data={history}>

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

    </div>
  );
}