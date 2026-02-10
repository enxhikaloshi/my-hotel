'use client';
import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from './page.module.css';

interface SlideData {
  src: string;
  text: string;
  title: string;
  description: string;
  date: string;
  link: string;
}

const slides: SlideData[] = [
  { src: "/hotel_photo10.png", text: "from €1,477.00 per person", title:"AT Advent", description:"7 nights with 3/4 gourmet board", date:"05/12-21/12/2025", link:"/details" },
  { src: "/hotel_photo11.png", text: "from €1,477.00 per person", title:"AT Sauna Week", description:"7 nights with 3/4 gourmet board", date:"07/12-19/12/2025", link:"/details" },
  { src: "/hotel_photo12.png", text: "from €2,072.00 per person", title:"AT New Year's Eve", description:"7 nights with 3/4 gourmet board", date:"21/12-06/01/2026", link:"/details" },
  { src: "/hotel_photo9.png", text: "from €1,477.00 per person", title:"AT Winter", description:"7 nights with 3/4 gourmet board", date:"06/01-01/02/2026", link:"/details" },
];

export default function HotelCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  const prevSlide = () => swiperRef.current?.slidePrev();
  const nextSlide = () => swiperRef.current?.slideNext();

  return (
    <div className={styles.carouselWrapper}>
      <Swiper
    modules={[Navigation]}
    onSwiper={(swiper) => (swiperRef.current = swiper)}
    onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
    spaceBetween={10}
    slidesPerView={2.2}
    slidesPerGroup={1}
    loop={false}
    style={{ paddingLeft: '160px', paddingRight: '0', position: 'relative', paddingBottom: '80px' }} // <- shtuar padding-bottom
  >
    {slides.map((slide, index) => (
      <SwiperSlide key={index} className={styles.slide}>
        <div className={styles.imageWrapper}>
          <img src={slide.src} alt={slide.title} className={styles.carouselImage}/>
          <div className={styles.textOverlay}>{slide.text}</div>
        </div>

        <div className={styles.slideDetails}>
          <h3 className={styles.titleText}>{slide.title}</h3>
          <p className={styles.descriptionText}>{slide.description}</p>
          <p className={styles.dateAT}>{slide.date}</p>
          <a href={slide.link} className={styles.showDetails}>
            Show Details <span className={styles.arrow}>&rarr;</span>
          </a>
        </div>
      </SwiperSlide>
    ))}

    {/* Counter + shigjetat */}
    <div className={styles.customNavWrapper}>
      <span className={styles.customCounter}>
        {currentIndex + 1}/3
        </span>

      <button className={styles.customArrow} onClick={prevSlide} aria-label="Previous slide">
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path d="M15 6l-6 6 6 6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <button className={styles.customArrow} onClick={nextSlide} aria-label="Next slide">
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path d="M9 6l6 6-6 6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  </Swiper>
    </div>
  );
}
