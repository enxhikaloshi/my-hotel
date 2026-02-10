"use client";
import React, { useRef, useEffect, useState } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InfoSection, { InfoItem } from "@/components/InfoSection"; 
import styles from "@/components/LiveSection.module.css";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import SectionComponent from "@/components/SectionComponent";
import CustomCarousel from "@/components/CustomCarousel";

export default function InclusiveServicesPage() {
  const t = useTranslations('HikingPage');
  const locale = useLocale();
  
  // Referenca për animacionin fade-up
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true); 
  const climbingImages = [
   
    "/climbing_summer1.jpg",
    "/climbing_summer2.jpg",
    "/climbing_summer3.jpg",
    "/climbing_summer4.jpg",
    "/climbingsummer_1.jpg",
    "/climbingsummer_2.jpg",
    "/climbingsummer_3.jpg"
  ];

  const summerImages = [
    "/climbing_summer1.jpg", 
    "/climbing_summer2.jpg",
    "/climbing_summer3.jpg",
    "/climbing_summer4.jpg"
  ];

  const winterImages = [
    "/climbing_summer1.jpg",
    "/climbing_summer2.jpg",
    "/climbing_summer3.jpg",
    "/climbing_summer4.jpg",
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
          Scale the rockfaces of the Dolomites!
        </h2>
          <p className={styles.introhiking}>
  In the Dolomites UNESCO World Heritage – one of the world’s most impressive mountain ranges – challenging climbing routes await you alongside scenic <Link href='/hiking'className={styles.link}>hiking paths.</Link>  Vertical rockface, varied adventure park, or modern climbing hall – what do you want to conquer today? </p>
        </div>
      </section>
      <SectionComponent 
  title="Climbing parks"
  description="If you’re looking for a challenge, you’ll find it while negotiating rugged rockfaces – in the<strong> Lake Braies/Pragser Wildsee, Valle della Rienza/Rienztal,</strong> or <strong>Mt Picco di Vallandro/Dürrenstein</strong> climbing parks, for instance."
  bgColor="#E3DAC9" 
  textColor="black" 
/>
<SectionComponent 
  title="Via ferratas"
  description="These routes fitted with cables, ladders, and iron stirrups in<strong> Valle di Landro/Höhlensteintal,</strong> the <strong>Sexten Dolomites, </strong>and<strong> Valle di Braies/Pragser Tal </strong>promise unforgettable adventures at lofty heights."
  bgColor="#1a2b3c" 
  textColor="#ffffff" 
/>
<SectionComponent 
  title="Climbing halls"
  description="The climbing halls in surrounding towns and villages such as <strong>Bruneck, Toblach,</strong> or <strong>Sexten</strong> await you with experienced instructors who will teach you to climb or refine your technique."
  bgColor="#ffffff" 
  textColor="black" 
/>
<SectionComponent 
  title="High ropes courses"
  description="Adventure fans of all ages will be in seventh heaven at the high ropes courses in<strong> Issing near Pfalzen</strong> and in<strong> Toblach.</strong> From swinging rope bridges and wobbly planks to exhilarating flying foxes, you’ll find plenty to test your skills here."
  bgColor="#E3DAC9" 
  textColor="black" 
/>
      <CustomCarousel images={climbingImages} />

     <SectionComponent 
  title=" More tips for active fun?"
  bgColor="#1a2b3c" 
  textColor="#ffffff"
  buttonText="Read more"
  buttonLink="/climbing"
  btnBgColor="#ffffff"   
  btnTextColor="#000000" 
/> 

    
      
      
      <Footer />
    </div>
  );
}