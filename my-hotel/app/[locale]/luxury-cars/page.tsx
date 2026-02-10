"use client";
import React, { useRef, useEffect, useState } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "@/components/carSection.module.css";
import Link from "next/link";
import AccordionItem from "@/components/AccordionItem";
import { useTranslations } from 'next-intl';

export default function LuxuryCarPage() {
  const t = useTranslations('CarPage');
  
  // Referenca për animacionin fade-up
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true); 
  

  const summerImages = [
    "/cars_summer1.jpg", 
    "/cars_summer2.jpg",
    "/cars_summer3.jpg" 
  ];

  const winterImages = [
    "/cars_summer1.jpg",
    "/cars_summer2.jpg",
    "/cars_summer3.jpg"
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
              link1: (chunks) => <a href="/photos-videos">{chunks}</a>,
              link2: (chunks) => <Link href="/car-rental">{chunks}</Link>
            })}
          </p>
        </div>
      </section>
      
      <section className={styles.noteSection}>
        <div className={styles.noteContent}>
          <h2 className={styles.noteTitle}>{t('note.title')}</h2>
          <p className={styles.noteText}>
            {t('note.text')}
          </p>
        </div>
      </section>
      
      <section className={styles.carSectionWrapper}>
        <div className={styles.carContainer}>
          {/* Kolona e Tekstit */}
          <div className={styles.carTextSide}>
            <h2 className={styles.carTitle}>
              {t('cars.mercedesPorsche.title')}
            </h2>
            <p className={styles.carDescription}>
              {t.rich('cars.mercedesPorsche.description', {
                strong: (chunks) => <strong>{chunks}</strong>
              })}
            </p>
          </div>
          <div className={styles.carImageSide}>
            <img 
              src="/mercedes1.jpg" 
              alt="Mercedes and Porsche" 
              className={styles.carImage}
            />
          </div>
        </div>
        
        <AccordionItem title={t('cars.mercedesPorsche.accordion.title')}>
          <p>{t('cars.mercedesPorsche.accordion.description')}</p>
          <div className={styles.tableWrapper}>
            <table className={styles.rentalTable}>
              <thead>
                <tr>
                  <th>{t('tableHeaders.duration')}</th>
                  <th>{t('tableHeaders.included')}</th>
                  <th>{t('tableHeaders.rate')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t('cars.mercedesPorsche.rentalOptions.halfDay.duration')}</td>
                  <td>{t('cars.mercedesPorsche.rentalOptions.halfDay.km')}</td>
                  <td>{t('cars.mercedesPorsche.rentalOptions.halfDay.price')}</td>
                </tr>
                <tr>
                  <td>{t('cars.mercedesPorsche.rentalOptions.fullDay.duration')}</td>
                  <td>{t('cars.mercedesPorsche.rentalOptions.fullDay.km')}</td>
                  <td>{t('cars.mercedesPorsche.rentalOptions.fullDay.price')}</td>
                </tr>
                <tr>
                  <td>{t('cars.mercedesPorsche.rentalOptions.threeDays.duration')}</td>
                  <td>{t('cars.mercedesPorsche.rentalOptions.threeDays.km')}</td>
                  <td>{t('cars.mercedesPorsche.rentalOptions.threeDays.price')}</td>
                </tr>
                <tr>
                  <td>{t('cars.mercedesPorsche.rentalOptions.sixDays.duration')}</td>
                  <td>{t('cars.mercedesPorsche.rentalOptions.sixDays.km')}</td>
                  <td>{t('cars.mercedesPorsche.rentalOptions.sixDays.price')}</td>
                </tr>
                <tr>
                  <td>{t('cars.mercedesPorsche.rentalOptions.tenDayPackage.duration')}</td>
                  <td>{t('cars.mercedesPorsche.rentalOptions.tenDayPackage.km')}</td>
                  <td>{t('cars.mercedesPorsche.rentalOptions.tenDayPackage.price')}</td>
                </tr>
              </tbody>
            </table>

            <div className={styles.footerInfo}>
              <p>{t('cars.mercedesPorsche.footer.extraKm')}</p>
              <p>{t('cars.mercedesPorsche.footer.fuel')}</p>
              <a href="/rental-contract.pdf" target="_blank" className={styles.contractLink}>
                {t('cars.mercedesPorsche.footer.contract')} <span>→</span>
              </a>
            </div>
          </div>
        </AccordionItem>
      </section>
      
      <section className={styles.carSectionWrapper}>
        {/* KËTU përdorim klasën Reverse */}
        <div className={styles.carContainerReverse}>
          {/* Kolona e Tekstit (tani do dalë djathtas) */}
          <div className={styles.carTextSide}>
            <h2 className={styles.carTitle}>
              {t('cars.lamborghini.title')}
            </h2>
            <p className={styles.carDescription}>
              {t('cars.lamborghini.description')}
            </p>
          </div>

          {/* Kolona e Fotos (tani do dalë majtas) */}
          <div className={styles.carImageSide}>
            <img 
              src="/lamborghini1.jpg" 
              alt="Lamborghini" 
              className={styles.carImage}
            />
          </div>
        </div>

        <AccordionItem title={t('cars.lamborghini.accordion.title')}>
          <p>{t('cars.lamborghini.accordion.description')}</p>
          <div className={styles.tableWrapper}>
            <table className={styles.rentalTable}>
              <thead>
                <tr>
                  <th>{t('tableHeaders.duration')}</th>
                  <th>{t('tableHeaders.included')}</th>
                  <th>{t('tableHeaders.rate')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t('cars.lamborghini.rentalOptions.halfDay.duration')}</td>
                  <td>{t('cars.lamborghini.rentalOptions.halfDay.km')}</td>
                  <td>{t('cars.lamborghini.rentalOptions.halfDay.price')}</td>
                </tr>
                <tr>
                  <td>{t('cars.lamborghini.rentalOptions.fullDay.duration')}</td>
                  <td>{t('cars.lamborghini.rentalOptions.fullDay.km')}</td>
                  <td>{t('cars.lamborghini.rentalOptions.fullDay.price')}</td>
                </tr>
                <tr>
                  <td>{t('cars.lamborghini.rentalOptions.threeDays.duration')}</td>
                  <td>{t('cars.lamborghini.rentalOptions.threeDays.km')}</td>
                  <td>{t('cars.lamborghini.rentalOptions.threeDays.price')}</td>
                </tr>
                <tr>
                  <td>{t('cars.lamborghini.rentalOptions.sixDays.duration')}</td>
                  <td>{t('cars.lamborghini.rentalOptions.sixDays.km')}</td>
                  <td>{t('cars.lamborghini.rentalOptions.sixDays.price')}</td>
                </tr>
                <tr>
                  <td>{t('cars.lamborghini.rentalOptions.tenDayPackage.duration')}</td>
                  <td>{t('cars.lamborghini.rentalOptions.tenDayPackage.km')}</td>
                  <td>{t('cars.lamborghini.rentalOptions.tenDayPackage.price')}</td>
                </tr>
              </tbody>
            </table>
            
            <div className={styles.footerInfo}>
              <p>{t('cars.lamborghini.footer.extraKm')}</p>
              <p>{t('cars.lamborghini.footer.fuel')}</p>
              <a href="/rental-contract-lambo.pdf" target="_blank" className={styles.contractLink}>
                {t('cars.lamborghini.footer.contract')} <span>→</span>
              </a>
            </div>
          </div>  
        </AccordionItem>
      </section>
      
      <Footer />
    </div>
  );
}