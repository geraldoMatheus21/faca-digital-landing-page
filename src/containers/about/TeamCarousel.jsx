// containers/about/TeamCarousel.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import "./team-carousel.css";

// Dados da equipe
const teamMembers = [
  {
    id: 1,
    quote: "Criar designs é mais do que estética; é traduzir ideias em impactos visuais que impulsionam resultados.",
    name: "Roberto Santos",
    designation: "CEO & Designer Gráfico",
    src: "/about-images/person01.jpg",
  },
  {
    id: 2,
    quote: "A publicidade eficaz é aquela que transforma marcas em histórias que as pessoas querem compartilhar.",
    name: "Caroline Oliveira",
    designation: "Publicitária",
    src: "/about-images/person02.jpg",
  },
  {
    id: 3,
    quote: "Construir sites é como criar pontes: conectamos ideias ao mundo digital com funcionalidade e inovação.",
    name: "Frederico Bettecher",
    designation: "Desenvolvedor Web",
    src: "/about-images/person03.jpg",
  },
  {
    id: 4,
    quote: "A ilustração não é apenas desenhar; é dar vida a conceitos e emoções por meio de traços e cores.",
    name: "Byanca Ribeiro",
    designation: "Designer Ilustradora",
    src: "/about-images/person04.png",
  },
  {
    id: 5,
    quote: "Uma marca forte não se constrói apenas com um logotipo, mas com identidade e significado que ressoam com o público.",
    name: "Fernando Zani",
    designation: "Designer de Marcas",
    src: "/about-images/person05.png",
  },
];

export default function TeamCarousel({ reverse = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState('next');

  const totalCards = teamMembers.length;

  const nextSlide = useCallback(() => {
    setDirection('next');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCards);
  }, [totalCards]);

  const prevSlide = useCallback(() => {
    setDirection('prev');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalCards) % totalCards);
  }, [totalCards]);

  const goToSlide = (index) => {
    if (index > currentIndex) {
      setDirection('next');
    } else {
      setDirection('prev');
    }
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Função para calcular a posição e estilo de cada card
  const getCardStyle = (index) => {
    const diff = index - currentIndex;
    const totalCards = teamMembers.length;
    
    // Normaliza a diferença para estar entre -totalCards/2 e totalCards/2
    let normalizedDiff = diff;
    if (diff > totalCards / 2) {
      normalizedDiff = diff - totalCards;
    } else if (diff < -totalCards / 2) {
      normalizedDiff = diff + totalCards;
    }

    const isActive = index === currentIndex;
    const isPrev = normalizedDiff === -1;
    const isNext = normalizedDiff === 1;
    const isHidden = Math.abs(normalizedDiff) > 1;

    // Estilos base
    let transform = '';
    let opacity = 0;
    let zIndex = 0;
    let pointerEvents = 'none';

    if (isActive) {
      transform = 'translateX(0) translateZ(0) rotateY(0deg) scale(1)';
      opacity = 1;
      zIndex = 3;
      pointerEvents = 'auto';
    } else if (isPrev) {
      transform = direction === 'prev' 
        ? 'translateX(-30%) translateZ(-100px) rotateY(12deg) scale(0.92)'
        : 'translateX(-25%) translateZ(-80px) rotateY(10deg) scale(0.94)';
      opacity = 0.4;
      zIndex = 2;
    } else if (isNext) {
      transform = direction === 'next'
        ? 'translateX(30%) translateZ(-100px) rotateY(-12deg) scale(0.92)'
        : 'translateX(25%) translateZ(-80px) rotateY(-10deg) scale(0.94)';
      opacity = 0.4;
      zIndex = 2;
    } else if (isHidden) {
      transform = normalizedDiff > 0
        ? 'translateX(40%) translateZ(-150px) rotateY(-20deg) scale(0.85)'
        : 'translateX(-40%) translateZ(-150px) rotateY(20deg) scale(0.85)';
      opacity = 0;
      zIndex = 1;
    }

    return {
      transform,
      opacity,
      zIndex,
      pointerEvents,
    };
  };

  return (
    <div 
      className="team-carousel-container-single"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="team-carousel-stage">
        {teamMembers.map((member, index) => {
          const style = getCardStyle(index);
          
          return (
            <div
              key={member.id}
              className="team-carousel-card-single"
              style={{
                transform: style.transform,
                opacity: style.opacity,
                zIndex: style.zIndex,
                pointerEvents: style.pointerEvents,
              }}
            >
              <div className="team-carousel-card">
                <div className="team-carousel-image-container">
                  <Image
                    src={member.src}
                    alt={member.name}
                    className="team-carousel-image"
                    width={400}
                    height={300}
                    priority={index === 0}
                  />
                </div>
                
                <div className="team-carousel-content">
                  <h3 className="team-carousel-name" title={member.name}>
                    {member.name}
                  </h3>
                  <p className="team-carousel-designation">
                    {member.designation}
                  </p>
                  <blockquote className="team-carousel-quote" title={member.quote}>
                    {member.quote}
                  </blockquote>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="team-carousel-controls">
        <button
          onClick={prevSlide}
          className="team-carousel-nav-button"
          aria-label="Card anterior"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="team-carousel-indicator">
          <span className="team-carousel-page-current">{currentIndex + 1}</span>
          <span className="team-carousel-page-separator">/</span>
          <span className="team-carousel-page-total">{totalCards}</span>
        </div>
        
        <button
          onClick={nextSlide}
          className="team-carousel-nav-button"
          aria-label="Próximo card"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="team-carousel-dots">
        {teamMembers.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`team-carousel-dot ${
              index === currentIndex 
                ? 'team-carousel-dot-active' 
                : 'team-carousel-dot-inactive'
            }`}
            aria-label={`Ir para o card ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}