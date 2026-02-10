"use client";
import React, { useRef, useEffect, useState } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "@/components/treatmentSection.module.css";
import Link from "next/link";
interface Treatment {
  id: number;
  category: string;
  treatment_name: string;
  price_euro: number;
  duration_min: number;
  description: string;
}

export default function TreatmentsPage() {
const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');

  // 1. Marrja e të dhënave nga API
  useEffect(() => {
    fetch('/api/treatments')
      .then(res => res.json())
      .then(data => setTreatments(data));
  }, []);

  // 2. Nxjerra e kategorive unike për filtrat
  const categories = ['All', ...new Set(treatments.map(t => t.category))];

  // 3. Filtrimi i listës
  const filteredList = activeFilter === 'All' 
    ? treatments 
    : treatments.filter(t => t.category === activeFilter);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true); 
  
  const summerImages = [
    "/treatment_summer1.jpg", 
    "/treatment_summer2.jpg",
    "/treatment_summer3.jpg"
  ];

  const winterImages = [
    "/treatment_summer1.jpg",
    "/treatment_summer2.jpg",
    "/treatment_summer3.jpg"
  ];

 
    return (
  <div className={styles.pagewrapper}>
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
          Moments of luxurious pampering
        </h1>
        <p className={styles.whiteText}>
         At the Alpen Tesitin, each treatment is carried out with sensitivity and care. Our <strong>experienced spa staff</strong> intuitively focus in on your personal needs and offer you tailored<Link href="/relax" className={styles.link}> wellness experiences </Link>for profound well-being. Savour this taste of bliss and carry it back home to sweeten your everyday life.
        </p>
      </div>
    </section>

    {/* Sticky Section - imazhi majtas, content djathtas */}
    <section className={styles.stickySectionWrapper}>
 
    <div className={styles.imageSection}>
      <img 
        src="/spa-background.jpg" 
        className={styles.stickyImage} 
        alt="Spa Layout" 
      />
    </div>

    <div className={styles.contentSection}>
      <div className={styles.filterContainer}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`${styles.filterButton} ${activeFilter === cat ? styles.activeFilter : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.listContainer}>
        {filteredList.map((item: any) => (
        <div key={item.id} className={styles.treatmentItem}>
            <p>{item.category}</p>
            <h2>{item.treatment_name}</h2>
            <p>€{item.price_euro} | approx. {item.duration_min} min.</p>
            <p>{item.description}</p>
            <button onClick={() => {
      
      const treatmentName = encodeURIComponent(item.treatment_name);
      window.location.href = `/enquire?treatment=${treatmentName}`;
    }}>
      Enquire
    </button>
          </div>
        ))}
      </div>
    </div>
 
</section>
    <Footer />
  </div>
);
}