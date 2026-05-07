import { useEffect, useState } from "react";

import MetricCard from "../components/MetricCard";
import TelemetryChart from "../components/TelemetryChart";
import TelemetryTable from "../components/TelemetryTable";
import HealthGauge from "../components/HealthGauge";

import {
  getSummary,
  getHistory
} from "../services/api";

export default function Live() {

  const [summary, setSummary] = useState({});
  const [history, setHistory] = useState([]);

  const fetchData = async () => {

    try {

      const summaryData = await getSummary();

      const historyData = await getHistory();

      setSummary(summaryData);

      setHistory(historyData.reverse());

    } catch (err) {

      console.error(err);

    }
  };

  useEffect(() => {

    fetchData();

    const interval = setInterval(
      fetchData,
      2000
    );

    return () => clearInterval(interval);

  }, []);

  const latest =
    history[history.length - 1] || {};

  return (

    <div>

      {/* METRIC CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

        <MetricCard
          title="CPU Usage"
          value={`${latest.cpu_usage || 0}%`}
        />

        <MetricCard
          title="Temperature"
          value={`${latest.temperature || 0}°C`}
        />

        <MetricCard
          title="Fan RPM"
          value={latest.fan_rpm || 0}
        />

        <MetricCard
          title="Residual"
          value={
            latest.residual
              ? latest.residual.toFixed(2)
              : 0
          }
        />

      </div>

      {/* CHART + GAUGE */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">

        <div className="xl:col-span-2">

          <TelemetryChart
            data={history}
          />

        </div>

        <HealthGauge
          value={
            summary.current_health_index || 0
          }
        />

      </div>

      {/* TABLE */}

      <TelemetryTable
        data={history.slice(-15).reverse()}
      />

    </div>
  );
}