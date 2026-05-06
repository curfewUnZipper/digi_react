const tabs = [
  "Live",
  "Analytics",
  "Residuals",
  "Forecast",
  "Metrics",
  "Logs"
];

export default function Sidebar({ activeTab, setActiveTab }) {

  return (
    <aside className="w-[260px] hidden md:flex flex-col glass border-r border-white/5 p-5">

      <div className="mb-10">
        <div className="text-cyan-400 text-xs tracking-[0.25em] uppercase mb-2">
          Digital Twin
        </div>

        <h1 className="text-2xl font-semibold">
          Predictive Maintenance
        </h1>
      </div>

      <div className="space-y-2">

        {tabs.map(tab => (

          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full text-left px-4 py-3 rounded-2xl transition-all
              ${
                activeTab === tab
                  ? "bg-cyan-500/10 border border-cyan-400/20"
                  : "hover:bg-white/5"
              }
            `}
          >
            {tab}
          </button>

        ))}

      </div>

    </aside>
  );
}