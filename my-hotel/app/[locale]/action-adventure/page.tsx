"use client";
import React, { useRef, useEffect, useState } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "@/components/LiveSection.module.css";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import SectionComponent from "@/components/SectionComponent";

import SideSection from "@/components/SideSection";

export default function InclusiveServicesPage() {
  const t = useTranslations('HikingPage');
  const locale = useLocale();
  
  // Referenca për animacionin fade-up
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true); 
  const cuisineItems = [
  { 
    title:"White-water sports", 
    imageUrl: "/action_adventure1.jpg", 
    description: "The Aurino/Ahr, Drava/Drau, and rushing mountain rivers offer you the chance to enjoy thrilling white-water adventures like rafting, kayaking, and canyoning."
  },
  { 
    title: "Paragliding", 
    imageUrl: "/active_summer1.jpg", 
    description: "If you want to get a bird’s eye view of the world, make your way up to the summit of Mt Plan de Corones/Kronplatz and enjoy a tandem flight over the valley basin around Bruneck with an experienced professional. Available in winter, too."
  },
  {
    title: "Helicopter flights", 
    imageUrl: "/active3.jpg",
    description: "Whether it’s a romantic excursion with your sweetheart, an exciting discovery tour with friends, or a sightseeing tour to Lake Braies/Pragser Wildsee, the Three Peaks, or other attractions – the views will leave you speechless."
  }
];
  

  const summerImages = [
    "/active_summer1.jpg", 
    "/active_summer2.jpg",
    "/active_summer3.jpg"
  ];

  const winterImages = [
    "/active_summer1.jpg",
    "/active_summer2.jpg",
    "/active_summer3.jpg"
    
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
        Sunshine, mountains, and much more besides
        </h2>
          <p className={styles.introhiking}>
 What is it that makes a holiday in the Dolomites so special? Is it the colourful display that takes over the sky every day at sunrise and sunset? Or the romantic paths that wend their way over lush Alpine meadows and past striking peaks? Perhaps it’s also the warm hospitality of the locals or the region’s mouth-watering cuisine? Here at the <Link href='/homepage' className={styles.link}> Alpen Tesitin,</Link> we can’t quite make up our minds, but one thing is certain: It must be the perfect mix of all these things. And we mustn’t forget the myriad <strong>activities that make the Dolomites the ultimate active paradise.</strong> You’ll find an overview of the top action and adventure sports here.</p>
        </div>
      </section>
   
      <SideSection 
        items={cuisineItems} 
        backgroundColor="#e8e5e0" 
      />

     <SectionComponent 
  title=" Even more adventures?"
  bgColor="#1a2b3c" 
  textColor="#ffffff"
  buttonText="Right here"
  buttonLink="/action-adventure"
  btnBgColor="#ffffff"   
  btnTextColor="#000000" 
/> 
  
      <Footer />
    </div>
  );
}