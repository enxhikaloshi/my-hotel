"use client";
import React, { useRef, useEffect, useState } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InfoSection, { InfoItem } from "@/components/InfoSection"; 
import styles from "@/components/LiveSection.module.css";
import Link from "next/link";
import CarouselEnquire from "@/components/CarouselEnquire";
import { useTranslations, useLocale } from 'next-intl';

export default function InclusiveServicesPage() {
  const t = useTranslations('LivePage');
  const locale = useLocale();
  
  // Referenca për animacionin fade-up
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true); 
  

  const summerImages = [
    "/live_summer1.jpg", 
    "/live_summer2.jpg",
    "/live_summer3.jpg"
  ];

  const winterImages = [
    "/live_summer1.jpg",
    "/live_summer2.jpg",
    "/live_summer3.jpg"
  ];

  const poolData: InfoItem[] = [
    {
      title: t('infoSections.family.title'),
      text: t('infoSections.family.text'),
      image: "/live1.jpg",
      bgColor: "#ffffff"
    },
    {
      title: t('infoSections.adventures.title'),
      text: t('infoSections.adventures.text'),
      image: "/live2.jpg",
      bgColor: "#ffffff"
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
      <section>
        <div className={styles.whiteSection}></div>
      </section>
      <section className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          {t('heroTitle')}
        </h2>
        
        <p className={styles.intro}>
          {t.rich('intro', {
            link: (chunks) => <Link href="/iclusiveServices" className={styles.underline}>{chunks}</Link>
          })}
        </p>

        <ul className={styles.list}>
          <li>{t.rich('services.item1', {
            strong: (chunks) => <strong>{chunks}</strong>
          })}</li>
          <li>{t.rich('services.item2', {
            link: (chunks) => <Link href="/cuisine" className={styles.underline}>{chunks}</Link>,
            strong: (chunks) => <strong>{chunks}</strong>
          })}</li>
          <li>{t.rich('services.item3', {
            strong: (chunks) => <strong>{chunks}</strong>
          })}</li>
          <li>{t.rich('services.item4', {
            strong: (chunks) => <strong>{chunks}</strong>
          })}</li>
          <li>{t.rich('services.item5', {
            strong: (chunks) => <strong>{chunks}</strong>
          })}</li>
          <li>{t.rich('services.item6', {
            strong: (chunks) => <strong>{chunks}</strong>
          })}</li>
          <li>{t.rich('services.item7', {
            strong: (chunks) => <strong>{chunks}</strong>
          })}</li>
          <li>{t.rich('services.item8', {
            strong: (chunks) => <strong>{chunks}</strong>
          })}</li>
          <li>{t.rich('services.item9', {
            strong: (chunks) => <strong>{chunks}</strong>
          })}</li>
        </ul>

        <div className={styles.buttonContainer}>
          <Link href="/inclusiveServices" className={styles.button}>
            {t('button')}
          </Link>
        </div>
      </div>
    </section>
      

      <InfoSection data={poolData} />
      <div className={styles.title}>
        <p>{t('holidayMagic')}</p>
      </div>
      <div className={styles.SectionWrapper}>
        <div className={styles.carouselContainer}>
          <CarouselEnquire />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}