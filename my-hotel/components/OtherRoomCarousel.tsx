'use client';
import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Link from 'next/link';
import "swiper/css";
import styles from '@/components/roomDetail.module.css';

export default function MoreRoomsCarousel({ rooms, noBackground = false }: { rooms: any[], noBackground?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  return (
    
    <section className={`${styles.moreRoomsSection} ${noBackground ? styles.cleanBackground : ''}`}>
    
      <header className={styles.moreRoomsHeader}>
        <h2 className={styles.moreRoomsTitle}>More rooms</h2>
        <Link href="/rooms" className={styles.showAllLinkCenter}>
          Show all rooms &rarr;
        </Link>
      </header>

      <div className={styles.carouselContainer}>
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
          spaceBetween={30}
          slidesPerView={2.2} 
          breakpoints={{
            320: { slidesPerView: 1.1, spaceBetween: 15 },
            768: { slidesPerView: 1.8, spaceBetween: 20 },
            1024: { slidesPerView: 2.2, spaceBetween: 30 }
          }}
        >
          {rooms.map((room, index) => {
            let roomImg = "/placeholder.jpg";
            try {
              const imgs = typeof room.images === 'string' ? JSON.parse(room.images) : room.images;
              roomImg = imgs[0];
            } catch (e) {
              roomImg = room.images?.split(',')[0] || "/placeholder.jpg";
            }

            return (
              <SwiperSlide key={index}>
                <article className={`${styles.roomCard} ${noBackground ? styles.cleanCard : ''}`}>
                  <div className={styles.imageWrapper}>
                    <img src={roomImg} alt={room.name} className={styles.roomImage} />
                    
                    <div className={styles.priceTagOver}>
                      from €{room.price}.00 per person
                    </div>
                  </div>
                  
                
                  <div className={styles.roomContent}>
                    <h3 className={styles.roomName}>{room.name}</h3>
                    <p className={styles.roomSpecs}>
                      {room.capacity} people | {room.size}
                    </p>
                    <Link href={`/rooms/${room.id}`} className={styles.showDetailsLink}>
                      Show details &rarr;
                    </Link>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}

          
          <div className={styles.carouselNavigation}>
            <span className={styles.counterText}>
              {currentIndex + 1} / {rooms.length}
            </span>
            <div className={styles.navButtons}>
              <button onClick={() => swiperRef.current?.slidePrev()} className={styles.circleBtn}>←</button>
              <button onClick={() => swiperRef.current?.slideNext()} className={styles.circleBtn}>→</button>
            </div>
          </div>
     
        </Swiper>
     {!noBackground && <div className={styles.bottomBackground}></div>}
      </div>
    </section>
  );
}