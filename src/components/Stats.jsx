import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const stats = [
  { value: 25, label: "Faster response" },
  { value: 78, label: "Customer delight" },
  { value: 92, label: "Battery efficiency" },
];

export default function Stats() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      root.current.querySelectorAll(".stat-num").forEach((el, i) => {
        const target = +el.dataset.value;

        if (reduce) {
          el.textContent = target + "%";
          return;
        }

        const o = { v: 0 };
        gsap.to(o, {
          v: target,
          duration: 2,
          delay: 1.6 + i * 0.2, // intro ke stats reveal ke saath sync
          ease: "power2.out",
          onUpdate: () => (el.textContent = Math.round(o.v) + "%"),
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="flex gap-8 md:gap-20">
      {stats.map((s) => (
        <div key={s.label} className="stat">
          <div
            className="stat-num font-display text-3xl font-extrabold md:text-5xl"
            data-value={s.value}
          >
            0%
          </div>
          <div className="mt-1 text-xs font-light text-white/60 md:text-sm">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}