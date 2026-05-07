const tabs = [
  "Live",
  "Analytics",
  "Logs",
  "Forecast"
];

export default function MobileNav({
  activeTab,
  setActiveTab
}) {

  return (

    <div className="fixed bottom-0 left-0 right-0 md:hidden glass border-t border-white/10 flex justify-around py-3 z-50">

      {tabs.map(tab => (

        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={
            activeTab === tab
              ? "text-cyan-400"
              : "opacity-60"
          }
        >
          {tab}
        </button>

      ))}

    </div>
  );
}