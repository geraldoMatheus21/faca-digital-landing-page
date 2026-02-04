// src/containers/works/index.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MessageCircle, Youtube, Users, Globe, TrendingUp, Eye, Facebook, Instagram, Linkedin, BarChart2, Palette, Code, Smartphone, Briefcase, Camera } from 'lucide-react';
import Link from "next/link";
import ImageCarousel from "@/components/works-carousel";
import "./works-carousel.css";
import "./index.css";

// Dados dos serviços
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

// Componente do Carrossel de Serviços
function ServicesCarousel({ reverse = false }) {
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
      <div className={`works-carousel-track ${reverse ? 'flex-row-reverse' : 'flex-row'}`}>
        {visibleCards.map((card) => (
          <div key={card.id} className="works-carousel-card-wrapper">
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
        <button onClick={prevSlide} className="works-carousel-nav-button">
          <ChevronLeft size={24} />
        </button>
        
        <div className="works-carousel-dots">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * cardsToShow)}
              className={`works-carousel-dot ${index === activeDot ? 'works-carousel-dot-active' : 'works-carousel-dot-inactive'}`}
            />
          ))}
        </div>
        
        <button onClick={nextSlide} className="works-carousel-nav-button">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="works-carousel-indicator">
        <span className="works-carousel-page-current">{Math.min(currentIndex + 1, serviceCards.length)}</span>
        <span className="works-carousel-page-separator">/</span>
        <span className="works-carousel-page-total">{serviceCards.length}</span>
      </div>
    </div>
  );
}

// Componente principal da página
export default function Works() {
  return (
    <main id="works" className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      {/* SEÇÃO SERVIÇOS */}
      <div className="mb-20">
        <div className="text-center mb-12 text-white">
          <h1 className="uppercase text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            nossos serviços
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Oferecemos uma variedade de serviços que vão ajudar a sua marca a se sobressair no meio digital.
          </p>
        </div>

        <ServicesCarousel reverse={false} />
      </div>

      {/* SEÇÃO TRABALHOS */}
      <div className="mb-20">
        <div className="text-center mb-12 text-white">
          <h1 className="uppercase text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            nossos trabalhos
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Conheça nosso trabalho no <strong>GUAPI PARQUE DAS ÁGUAS</strong>
          </p>
        </div>
        
        <ImageCarousel reverse={false} />
      </div>

      {/* TEXTO EXATAMENTE COMO NA IMAGEM - CENTRALIZADO */}
      <div className="text-center mb-20 text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Transformando Ideias em Realidade Digital
        </h2>
        <p className="text-lg md:text-xl max-w-5xl mx-auto mb-12">
          Na Faça Digital, cada projeto é uma oportunidade de inovar e superar expectativas. Nosso portfólio diversificado reflete nossa paixão por criar soluções digitais impactantes que impulsionam o sucesso de nossos clientes.
        </p>
        </div>
      {/* PROJETOS EM DESTAQUE */}
      <div className="mb-20">
        <div className="text-center mb-8 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Projetos em Destaque
          </h2>
        </div>
        <ImageCarousel reverse={true} />
      </div>

      {/* CTA FINAL SEM FUNDO BRANCO */}
<div className="text-center mt-20">
  {/* TEXTO EM BRANCO CENTRALIZADO */}
  <div className="mb-10">
    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
      Quer um projeto como este?
    </h3>
    <p className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-8">
      Entre em contato e vamos criar a solução digital perfeita.
    </p>
  </div>

  {/* BOTÃO FALE CONOSCO */}
  <div className="mb-10">
    <Link 
      href="/contato" 
      className="inline-block px-8 py-3 bg-[#a8d103] text-black font-bold text-lg rounded-full hover:bg-[#97c000] transition-colors"
    >
      Fale Conosco
    </Link>
  </div>

  {/* REDES SOCIAIS ALINHADAS EMBAIXO DO TEXTO */}
  <div className="mt-8">
    <div className="flex justify-center gap-6">
      {/* Facebook */}
      <a 
        href="https://facebook.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
        aria-label="Facebook"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>

      {/* Instagram */}
      <a 
        href="https://instagram.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
        aria-label="Instagram"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
        </svg>
      </a>
      {/* WhatsApp */}
      <a 
        href="https://wa.me/5511999999999" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
        aria-label="WhatsApp"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.897 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411"/>
        </svg>
      </a>
    </div>
  </div>
</div>
    </main>
  );
}