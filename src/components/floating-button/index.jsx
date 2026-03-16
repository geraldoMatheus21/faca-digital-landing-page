// src/components/FloatingButton/index.jsx
"use client";

import { useState, useEffect } from "react";
import { Home } from "lucide-react";
import styles from "./styles.module.css";

export default function FloatingButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`${styles.floatingButton} ${showButton ? styles.visible : ""}`}
      aria-label="Voltar ao início"
      title="Voltar ao início"
    >
      <Home size={24} />
      <span className="sr-only">Voltar ao início</span>
    </button>
  );
}