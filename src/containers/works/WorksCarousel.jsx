// containers/works/WorksCarousel.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./works-carousel.css";

const serviceCards = [
  {
    id: 1,
    category: "Gerenciamento de Mídias Sociais",
    title: "Presença Digital Consistente",
    description: "Cuidamos da sua presença nas redes sociais em todas as principais plataformas, garantindo conteúdo consistente e atrativo.",
    services: ["Facebook", "Instagram", "YouTube"],
    icon: "📱"
  },
  {
    id: 2,
    category: "Gerenciamento de Mídias Sociais",
    title: "Estratégias Personalizadas",
    description: "Desenvolvemos estratégias específicas para cada plataforma, maximizando o engajamento e conversões.",
    services: ["Twitter/X", "LinkedIn", "TikTok"],
    icon: "🎯"
  },
  {
    id: 3,
    category: "Criação de Conteúdo",
    title: "Conteúdo de Alta Qualidade",
    description: "Produzimos conteúdos personalizados, de qualidade e que conversam com o seu público-alvo.",
    services: ["Imagens", "Vídeos", "Blogs"],
    icon: "🎨"
  },
  {
    id: 4,
    category: "Criação de Conteúdo",
    title: "Produção Criativa",
    description: "Equipe especializada em criar materiais visuais e textuais que representam a essência da sua marca.",
    services: ["Infográficos", "Podcasts", "E-books"],
    icon: "✨"
  },
  {
    id: 5,
    category: "Marketing com Influencers",
    title: "Parcerias Estratégicas",
    description: "Conectamos a sua marca com influencers relevantes para expandir seu alcance e construir credibilidade.",
    services: ["Divulgação", "Campanhas", "Monitoramento"],
    icon: "🤝"
  },
  {
    id: 6,
    category: "Marketing com Influencers",
    title: "Gestão de Relacionamentos",
    description: "Gerenciamos todo o processo de parcerias, desde a seleção até a análise de resultados.",
    services: ["Seleção", "Negociação", "Relatórios"],
    icon: "📊"
  }
];

export default function WorksCarousel({ reverse = false }) {
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

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex + cardsToShow >= serviceCards.length ? 0 : prevIndex + 1
    );
  }, [cardsToShow]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? serviceCards.length - cardsToShow : prevIndex - 1
    );
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const visibleCards = serviceCards.slice(currentIndex, currentIndex + cardsToShow);
  
  if (visibleCards.length < cardsToShow) {
    const remaining = cardsToShow - visibleCards.length;
    visibleCards.push(...serviceCards.slice(0, remaining));
  }

  const totalDots = Math.ceil(serviceCards.length / cardsToShow);
  const activeDot = Math.floor(currentIndex / cardsToShow);

  return (
    <div 
      className="works-carousel-container"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div 
        className={`works-carousel-track ${reverse ? 'flex-row-reverse' : 'flex-row'}`}
      >
        {visibleCards.map((card) => (
          <div 
            key={card.id} 
            className="works-carousel-card-wrapper"
          >
            <div className="works-carousel-card">
              <div className="works-carousel-card-header">
                <div className="works-carousel-card-icon-container">
                  <span className="works-carousel-card-icon">{card.icon}</span>
                  <span className="works-carousel-card-category">
                    {card.category.split(' ')[0]}
                  </span>
                </div>
                <h3 className="works-carousel-card-title">
                  {card.title}
                </h3>
                <p className="works-carousel-card-subtitle">
                  {card.category}
                </p>
              </div>
              
              <div className="works-carousel-card-content">
                <p className="works-carousel-card-description">
                  {card.description}
                </p>
                <div className="works-carousel-services">
                  <h4 className="works-carousel-services-title">
                    Serviços incluídos:
                  </h4>
                  <ul className="works-carousel-services-list">
                    {card.services.map((service, index) => (
                      <li key={index} className="works-carousel-service-item">
                        <ChevronRight className="works-carousel-service-icon" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="works-carousel-controls">
        <button
          onClick={prevSlide}
          className="works-carousel-nav-button"
          aria-label="Slide anterior"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="works-carousel-dots">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * cardsToShow)}
              className={`works-carousel-dot ${
                index === activeDot 
                  ? 'works-carousel-dot-active' 
                  : 'works-carousel-dot-inactive'
              }`}
              aria-label={`Ir para o grupo ${index + 1}`}
            />
          ))}
        </div>
        
        <button
          onClick={nextSlide}
          className="works-carousel-nav-button"
          aria-label="Próximo slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="works-carousel-indicator">
        Card {Math.min(currentIndex + 1, serviceCards.length)} de {serviceCards.length}
      </div>
    </div>
  );
}