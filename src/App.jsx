import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Features from "./components/Features.jsx";

export default function App() {
  return (
    <main className="bg-ink min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
    </main>
  );
}
