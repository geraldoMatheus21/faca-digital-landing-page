"use client";

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/autoplay';
import './image-carousel.css';

const defaultItems = [
  {
    id: 1,
    title: 'GUAPI PARQUE DAS ÁGUAS',
    subtitle: 'Parque completo com infraestrutura moderna',
    images: ['/works-images/GPA-1X1-_1_.webp'],
  },
];

export default function ImageCarousel({ reverse, items = defaultItems, variant = 'projeto' }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (images, startIndex = 0) => {
    setCurrentImages(images);
    setCurrentImageIndex(startIndex);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentImages([]);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  const isEmpresa = variant === 'empresa';

  return (
    <>
      <div className="carousel-single-wrapper">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: reverse,
          }}
          speed={3000}
          slidesPerView={1}
          centeredSlides={true}
          loop={false}
          spaceBetween={0}
          className="carousel-single-track"
        >
          {items.map((item) => (
            <SwiperSlide key={item.id} className="carousel-single-slide">
              {isEmpresa ? (
                <div className="card-empresa">
                  <div className="card-empresa-inner">
                    {item.logo ? (
                      <Image
                        src={item.logo}
                        alt={item.name}
                        fill
                        className="card-empresa-logo"
                        sizes="(max-width: 768px) 90vw, 500px"
                      />
                    ) : (
                      <div className="card-empresa-placeholder">Logo</div>
                    )}
                    <h3 className="card-empresa-nome">{item.name}</h3>
                    <p className="card-empresa-desc">{item.description}</p>
                  </div>
                </div>
              ) : (
                <div className="card-single" onClick={() => openModal(item.images, 0)}>
                  <div className="card-single-inner">
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      fill
                      className="card-single-image"
                      sizes="(max-width: 768px) 100vw, 800px"
                      priority
                    />
                    <div className="card-badge">{item.id}</div>
                    <div className="card-overlay">
                      <div className="card-content">
                        <span className="card-label">PROJETO</span>
                        <h3 className="card-title">GUAPI</h3>
                        <h4 className="card-subtitle">PARQUE DAS ÁGUAS</h4>
                        <p className="card-description">{item.subtitle}</p>
                        <span className="card-button">Ver Fotos</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {!isEmpresa && modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X size={32} />
            </button>
            {currentImages.length > 1 && (
              <>
                <button className="modal-prev" onClick={prevImage}>
                  <ChevronLeft size={32} />
                </button>
                <button className="modal-next" onClick={nextImage}>
                  <ChevronRight size={32} />
                </button>
              </>
            )}
            <div className="modal-image-wrapper">
              <Image
                src={currentImages[currentImageIndex]}
                alt={`Imagem ${currentImageIndex + 1}`}
                width={1200}
                height={800}
                className="modal-image"
                priority
              />
            </div>
            {currentImages.length > 1 && (
              <div className="modal-counter">
                {currentImageIndex + 1} / {currentImages.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}