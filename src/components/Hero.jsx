import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Stats from "./Stats.jsx";
import Headphone from "./Headphone.jsx";

gsap.registerPlugin(ScrollTrigger);

const callouts = [
  { title: "40mm Hi-Res drivers", text: "Detail you can feel." },
  { title: "Memory-foam cushions", text: "Comfort for hours." },
  { title: "40H battery", text: "Charge once a week." },
];

export default function Hero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* ---------- 1. LOAD ANIMATION (plays once, on inner wrappers) ---------- */
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".intro-title", { autoAlpha: 0, y: 40, duration: 1.4 })
        .from(".intro-tagline", { autoAlpha: 0, y: 20, duration: 1.1 }, "-=0.7")
        .from(".intro-product", { autoAlpha: 0, scale: 0.8, duration: 1.8, ease: "power2.out" }, 0.3)
        .from(".stat", { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.2 }, "-=0.9")
        .from(".intro-scroll", { autoAlpha: 0, duration: 1 }, "-=0.4");

      /* ---------- 2. SCROLL ANIMATION (scrubbed, on outer wrappers) ---------- */
      // matchMedia gives phones a shorter scroll distance and a centred layout.
      const mm = gsap.matchMedia();
      mm.add({ desk: "(min-width: 768px)", mobile: "(max-width: 767px)" }, (c) => {
        const { desk } = c.conditions;

        // starting pose: product sits on the right (desktop) / lower centre (mobile)
        gsap.set(".scroll-product", { x: desk ? "20vw" : 0, y: desk ? 0 : "14vh", scale: desk ? 1 : 0.85 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: desk ? "+=300%" : "+=220%", // shorter travel on mobile
            pin: true,                        // hero stays fixed while we scrub
            scrub: 1,                         // 1s of smoothing behind the scrollbar
            anticipatePin: 1,
          },
          defaults: { ease: "none" },         // "none" = motion maps 1:1 to scroll
        });

        // Stage 1 (0 → 1): slow horizontal drift, slight rotation, glow moves
        tl.to(".scroll-product", { x: desk ? "10vw" : 0, rotate: -6, duration: 1 }, 0)
          .to(".glow", { x: "-25vw", scale: 1.2, duration: 1 }, 0)
          // Stage 2 (1 → 2): bigger, more rotation, hero text leaves, features start
          .to(".scroll-product", { x: desk ? "4vw" : 0, scale: desk ? 1.25 : 1.05, rotate: -14, duration: 1 }, 1)
          .to([".scroll-copy", ".scroll-stats"], { y: -70, autoAlpha: 0, duration: 0.8 }, 1)
          .to(".glow", { x: "0vw", scale: 1.5, opacity: 0.9, duration: 1 }, 1)
          .fromTo(".callout", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.5 }, 1.5)
          // Stage 3 (2 → 3): to centre, largest scale, rotation settles, panel is fully in
          .to(".scroll-product", { x: 0, y: desk ? "-6vh" : "-4vh", scale: desk ? 1.5 : 1.25, rotate: 0, duration: 1 }, 2)
          .to(".intro-scroll", { autoAlpha: 0, duration: 0.3 }, 1);
      });
    }, root);

    return () => ctx.revert(); // kills tweens + ScrollTriggers (safe with React StrictMode)
  }, []);

  return (
    <section id="top" ref={root} className="relative h-screen w-full overflow-hidden">
      {/* background glow: moved by scroll */}
      <div className="glow pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.45),rgba(255,95,162,0.18)_50%,transparent_70%)] opacity-70 blur-3xl will-change-transform" />

      {/* product */}
      <div className="scroll-product absolute inset-0 flex items-center justify-center will-change-transform">
        <div className="intro-product w-[78vw] max-w-[520px] md:w-[38vw]">
          <Headphone className="w-full drop-shadow-[0_30px_60px_rgba(124,92,255,0.35)]" />
        </div>
      </div>

      {/* headline + tagline */}
      <div className="scroll-copy relative z-10 px-6 pt-28 md:px-12 md:pt-40">
        <h1 className="intro-title font-display text-[clamp(1.6rem,6.2vw,4.5rem)] font-extrabold leading-[1.15] tracking-[0.35em]">
          WELCOME<br />ITZ FIZZ
        </h1>
        <p className="intro-tagline mt-5 max-w-xs text-base font-light text-white/60 md:text-lg">
          Experience sound beyond ordinary.
        </p>
      </div>

      {/* stats (pinned to bottom of the first screen) */}
      <div className="scroll-stats absolute inset-x-0 bottom-20 z-10 px-6 md:bottom-24 md:px-12">
        <Stats />
      </div>

      {/* feature callouts revealed at scroll stage 3 */}
      <div className="absolute inset-x-0 bottom-10 z-10 grid grid-cols-1 gap-2 px-6 md:grid-cols-3 md:gap-8 md:px-12">
        {callouts.map((c) => (
          <div key={c.title} className="callout border-l border-pink/60 pl-4 opacity-0 invisible">
            <p className="font-display text-sm font-bold md:text-lg">{c.title}</p>
            <p className="hidden text-sm font-light text-white/55 md:block">{c.text}</p>
          </div>
        ))}
      </div>

      <p className="intro-scroll absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] tracking-[0.3em] text-white/45 md:text-xs">
        SCROLL TO EXPERIENCE ↓
      </p>
    </section>
  );
}
