"use client";
import React, { useRef, useEffect, useState } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InfoSection, { InfoItem } from "@/components/InfoSection"; 
import styles from "@/components/SaunaSection.module.css";
import CustomCarousel from "@/components/CustomCarousel";
import { useTranslations } from 'next-intl';
import Link from "next/link";

export default function SaunaWorld() {
  const t = useTranslations('SaunaPage');
  
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true); 
  
  const saunaImages = [
    "/sauna_winter1.png",
    "/sauna_summer1.png",
    "/sauna_winter2.png",
    "/sauna_summer2.png",
    "/sauna_summer_3.png",
    "/sauna_winter3.png",
    "/sauna_summer4.png",
    "/sauna_winter4.png",
    "/sauna_1.png",
    "/sauna_2.png",
    "/sauna_3.png",
    "/sauna_4.png",
    "/sauna_5.png",
    "/sauna_6.png",
    "/sauna_7.png"
  ];
  
  const summerImages = [
    "/sauna_summer1.png", 
    "/sauna_summer2.png",
    "/sauna_summer_3.png",
    "/sauna_summer4.png"
  ];

  const winterImages = [
    "/sauna_winter1.png",
    "/sauna_winter2.png",
    "/sauna_winter3.png",
    "/sauna_winter4.png"
  ];

  const poolData: InfoItem[] = [
    {
      title: t('saunaData.infusionSauna.title'),
      specs: t('saunaData.infusionSauna.specs'),
      text: t('saunaData.infusionSauna.text'),
      image: "/sauna_1.png",
      bgColor: "#ffffff"
    },
    {
      title: t('saunaData.panoramicSauna.title'),
      specs: t('saunaData.panoramicSauna.specs'),
      text: t('saunaData.panoramicSauna.text'),
      image: "/sauna_2.png",
      bgColor: "#E3DAC9"
    },
    {
      title: t('saunaData.bioSauna.title'),
      specs: t('saunaData.bioSauna.specs'),
      text: t('saunaData.bioSauna.text'),
      image: "/sauna_3.png",
      bgColor: "#1a2b3c"
    },
    {
      title: t('saunaData.finnishSauna.title'),
      specs: t('saunaData.finnishSauna.specs'),
      text: t('saunaData.finnishSauna.text'),
      image: "/sauna_4.png",
      bgColor: "#ffffff"
    },
    {
      title: t('saunaData.crystalBath.title'),
      specs: t('saunaData.crystalBath.specs'),
      text: t('saunaData.crystalBath.text'),
      image: "/sauna_5.png",
      bgColor: "#E3DAC9"
    },
    {
      title: t('saunaData.brineBath.title'),
      specs: t('saunaData.brineBath.specs'),
      text: t('saunaData.brineBath.text'),
      image: "/sauna_6.png",
      bgColor: "#1a2b3c"
    },
    {
      title: t('saunaData.infraredLoungers.title'),
      specs: t('saunaData.infraredLoungers.specs'),
      text: t('saunaData.infraredLoungers.text'),
      image: "/sauna_7.png",
      bgColor: "#ffffff"
    }
  ];

  return (
    <div className={styles.pageWrapper}>
      <section className={styles.heroSectionWrapper}> 
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
              link1: (chunks) => <Link href="/relax">{chunks}</Link>,
              link2: (chunks) => <Link href="/experience">{chunks}</Link>
            })}
          </p>
        </div>
      </section>
      
      <p className={styles.Text}>
        {t('dailyInfusions')}
      </p>
                                
      <InfoSection data={poolData} />
      
      <section className={styles.saunaSection}>
        <h2 className={styles.title}>{t('steamBath.title')}</h2>
        <div className={styles.details}>
          <span>{t('steamBath.temperature')}</span>
          <span className={styles.separator}>|</span>
          <span>{t('steamBath.humidity')}</span>
          <span className={styles.separator}>|</span>
          <span>{t('steamBath.area')}</span>
        </div>
        <p className={styles.description}>
          {t('steamBath.description')}
        </p>
      </section>

      <section className={styles.saunaSectionWhite}>
        <h2 className={styles.title}>{t('bioSauna.title')}</h2>
        <div className={styles.details}>
          <span>{t('bioSauna.temperature')}</span>
          <span className={styles.separator}>|</span>
          <span>{t('bioSauna.humidity')}</span>
          <span className={styles.separator}>|</span>
          <span>{t('bioSauna.area')}</span>
        </div>
        <p className={styles.description}>
          {t('bioSauna.description')}
        </p>
      </section>
      
      <section className={styles.havenSection}>
        <div className={styles.textContent}>
          <h2 className={styles.titlee}>
            {t('havenSection.title')}
          </h2>
          <p className={styles.descriptionn}>
            {t.rich('havenSection.description', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}
          </p>
        </div>

        <div className={styles.imageContent}>
          <img 
            src="/sauna_summer4.png" 
            alt="Relaxation area with panoramic view" 
          />
        </div>
      </section>
      
      <CustomCarousel images={saunaImages} />

      <Footer />
    </div>
  );
}