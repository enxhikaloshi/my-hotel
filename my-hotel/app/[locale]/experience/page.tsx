"use client";
import React, { useRef, useEffect, useState } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InfoSection, { InfoItem } from "@/components/InfoSection"; 
import styles from "@/components/ExperienceSection.module.css";
import Link from "next/link";
import SideSection from "@/components/SideSection";
import { useTranslations } from 'next-intl';

export default function InclusiveServicesPage() {
  const t = useTranslations('ExperiencePage');
  
  // Referenca për animacionin fade-up
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true); 
  

  const summerImages = [
    "/experience_summer1.jpg", 
    "/experience_summer2.jpg",
    "/experience_summer3.jpg",
    "/experience_summer4.jpg",
  ];

  const winterImages = [
    "/experience_winter1.jpg",
    "/experience_winter2.jpg",
    "/experience_winter3.jpg",
    "/experience_winter4.jpg"
  ];
  
  const relaxActivities = [
    { 
      title: t('seasons.winter.title'), 
      description: t('seasons.winter.description'),
      imageUrl: "winter1.jpg", 
    },
    { 
      title: t('seasons.summer.title'), 
      description: t('seasons.summer.description'),
      imageUrl: "/summer1.jpg", 
    }
  ];
  
  const poolData: InfoItem[] = [
    {
      title: t('infoSections.wonderDay.title'),
      text: t('infoSections.wonderDay.text'),
      image: "/experience1.jpg",
      bgColor: "#ffffff"
    },
    {
      title: t('infoSections.seasonsMagic.title'),
      text: t('infoSections.seasonsMagic.text'),
      image: "/experience2.jpg",
      bgColor: "#E3DAC9"
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
              strong: (chunks) => <strong>{chunks}</strong>
            })}
          </p>
        </div>
      </section>
      
      <InfoSection data={poolData} />
      
      <SideSection items={relaxActivities} backgroundColor='#ffffff'  />
      
      <section className={styles.experienceContainer}>
        <div className={styles.experienceWrapper}>
          <h2 className={styles.experienceTitle}>
            {t('luxuryCar.title')}
          </h2>
          
          <p className={styles.experienceDescription}>
            {t.rich('luxuryCar.description', {
              link: (chunks) => <Link href="/luxury-cars" className={styles.textLink}>{chunks}</Link>,
              strong: (chunks) => <strong>{chunks}</strong>
            })}
          </p>
        </div>
      </section>
      
      <section className={styles.topThreeContainer}>
        <div className={styles.topThreeWrapper}>
          <h2 className={styles.topThreeTitle}>
            {t('topThree.title')}<br />
            <span className={styles.topThreeSubtitle}>{t('topThree.subtitle')}</span>
          </h2>

          <ul className={styles.topThreeList}>
            <li>
              {t.rich('topThree.items.item1', {
                strong: (chunks) => <strong>{chunks}</strong>
              })}
            </li>
            <li>
              {t.rich('topThree.items.item2', {
                strong: (chunks) => <strong>{chunks}</strong>
              })}
            </li>
            <li>
              {t.rich('topThree.items.item3', {
                strong: (chunks) => <strong>{chunks}</strong>
              })}
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
}