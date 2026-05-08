import { useEffect, useState } from "react";

import {
  getHistory
} from "../services/api";

import StatusBadge from "../components/StatusBadge";

export default function Logs() {

  const [history, setHistory] = useState([]);

  const [search, setSearch] = useState("");

  const fetchLogs = async () => {

    try {

      const data = await getHistory();

      setHistory(data);

    } catch (err) {

      console.error(err);

    }
  };

  useEffect(() => {

    fetchLogs();

    const interval = setInterval(
      fetchLogs,
      3000
    );

    return () => clearInterval(interval);

  }, []);

  const filtered = history.filter((row) => {

    return (
      row.health_state
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  });

  return (

    <div className="glass rounded-3xl p-6 overflow-auto">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>

          <div className="text-sm opacity-60 mb-1">
            Historical Telemetry
          </div>

          <div className="text-3xl font-semibold">
            Telemetry Logs
          </div>

        </div>

        <input
          placeholder="Search status..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="glass px-4 py-3 rounded-2xl outline-none"
        />

      </div>

      {/* DESKTOP TABLE */}

      <div className="hidden lg:block overflow-auto">

        <table className="w-full text-sm">

          <thead>

            <tr className="border-b border-white/10 text-left">

              <th className="pb-4">CPU</th>
              <th className="pb-4">TEMP</th>
              <th className="pb-4">RPM</th>
              <th className="pb-4">RESIDUAL</th>
              <th className="pb-4">HEALTH</th>
              <th className="pb-4">RUL</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((row) => (

              <tr
                key={row.id}
                className="border-b border-white/5 hover:bg-white/5"
              >

                <td className="py-4">
                  {row.cpu_usage}
                </td>

                <td>
                  {row.temperature}
                </td>

                <td>
                  {row.fan_rpm}
                </td>

                <td>
                  {
                    row.residual
                      ? row.residual.toFixed(2)
                      : "-"
                  }
                </td>

                <td>
                  <StatusBadge
                    status={row.health_state}
                  />
                </td>

                <td>
                  {row.estimated_rul || "-"}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* MOBILE CARDS */}

      <div className="grid gap-4 lg:hidden">

        {filtered.map((row) => (

          <div
            key={row.id}
            className="glass rounded-2xl p-4"
          >

            <div className="flex justify-between mb-4">

              <StatusBadge
                status={row.health_state}
              />

              <div className="text-sm opacity-60">
                RUL: {row.estimated_rul || "-"}
              </div>

            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">

              <div>
                <div className="opacity-50">
                  CPU
                </div>

                <div>
                  {row.cpu_usage}
                </div>
              </div>

              <div>
                <div className="opacity-50">
                  TEMP
                </div>

                <div>
                  {row.temperature}
                </div>
              </div>

              <div>
                <div className="opacity-50">
                  RPM
                </div>

                <div>
                  {row.fan_rpm}
                </div>
              </div>

              <div>
                <div className="opacity-50">
                  RESIDUAL
                </div>

                <div>
                  {
                    row.residual
                      ? row.residual.toFixed(2)
                      : "-"
                  }
                </div>
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}