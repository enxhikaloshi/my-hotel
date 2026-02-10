"use client";
import { useState, useEffect } from "react";
import { useWeather } from "@/context/WeatherContext";
import styles from "./page.module.css"; 
import { MoveLeft, MoveRight } from "lucide-react";

interface HeroCarouselProps {
  summerImages: string[];
  winterImages: string[];
  isSmall?: boolean;
}

export default function HeroCarousel({ summerImages, winterImages, isSmall = false }: HeroCarouselProps) {
  const { isSnow } = useWeather();
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = isSnow ? winterImages : summerImages;

  useEffect(() => { setCurrentIndex(0); }, [isSnow]);

  
  return (
    <div className={`${styles.heroSection} ${isSmall ? styles.smallHero : ""}`}>
 
      <div 
        className={styles.heroBackground} 
        style={{ backgroundImage: `url('${images[currentIndex]}')` }}
      ></div>

      {/* Navigimi dhe shigjetat */}
      <div className={styles.cornerNav}>
        <p className={styles.cornerCounter}>{currentIndex + 1} / {images.length}</p>
        <button aria-label="move left" className={styles.cornerArrow} onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}>
          <MoveLeft size={20} />
        </button>
        <button aria-label="move right" className={styles.cornerArrow} onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}>
          <MoveRight size={20} />
        </button>
      </div>

      {/* Scroll Down - vetëm brenda kornizës së fotos */}
      <div className={styles.scrollDown}>
        <div className={styles.scrollOval}><div className={styles.scrollLine}></div></div>
        <p className={styles.scrollText}>scroll down</p>
      </div>
    </div> 
  );
}