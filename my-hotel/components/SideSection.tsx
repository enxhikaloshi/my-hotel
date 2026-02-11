"use client";
import React, { useState } from 'react';
import styles from './SideSection.module.css';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

interface GalleryItem {
  title: string;
  imageUrl: string;
  linkHref?: string;
  description?: string | React.ReactNode;

}

interface SideSectionProps {
  items: GalleryItem[];
  backgroundColor?: string;
  isWhite?: boolean;
  isDarkLink?: boolean;
}


const SideSection = ({ items, backgroundColor, isWhite,isDarkLink }: SideSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = items[activeIndex];
  const isLightBg = backgroundColor && 
  (backgroundColor.toLowerCase() === '#ffffff' || 
   backgroundColor.toLowerCase() === '#fff' || 
   backgroundColor.startsWith('#f') || 
   backgroundColor.startsWith('#e'));

  return (
    <div className={`${styles.container} ${isWhite ? styles.isWhiteVariant : ""}`} 
      style={backgroundColor ? { backgroundColor } : {}}>
         <div className={styles.textContent}>
        <div className={styles.list}>
          {items.map((item, index) => (
            <div key={index} className={styles.itemWrapper}>
              <button
                onClick={() => setActiveIndex(index)}
  className={`${styles.listItem} ${index === activeIndex ? styles.listItemActive : ""} ${isLightBg ? styles.darkText : ""}`}

              >
                {item.title}
                {index === activeIndex && <span className={styles.dot}></span>}
              </button>

              {index === activeIndex && (
              <div className={styles.activeContent}>
               
                {item.description && (
                  <div 
                   className={`${styles.description} ${isLightBg ? styles.darkText : ""}`}
                    dangerouslySetInnerHTML={{ __html: item.description }} 
                  />
                )}
                
                {item.linkHref && (
                  <Link href={item.linkHref}
                   className={`${styles.link} ${isDarkLink ? styles.darkLink : ""}`}
                   >
                    <span>Read more</span>
                    <MoveRight size={20} />
                  </Link>
                )}
              </div>
            )}
            </div>
          ))}
        </div>
      </div>

     
      <div className={styles.imageContent}>
        <img 
          key={activeItem.imageUrl} 
          src={activeItem.imageUrl} 
          alt={activeItem.title} 
          className={styles.fadeAnim}
        />
       
        <div className={styles.imageOverlayText}>{activeItem.title}</div>
      </div>
    </div>
  );
};

export default SideSection;