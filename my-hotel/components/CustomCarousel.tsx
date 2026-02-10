"use client";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; 
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import styles from "./PoolSection.module.css";

interface CarouselProps {
  images: string[];
}

export default function CustomCarousel({ images }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const swiperRef = useRef<SwiperType | null>(null); 

  return (
    <div className={styles.carouselWrapper}>
      <Swiper
        key={images.length} 
        modules={[Navigation]} 
        spaceBetween={40}
        slidesPerView={1.2}
        loop={true}
        autoplay={false}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setCurrentIndex(swiper.realIndex + 1);
        }}
        breakpoints={{
          768: { slidesPerView: 2.2, spaceBetween: 70 },
        }}
        className={styles.mySwiper}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className={styles.imageContainer}>
              <img src={img} alt={`Slide ${index}`} className={styles.image} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.controlsContainer}>
        <span className={styles.counter}>
          {currentIndex} / {images.length}
        </span>
        <div className={styles.navigationBtns}>
          <button 
          aria-label="prev"
            type="button"
            className={styles.prevBtn} 
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
          aria-label="next"
            type="button"
            className={styles.nextBtn} 
            onClick={() => swiperRef.current?.slideNext()}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}