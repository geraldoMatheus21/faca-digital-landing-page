// src/components/works-carousel/index.jsx
"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { useState } from 'react';

// Importe os estilos do Swiper
import 'swiper/css';
import 'swiper/css/autoplay';
import './image-carousel.css';

// A MESMA IMAGEM para todos os slides
const GUAPI_IMAGE = '/works-images/01.jpg';

// Array com a MESMA imagem repetida, mas diferentes títulos/números
const workItems = [
  {
    id: 1,
    title: 'GUAPI PARQUE DAS ÁGUAS',
    subtitle: 'Parque completo com infraestrutura moderna'
  },
  {
    id: 2,
    title: 'GUAPI PARQUE DAS ÁGUAS',
    subtitle: 'Área de lazer e entretenimento familiar'
  },
  {
    id: 3,
    title: 'GUAPI PARQUE DAS ÁGUAS',
    subtitle: 'Piscinas e tobogãs aquáticos'
  },
  {
    id: 4,
    title: 'GUAPI PARQUE DAS ÁGUAS',
    subtitle: 'Restaurante e praça de alimentação'
  },
  {
    id: 5,
    title: 'GUAPI PARQUE DAS ÁGUAS',
    subtitle: 'Espaço para eventos corporativos'
  },
  {
    id: 6,
    title: 'GUAPI PARQUE DAS ÁGUAS',
    subtitle: 'Parque infantil e área verde'
  },
  {
    id: 7,
    title: 'GUAPI PARQUE DAS ÁGUAS',
    subtitle: 'Estacionamento e acessibilidade'
  },
  {
    id: 8,
    title: 'GUAPI PARQUE DAS ÁGUAS',
    subtitle: 'Iluminação especial e segurança'
  }
];

export default function ImageCarousel({ reverse }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <div className="w-full h-fit overflow-hidden py-8">
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
              {/* Substituímos o Link por uma div que contém o card e o botão */}
              <div className="block group">
                <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  {/* A MESMA IMAGEM em todos os slides */}
                  <Image
                    src={GUAPI_IMAGE}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 288px, 320px"
                    priority={item.id <= 2}
                  />
                  
                  {/* Badge número no canto */}
                  <div className="absolute top-4 left-4 w-10 h-10 bg-[#a8d103] text-black font-bold rounded-full flex items-center justify-center text-lg z-10">
                    {item.id}
                  </div>
                  
                  {/* Overlay com título fixo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="mb-2">
                        <span className="text-sm font-medium text-gray-300">PROJETO</span>
                        <h3 className="text-2xl font-bold leading-tight">GUAPI</h3>
                        <h4 className="text-xl font-semibold">PARQUE DAS ÁGUAS</h4>
                      </div>
                      <p className="text-gray-200 text-sm mb-3">{item.subtitle}</p>
                      {/* Botão que abre o modal */}
                      <button
                        onClick={() => openModal(item)}
                        className="inline-block px-4 py-2 bg-[#a8d103] text-black font-semibold rounded-lg text-sm hover:bg-[#97c000] transition-colors"
                      >
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modal */}
      {modalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={closeModal}>
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Botão fechar */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center text-2xl hover:bg-black/70"
            >
              &times;
            </button>
            
            {/* Conteúdo do modal - aqui você pode adaptar para mostrar uma galeria */}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{selectedItem.title}</h2>
              <p className="text-gray-600 mb-4">{selectedItem.subtitle}</p>
              
              {/* Exemplo: imagem ampliada (mesma do slide) */}
              <div className="relative w-full h-96">
                <Image
                  src={GUAPI_IMAGE}
                  alt={selectedItem.title}
                  fill
                  className="object-contain"
                />
              </div>
              
              {/* Aqui você pode adicionar uma galeria de miniaturas ou setas para navegar entre as imagens */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}