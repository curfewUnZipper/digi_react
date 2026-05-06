export default function Topbar({ toggleTheme }) {

  return (
    <div className="flex items-center justify-between mb-8">

      <div>
        <div className="text-cyan-400 uppercase text-xs tracking-[0.2em] mb-2">
          Live Monitoring
        </div>

        <h2 className="text-3xl font-semibold">
          System Dashboard
        </h2>
      </div>

      <button
        onClick={toggleTheme}
        className="glass px-4 py-2 rounded-xl"
      >
        Toggle Theme
      </button>

    </div>
  );
}