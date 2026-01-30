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

  const scrollToSection = () => {
    let element = document.getElementById("contact");
    if (!element) return;
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  return (
    <main id="home" className={styles.container}>
      <div className={styles.content}>
        {/* PRIMEIRA SEÇÃO: Texto + Botão */}
        <div className={styles.textContainer}>
          <h2 className={styles.title}>
            voce destacado
          </h2>
          <h2 className={styles.titleAccent}>
            no mundo digital
          </h2>
          <p className={styles.description}>
            Fazemos a sua marca ou produto se sobressair, atraindo ainda mais
            cliente para o seu negócio.
          </p>
          <button
            className={styles.contactButton}
            onClick={scrollToSection}
          >
            entre em contato
          </button>
        </div>

        {/* SEGUNDA SEÇÃO: Logo + "Faça [Flip Words]" */}
        <div className={styles.imageContainer}>
          <Image
            src={Logo}
            alt="Faça Digital"
            className={styles.logoImage}
          />
          <div className={styles.textWithFlip}>
            <h1 className={styles.mainTitle}>
              faça
            </h1>
            <FlipWords
              words={words}
              className={styles.flipWords}
            />
          </div>
        </div>
      </div>

      {/* TERCEIRA SEÇÃO: Redes Sociais */}
      <div className={styles.socialContainer}>
        <Link
          href={"#"}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          <FaSquareInstagram className={styles.socialIcon} />
        </Link>
        <Link
          href={"#"}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          <FaSquareFacebook className={styles.socialIcon} />
        </Link>
        <Link
          href={"#"}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          <FaSquareWhatsapp className={styles.socialIcon} />
        </Link>
      </div>
    </main>
  );
}