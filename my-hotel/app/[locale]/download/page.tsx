'use client';
import SmallHeader from '@/components/Smallheader';
import Footer from '@/components/Footer';
import styles from '@/components/downloads.module.css';
import { ArrowDownToLine } from 'lucide-react';

export default function DownloadPage() {
  const downloads = [
    { 
      id: 1, 
      title: 'Beauty catalog', 
      file: '/AlpenTesitin_Beautybroschure_2025_EN_WEB.pdf' 
    },
    { 
      id: 2, 
      title: 'Summer image brochure', 
      file: '/AlpenTesitin_Imagebroschure_Sommer_2025_EN_WEB.pdf' 
    },
    { 
      id: 3, 
      title: 'Winter image brochure', 
      file: '/Alpen_Tesitin_Imagebroschüre_Winter_2025_WEB_EN.pdf' 
    },
  ];

  return (
    <div className={styles.container}>
      <SmallHeader />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Welcome to our download page!</h1>
          <p className={styles.subTitle}>
            Dive into the world of the Alpen Tesitin and get ready for an unforgettable journey. 
            Our downloads let you experience our rich <span className={styles.underline}>hospitality</span> in digital form, too!
          </p>
        </section>

        <div className={styles.downloadGrid}>
          {downloads.map((item) => (
            <div key={item.id} className={styles.downloadCard}>
              <div className={styles.iconCircle}>
                <ArrowDownToLine size={24} strokeWidth={1.5} />
              </div>
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{item.title}</h2>
              
                <a href={item.file} download className={styles.downloadLink}>
                  download &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}