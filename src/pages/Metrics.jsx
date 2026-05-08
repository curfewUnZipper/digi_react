import { useEffect, useState } from "react";

import {
  getHistory
} from "../services/api";

export default function Metrics() {

  const [history, setHistory] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const data = await getHistory();

        setHistory(data);

      } catch (err) {

        console.error(err);

      }
    };

    fetchData();

  }, []);

  const latest =
    history[0] || {};

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

      <div className="glass rounded-3xl p-6">

        <div className="text-sm opacity-60 mb-2">
          Inference Latency
        </div>

        <div className="text-4xl font-bold">
          {
            latest.inference_time_ms
              ? latest.inference_time_ms.toFixed(2)
              : 0
          } ms
        </div>

      </div>

      <div className="glass rounded-3xl p-6">

        <div className="text-sm opacity-60 mb-2">
          Packets Processed
        </div>

        <div className="text-4xl font-bold">
          {history.length}
        </div>

      </div>

      <div className="glass rounded-3xl p-6">

        <div className="text-sm opacity-60 mb-2">
          Average Residual
        </div>

        <div className="text-4xl font-bold">

          {
            (
              history.reduce(
                (sum, row) =>
                  sum + (row.residual || 0),
                0
              ) / (history.length || 1)
            ).toFixed(2)
          }

        </div>

      </div>

      <div className="glass rounded-3xl p-6">

        <div className="text-sm opacity-60 mb-2">
          Current Health
        </div>

        <div className="text-4xl font-bold">
          {latest.health_state || "UNKNOWN"}
        </div>

      </div>

    </div>
  );
}