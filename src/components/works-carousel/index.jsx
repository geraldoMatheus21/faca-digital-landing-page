"use client";

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Importe os estilos do Swiper
import 'swiper/css';
import 'swiper/css/autoplay';
import './image-carousel.css';

const GUAPI_IMAGE = '/works-images/01.jpg';

const workItems = [
  {
    id: 1,
    title: 'GUAPI PARQUE DAS ÁGUAS',
    subtitle: 'Parque completo com infraestrutura moderna',
    images: [
      '/works-images/01.jpg',
      '/works-images/02.jpg',
      '/works-images/03.jpg',
      '/works-images/04.jpg',
    ]
  },
  {
    id: 2,
    title: 'GUAPI PARQUE DAS ÁGUAS',
    subtitle: 'Área de lazer e entretenimento familiar',
    images: [
      '/works-images/05.jpg',
      '/works-images/06.jpg',
      '/works-images/07.jpg',
    ]
  },
  // ... outros itens (mantenha iguais)
];

export default function ImageCarousel({ reverse }) {
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
    setCurrentImageIndex((prev) => 
      prev === currentImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? currentImages.length - 1 : prev - 1
    );
  };

  return (
    <>
      <div className="w-full overflow-hidden py-8">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ 
            delay: 0, 
            disableOnInteraction: false, 
            pauseOnMouseEnter: true, 
            reverseDirection: reverse 
          }}
          speed={3000}
          loop={true}
          slidesPerView="auto"
          spaceBetween={20}
          className="flex items-center"
        >
          {workItems.map((item) => (
            <SwiperSlide key={item.id} className="!w-auto">
              <div 
                className="block group cursor-pointer"
                onClick={() => openModal(item.images, 0)}
              >
                <div className="image-carousel-card-container relative w-72 h-72 md:w-80 md:h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-200">
                  <Image
                    src={GUAPI_IMAGE}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 288px, 320px"
                    priority={item.id <= 2}
                  />
                  
                  <div className="absolute top-4 left-4 w-10 h-10 bg-[#a8d103] text-black font-bold rounded-full flex items-center justify-center text-lg z-10">
                    {item.id}
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="mb-2">
                        <span className="text-sm font-medium text-gray-300">PROJETO</span>
                        <h3 className="text-2xl font-bold leading-tight">GUAPI</h3>
                        <h4 className="text-xl font-semibold">PARQUE DAS ÁGUAS</h4>
                      </div>
                      <p className="text-gray-200 text-sm mb-3">{item.subtitle}</p>
                      <span className="inline-block px-4 py-2 bg-[#a8d103] text-black font-semibold rounded-lg text-sm hover:bg-[#97c000] transition-colors">
                        Ver Fotos
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {modalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-5xl max-h-[90vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
            >
              <X size={32} />
            </button>

            {currentImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition z-10"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition z-10"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center">
              <Image
                src={currentImages[currentImageIndex]}
                alt={`Imagem ${currentImageIndex + 1}`}
                width={1200}
                height={800}
                className="object-contain max-h-full max-w-full"
                priority
              />
            </div>

            {currentImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {currentImages.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}