"use client";
import React, { useRef, useEffect, useState } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "@/components/hairSection.module.css";
import AccordionItem from "@/components/AccordionItem";


export default function InclusiveServicesPage() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true); 
  
  const summerImages = [
    "/hair_summer1.jpg"
  ];

  const winterImages = [
    "/hair_summer1.jpg"
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
            Elisabeth - our hairdresser with style and sensitivity
          </h1>
          <p className={styles.whiteText}>
            With a big heart, a smile on her face, and skilled hands, Elisabeth creates stylish cuts and relaxing moments at Alpen Tesitin. Her calm manner and love for the details turn every visit to the salon into a little feel-good ritual. 
          </p>
          <p className={styles.whiteText}>
            <strong>With Elisabeth, every visit becomes your own personal moment of well-being. </strong>
          </p>
        </div>
      </section>
            <section className={styles.infoVisitSection}>
  <div className={styles.infoVisitContent}>
    <h2>We look forward to your visit.</h2>
    <p>Wednesday, Thursday and Friday: from 2.00 PM until 7.00 PM</p>
  </div>
</section>
<div className={styles.whiteSectionContent}>
   <p className={styles.Text}>
    Choose which service you’d like!
    </p>
    </div>
    <AccordionItem title="For Women">
        <p>Washing, cutting, blow-drying | short hair: €47<br/>Washing, cutting, blow-drying | long hair: €53<br/>Washing, blow-drying | short hair: €26<br/>Washing, blow-drying | long hair: €31<br/>Washing, setting | short hair: €25<br/>Washing, hair mask & head massage | short hair: €42<br/>Washing, hair mask & head massage | long hair: €49<br/>Haircare Deluxe | €39
 </p>
    </AccordionItem>
    <AccordionItem title="For Men">
        <p>Cutting, blow-drying | €25<br/>Shave | €13<br/>Haircare Deluxe | €29</p>
    </AccordionItem>
    <AccordionItem title="For girls">
        <p>Washing, cutting, blow-drying | 0-10 years old: €26<br/>Washing, cutting, blow-drying | 11-17 years old: €36</p>
    </AccordionItem>
    <AccordionItem title="For boys">
        <p>Cutting, blow-drying | 0-10 years old: €19<br/>Cutting, blow-drying | 11-17 years old: €23</p>
    </AccordionItem>
    <AccordionItem title="Extras">
        <p>Colour | €46 – €66<br/>Highlights whole head | €71<br/>Highlights half head | €49<br/>Highlights + glossing | €91<br/>Perm | €47<br/>Straightening or curling | €11<br/>Hair mask | €11<br/>Head massage | €6<br/>Braid | €6<br/>Updo hairstyling | €31<br/>Head massage with ampoule | €30<br/>Fango mud pack | €23<br/>Ampoule treatment | €10</p>
    </AccordionItem>
        <Footer />
    </div>
  );
}