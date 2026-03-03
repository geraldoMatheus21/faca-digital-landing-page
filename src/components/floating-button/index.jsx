"use client";

import { useState, useEffect } from "react";
import { Home } from "lucide-react";

export default function FloatingButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // appear assim que o usuário rolar para baixo
      setShowButton(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // sempre renderiza para possibilitar animação de fade
  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-12 z-50 w-14 h-14 rounded-full bg-[#a8d103] text-black flex items-center justify-center shadow-lg hover:bg-[#97c000] transition-opacity duration-500 transition-transform duration-300 hover:scale-110 active:scale-95 ${
        showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-label="Voltar ao início"
      title="Voltar ao início"
    >
      <Home size={24} />
      <span className="sr-only">Voltar ao início</span>
    </button>
  );
}