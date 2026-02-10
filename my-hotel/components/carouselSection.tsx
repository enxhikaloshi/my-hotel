/*'use client';

import { useState } from "react";
import styles from "./page.module.css";

export default function CarouselSection() {
  const images = [
    "/hotel_imagee13.png",
    "/hotel_photo16p.png",
    "hotel_imagee1.png",
    "/hotel_imagee3.png",
    "/hotel_imagee10.png",
    "/hotel_imagee4.png",
    "/hotel_aperitif.png",
    "/hotel_gourmet.png",
    "/hotel_imagee8.png",
    "/hotel_cozy.png",
  ];
   const slideData = [
    {
      time: "7 a.m.",
      title: "admiration",
      description: "Enjoy the endless expanse of the infinity pool and let the water carry you as you admire the breathtaking scenery in the morning light."
    },
    {
      time: "7.15 a.m.",
      title: "indulgent breakfast  (7.15 a.m. – 11 a.m.)",
      description: "A symphony of fragrant espresso and creamy cappuccino plus crispy bread from the organic bakery, honey from the beekeeper in Taisten, fluffy waffles, the finest ham, and much more besides. Served on our hotel terrace in summer."
    },
    {
      time: "10 a.m.",
      title: "adventure",
      description: "A rowing boat trip on Lake Braies/Pragser Wildsee, skiing at Mt Plan de Corones/Kronplatz, hiking in the Dolomites UNESCO World Heritage, or cross-country skiing in the winter peace of Val Casies/Gsieser Tal – no matter the season, there’s so much to love in Alta Pusteria/Hochpustertal."
    },
    {
      time: "2.30 p.m.",
      title: "lunch buffet  (12.30 p.m. – 4.30 p.m.)",
      description: "Choose from fresh salads, fine antipasti, and tasty soups as well as homemade cakes and treats from the AT patisserie."
    },
    {
      time: "3 p.m.",
      title: "a spin",
      description: "Mercedes, Porsche, or Lamborghini: Discover pure freedom on the pass roads in the Dolomites with our luxury car rental."
    },
    {
      time: "5 p.m.",
      title: "relaxation",
      description: "Natural luxury is at your fingertips in our wellness world. Spacious pool areas, cosy sauna oases, and pampering treatments invite you to linger and dream. "
    },
    {
      time: "7 p.m.",
      title: "aperitif",
      description: "Settle in amidst the natural beauty of our hotel terrace, surrounded by majestic mountain peaks. Here, immersed in this glorious setting, an aperitif becomes an experience for all the senses."
    },
    {
      time: "7.30 p.m.",
      title: "gourmet dinner  (6.45 p.m. – 8.45 p.m.)",
      description: "The highlight of the day: an exquisite 5- to 7-course gourmet menu that takes you on a culinary journey through the aromas of South Tyrol and Italy."
    },
    {
      time: "9.30 p.m.",
      title: "cheers!",
      description: "Enjoy our selection of excellent drinks while thinking back on the day’s adventures. In our bar, you’ll always find the right atmosphere to make new memories."
    },
    {
      time: "11 p.m.",
      title: "time to get cosy",
      description: "Fall into the embrace of our lovely rooms and suites and treat yourself to some well-earned relaxation after an exciting day. Welcome to your personal oasis of well-being."
    }
  ];


  const [currentIndex, setCurrentIndex] = useState(0);
  const [topLayer, setTopLayer] = useState(true); // true = layer 1 on top, false = layer 2 on top
  const [layer1Image, setLayer1Image] = useState(0);
  const [layer2Image, setLayer2Image] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  
  const dots = Array(10).fill(null);
  
  const goToSlide = (index: number) => {
    if (index === currentIndex || transitioning) return;
    
    setTransitioning(true);
    setCurrentIndex(index);
    
    // Update the hidden layer with new image
    if (topLayer) {
      setLayer2Image(index);
    } else {
      setLayer1Image(index);
    }
    
    // Small delay to ensure image is loaded, then flip layers
    setTimeout(() => {
      setTopLayer(!topLayer);
      setTimeout(() => {
        setTransitioning(false);
      }, 400);
    }, 50);
  };

  return (
    <section className={styles.bigCarouselSection}>
      <div className={styles.carouselContainer}>
        {/* Layer 1 *//*}
        <div
          className={`${styles.bigCarouselImage} ${styles.layer1} ${
            topLayer ? styles.layerTop : styles.layerBottom
          }`}
          style={{ backgroundImage: `url(${images[layer1Image]})` }}
        />
        
        {/* Layer 2 *//*}
        <div
          className={`${styles.bigCarouselImage} ${styles.layer2} ${
            !topLayer ? styles.layerTop : styles.layerBottom
          }`}
          style={{ backgroundImage: `url(${images[layer2Image]})` }}
        />
      </div>
      {/* Content overlay *//*}
      <div className={styles.contentOverlay}>
        <h2 className={styles.slideTitle}>{slideData[currentIndex].title}</h2>
        <p className={styles.slideDescription}>{slideData[currentIndex].description}</p>
      </div>
      {/* DOTS *//*}
       <div className={styles.timelineWrapper}>
        {dots.map((_, index: number) => (
          <div key={index} className={styles.dotLineGroup}>
            <div className={styles.dotWithLabel}>
              <div
                className={`${styles.timelineDot} ${
                  index === currentIndex ? styles.activeRing : ""
                }`}
                onClick={() => goToSlide(index)}
              >
                <div className={styles.dotInner}></div>
              </div>
              {index === currentIndex && (
                <div className={styles.timeLabel}>{slideData[index].time}</div>
              )}
            </div>
            {index !== dots.length - 1 && (
              <div className={styles.timelineLine}></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}*/
