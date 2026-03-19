// containers/works/WorksCarousel.jsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  MessageCircle, Youtube, Users, Globe, TrendingUp, Eye,
  Facebook, Instagram, Linkedin, BarChart2, Palette, Code,
  Smartphone, Briefcase, Camera
} from 'lucide-react';
import "./works-carousel.css";

// Dados dos serviços
const serviceCards = [
  // ... (mantido igual)
];

export default function WorksCarousel({ reverse = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const trackRef = useRef(null);

  // Atualiza o número de cards por slide conforme a largura da tela
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
    setCurrentIndex((prevIndex) =>
      prevIndex + cardsToShow >= serviceCards.length ? 0 : prevIndex + cardsToShow
    );
  }, [cardsToShow]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? serviceCards.length - cardsToShow : prevIndex - cardsToShow
    );
  }, [cardsToShow]);

  const goToPage = (pageNumber) => {
    setCurrentIndex((pageNumber - 1) * cardsToShow);
  };

  // Handlers de toque para swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Autoplay
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Calcula os cards visíveis
  const visibleCards = serviceCards.slice(currentIndex, currentIndex + cardsToShow);
  if (visibleCards.length < cardsToShow) {
    const remaining = cardsToShow - visibleCards.length;
    visibleCards.push(...serviceCards.slice(0, remaining));
  }

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="works-carousel-container"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div
        ref={trackRef}
        className={`works-carousel-track ${reverse ? 'flex-row-reverse' : 'flex-row'}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {visibleCards.map((card) => (
          <div key={card.id} className="works-carousel-card-wrapper">
            <div className="works-carousel-card">
              <div className="works-carousel-card-header">
                <div className="works-carousel-card-icon-container">
                  <div className="works-carousel-card-icon">{card.icon}</div>
                </div>
                <h3 className="works-carousel-card-title" title={card.title}>
                  {card.title}
                </h3>
                <p className="works-carousel-card-description" title={card.description}>
                  {card.description}
                </p>
              </div>

              <div className="works-carousel-card-content">
                <h4 className="works-carousel-services-title">Serviços:</h4>
                <ul className="works-carousel-services-list">
                  {card.platforms.map((platform, index) => (
                    <li key={index} className="works-carousel-service-item">
                      <span className="works-carousel-service-icon">{platform.icon}</span>
                      <span title={platform.name}>{platform.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="works-carousel-card-footer">
                <button className="works-carousel-card-button" onClick={scrollToContact}>
                  Saiba Mais
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="works-carousel-controls">
        <button onClick={prevSlide} className="works-carousel-nav-button" aria-label="Página anterior">
          <ChevronLeft size={24} />
        </button>

        <div className="works-carousel-indicator">
          <span className="works-carousel-page-current">{currentPage}</span>
          <span className="works-carousel-page-separator">/</span>
          <span className="works-carousel-page-total">{totalPages}</span>
        </div>

        <button onClick={nextSlide} className="works-carousel-nav-button" aria-label="Próxima página">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="works-carousel-dots">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index + 1)}
            className={`works-carousel-dot ${index + 1 === currentPage ? 'works-carousel-dot-active' : 'works-carousel-dot-inactive'}`}
            aria-label={`Ir para a página ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}