"use client";
import  { useRef,  useState } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "@/components/summerSection.module.css";
import Link from "next/link";
import Image from 'next/image';
import SideSection from "@/components/SideSection";
import AccordionItem from "@/components/AccordionItem";
import { useTranslations } from 'next-intl';

export default function SummerPage() {
  const t = useTranslations('SummerPage');
  
  // Referenca për animacionin fade-up
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true); 
 
  
  const summerImages = [
    "/summer_summer1.png", 
    "/summer_summer2.png",
    "/summer_summer3.png",
    "/summer_summer4.png"
  ];

  const winterImages = [
    "/summer_summer1.png",
    "/summer_summer2.png",
    "/summer_summer3.png",
    "/summer_summer4.png"
  ];
  
  const gymActivities = [
    { 
      title: t('activities.hiking.title'), 
      imageUrl: "/biking1.png", 
      linkHref: "/hiking" 
    },
    { 
      title: t('activities.biking.title'), 
      imageUrl: "/hiking1.png", 
      linkHref: "/biking" 
    },
    { 
      title: t('activities.climbing.title'), 
      imageUrl: "/climbing1.png", 
      linkHref: "/climbing" 
    },
    {
      title: t('activities.action.title'),
      imageUrl: "/action_adventure1.jpg",
      linkHref: "/action-adventure"
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
              link1: (chunks) => <Link className={styles.link} href="/Photos-videos">{chunks}</Link>,
              strong: (chunks) => <strong>{chunks}</strong>,
              link2: (chunks) => <Link className={styles.link} href="/experience/hiking">{chunks}</Link>
            })}
          </p>
        </div>
      </section>
      
      <section className={styles.section}>
        {/* Text Content */}
        <div className={styles.content}>
          <h2 className={styles.title}>{t('weeklyProgramme.title')}</h2>
          
          <p className={styles.description}>
            {t('weeklyProgramme.description')}
          </p>
          
          <Link href="/weekly-programme" className={styles.linkk}>
            {t('weeklyProgramme.link')}
            <span>→</span>
          </Link>
        </div>

        {/* Image Side */}
        <div className={styles.imageWrapper}>
          <Image
            src="/mountain.png" 
            alt="Mountain hotel landscape"
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>
      
      <SideSection items={gymActivities} />
      
      <section 
        ref={sectionRef}
        className={`${styles.whiteSection} ${isVisible ? styles.fadeUpActive : styles.fadeUpHidden}`}
      >
        <div className={styles.whiteSectionContent}>
          <h1 className={styles.whiteTitle}>
            {t('golf.title')}
          </h1>
          <p className={styles.whiteText}>
            {t('golf.description')}
          </p>
        </div>
      </section>
      
      <section className={styles.divider}>
        <AccordionItem title={t('golfClubs.pustertal.title')}>
          <p>{t.rich('golfClubs.pustertal.description', {
            strong: (chunks) => <strong>{chunks}</strong>
          })}</p>
        </AccordionItem>

        <AccordionItem title={t('golfClubs.mirabell.title')}>
          <p>{t.rich('golfClubs.mirabell.description', {
            strong: (chunks) => <strong>{chunks}</strong>
          })}</p>
        </AccordionItem>

        <AccordionItem title={t('golfClubs.dolomitengolf.title')}>
          <p>{t.rich('golfClubs.dolomitengolf.description', {
            strong: (chunks) => <strong>{chunks}</strong>
          })}</p>
        </AccordionItem>

        <AccordionItem title={t('golfClubs.cortina.title')}>
          <p>{t.rich('golfClubs.cortina.description', {
            strong: (chunks) => <strong>{chunks}</strong>
          })}</p>
        </AccordionItem>
        
        <AccordionItem title={t('golfClubs.altaBadia.title')}>
          <p>{t.rich('golfClubs.altaBadia.description', {
            strong: (chunks) => <strong>{chunks}</strong>
          })}</p>
        </AccordionItem>
      </section>
      
      <section className={styles.containerr}>
        <div className={styles.content}>
          <h2 className={styles.title}>{t('tennis.title')}</h2>
          
          <p className={styles.text}>
            {t.rich('tennis.description', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}
          </p>
        </div>
      </section>
      
      <section className={`${styles.containerr} ${styles.whiteBg}`}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            {t('guestPass.title')}
          </h2>
          
          <p className={styles.text}>
            {t('guestPass.description')}
          </p>
        </div>
      </section>
      
      <section className={`${styles.containerr} ${styles.greyBg}`}>
        <div className={styles.content}>
          <h2 className={styles.title}>{t('tips.title')}</h2>
          
          <Link href="/tips" className={styles.buttonreadmore}>
            {t('tips.button')}
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}