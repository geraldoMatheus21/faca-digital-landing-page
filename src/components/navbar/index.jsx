"use client";

import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";
import Image from "next/image";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const navbarRef = useRef(null);
  const ticking = useRef(false); // para throttle

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Controla a rolagem do body quando o menu mobile está aberto
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }
  }, [menuOpen]);

  useEffect(() => {
    const controlNavbar = () => {
      // throttle com requestAnimationFrame
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY) {
            setShow(false);
          } else {
            setShow(true);
          }
          setLastScrollY(currentScrollY);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]); // dependência continua sendo lastScrollY, mas agora com throttle

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;

    if (menuOpen) toggleMenu();

    const navbarHeight = navbarRef.current?.offsetHeight || 80;
    const elementPosition = element.offsetTop - navbarHeight;

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  };

  const navClass = `${styles.navDesktop} ${show ? styles.navVisible : styles.navHidden}`;

  return (
    <nav>
      {/* NAVBAR DESKTOP */}
      <div ref={navbarRef} className={navClass}>
        {/* LOGO */}
        <div className={styles.logo}>
          <Image
            src="/logo.png"
            alt="Faça Digital"
            width={120}
            height={40}
            className={styles.logoImage}
            priority
            onError={(e) => {
              // Se a imagem falhar, exibe o fallback
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling.style.display = "block";
            }}
          />
          <span className={styles.logoFallback}>Faça Digital</span>
        </div>

        {/* LINKS (DESKTOP) */}
        <div className={styles.linksContainer}>
          <button
            onClick={() => scrollToSection("works")}
            className={styles.navButton}
          >
            NOSSOS SERVIÇOS
          </button>
          <button
            onClick={() => scrollToSection("projetos")}
            className={styles.navButton}
          >
            PROJETOS EM DESTAQUE
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className={styles.navButton}
          >
            SOBRE NÓS
          </button>
        </div>

        {/* BOTÃO CONTATO (DESKTOP) */}
        <button
          onClick={() => scrollToSection("contact")}
          className={styles.contactButton}
        >
          ENTRE EM CONTATO
        </button>

        {/* BOTÃO MENU MOBILE */}
        <button
          onClick={toggleMenu}
          className={styles.menuToggle}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className={styles.closeIcon} /> : <Menu className={styles.menuIcon} />}
        </button>
      </div>

      {/* MENU MOBILE OVERLAY */}
      {menuOpen && (
        <div className={styles.mobileMenuOverlay}>
          <button
            onClick={() => scrollToSection("works")}
            className={styles.mobileMenuButton}
          >
            NOSSOS SERVIÇOS
          </button>
          <button
            onClick={() => scrollToSection("projetos")}
            className={styles.mobileMenuButton}
          >
            PROJETOS EM DESTAQUE
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className={styles.mobileMenuButton}
          >
            SOBRE NÓS
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className={styles.mobileMenuButton}
          >
            ENTRE EM CONTATO
          </button>
        </div>
      )}
    </nav>
  );
}