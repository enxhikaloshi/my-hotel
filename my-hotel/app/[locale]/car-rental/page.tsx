"use client";
import React, { useRef, useEffect, useState } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "@/components/carSection.module.css";
import AccordionItem from "@/components/AccordionItem";
import { useTranslations, useLocale } from 'next-intl';
import SEO from '@/components/SEO'; 

export default function InclusiveServicesPage() {
  const t = useTranslations('CarRentalPage');
 const tMetadata = useTranslations('metadata');

  const locale = useLocale();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true); 
  
  // Shto këto variabla për SEO
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alpentesitin.com';
  const pageUrl = `${siteUrl}/${locale}/car-rental`;
  
  // Structured data për car rental (i thjeshtë)
  const carRentalStructuredData = {
    "@context": "https://schema.org",
    "@type": "CarRentalService",
    "name": "Alpen Tesitin Hotel Car Rental",
    "description": "Luxury car rental service at Alpen Tesitin Hotel in Dolomites",
    "url": pageUrl,
    "telephone": "+39-0474-XXXXXX"
  };

  const summerImages = [
    "/car_rental1.jpg",
    "/car_rental2.jpg"
  ];

  const winterImages = [
    "/car_rental1.jpg",
    "/car_rental2.jpg"
  ];

  return (
    <div className={styles.pageWrapper}>
      {/* Shto komponentin SEO në fillim */}
      <SEO
        title="Luxury Car Rental | Alpen Tesitin Hotel Dolomites"
        description="Premium car rental service at Alpen Tesitin Hotel. Rent Porsche, Mercedes, BMW, Lamborghini and VW Polo in the Dolomites."
        keywords="car rental Dolomites, luxury car rental, Porsche rental, Mercedes rental, BMW rental"
        url={pageUrl}
        locale={locale === 'en' ? 'en_US' : locale === 'it' ? 'it_IT' : 'de_DE'}
        structuredData={carRentalStructuredData}
      />

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
            {t('title')}
          </h1>
          <p className={styles.whiteText}>
            {t('description')}
          </p>
          <p className={styles.whiteText}>
            {t('note')}
          </p>
        </div>
      </section>

      <AccordionItem title={t('vwPolo.title')}>
        <p>{t('vwPolo.description')}</p>
        <div className={styles.footerInfo}>
          <a href={`/rental-contract.pdf`} target="_blank" className={styles.contractLink}>
            {t('seeContract')} <span>→</span>
          </a>
        </div>
      </AccordionItem>

      <AccordionItem title={t('bmwIx.title')}>
        <p>{t('bmwIx.description')}</p>
        <div className={styles.footerInfo}>
          <a href={`/rental-contract.pdf`} target="_blank" className={styles.contractLink}>
            {t('seeContract')} <span>→</span>
          </a>
        </div>
      </AccordionItem>

      <AccordionItem title={t('mercedesG500.title')}>
        <p>{t('mercedesG500.description')}</p>
        <div className={styles.footerInfo}>
          <a href={`/rental-contract.pdf`} target="_blank" className={styles.contractLink}>
            {t('seeContract')} <span>→</span>
          </a>
        </div>
      </AccordionItem>

      <AccordionItem title={t('porsche911.title')}>
        <p>{t('porsche911.intro')}</p>
        <div className={styles.tableWrapper}>
          <table className={styles.rentalTable}>
            <thead>
              <tr>
                <th>{t('table.rentalDuration')}</th>
                <th>{t('table.included')}</th>
                <th>{t('table.rate')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t('porsche911.halfDay')}</td>
                <td>{t('porsche911.km150')}</td>
                <td>{t('porsche911.price330')}</td>
              </tr>
              <tr>
                <td>{t('porsche911.oneDay')}</td>
                <td>{t('porsche911.km250')}</td>
                <td>{t('porsche911.price500')}</td>
              </tr>
              <tr>
                <td>{t('porsche911.threeDays')}</td>
                <td>{t('porsche911.km700')}</td>
                <td>{t('porsche911.price1250')}</td>
              </tr>
              <tr>
                <td>{t('porsche911.sixDays')}</td>
                <td>{t('porsche911.km1400')}</td>
                <td>{t('porsche911.price2400')}</td>
              </tr>
              <tr>
                <td>{t('porsche911.tenDayPackage')}</td>
                <td>{t('porsche911.km2200')}</td>
                <td>{t('porsche911.price3700')}</td>
              </tr>
            </tbody>
          </table>

          <div className={styles.footerInfo}>
            <p>{t('porsche911.additionalKm')}</p>
            <p>{t('porsche911.petrol')}</p>
            <a href={`/rental-contract.pdf`} target="_blank" className={styles.contractLink}>
              {t('seeContract')} <span>→</span>
            </a>
          </div>
        </div>
      </AccordionItem>

      <AccordionItem title={t('mercedesAMG.title')}>
        <p>{t('mercedesAMG.intro')}</p>
        <div className={styles.tableWrapper}>
          <table className={styles.rentalTable}>
            <thead>
              <tr>
                <th>{t('table.rentalDuration')}</th>
                <th>{t('table.included')}</th>
                <th>{t('table.rate')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t('mercedesAMG.halfDay')}</td>
                <td>{t('mercedesAMG.km150')}</td>
                <td>{t('mercedesAMG.price330')}</td>
              </tr>
              <tr>
                <td>{t('mercedesAMG.oneDay')}</td>
                <td>{t('mercedesAMG.km250')}</td>
                <td>{t('mercedesAMG.price500')}</td>
              </tr>
              <tr>
                <td>{t('mercedesAMG.threeDays')}</td>
                <td>{t('mercedesAMG.km700')}</td>
                <td>{t('mercedesAMG.price1250')}</td>
              </tr>
              <tr>
                <td>{t('mercedesAMG.sixDays')}</td>
                <td>{t('mercedesAMG.km1400')}</td>
                <td>{t('mercedesAMG.price2400')}</td>
              </tr>
              <tr>
                <td>{t('mercedesAMG.tenDayPackage')}</td>
                <td>{t('mercedesAMG.km2200')}</td>
                <td>{t('mercedesAMG.price3700')}</td>
              </tr>
            </tbody>
          </table>

          <div className={styles.footerInfo}>
            <p>{t('mercedesAMG.additionalKm')}</p>
            <p>{t('mercedesAMG.petrol')}</p>
            <a href={`/rental-contract.pdf`} target="_blank" className={styles.contractLink}>
              {t('seeContract')} <span>→</span>
            </a>
          </div>
        </div>
      </AccordionItem>

      <AccordionItem title={t('lamborghini.title')}>
        <p>{t('lamborghini.intro')}</p>
        <div className={styles.tableWrapper}>
          <table className={styles.rentalTable}>
            <thead>
              <tr>
                <th>{t('table.rentalDuration')}</th>
                <th>{t('table.included')}</th>
                <th>{t('table.rate')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t('lamborghini.halfDay')}</td>
                <td>{t('lamborghini.km150')}</td>
                <td>{t('lamborghini.price620')}</td>
              </tr>
              <tr>
                <td>{t('lamborghini.oneDay')}</td>
                <td>{t('lamborghini.km250')}</td>
                <td>{t('lamborghini.price990')}</td>
              </tr>
              <tr>
                <td>{t('lamborghini.threeDays')}</td>
                <td>{t('lamborghini.km700')}</td>
                <td>{t('lamborghini.price2550')}</td>
              </tr>
              <tr>
                <td>{t('lamborghini.sixDays')}</td>
                <td>{t('lamborghini.km1400')}</td>
                <td>{t('lamborghini.price5000')}</td>
              </tr>
              <tr>
                <td>{t('lamborghini.tenDayPackage')}</td>
                <td>{t('lamborghini.km2200')}</td>
                <td>{t('lamborghini.price8200')}</td>
              </tr>
            </tbody>
          </table>

          <div className={styles.footerInfo}>
            <p>{t('lamborghini.additionalKm')}</p>
            <p>{t('lamborghini.petrol')}</p>
            <a href={`/rental-contract-lambo.pdf`} target="_blank" className={styles.contractLink}>
              {t('seeContract')} <span>→</span>
            </a>
          </div>
        </div>
      </AccordionItem>

      <section className={styles.responsibilitySection}>
        <div className={styles.responsibilityContainer}>
          <div className={styles.responsibilityText}>
            <h3 className={styles.responsibilityTitle}>{t('responsibility.title')}</h3>
            <p className={styles.responsibilityQuote}>
              {t('responsibility.quote')}
            </p>
            <p className={styles.signature}>{t('responsibility.signature')}</p>
            <div className={styles.logoCircle}>
              <span>AT</span>
            </div>
          </div>

          <div className={styles.responsibilityImage}>
            <img src="/tree1.png" alt="Sustainability Tree" />
          </div>
        </div>
      </section>

      <section className={styles.carGallerySection}>
        <div className={styles.carGrid}>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className={styles.carItem}>
              <img src={`/cars${num}.jpg`} alt={`Car ${num}`} />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.noteSection}>
        <div className={styles.noteContent}>
          <h2 className={styles.noteTitle}>{t('voucher.title')}</h2>
          <h3 className={styles.noteTitlee}>{t('voucher.subtitle')}</h3>
          <p className={styles.noteText}>
            {t('voucher.description')}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}