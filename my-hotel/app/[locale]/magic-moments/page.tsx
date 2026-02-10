'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from '@/components/moments.module.css';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function MagicMoments() {
  const t = useTranslations('MagicMoments');

  return (
    <>
      <Header forceSmall={true} />
      
      <section className={styles.heroContainer}>
        <h1 className={styles.title}>{t('heroTitle')}</h1>
        
        <div className={styles.descriptionWrapper}>
          <p className={styles.description}>
            {t.rich('heroDescription', {
              link: (chunks) => <Link href="/homepage" className={styles.linkText}>{chunks}</Link>
            })}
          </p>
        </div>
      </section>
      
      <div className={styles.testimonialSection}>
        {/* Kolona e Tekstit */}
        <div className={styles.contentSide}>
          <div className={styles.textBlock}>
            <p>{t('testimonial.greeting1')}</p>
            <p>{t('testimonial.greeting2')}</p>
            <p>{t('testimonial.message')}</p>
            <p>{t('testimonial.compliment')}</p>
            <p>{t('testimonial.promise')}</p>
            <p>{t('testimonial.closing')}</p>
          </div>

          <div className={styles.signature}>
            <h4><strong>{t('testimonial.signature')}</strong></h4>
            <img 
              src="/gennetay1.jpg" 
              alt="Family" 
              className={styles.avatar} 
            />
          </div>
        </div>

        {/* Kolona e Imazhit me Fade */}
        <div className={styles.imageSide}></div>
      </div>

      <Footer />
    </>
  );
}