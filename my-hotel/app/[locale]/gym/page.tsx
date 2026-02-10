"use client";
import React, { useRef, useEffect, useState } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "@/components/gymSection.module.css";
import Link from "next/link";
import CustomCarousel from "@/components/CustomCarousel";
import SideSection from "@/components/SideSection";
import { useTranslations } from 'next-intl';

export default function InclusiveServicesPage() {
  const t = useTranslations('GymPage');
  
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true); 
  
  const gymImages = [
    "/gym_winter1.png",
    "/gym_summer1.png",
    "/gym_winter2.png",
    "/gym_summer2.png",
    "/gym_summer3.png",
    "/gym_winter3.png",
  ];
  
  const summerImages = [
    "/gym_summer1.png", 
    "/gym_summer2.png",
    "/gym_summer3.png"  
  ];

  const winterImages = [
    "/gym_winter1.png",
    "/gym_winter2.png",
    "/gym_winter3.png"
  ];
  
  const gymActivities = [
    { 
      title: t('activities.skiing.title'), 
      imageUrl: "/skiing1.png", 
      linkHref: "/experience/skiing" 
    },
    { 
      title: t('activities.crossCountry.title'), 
      imageUrl: "/cross_country1.png", 
      linkHref: "/experience/cross-country-skiing" 
    },
    { 
      title: t('activities.snowshoeing.title'), 
      imageUrl: "/snowshoeing1.png", 
      linkHref: "/experience/snowshoeing" 
    },
    {
      title: t('activities.hiking.title'),
      imageUrl: "/biking1.png",
      linkHref: "/experience/hiking"
    },
    {
      title: t('activities.biking.title'),
      imageUrl: "/hiking1.png",
      linkHref: "/experience/biking"
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
              link1: (chunks) => <Link href="/getting-here">{chunks}</Link>,
              strong: (chunks) => <strong>{chunks}</strong>,
              link2: (chunks) => <Link href="/experience">{chunks}</Link>,
              link3: (chunks) => <Link href="/relax">{chunks}</Link>
            })}
          </p>
        </div>
      </section>
      
      <p className={styles.Text}>
        {t('gymHours')}
      </p>
      
      <CustomCarousel images={gymImages} />
  
      <section className={styles.gymSection}>
        <h2 className={styles.gymTitle}>{t('gymSection.title')}</h2>
        <p className={styles.gymDescription}>
          {t.rich('gymSection.description', {
            strong: (chunks) => <strong>{chunks}</strong>,
            link: (chunks) => <Link href="/inclusiveServices">{chunks}</Link>
          })}
        </p>
      </section>

      <SideSection items={gymActivities} />

      <Footer />
    </div>
  );
}