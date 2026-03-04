"use client";

import { useState } from "react";
import Image from "next/image";
import Logo from "../../../public/logo2.png";
import {
  FaSquareInstagram,
  FaSquareFacebook,
  FaSquareWhatsapp,
} from "react-icons/fa6";
import Link from "next/link";
import { FlipWords } from "@/components/ui/flip-words";
import styles from "./Home.module.css";

export default function Home() {
  const [index, setIndex] = useState(0);
  const words = [
    "digital",
    "identidade visual",
    "redes sociais",
    "consultoria",
    "sites",
  ];

  // FUNÇÃO CORRIGIDA - AGORA RECEBE PARÂMETRO
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <main id="home" className={styles.container}>
      <div className={styles.content}>
        {/* PRIMEIRA SEÇÃO: Texto + Botão */}
        <div className={styles.textContainer}>
          <h2 className={styles.unifiedTitle}>
            Mais que <span className={styles.accent}>Presença</span> no digital, Gere <span className={styles.accent}>Impacto</span>
          </h2>

          <p className={styles.description}>
            Marcas que se conectam de verdade não disputam atenção, conquistam espaço.
          </p>
          
          {/* BOTÃO CORRIGIDO - AGORA FUNCIONA! */}
          <button
            className={styles.contactButton}
            onClick={() => scrollToSection('servicos')}
          >
            Clique e saiba mais 
          </button>
        </div>

        {/* RESTO DO CÓDIGO (igual) */}
        <div className={styles.imageContainer}>
          <div className={styles.logoWrapper}>
            <Image
              src={Logo}
              alt="Faça Digital"
              className={styles.logoImage}
            />
          </div>
          <div className={styles.textWithFlip}>
            <div className={styles.flipWrapper}>
              <span className={styles.staticWord}>faça</span>
              <FlipWords
                words={words}
                className={styles.flipWords}
              />
            </div>
          </div>
        </div>
      </div>

      {/* REDES SOCIAIS */}
      <div className={styles.socialContainer}>
        <Link href={"https://www.instagram.com/facadigital/"} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
          <FaSquareInstagram className={styles.socialIcon} />
        </Link>
        <Link href={"https://wa.me/5521987691234"} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
          <FaSquareWhatsapp className={styles.socialIcon} />
        </Link>
      </div>
    </main>
  );
}