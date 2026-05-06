export default function MetricCard({ title, value }) {

  return (
    <div className="glass rounded-3xl p-5">

      <div className="text-sm opacity-60 mb-3">
        {title}
      </div>

      <div className="text-4xl font-semibold">
        {value}
      </div>

    </div>
  );
}