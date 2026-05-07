export default function StatusBadge({ status }) {

  const styles = {
    HEALTHY: "bg-green-500/15 text-green-300",
    MINOR: "bg-cyan-500/15 text-cyan-300",
    MODERATE: "bg-orange-500/15 text-orange-300",
    CRITICAL: "bg-red-500/15 text-red-300",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium
      ${styles[status] || "bg-white/10 text-white"}`}
    >
      {status || "UNKNOWN"}
    </span>
  );
}