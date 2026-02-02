"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import Link from 'next/link';

export default function ImageCarousel({ images, reverse }) {
  return (
    <div className="w-full h-fit overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true, reverseDirection: reverse }}
        speed={3000}
        loop={true}
        slidesPerView="auto"
        spaceBetween={20}
        className="flex items-center"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} style={{ width: 'auto', position: 'relative' }}>
            <Link href={`/em-construcao`}>
              {/* Imagem */}
              <Image
                src={src}
                alt={`Trabalho ${index + 1}`}
                className="w-64 h-64 object-cover rounded-lg"
                width={256}  // ← 64 * 4 = 256 (w-64 = 16rem = 256px)
                height={256} // ← Mesmo cálculo
                sizes="(max-width: 768px) 100vw, 256px" // ← Opcional, mas recomendado
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-all duration-300">
                <span className="text-lg font-bold uppercase">{`Trabalho ${index + 1}`}</span>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
