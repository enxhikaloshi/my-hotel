"use client";
import React, { useRef, useEffect, useState } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InfoSection, { InfoItem } from "@/components/InfoSection"; 
import styles from "@/components/LiveSection.module.css";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';

export default function InclusiveServicesPage() {
  const t = useTranslations('HikingPage');
  const locale = useLocale();
  
  // Referenca për animacionin fade-up
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true); 
  

  const summerImages = [
    "/biking_summer1.jpg", 
    "/biking_summer2.jpg",
    "/biking_summer3.jpg"
  ];

  const winterImages = [
    "/biking_summer1.jpg",
    "/biking_summer2.jpg",
    "/biking_summer3.jpg"
  ];

  const poolData: InfoItem[] = [
    {
      title: "We’ve thought of everything!",
      text:" Mountain bikes  are available for you to use free of charge during your stay. You can rent e-bikes and fully e-bikes for an additional fee for half a day or a full day at our (e-)bike hotel in South Tyrol. To reserve your bike or for further information, just contact our reception team.",
      image: "/biking_summer3.jpg",
      bgColor: "#E3DAC9"
    },
  
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
        <div className={styles.whiteSectionhiking}>
             <h2 className={styles.titlehiking}>
          Alpen Tesitin: your bike hotel in Val Pusteria/Pustertal
        </h2>
          <p className={styles.introhiking}>
Gripping – that’s the best way to describe the MTB experiences in the Dolomites. Gentle paths across Alpine meadows and narrow trails set the stage for a spectacular summer holiday in the Alps. North of our<Link href='/homepage' className={styles.link}>Hotel Alpen Tesitin, </Link> <strong>the Gruppo delle Vedrette di Ries/Riesenfernergruppe and Val di Casies/Gsieser mountains</strong> beckon, while<strong> Mt Plan de Corones/Kronplatz</strong> and the<strong> Dolomites peaks</strong> in the<strong> Fanes-Senes-Braies/Fanes-Sennes-Prags Nature Park</strong> and in the <strong>Three Peaks Nature Park</strong> reach high into the sky to the south. What they all have in common: They invite nature lovers and bike fans to enjoy one-of-a-kind adventures. With the Dolomites on one side and the main Alpine ridge on the other, any MTB tour can’t help but be an unforgettable experience!        </p>
        </div>
      </section>
      
      

      <InfoSection data={poolData} />
    
      <section className={`${styles.containerr} ${styles.greyBg}`}>
        <div className={styles.contenthiking}>
          <h2 className={styles.titleee}>The best tours on your bike holiday in South Tyrol?</h2>
          <h3>We’ll be delighted to share them with you when you arrive. You can get a little taste of what awaits you online in our Guestnet.</h3>
          <Link href="/tips" className={styles.buttonreadmore}>
            Read More
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}