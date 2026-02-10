"use client";
import React, { useRef, useEffect, useState } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "@/components/winterSection.module.css";
import Link from "next/link";
import Image from 'next/image';
import SideSection from "@/components/SideSection";
import InfoSection, { InfoItem } from "@/components/InfoSection";
import { useTranslations } from 'next-intl';

export default function WinterPage() {
  const t = useTranslations('WinterPage');
  
  // Referenca për animacionin fade-up
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true); 

  const winterImages = [
    "/winter_winter1.png", 
    "/winter_winter2.png",
    "/winter_winter3.png",
    "/winter_winter4.png"
  ];

  const summerImages = [
    "/winter_winter1.png",
    "/winter_winter2.png",
    "/winter_winter3.png",
    "/winter_winter4.png"
  ];
  
  const winterActivities = [
    { 
      title: t('activities.skiing.title'), 
      imageUrl: "/skiing1.png", 
      description: t('activities.skiing.description'),
      linkHref: "/experience/skiing" 
    },
    { 
      title: t('activities.crossCountry.title'), 
      imageUrl: "/cross_country1.png", 
      description: t('activities.crossCountry.description'),
      linkHref: "/experience/cross-country-skiing" 
    },
    { 
      title: t('activities.snowshoeing.title'), 
      imageUrl: "/snowshoeing1.png", 
      description: t('activities.snowshoeing.description'),
      linkHref: "/experience/snowshoeing" 
    },
    {
      title: t('activities.winterHiking.title'),
      imageUrl: "/winter_hiking1.png",
      description: t('activities.winterHiking.description'),
      linkHref: "/experience/winter-hiking"
    }
  ];
  
  const WinterData: InfoItem[] = [
    {
      title: t('infoSections.iceSkating.title'),
      text: t('infoSections.iceSkating.text'),
      image: "/winter_boots1.jpg",
      bgColor: "#ffffff"
    },
    {
      title: t('infoSections.tobogganing.title'),
      text: t('infoSections.tobogganing.text'),
      image: "/snow2.jpg",
      bgColor: "#E3DAC9",
      hasReadMore: true
    },
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
              strong: (chunks) => <strong>{chunks}</strong>
            })}
          </p>
        </div>
      </section>
      
      <section className={styles.section}>
        {/* Text Content */}
        <div className={styles.content}>
          <h2 className={styles.title}>{t('weeklyProgramme.title')}</h2>
          
          <p className={styles.description}>
            {t('weeklyProgramme.description')}
          </p>
          
          <Link href="/weekly-programme" className={styles.linkk}>
            {t('weeklyProgramme.link')}
            <span>→</span>
          </Link>
        </div>

        {/* Image Side */}
        <div className={styles.imageWrapper}>
          <Image
            src="/mountain.png" 
            alt="Mountain hotel landscape"
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>
      
      <SideSection items={winterActivities} isWhite={true} />
      
      <InfoSection data={WinterData} />
      
      <section className={`${styles.containerr} ${styles.whiteBg}`}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            {t('guestPass.title')}
          </h2>
          
          <p className={styles.text}>
            {t('guestPass.description')}
          </p>
        </div>
      </section>
      
      <section className={`${styles.containerr} ${styles.greyBg}`}>
        <div className={styles.content}>
          <h2 className={styles.title}>{t('tips.title')}</h2>
          
          <Link href="/tips" className={styles.buttonreadmore}>
            {t('tips.button')}
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}