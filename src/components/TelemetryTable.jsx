import StatusBadge from "./StatusBadge";

export default function TelemetryTable({ data }) {

  return (

    <div className="glass rounded-3xl p-6 overflow-auto">

      <div className="mb-6">

        <div className="text-sm opacity-60 mb-1">
          Historical Telemetry
        </div>

        <div className="text-2xl font-semibold">
          Telemetry Logs
        </div>

      </div>

      <table className="w-full text-sm">

        <thead>

          <tr className="border-b border-white/10 text-left">

            <th className="pb-4">CPU</th>
            <th className="pb-4">Temp</th>
            <th className="pb-4">RPM</th>
            <th className="pb-4">Residual</th>
            <th className="pb-4">Health</th>
            <th className="pb-4">RUL</th>

          </tr>

        </thead>

        <tbody>

          {data.map((row) => (

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
                {row.residual?.toFixed(2)}
              </td>

              <td>
                <StatusBadge
                  status={row.health_state}
                />
              </td>

              <td>
                {row.estimated_rul}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}