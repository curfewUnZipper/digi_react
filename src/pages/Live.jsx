import MetricCard from "../components/MetricCard";

export default function Live() {

  return (
    <div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

        <MetricCard
          title="CPU Usage"
          value="72%"
        />

        <MetricCard
          title="Temperature"
          value="81°C"
        />

        <MetricCard
          title="Fan RPM"
          value="3200"
        />

        <MetricCard
          title="Health Index"
          value="0.61"
        />

      </div>

      <div className="glass rounded-3xl p-6 h-[400px] flex items-center justify-center">

        Charts will go here

      </div>

    </div>
  );
}