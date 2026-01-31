// containers/works/index.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MessageCircle, Youtube, Users, Globe, TrendingUp, Eye, Facebook, Instagram, Linkedin, BarChart2, Palette, Code, Smartphone, Briefcase, Camera } from 'lucide-react';
import Link from "next/link";
import "./works-carousel.css";
import "./index.css";

// Dados dos serviços - EXATAMENTE como no seu arquivo services/index.jsx
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

// Componente do Carrossel
function WorksCarousel({ reverse = false }) {
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
                  <div className="works-carousel-card-icon">
                    {card.icon}
                  </div>
                </div>
                <h3 className="works-carousel-card-title">
                  {card.title}
                </h3>
                <p className="works-carousel-card-description">
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
                      <span>{platform.name}</span>
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

// Componente principal da página Works - APENAS COM O CARROSSEL
export default function Works() {
  return (
    <main id="works" className="works-container">
      <div className="works-header">
        <h1 className="works-title">
          nossos serviços
        </h1>
        <p className="works-subtitle">
          Oferecemos uma variedade de serviços que vão ajudar a sua marca a se sobressair no meio digital.
        </p>
      </div>

      {/* APENAS O CARROSSEL - não tem cards estáticos duplicados */}
      <WorksCarousel reverse={false} />
    </main>
  );
}