import React, { useState, useEffect, useCallback } from 'react';
import styles from './page.module.css';

interface SlideItem {
  title: string;
  description: string;
  time: string;
}

interface BigCarouselProps {
  slideData: SlideItem[];
  images: string[];
  autoPlayInterval?: number;
}

export default function BigCarousel({ 
  slideData, 
  images, 
  autoPlayInterval = 5000 
}: BigCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [layer1Image, setLayer1Image] = useState(0);
  const [layer2Image, setLayer2Image] = useState(0);
  const [topLayer, setTopLayer] = useState(true); // true = layer1 është lart, false = layer2 është lart

  const goToSlide = useCallback((index: number) => {
    if (index === currentIndex) return;

    if (topLayer) {
      
      setLayer2Image(index);
      setTopLayer(false);
    } else {
      
      setLayer1Image(index);
      setTopLayer(true);
    }
    setCurrentIndex(index);
  }, [currentIndex, topLayer]);

  // Auto-play logjika
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slideData.length;
      goToSlide(nextIndex);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [currentIndex, slideData.length, goToSlide, autoPlayInterval]);

  const dots = Array.from({ length: slideData.length });

  return (
    <section className={styles.bigCarouselSection}>
      <div className={styles.carouselContainer}>
        {/* Layer 1 */}
        <div
          className={`${styles.bigCarouselImage} ${styles.layer1} ${
            topLayer ? styles.layerTop : styles.layerBottom
          }`}
          style={{ backgroundImage: `url(${images[layer1Image]})` }}
        />
        
        {/* Layer 2 */}
        <div
          className={`${styles.bigCarouselImage} ${styles.layer2} ${
            !topLayer ? styles.layerTop : styles.layerBottom
          }`}
          style={{ backgroundImage: `url(${images[layer2Image]})` }}
        />
      </div>

      {/* Content overlay */}
      <div className={styles.contentOverlay}>
        <h2 className={styles.slideTitle}>{slideData[currentIndex].title}</h2>
        <p 
        className={styles.slideDescription} 
        dangerouslySetInnerHTML={{ __html: slideData[currentIndex].description }} 
      />
      </div>

      {/* DOTS */}
      <div className={styles.timelineWrapper}>
        {dots.map((_, index: number) => (
          <div key={index} className={styles.dotLineGroup}>
            <div className={styles.dotWithLabel}>
              <div
                className={`${styles.timelineDot} ${
                  index === currentIndex ? styles.activeRing : ""
                }`}
                onClick={() => goToSlide(index)}
              >
                <div className={styles.dotInner}></div>
              </div>
              {index === currentIndex && (
                <div className={styles.timeLabel}>{slideData[index].time}</div>
              )}
            </div>
            {index !== dots.length - 1 && (
              <div className={styles.timelineLine}></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}