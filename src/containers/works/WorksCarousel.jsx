// containers/works/WorksCarousel.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MessageCircle, Youtube, Users, Globe, TrendingUp, Eye, Facebook, Instagram, Linkedin, BarChart2, Palette, Code, Smartphone, Briefcase, Camera } from 'lucide-react';
import Link from "next/link";
import "./works-carousel.css";

// Dados dos serviços - Textos ajustados para caber nos cards
const serviceCards = [
  {
    id: 1,
    title: "Gerenciamento de Mídias Sociais",
    description: "Cuidamos da sua presença nas redes sociais em todas as principais plataformas, garantindo conteúdo consistente e atrativo.",
    icon: <MessageCircle className="h-6 w-6" />,
    platforms: [
      { name: "Facebook", icon: <Facebook className="h-5 w-5" /> },
      { name: "Instagram", icon: <Instagram className="h-5 w-5" /> },
      { name: "YouTube", icon: <Youtube className="h-5 w-5" /> },
    ]
  },
  {
    id: 2,
    title: "Criação de Conteúdo",
    description: "Nós produzimos conteúdos personalizados, de qualidade e que conversam com o seu público.",
    icon: <Youtube className="h-6 w-6" />,
    platforms: [
      { name: "Imagens", icon: <Instagram className="h-5 w-5" /> },
      { name: "Vídeos", icon: <Youtube className="h-5 w-5" /> },
      { name: "Blogs", icon: <Linkedin className="h-5 w-5" /> },
    ]
  },
  {
    id: 3,
    title: "Marketing com Influencers",
    description: "Conectamos a sua marca com influencers relevantes para expandir seu alcance e construir credibilidade.",
    icon: <Users className="h-6 w-6" />,
    platforms: [
      { name: "Divulgação com Influencer", icon: <MessageCircle className="h-5 w-5" /> },
      { name: "Gerenciamento de Campanha", icon: <TrendingUp className="h-5 w-5" /> },
      { name: "Monitoramento de Performance", icon: <BarChart2 className="h-5 w-5" /> },
    ]
  },
  {
    id: 4,
    title: "Criação de Sites",
    description: "Nós projetamos e desenvolvemos sites responsivos e de alta conversão, complementando sua presença nas redes sociais.",
    icon: <Globe className="h-6 w-6" />,
    platforms: [
      { name: "Design Customizado", icon: <Palette className="h-5 w-5" /> },
      { name: "Desenvolvimento Responsivo", icon: <Code className="h-5 w-5" /> },
      { name: "SEO Otimizado", icon: <TrendingUp className="h-5 w-5" /> },
    ]
  },
  {
    id: 5,
    title: "Consultoria Digital",
    description: "Receba orientações e estratégias que vão ajudar a você e a sua empresa no cenário digital.",
    icon: <TrendingUp className="h-6 w-6" />,
    platforms: [
      { name: "Estratégias de Crescimento", icon: <TrendingUp className="h-5 w-5" /> },
      { name: "Integração de Tecnologias", icon: <Globe className="h-5 w-5" /> },
      { name: "Transformação Digital", icon: <Smartphone className="h-5 w-5" /> },
    ]
  },
  {
    id: 6,
    title: "Identidade Visual",
    description: "Criamos uma identidade visual que se conecta com a sua marca, garantindo uma presença forte e memorável.",
    icon: <Eye className="h-6 w-6" />,
    platforms: [
      { name: "Design de Logotipo", icon: <Palette className="h-5 w-5" /> },
      { name: "Diretrizes de Marca", icon: <Briefcase className="h-5 w-5" /> },
      { name: "Criação de Ativos Visuais", icon: <Camera className="h-5 w-5" /> },
    ]
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

  const totalPages = Math.ceil(serviceCards.length / cardsToShow);
  const currentPage = Math.floor(currentIndex / cardsToShow) + 1;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex + cardsToShow >= serviceCards.length) {
        return 0;
      } else {
        return prevIndex + cardsToShow;
      }
    });
  }, [cardsToShow]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return serviceCards.length - cardsToShow;
      } else {
        return prevIndex - cardsToShow;
      }
    });
  };

  const goToPage = (pageNumber) => {
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

  const visibleCards = serviceCards.slice(currentIndex, currentIndex + cardsToShow);
  
  if (visibleCards.length < cardsToShow) {
    const remaining = cardsToShow - visibleCards.length;
    visibleCards.push(...serviceCards.slice(0, remaining));
  }

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
                  <div className="works-carousel-card-icon">
                    {card.icon}
                  </div>
                </div>
                <h3 className="works-carousel-card-title" title={card.title}>
                  {card.title}
                </h3>
                <p className="works-carousel-card-description" title={card.description}>
                  {card.description}
                </p>
              </div>
              
              <div className="works-carousel-card-content">
                <h4 className="works-carousel-services-title">
                  Serviços:
                </h4>
                <ul className="works-carousel-services-list">
                  {card.platforms.map((platform, index) => (
                    <li key={index} className="works-carousel-service-item">
                      <span className="works-carousel-service-icon">
                        {platform.icon}
                      </span>
                      <span title={platform.name}>{platform.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="works-carousel-card-footer">
                <Link href="/em-construcao" className="works-carousel-card-button">
                  Saiba Mais
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="works-carousel-controls">
        <button
          onClick={prevSlide}
          className="works-carousel-nav-button"
          aria-label="Página anterior"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="works-carousel-indicator">
          <span className="works-carousel-page-current">{currentPage}</span>
          <span className="works-carousel-page-separator">/</span>
          <span className="works-carousel-page-total">{totalPages}</span>
        </div>
        
        <button
          onClick={nextSlide}
          className="works-carousel-nav-button"
          aria-label="Próxima página"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="works-carousel-dots">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index + 1)}
            className={`works-carousel-dot ${
              index + 1 === currentPage 
                ? 'works-carousel-dot-active' 
                : 'works-carousel-dot-inactive'
            }`}
            aria-label={`Ir para a página ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}