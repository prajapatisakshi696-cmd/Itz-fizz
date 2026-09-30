import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Stats from "./Stats.jsx";
import Headphone from "./Headphone.jsx";

gsap.registerPlugin(ScrollTrigger);

const callouts = [
  {
    title: "40mm Hi-Res drivers",
    text: "Detail you can feel.",
    pos: "left-6 bottom-10 md:bottom-auto md:left-[6%] md:top-1/2",
  },
  {
    title: "Memory-foam cushions",
    text: "Comfort for hours.",
    pos: "left-6 bottom-10 md:bottom-auto md:left-auto md:right-[6%] md:top-1/2",
  },
  {
    title: "40H battery",
    text: "Charge once a week.",
    pos: "left-6 bottom-10 md:left-1/2 md:-translate-x-1/2",
  },
];

export default function Hero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- Smooth scroll (Lenis) ---------- */
    let lenis = null;
    let tick = null;
    if (!reduce) {
      lenis = new Lenis({ lerp: 0.09 });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (t) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      // SVG parts apne center se rotate/scale hon
      gsap.set(".hp-cup, .hp-ring", { transformOrigin: "50% 50%" });

      /* ---------- 1. LOAD ANIMATION (inner wrappers) ---------- */
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
intro
  .from(".intro-title", { autoAlpha: 0, y: 40, duration: 1.4 })
  .from(".intro-tagline", { autoAlpha: 0, y: 20, duration: 1.1 }, "-=0.7")
  .from(".intro-product", { autoAlpha: 0, scale: 0.85, y: 30, duration: 1.6, ease: "power2.out" }, 0.2)
  .from(".hp-band", { y: -24, duration: 1.4 }, 0.4)
  .from(".hp-cup-l", { x: -24, duration: 1.4 }, 0.4)
  .from(".hp-cup-r", { x: 24, duration: 1.4 }, 0.4)
  .from(".stat", { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.2 }, "-=0.9")
  .from(".intro-scroll", { autoAlpha: 0, duration: 1 }, "-=0.4");

      if (reduce) intro.progress(1);

      /* ---------- 2. SCROLL ANIMATION (outer wrappers) ---------- */
      const mm = gsap.matchMedia();

      mm.add(
        {
          desk: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (c) => {
          const { desk, reduce: rm } = c.conditions;
          if (rm) return; // reduced motion: no pin, no scrub

          const [c1, c2, c3] = gsap.utils.toArray(".callout");

          // starting pose
          gsap.set(".scroll-product", {
            x: desk ? "20vw" : 0,
            y: desk ? 0 : "14vh",
            scale: desk ? 1 : 0.85,
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: desk ? "+=450%" : "+=320%",
              pin: true,
              scrub: 1.2,
              anticipatePin: 1,
            },
            defaults: { ease: "power2.inOut" },
          });

          tl
           tl
  /* STAGE 1 (0-1): halka drift + tilt, headphone ek piece */
  .to(".scroll-product", { x: desk ? "8vw" : 0, rotate: -6, scale: desk ? 1.15 : 0.95, duration: 1 }, 0)
  .to(".glow", { x: "-25vw", scale: 1.2, duration: 1 }, 0)
  .to(".bg-1", { opacity: 1, duration: 1 }, 0)
  .to(".scroll-hint", { autoAlpha: 0, duration: 0.3 }, 0)

  /* STAGE 2 (1-2): text jaata hai, LEFT cup par zoom */
  .to([".scroll-copy", ".scroll-stats"], { y: -70, autoAlpha: 0, duration: 0.8 }, 1)
  .to(".scroll-product", { x: desk ? "30vw" : "40vw", y: 0, scale: desk ? 2 : 1.5, rotate: 0, duration: 1 }, 1)
  .to(".hp-ring", { rotate: 180, scale: 1.2, transformOrigin: "50% 50%", duration: 1 }, 1)
  .to(".glow", { x: "0vw", scale: 1.6, opacity: 0.9, duration: 1 }, 1)
  .fromTo(c1, { autoAlpha: 0, x: -40 }, { autoAlpha: 1, x: 0, duration: 0.6 }, 1.4)

  /* STAGE 3 (2-3): RIGHT cup par swing */
  .to(c1, { autoAlpha: 0, duration: 0.4 }, 2)
  .to(".scroll-product", { x: desk ? "-30vw" : "-40vw", rotate: 3, duration: 1 }, 2)
  .to(".bg-2", { opacity: 1, duration: 1 }, 2)
  .fromTo(c2, { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, duration: 0.6 }, 2.4)

  /* STAGE 4 (3-4): wapas centre, poora headphone */
  .to(c2, { autoAlpha: 0, duration: 0.4 }, 3)
  .to(".scroll-product", { x: 0, y: "-6vh", scale: desk ? 1.4 : 1.1, rotate: 0, duration: 1 }, 3)
  .to(".hp-ring", { rotate: 360, scale: 1, duration: 1 }, 3)
  .to(".glow", { scale: 1.3, duration: 1 }, 3)
  .fromTo(c3, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 3.4);
        }
      );

      /* ---------- 3. CURSOR TILT (desktop + mouse only) ---------- */
      mm.add("(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const ry = gsap.quickTo(".intro-product", "rotationY", { duration: 0.6, ease: "power3" });
        const rx = gsap.quickTo(".intro-product", "rotationX", { duration: 0.6, ease: "power3" });
        const move = (e) => {
          ry((e.clientX / window.innerWidth - 0.5) * 18);
          rx(-(e.clientY / window.innerHeight - 0.5) * 18);
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
      });
    }, root);

    return () => {
      ctx.revert(); // tweens + ScrollTriggers + matchMedia cleanup
      if (tick) gsap.ticker.remove(tick);
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <section id="top" ref={root} className="relative h-screen w-full overflow-hidden">
      {/* stage background layers (sirf opacity animate hoti hai) */}
      <div className="bg-1 pointer-events-none absolute inset-0 bg-[#140d2e] opacity-0" />
      <div className="bg-2 pointer-events-none absolute inset-0 bg-[#06283d] opacity-0" />

      {/* background glow */}
      <div className="glow pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.45),rgba(255,95,162,0.18)_50%,transparent_70%)] opacity-70 blur-3xl will-change-transform" />

      {/* product */}
      <div className="scroll-product absolute inset-0 flex items-center justify-center will-change-transform [perspective:1000px]">
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

      {/* stats */}
      <div className="scroll-stats absolute inset-x-0 bottom-20 z-10 px-6 md:bottom-24 md:px-12">
        <Stats />
      </div>

      {/* feature callouts: ek-ek karke aate hain (absolute stacked) */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {callouts.map((c) => (
          <div
            key={c.title}
            className={`callout invisible absolute border-l border-pink/60 pl-4 opacity-0 ${c.pos}`}
          >
            <p className="font-display text-base font-bold md:text-2xl">{c.title}</p>
            <p className="text-xs font-light text-white/60 md:text-base">{c.text}</p>
          </div>
        ))}
      </div>

      {/* scroll hint: outer wrapper scroll par fade hota hai, inner intro par */}
      <div className="scroll-hint absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <p className="intro-scroll text-[10px] tracking-[0.3em] text-white/45 md:text-xs">
          SCROLL TO EXPERIENCE ↓
        </p>
      </div>
    </section>
  );
}