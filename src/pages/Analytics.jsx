import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
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

export default function Analytics() {

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

      {/* HEALTH TREND */}

      <div className="glass rounded-3xl p-6 h-[420px]">

        <div className="mb-6">

          <div className="text-sm opacity-60 mb-1">
            System Stability
          </div>

          <div className="text-3xl font-semibold">
            Health Index Timeline
          </div>

        </div>

        <ResponsiveContainer width="100%" height="80%">

          <AreaChart data={history}>

            <defs>

              <linearGradient
                id="healthGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#22c55e"
                  stopOpacity={0.7}
                />

                <stop
                  offset="95%"
                  stopColor="#22c55e"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="rgba(255,255,255,0.05)"
            />

            <XAxis
              dataKey="id"
              stroke="#888"
            />

            <YAxis stroke="#888" />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="health_index"
              stroke="#22c55e"
              fill="url(#healthGradient)"
              strokeWidth={3}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

      {/* TEMPERATURE */}

      <div className="glass rounded-3xl p-6 h-[420px]">

        <div className="mb-6">

          <div className="text-sm opacity-60 mb-1">
            Thermal Monitoring
          </div>

          <div className="text-3xl font-semibold">
            Temperature Drift
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
              dataKey="temperature"
              stroke="#ef4444"
              strokeWidth={3}
              dot={false}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}