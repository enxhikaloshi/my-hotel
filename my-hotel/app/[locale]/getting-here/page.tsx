"use client";
import React, { useRef, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "@/components/getSection.module.css";
import Link from "next/link";
import AccordionItem from "@/components/AccordionItem";
import { useTranslations } from 'next-intl';

export default function GettingHerePage() {
  const t = useTranslations('GettingHere');
  
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true); 
  
  return (
    <div className={styles.pageWrapper}>
      <section className={styles.heroSection}>
        <Header forceSmall={true} />    
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
            {t('heroDescription')}
          </p>
        </div>
      </section>
      
      <div className={styles.buttonCenterWrapper}>
        <Link href="/car-rental" className={styles.button}>
          {t('rentCarButton')}
        </Link>
      </div>
      
      {/* Seksioni i Hartës */}
      <section className={styles.mapSection}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1366.4552221474034!2d12.102248154955856!3d46.76666167558675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477827d4a840e33d%3A0x2445e890b8c0704d!2sHotel%20Alpen%20Tesitin!5e0!3m2!1sen!2s!4v1769780743686!5m2!1sen!2s" 
          height="500"
          width="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={t('mapTitle')}
        ></iframe>
      </section>
      
      <section className={styles.tipsSection}>
        <div className={styles.tipsContent}>
          <h2 className={styles.tipsTitle}>{t('tips.title')}</h2>
          <p className={styles.tipsDescription}>
            {t.rich('tips.description', {
              link: (chunks) => <Link href="/live" className={styles.underlineLink}>{chunks}</Link>
            })}
          </p>
        </div>
      </section>
      
      <AccordionItem title={t('transportation.car.title')}>
        <p>{t('transportation.car.description')}</p>
      </AccordionItem>
      
      <AccordionItem title={t('transportation.train.title')}>
        <p>{t('transportation.train.description')}</p>
      </AccordionItem>
      
      <AccordionItem title={t('transportation.plane.title')}>
        <p>{t('transportation.plane.description')}</p>
      </AccordionItem>
      
      <AccordionItem title={t('transportation.helicopter.title')}>
        <p>{t.rich('transportation.helicopter.description', {
          link: (chunks) => <Link href="https://kronair.it/en/transfer-flight/" className={styles.underlineLink}>{chunks}</Link>
        })}</p>
      </AccordionItem>
      
      <AccordionItem title={t('transportation.shuttle.title')}>
        <p>{t.rich('transportation.shuttle.description', {
          link: (chunks) => <Link href="https://www.suedtiroltransfer.com/en" className={styles.underlineLink}>{chunks}</Link>
        })}</p>
      </AccordionItem>
      
      <Footer />
    </div>
  );
}