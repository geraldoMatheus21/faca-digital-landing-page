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
  const [cardsToShow, setCardsToShow] = useState(3);

  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  // Calcula o total de páginas
  const totalPages = Math.ceil(teamMembers.length / cardsToShow);
  
  // Calcula a página atual (1/2, 2/2)
  const currentPage = Math.floor(currentIndex / cardsToShow) + 1;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex + cardsToShow >= teamMembers.length) {
        // Se estiver na última página, volta para a primeira
        return 0;
      } else {
        // Vai para a próxima página
        return prevIndex + cardsToShow;
      }
    });
  }, [cardsToShow]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        // Se estiver na primeira página, vai para a última
        return teamMembers.length - cardsToShow;
      } else {
        // Volta para a página anterior
        return prevIndex - cardsToShow;
      }
    });
  };

  const goToPage = (pageNumber) => {
    // pageNumber começa em 1 (1/2, 2/2)
    const newIndex = (pageNumber - 1) * cardsToShow;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const visibleCards = teamMembers.slice(currentIndex, currentIndex + cardsToShow);
  
  if (visibleCards.length < cardsToShow) {
    const remaining = cardsToShow - visibleCards.length;
    visibleCards.push(...teamMembers.slice(0, remaining));
  }

  return (
    <div 
      className="team-carousel-container"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div 
        className={`team-carousel-track ${reverse ? 'flex-row-reverse' : 'flex-row'}`}
      >
        {visibleCards.map((member) => (
          <div 
            key={member.id} 
            className="team-carousel-card-wrapper"
          >
            <div className="team-carousel-card">
              <div className="team-carousel-image-container">
                <Image
                  src={member.src}
                  alt={member.name}
                  className="team-carousel-image"
                  width={400}
                  height={300}
                  priority={false}
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
                  "{member.quote}"
                </blockquote>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="team-carousel-controls">
        <button
          onClick={prevSlide}
          className="team-carousel-nav-button"
          aria-label="Página anterior"
        >
          <ChevronLeft size={24} />
        </button>
        
        {/* Indicador de página 1/2 ou 2/2 */}
        <div className="team-carousel-indicator">
          <span className="team-carousel-page-current">{currentPage}</span>
          <span className="team-carousel-page-separator">/</span>
          <span className="team-carousel-page-total">{totalPages}</span>
        </div>
        
        <button
          onClick={nextSlide}
          className="team-carousel-nav-button"
          aria-label="Próxima página"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Pontos de navegação */}
      <div className="team-carousel-dots">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index + 1)}
            className={`team-carousel-dot ${
              index + 1 === currentPage 
                ? 'team-carousel-dot-active' 
                : 'team-carousel-dot-inactive'
            }`}
            aria-label={`Ir para a página ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}