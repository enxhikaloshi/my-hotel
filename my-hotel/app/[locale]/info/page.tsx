"use client";
import React, { useRef, useEffect, useState } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "@/components/PoolSection.module.css";
import Link from "next/link";
import SideSection from "@/components/SideSection";
import { useTranslations } from 'next-intl';

export default function InfoPage() {
  const t = useTranslations('InfoPage');
  
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true); 
  

  const summerImages = [
    "/info_summer1.jpg"
  ];

  const winterImages = [
    "/info_summer1.jpg"
  ];
  
  const infoActivities = [
    { 
      title: t('activities.photos.title'), 
      imageUrl: "/photos1.jpg", 
      linkHref: "/info/photos-videos" 
    },
    { 
      title: t('activities.information.title'), 
      imageUrl: "/Useful1.jpg", 
      linkHref: "/info/useful-information" 
    },
    { 
      title: t('activities.carRental.title'), 
      imageUrl: "/car1.jpg", 
      linkHref: "/info/car-rental" 
    },
    {
      title: t('activities.giftVouchers.title'),
      imageUrl: "/gift1.jpg",
      linkHref: "/info/gift-vouchers"
    },
    {
      title: t('activities.gettingHere.title'),
      imageUrl: "/get1.jpg",
      linkHref: "/info/getting-here"
    }
  ];
  
  return (
    <div className={styles.pageWrapper}>
      <section className={styles.heroSection}>
        <HeroCarousel 
          summerImages={summerImages} 
          winterImages={winterImages} 
          isSmall={true} 
        />
        <Header isMenuPage={false} />    
      </section>

      <section 
        ref={sectionRef}
        className={`${styles.whiteSection} ${isVisible ? styles.fadeUpActive : styles.fadeUpHidden}`}
      >
        <div className={styles.whiteSectionContent}>
          <h1 className={styles.whiteTitle}>
            {t('heroTitle')}
          </h1>
          <p className={styles.whiteText}>
            {t.rich('heroDescription', {
              link: (chunks) => <Link href='/live' className={styles.link}>{chunks}</Link>,
              strong: (chunks) => <strong>{chunks}</strong>
            })}
          </p>
        </div>
      </section>

      <SideSection items={infoActivities} backgroundColor='#ffffff' isDarkLink={true} />
      <Footer />
    </div>
  );
}