"use client";
import HeroCarousel from "@/components/HeroCarousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "@/components/inclusiveServices.module.css";
import Link from "next/link";
import AccordionItem from "@/components/AccordionItem";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from 'next-intl';

export default function InclusiveServicesPage() {
  const t = useTranslations('InclusiveServicesPage');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  const summerImages = [
    "/inclusive_summer1.png", 
    "/inclusive_summer2.png",
    "/inclusive_summer3.png",
    "/inclusive_summer4.png"
  ];

  const winterImages = [
    "/inclusive_winter1.png",
    "/inclusive_winter2.png",
    "/inclusive_winter3.png",
    "/inclusive_winter4.png"
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  
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
       <div className={styles.whiteSection}>
        <div className={styles.whiteSectionContent}>
          <h1 className={styles.whiteTitle}>
            {t('heroTitle')}
          </h1>
          <p className={styles.whiteText}>
            {t.rich('heroDescription', {
              strong: (chunks) => <strong>{chunks}</strong>,
              link: (chunks) => <Link className={styles.link} href="/experience">{chunks}</Link>
            })}
          </p>
        </div>
        </div>
      </section>
      
      <section className={styles.divider}>
        <AccordionItem title={t('accordion.cuisine.title')}>
          <p>{t.rich('accordion.cuisine.intro', {
            strong: (chunks) => <strong>{chunks}</strong>
          })}</p>
          
          <strong>{t('accordion.cuisine.breakfast.title')}</strong>
          <ul>
            <li>{t('accordion.cuisine.breakfast.items.item1')}</li>
            <li>{t.rich('accordion.cuisine.breakfast.items.item2', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
          </ul>
          
          <strong>{t('accordion.cuisine.lunch.title')}</strong>
          <ul>
            <li>{t('accordion.cuisine.lunch.items.item1')}</li>
            <li>{t('accordion.cuisine.lunch.items.item2')}</li>
            <li>{t('accordion.cuisine.lunch.items.item3')}</li>
            <li>{t('accordion.cuisine.lunch.items.item4')}</li>
          </ul>
          
          <strong>{t('accordion.cuisine.dinner.title')}</strong>
          <ul>
            <li>{t('accordion.cuisine.dinner.items.item1')}</li>
          </ul>
          
          <strong>{t('accordion.cuisine.indulgence.title')}</strong>
          <ul>
            <li>{t.rich('accordion.cuisine.indulgence.items.item1', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.cuisine.indulgence.items.item2', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.cuisine.indulgence.items.item3', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
          </ul>
        </AccordionItem>

        <AccordionItem title={t('accordion.activities.title')}>
          <p>{t.rich('accordion.activities.intro', {
            strong: (chunks) => <strong>{chunks}</strong>
          })}</p>
          
          <p>{t('accordion.activities.summer.title')}</p>
          <ul>
            <li>{t.rich('accordion.activities.summer.items.item1', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.activities.summer.items.item2', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.activities.summer.items.item3', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.activities.summer.items.item4', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.activities.summer.items.item5', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
          </ul> 
          
          <p>{t('accordion.activities.winter.title')}</p>
          <ul>
            <li>{t.rich('accordion.activities.winter.items.item1', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.activities.winter.items.item2', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.activities.winter.items.item3', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
          </ul>
          
          <p>{t('accordion.activities.yearRound.title')}</p>
          <ul>
            <li>{t.rich('accordion.activities.yearRound.items.item1', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.activities.yearRound.items.item2', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.activities.yearRound.items.item3', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.activities.yearRound.items.item4', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.activities.yearRound.items.item5', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.activities.yearRound.items.item6', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.activities.yearRound.items.item7', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.activities.yearRound.items.item8', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t('accordion.activities.yearRound.items.item9')}</li>
          </ul> 
        </AccordionItem>

        <AccordionItem title={t('accordion.wellness.title')}>
          <p>{t('accordion.wellness.intro')}</p>
          <ul>
            <li>{t('accordion.wellness.items.item1')}</li>
            <li>{t.rich('accordion.wellness.items.item2', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.wellness.items.item3', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.wellness.items.item4', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.wellness.items.item5', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.wellness.items.item6', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.wellness.items.item7', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.wellness.items.item8', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t('accordion.wellness.items.item9')}</li>
            <li>{t.rich('accordion.wellness.items.item10', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.wellness.items.item11', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.wellness.items.item12', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.wellness.items.item13', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.wellness.items.item14', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.wellness.items.item15', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.wellness.items.item16', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.wellness.items.item17', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t('accordion.wellness.items.item18')}</li>
          </ul>
        </AccordionItem>

        <AccordionItem title={t('accordion.kids.title')}>
          <p>{t('accordion.kids.intro')}</p>
          <ul>
            <li>{t('accordion.kids.items.item1')}</li>
            <li>{t.rich('accordion.kids.items.item2', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.kids.items.item3', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t.rich('accordion.kids.items.item4', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</li>
            <li>{t('accordion.kids.items.item5')}</li>
            <li>{t('accordion.kids.items.item6')}</li>
           </ul>
        </AccordionItem>
      </section>

      <Footer />
    </div>
  );
}