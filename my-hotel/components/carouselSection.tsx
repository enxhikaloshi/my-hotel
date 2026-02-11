"use client";
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