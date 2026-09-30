import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { title: "Crystal Clear Audio", text: "Custom drivers and adaptive noise cancelling keep every instrument distinct, from the lowest bass to the highest strings." },
  { title: "All Day Comfort", text: "Memory-foam cushions and a lightweight, flexible band spread the pressure so you can forget you are wearing them." },
  { title: "40-Hour Battery", text: "Listen for a full work week on a single charge. Ten minutes plugged in gives you five more hours." },
];

export default function Features() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".features-title", {
        autoAlpha: 0, y: 40, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".features-title", start: "top 85%", toggleActions: "play none none reverse" },
      });
      gsap.utils.toArray(".feature").forEach((el, i) => {
        gsap.from(el, {
          autoAlpha: 0, y: 50, duration: 1, delay: i * 0.08, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={root} className="relative px-6 py-32 md:px-12 md:py-48">
      <h2 className="features-title font-display text-[clamp(2rem,7vw,5.5rem)] font-extrabold leading-none tracking-tight">
        MORE THAN<br />JUST SOUND
      </h2>
      <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-3 md:gap-10">
        {features.map((f) => (
          <article key={f.title} className="feature border-t border-white/15 pt-6">
            <h3 className="font-display text-xl font-bold md:text-2xl">{f.title}</h3>
            <p className="mt-3 max-w-sm font-light leading-relaxed text-white/60">{f.text}</p>
          </article>
        ))}
      </div>
      <footer className="mt-32 text-sm text-white/35">© 2026 ITZ FIZZ. A fictional brand made for a frontend assignment.</footer>
    </section>
  );
}
