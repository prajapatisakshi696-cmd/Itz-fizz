const stats = [
  { value: "95%", label: "Crystal Clear Audio" },
  { value: "40H", label: "Battery Life" },
  { value: "360°", label: "Immersive Sound" },
];

// Each .stat is animated with a GSAP stagger in Hero.jsx
export default function Stats() {
  return (
    <div className="grid grid-cols-3 gap-3 md:gap-16">
      {stats.map((s) => (
        <div key={s.label} className="stat">
          <p className="font-display text-3xl font-bold md:text-5xl">{s.value}</p>
          <p className="mt-1 text-[11px] font-light leading-tight text-white/55 md:text-sm">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
