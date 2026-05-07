export default function HealthGauge({ value = 0 }) {

  const percentage = value * 100;

  return (

    <div className="glass rounded-3xl p-6">

      <div className="text-sm opacity-60 mb-5">
        Health Index
      </div>

      <div className="relative w-[180px] h-[180px] mx-auto">

        <svg
          className="rotate-[-90deg]"
          width="180"
          height="180"
        >

          <circle
            cx="90"
            cy="90"
            r="70"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="12"
            fill="none"
          />

          <circle
            cx="90"
            cy="90"
            r="70"
            stroke="#06b6d4"
            strokeWidth="12"
            fill="none"
            strokeDasharray={440}
            strokeDashoffset={
              440 - (440 * percentage) / 100
            }
            strokeLinecap="round"
          />

        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">

          <div className="text-4xl font-bold">
            {(value || 0).toFixed(2)}
          </div>

          <div className="text-xs opacity-60 mt-1">
            HEALTH
          </div>

        </div>

      </div>

    </div>
  );
}