import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  getHistory,
  getSummary
} from "../services/api";

export default function Forecast() {

  const [history, setHistory] = useState([]);

  const [summary, setSummary] = useState({});

  const fetchData = async () => {

    try {

      const historyData = await getHistory();

      const summaryData = await getSummary();

      setHistory(historyData.reverse());

      setSummary(summaryData);

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

      {/* TOP CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="glass rounded-3xl p-6">

          <div className="text-sm opacity-60 mb-2">
            Estimated RUL
          </div>

          <div className="text-5xl font-bold">
            {summary.current_rul || 0}
          </div>

          <div className="opacity-50 mt-2">
            operational weeks
          </div>

        </div>

        <div className="glass rounded-3xl p-6">

          <div className="text-sm opacity-60 mb-2">
            Health State
          </div>

          <div className="text-3xl font-semibold">
            {summary.health_state || "UNKNOWN"}
          </div>

        </div>

        <div className="glass rounded-3xl p-6">

          <div className="text-sm opacity-60 mb-2">
            Trend Slope
          </div>

          <div className="text-3xl font-semibold">
            {
              summary.trend_slope
                ? summary.trend_slope.toFixed(4)
                : "0"
            }
          </div>

        </div>

      </div>

      {/* FORECAST CHART */}

      <div className="glass rounded-3xl p-6 h-[450px]">

        <div className="mb-6">

          <div className="text-sm opacity-60 mb-1">
            Predictive Maintenance
          </div>

          <div className="text-3xl font-semibold">
            Remaining Useful Life Forecast
          </div>

        </div>

        <ResponsiveContainer width="100%" height="80%">

          <AreaChart data={history}>

            <defs>

              <linearGradient
                id="colorRUL"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#06b6d4"
                  stopOpacity={0.7}
                />

                <stop
                  offset="95%"
                  stopColor="#06b6d4"
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
              dataKey="estimated_rul"
              stroke="#06b6d4"
              fillOpacity={1}
              fill="url(#colorRUL)"
              strokeWidth={3}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}