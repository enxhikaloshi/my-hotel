'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from './enquire.module.css';

interface Deal {
  id: number;
  image: string;
  title: string;
  valid_from: string;
  valid_to: string;
}

export default function HotelCarousel() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  // 1. Supozed price mapping based on title
  const priceMapping: { [key: string]: string } = {
    "AT Winter": "1,477.00",
    "AT Active": "1,596.00",
    "AT Wellness": "1,645.00", 
    "AT Sun": "1,520.00"      
  };

  const allowedTitles = ["AT Winter", "AT Blossom", "AT Wellness", "AT Sun"];
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await fetch('/api/hotel_deals');
        const data: Deal[] = await response.json();
        
        const filtered = data
          .filter(deal => allowedTitles.includes(deal.title))
          .sort((a, b) => allowedTitles.indexOf(a.title) - allowedTitles.indexOf(b.title));
          
        setDeals(filtered);
      } catch (error) {
        console.error("Error fetching hotel deals:", error);
      }
    };
    fetchDeals();
  }, []);

  const prevSlide = () => swiperRef.current?.slidePrev();
  const nextSlide = () => swiperRef.current?.slideNext();
 const formatReadableDate = (isoString?: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };
  return (
    <div className={styles.carouselWrapper}>
      <Swiper
        modules={[Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        spaceBetween={30}
        slidesPerView={2.3}
      >
        {deals.map((deal) => (
          <SwiperSlide key={deal.id} className={styles.slide}>
            <div className={styles.imageContainer}>
              <img src={deal.image} alt={deal.title} className={styles.carouselImage}/>
              
              {/*  DINAMIC PRICE */}
              <div className={styles.priceBubble}>
                from €{priceMapping[deal.title] || "1,400.00"} per person
              </div>
            </div>

            <div className={styles.infoContent}>
              <h3 className={styles.titleText}>{deal.title}</h3>
              <p className={styles.descriptionText}>7 nights with ¾ gourmet board</p>
              <p className={styles.dateText}>{formatReadableDate(deal.valid_from)} – {formatReadableDate(deal.valid_to)}</p>
              <a href={`/enquire?offerId=${deal.id}`} className={styles.showDetailsLink}>
                Show details &rarr;
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.navigationBottom}>
        <div className={styles.counter}>{currentIndex + 1} / {deals.length}</div>
        <div className={styles.arrows}>
           <button aria-label="Previous slide" type="button" onClick={prevSlide} className={styles.navBtn}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
               <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
           </button>
           <button aria-label="Next slide" type="button" onClick={nextSlide} className={styles.navBtn}>
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
               <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
           </button>
        </div>
      </div>
    </div>
  );
}