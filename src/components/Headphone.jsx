export default function Headphone({ className = "" }) {
  const cups = [
    { x: 22, f: 1, cls: "hp-cup hp-cup-l" },
    { x: 378, f: -1, cls: "hp-cup hp-cup-r" },
  ];

  return (
    <svg
      viewBox="0 0 400 420"
      className={className}
      style={{ overflow: "visible" }}
      role="img"
      aria-label="ITZ FIZZ wireless headphones"
    >
      <defs>
        <linearGradient id="band" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7c5cff" />
          <stop offset="1" stopColor="#ff5fa2" />
        </linearGradient>
        <linearGradient id="cup" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a2d55" />
          <stop offset="1" stopColor="#0b0c1f" />
        </linearGradient>
        <radialGradient id="pad" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0" stopColor="#1a1b38" />
          <stop offset="1" stopColor="#07081a" />
        </radialGradient>
      </defs>

      {/* headband */}
      <g className="hp-band">
        <path
          d="M62 250 C50 60 350 60 338 250"
          fill="none"
          stroke="url(#band)"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          d="M78 245 C70 100 330 100 322 245"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.08"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>

      {/* ear cups */}
      {cups.map(({ x, f, cls }) => (
        <g key={x} className={cls}>
          <rect
            x={f === 1 ? x : x - 90}
            y="215"
            width="90"
            height="150"
            rx="42"
            fill="url(#cup)"
            stroke="#ffffff"
            strokeOpacity="0.14"
          />
          <rect
            x={f === 1 ? x + 52 : x - 100}
            y="230"
            width="48"
            height="120"
            rx="24"
            fill="url(#pad)"
          />
          <g className="hp-ring">
            <circle
              cx={f === 1 ? x + 34 : x - 34}
              cy="290"
              r="20"
              fill="none"
              stroke="url(#band)"
              strokeWidth="3"
            />
          </g>
          <circle cx={f === 1 ? x + 34 : x - 34} cy="290" r="6" fill="#ff5fa2" />
        </g>
      ))}
    </svg>
  );
}