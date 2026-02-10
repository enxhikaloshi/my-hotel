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
    "/hiking_summer1.jpg", 
    "/hiking_summer2.jpg",
    "/hiking_summer3.jpg"
  ];

  const winterImages = [
    "/hiking_summer1.jpg",
    "/hiking_summer2.jpg",
    "/hiking_summer3.jpg"
  ];

  const poolData: InfoItem[] = [
    {
      title: "A new experience every day at our hiking hotel in South Tyrol",
      text:" From our hiking hotel in Val Pusteria/Pustertal, you can hike directly up Mt Luta/Lutterkopf and Mt Dura/Durakopf or to Malga di Tesido/Taistner Alm pasture (ideal for families). From the Prato Piazza/Plätzwiese high plateau you can head up Mt Specie/Strudelkopf with views of the Three Peaks. And the hike on the Almweg 2000 trail in Val Casies/Gsieser Tal gives you insights into the untamed natural landscape and leads past rustic mountain huts where traditional South Tyrolean specialities are served.",
      image: "/hiking_info1.jpg",
      bgColor: "#ffffff"
    },
    {
      title: "Prefer a more leisurely pace?",
      text: "You don’t necessarily have to head out hiking in the Dolomites to enjoy spectacular views of the Pale Mountains: The Dolomites Panorama Trail in Welsberg offers fantastic views of the UNESCO World Heritage and is a paradise for snap-happy adventurers. You can both relax and have fun on the pyramid Kneipp path along the Rudlbach river, which begins directly in Taisten and is popular with all ages.",
      image: "/hiking_info2.jpg",
      bgColor: "#1a2b3c"
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
        <div className={styles.whiteSectionhiking}>
             <h2 className={styles.titlehiking}>
          Your hiking hotel in Val Pusteria/Pustertal
        </h2>
          <p className={styles.introhiking}>
          Alta Pusteria/Hochpustertal – a place where majestic peaks, picturesque valleys, and unspoilt nature trails invite you to explore on foot. Set amidst uniquely beautiful scenery and with a rich Alpine history, the Dolomites region around Mt Plan de Corones/Kronplatz and our<strong> hiking hotel in Val Pusteria/Pustertal </strong>offers a multitude of hiking trails where adventures await, no matter your fitness level. From gentle walks past flower-filled Alpine meadows to challenging summit climbs, unforgettable moments of discovery, insight, and relaxation await you.Our service for hikers
        </p>
        </div>
      </section>
      <section className={styles.container}>
      <div className={styles.wrapper}>
       <h2 className={styles.title}>Our service for hikers</h2>
        <ul className={styles.list}>
          <li>Our hiking hotel in South Tyrol offers<strong> 10 guided hikes, mountain tours, or adventurous excursions per week</strong>
          </li>

          <li><strong>Rental of hiking and Nordic walking poles,</strong> rucksacks, water bottles, heart-rate watches, and hiking maps</li>
          
          <li>Special conditions for participation in events and hikes organised by the tourist association thanks to your personal<strong> GUEST PASS</strong> (available at the reception)</li>
          <li>You’ll receive<strong> all photos </strong>taken by the guide of our hiking hotel in Val Pusteria/Pustertal during the tours via e-mail or on a USB stick.</li>
          <li>A beautiful <strong>hiking map</strong> with our best tips as a present</li>
        
        </ul>

      
      </div>
    </section>
      

      <InfoSection data={poolData} />
    
      <section className={`${styles.containerr} ${styles.greyBg}`}>
        <div className={styles.contenthiking}>
          <h2 className={styles.titleee}>The best day-trip destinations around our hiking hotel in South Tyrol?</h2>
          <h3>We’ll be delighted to share them with you when you arrive at our hiking hotel in Val Pusteria/Pustertal. You can get a little taste of what awaits you online in our Guestnet.</h3>
          <Link href="/tips" className={styles.buttonreadmore}>
            Read More
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}