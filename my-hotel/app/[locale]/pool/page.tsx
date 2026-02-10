"use client";
import React, { useRef, useEffect, useState } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InfoSection, { InfoItem } from "@/components/InfoSection"; 
import styles from "@/components/PoolSection.module.css";
import Link from "next/link";
import CustomCarousel from "@/components/CustomCarousel";
import { useTranslations } from 'next-intl';

export default function InclusiveServicesPage() {
  const t = useTranslations('PoolPage');
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true); 
  
  const poolImages = [
    "/pool_winter1.png",
    "/pool_summer1.png",
    "/pool_winter2.png",
    "/pool_summer2.png",
    "/pool_summer3.png",
    "/pool_winter3.png",
    "/pool_summer4.png",
    "/pool_winter4.png",
    "/poolsummer_1.png",
    "/poolsummer_2.png",
    "/poolsummer_3.png",
    "/poolsummer_4.png",
    "/poolsummer_5.png"
  ];
  
  const summerImages = [
    "/pool_summer1.png", 
    "/pool_summer2.png",
    "/pool_summer3.png",
    "/pool_summer4.png"
  ];

  const winterImages = [
    "/pool_winter1.png",
    "/pool_winter2.png",
    "/pool_winter3.png",
    "/pool_winter4.png"
  ];

  const poolData: InfoItem[] = [
    {
      title: t('poolData.infinityPool.title'),
      specs: t('poolData.infinityPool.specs'),
      text: t('poolData.infinityPool.text'),
      image: "/poolsummer_1.png",
      bgColor: "#ffffff"
    },
    {
      title: t('poolData.indoorPool.title'),
      specs: t('poolData.indoorPool.specs'),
      text: t('poolData.indoorPool.text'),
      image: "/poolsummer_2.png",
      bgColor: "#E3DAC9"
    },
    {
      title: t('poolData.brinePool.title'),
      specs: t('poolData.brinePool.specs'),
      text: t('poolData.brinePool.text'),
      image: "/poolsummer_3.png",
      bgColor: "#1a2b3c"
    },
    {
      title: t('poolData.whirlpool.title'),
      specs: t('poolData.whirlpool.specs'),
      text: t('poolData.whirlpool.text'),
      image: "/poolsummer_4.png",
      bgColor: "#ffffff"
    },
    {
      title: t('poolData.plungePool.title'),
      specs: t('poolData.plungePool.specs'),
      text: t('poolData.plungePool.text'),
      image: "/poolsummer_5.png",
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
              link: (chunks) => <Link className={styles.link} href="/relax">{chunks}</Link>
            })}
          </p>
        </div>
      </section>

      {/* Thirrja e komponentit me të dhënat */}
      <InfoSection data={poolData} />
      
      <CustomCarousel images={poolImages} />

      <Footer />
    </div>
  );
}