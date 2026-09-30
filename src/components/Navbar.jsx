import { useEffect, useRef } from "react";
import gsap from "gsap";

const links = ["Product", "Sound", "Battery", "Buy"];

export default function Navbar() {
  const ref = useRef(null);

  useEffect(() => {
    // Subtle fade-in after the page loads
    const tween = gsap.from(ref.current, { autoAlpha: 0, y: -16, duration: 1.4, delay: 0.3, ease: "power2.out" });
    return () => tween.kill();
  }, []);

  return (
    <header ref={ref} className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
      <a href="#top" className="font-display text-lg font-extrabold tracking-[0.3em]">ITZ FIZZ</a>
      <nav className="hidden gap-8 text-sm font-light text-white/60 md:flex">
        {links.map((l) => (
          <a key={l} href="#features" className="transition-colors hover:text-white focus-visible:text-white">{l}</a>
        ))}
      </nav>
      <a href="#features" className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/80 transition hover:border-pink hover:text-white">
        Pre-order
      </a>
    </header>
  );
}
