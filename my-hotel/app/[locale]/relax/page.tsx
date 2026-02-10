"use client";
import React, { useRef, useEffect, useState } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InfoSection, { InfoItem } from "@/components/InfoSection"; 
import styles from "@/components/RelaxSection.module.css";
import Link from "next/link";
import CustomCarousel from "@/components/CustomCarousel";
import Image from "next/image"
import SideSection from "@/components/SideSection";
import { useTranslations } from 'next-intl';

export default function InclusiveServicesPage() {
  const t = useTranslations('RelaxPage');
  
  // Referenca për animacionin fade-up
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true); 
  
  const poolImages = [
    "/relax_winter1.jpg",
    "/relax_summer1.jpg",
    "/relax_winter2.jpg",
    "/relax_summer2.jpg",
    "/relax_summer3.jpg",
    "/relax_winter3.jpg",
    "/relax1.jpg",
    "/relax2.jpg"
  ];
  const summerImages = [
    "/relax_summer1.jpg", 
    "/relax_summer2.jpg",
    "/relax_summer3.jpg"
  ];

  const winterImages = [
    "/relax_winter1.jpg",
    "/relax_winter2.jpg",
    "/relax_winter3.jpg"
  ];
  
  const relaxActivities = [
    { 
      title: t('relaxActivities.warmth.title'), 
      description: t('relaxActivities.warmth.description'),
      imageUrl: "warmth1.jpg", 
      linkHref: "/sauna" 
    },
    { 
      title: t('relaxActivities.water.title'), 
      description: t('relaxActivities.water.description'),
      imageUrl: "/pool_summer1.png", 
      linkHref: "/pool" 
    }
  ];
  
  const poolData: InfoItem[] = [
    {
      title: t('infoSections.pampered.title'),
      text: t.rich('infoSections.pampered.text', {
        link1: (chunks) => <a href='/luxury-cars'>{chunks}</a>,
        link2: (chunks) => <a href='/winter'>{chunks}</a>,
        link3: (chunks) => <a href='/summer'>{chunks}</a>,
        strong: (chunks) => <strong>{chunks}</strong>
      }),
      image: "/relax1.jpg",
      bgColor: "#ffffff"
    },
    {
      title: t('infoSections.revitalised.title'),
      text: t.rich('infoSections.revitalised.text', {
        strong: (chunks) => <strong>{chunks}</strong>
      }),
      image: "/relax2.jpg",
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
              strong: (chunks) => <strong>{chunks}</strong>,
              link: (chunks) => <Link href="/gym" className={styles.link}>{chunks}</Link>
            })}
          </p>
        </div>
      </section>
      
      <CustomCarousel images={poolImages} />
      
      <div className={styles.title}>
        <p>{t('spaTitle')}</p>
      </div>
      
      <div className={styles.image}>
        <Image 
          src="/hotel_view.jpg" 
          alt="Hotel Structure"
          width={1200}         
          height={600}         
          className={styles.responsiveImage}
        />
      </div>
      
      <SideSection items={relaxActivities} isWhite={true} />
      
      <InfoSection data={poolData} />
      
      <section className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{t('activeHotel.title')}</h2>
          
          <p className={styles.description}>
            {t.rich('activeHotel.description', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}
          </p>

          <div className={styles.catalogCard}>
            <div className={styles.iconWrapper}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <div className={styles.catalogText}>
              <h3>{t('catalog.title')}</h3>
              <Link href="/path-to-your-pdf.pdf" className={styles.downloadLink}>
                {t('catalog.download')} <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}