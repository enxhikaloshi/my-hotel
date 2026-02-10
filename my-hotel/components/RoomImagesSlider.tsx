"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Eye, MoveDiagonal } from 'lucide-react';
import styles from '@/components/roomDetail.module.css';

export default function RoomImagesSlider({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className={styles.navigationTop}>
        <Link href="/rooms" className={styles.backButton}>
          <span className={styles.arrowIcon}>←</span> Back to overview
        </Link>
        <div className={styles.imageNavControls}>
          {/* Tani shfaq numrin e fotos aktuale: psh 1 / 5 */}
          <span className={styles.pageCount}>{currentIndex + 1} / {images.length}</span> 
          <div className={styles.arrowGroup}>
            <button onClick={prevSlide} className={styles.navArrow}>←</button>
            <button onClick={nextSlide} className={styles.navArrow}>→</button>
          </div>
        </div>
      </div>

      <div className={styles.imagesGrid}>
        <div className={styles.imageWrapper}>
          <img src={images[currentIndex]} alt="Room" className={styles.roomImage} />
          <div className={styles.overlay360}>
            <button className={styles.roundButton360}>360°</button>
          </div>
        </div>

        <div className={styles.imageWrapper}>
         
          <img src={images[(currentIndex + 1) % images.length]} alt="Room" className={styles.roomImage} />
          <div className={styles.overlayCapsules}>
            <button className={styles.capsuleButton}><Eye size={16}/> View</button>
            <button className={styles.capsuleButton}><MoveDiagonal size={16}/> Room plan</button>
          </div>
        </div>
      </div>
    </>
  );
}