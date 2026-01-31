"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.css"; 

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    
    if (menuOpen) toggleMenu();
    
    const navbarHeight = 80; // Ajuste conforme necessário
    const elementPosition = element.offsetTop - navbarHeight;
    
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth"
    });
  };

  // Combinação de classes condicionais
  const navClass = `${styles.navDesktop} ${show ? styles.navVisible : styles.navHidden}`;

  return (
    <nav>
      {/* NAVBAR DESKTOP */}
      <div className={navClass}>
        
        {/* LOGO */
        }
        <div className={styles.logo}>
          <img src="" alt="logo" />
        </div>
        
        {/* CONTAINER DOS LINKS */}
        <div className={styles.linksContainer}>
          <button 
            onClick={() => scrollToSection('works')}
            className={styles.navButton}
          >
            NOSSOS SERVIÇOS
          </button>
          <button 
            onClick={() => scrollToSection('works')}
            className={styles.navButton}
          >
            TRABALHOS REALIZADOS
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className={styles.navButton}
          >
            SOBRE NÓS
          </button>
        </div>
        
        {/* BOTÃO CONTATO */}
        <button 
          onClick={() => scrollToSection('contact')}
          className={styles.contactButton}
        >
          ENTRE EM CONTATO
        </button>
        
        {/* BOTÃO MENU MOBILE */}
        <button 
          onClick={toggleMenu}
          className={styles.menuToggle}
        >
          {menuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* MENU MOBILE */}
      {menuOpen && (
        <div className={styles.mobileMenuOverlay}>
          <button 
            onClick={() => scrollToSection('works')}
            className={styles.mobileMenuButton}
          >
            NOSSOS SERVIÇOS
          </button>
          <button 
            onClick={() => scrollToSection('works')}
            className={styles.mobileMenuButton}
          >
            TRABALHOS REALIZADOS
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className={styles.mobileMenuButton}
          >
            SOBRE NÓS
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className={styles.mobileMenuButton}
          >
            ENTRE EM CONTATO
          </button>
        </div>
      )}
    </nav>
  );
}