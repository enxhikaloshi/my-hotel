"use client";
import React, { useRef, useState } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "@/components/cuisineSection.module.css";
import Link from "next/link";
import CustomCarousel from "@/components/CustomCarousel";
import SideSection from "@/components/SideSection";
import DownloadMenu from "@/components/downloadMenu";
import BigCarousel from "@/components/carouselSection";
import { useTranslations, useLocale } from 'next-intl';
import SEO from '@/components/SEO';

export default function CuisinePage() {
  const t = useTranslations('CuisinePage');
  const locale = useLocale();
  
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true); 
  
  // Site URL për SEO
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alpentesitin.com';
  const pageUrl = `${siteUrl}/${locale}/cuisine`;
  
  // Structured data për restaurant
  const restaurantStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Restaurant",
        "@id": `${siteUrl}/#restaurant`,
        "name": "Alpen Tesitin Hotel Restaurant",
        "description": "Gourmet restaurant at Alpen Tesitin Hotel featuring alpine cuisine with local ingredients from South Tyrol.",
        "image": `${siteUrl}/cuisine_summer1.png`,
        "url": pageUrl,
        "servesCuisine": ["Italian", "Alpine", "South Tyrolean", "Mediterranean"],
        "priceRange": "$$$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Via Tesitin 1",
          "addressLocality": "Tesitin/Taisten",
          "addressRegion": "South Tyrol",
          "postalCode": "39030",
          "addressCountry": "IT"
        },
        "telephone": "+39-0474-950020",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "07:00",
            "closes": "22:00"
          }
        ],
        "menu": `${siteUrl}/files/menu.pdf`,
        "acceptsReservations": true
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#chef`,
        "name": "Chef Michael",
        "jobTitle": "Executive Chef",
        "worksFor": {
          "@id": `${siteUrl}/#restaurant`
        },
        "description": "Award-winning chef specializing in alpine cuisine with 15+ years of experience."
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        "url": pageUrl,
        "name": "Gourmet Restaurant & Cuisine | Alpen Tesitin Hotel",
        "description": "Experience gourmet dining at Alpen Tesitin Hotel. Alpine cuisine with local ingredients, fine wines, and panoramic views.",
        "isPartOf": {
          "@id": `${siteUrl}/#website`
        },
        "about": {
          "@id": `${siteUrl}/#restaurant`
        },
        "mainEntity": {
          "@id": `${siteUrl}/#restaurant`
        }
      }
    ]
  };
  
  const cusineImages = [
    "/cusine_winter1.jpg",
    "/cuisine_summer1.png",
    "/cuisine_winter2.png",
    "/cuisine_summer2.png",
    "/cuisine_summer3.png",
    "/cuisine_winter3.png",
    "/cuisine_summer4.png",
    "/cuisine_winter4.png",
  ];
  
  const summerImages = [
    "/cuisine_summer1.png", 
    "/cuisine_summer2.png",
    "/cuisine_summer3.png",
    "/cuisine_summer4.png"
  ];

  const winterImages = [
    "/cusine_winter1.jpg",
    "/cuisine_winter2.png",
    "/cuisine_winter3.png",
    "/cuisine_winter4.png"
  ];

 const cuisineItems = [
  { 
    title: t('cuisineItems.breakfast.title'), 
    imageUrl: "/cuisine1.png", 
    description: t.raw('cuisineItems.breakfast.description') // Use .raw()
  },
  { 
    title: t('cuisineItems.lunch.title'), 
    imageUrl: "/cuisine2.png", 
    description: t.raw('cuisineItems.lunch.description')
  },
  {
    title: t('cuisineItems.dinner.title'), 
    imageUrl: "/cuisine3.png",
    description: t.raw('cuisineItems.dinner.description')
  }
];
  
  const myMenus = [
    { title: t('menus.menu'), pdfUrl: "/menu.pdf" },
    { title: t('menus.wineList'), pdfUrl: "/wine-list.pdf" },
    { title: t('menus.barMenu'), pdfUrl: "/bar-menu.pdf" }
  ];
  
  const slideData = [
    {
      time: t('slideData.item1.time'),
      title: t('slideData.item1.title'),
      description: t('slideData.item1.description')
    },
    {
      time: t('slideData.item2.time'),
      title: t('slideData.item2.title'),
      description: t('slideData.item2.description')
    },
    {
      time: t('slideData.item3.time'),
      title: t('slideData.item3.title'),
      description: t('slideData.item3.description')
    },
    {
      time: t('slideData.item4.time'),
      title: t('slideData.item4.title'),
      description: t('slideData.item4.description')
    },
    {
      time: t('slideData.item5.time'),
      title: t('slideData.item5.title'),
      description: t('slideData.item5.description')
    },
    {
      time: t('slideData.item6.time'),
      title: t('slideData.item6.title'),
      description: t('slideData.item6.description')
    },
    {
      time: t('slideData.item7.time'),
      title: t('slideData.item7.title'),
      description: t('slideData.item7.description')
    },
    {
      time: t('slideData.item8.time'),
      title: t('slideData.item8.title'),
      description: t('slideData.item8.description')
    },
    {
      time: t('slideData.item9.time'),
      title: t('slideData.item9.title'),
      description: t('slideData.item9.description')
    }
  ];

  const images = [
    "/cuisine1.png",
    "/cuisine2.png",
    "/cuisine3.png",
    "/cuisine5.png",
    "/cuisine6.png",
    "/cuisine7.png",
    "/cuisine8.png",
    "/cuisine9.png",
    "/cuisine10.png",
  ];

  return (
    <div className={styles.pageWrapper}>
      {/* SEO KOMPONENTI */}
      <SEO
        title="Gourmet Restaurant & Fine Dining | Alpen Tesitin Hotel"
        description="Experience award-winning alpine cuisine at Alpen Tesitin Hotel. Gourmet restaurant with local ingredients, fine wines, and panoramic Dolomites views."
        keywords="gourmet restaurant Dolomites, fine dining South Tyrol, alpine cuisine, Michelin-style restaurant, wine pairing, local ingredients, chef Michael, breakfast buffet, lunch menu, dinner experience"
        url={pageUrl}
        locale={locale === 'en' ? 'en_US' : locale === 'it' ? 'it_IT' : 'de_DE'}
        structuredData={restaurantStructuredData}
      >
        {/* Additional meta tags për restaurant */}
        <meta property="og:type" content="restaurant.restaurant" />
        <link rel="preload" as="image" href="/cuisine_summer1.png" />
        <link rel="preload" as="image" href="/chef_michael.png" />
        
        {/* hreflang tags */}
        <link rel="alternate" href={`${siteUrl}/en/cuisine`} hrefLang="en" />
        <link rel="alternate" href={`${siteUrl}/it/cuisine`} hrefLang="it" />
        <link rel="alternate" href={`${siteUrl}/de/cuisine`} hrefLang="de" />
      </SEO>

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
              strong: (chunks) => <strong>{chunks}</strong>,
              link: (chunks) => <Link href="/experience">{chunks}</Link>
            })}
          </p>
        </div>
      </section>
      
      <SideSection 
        items={cuisineItems} 
        backgroundColor="#e8e5e0" 
      />
      
      <DownloadMenu menus={myMenus} />
      
      <CustomCarousel images={cusineImages} />
      
      <section className={styles.chefSection}>
        <div className={styles.chefText}>
          <h2>{t('chefSection.title')}</h2>
          <p>
            {t.rich('chefSection.description', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}
          </p>
        </div>
        <div className={styles.chefImageWrapper}>
          <img 
            src="/chef_michael.png" 
            alt="Executive Chef Michael - Award-winning chef at Alpen Tesitin Hotel" 
            loading="lazy"
            width="400"
            height="500"
          />
        </div>
      </section>
      
      <section className={styles.quoteSection}>
        <div className={styles.quoteContent}>
          <blockquote className={styles.quoteText}>
            {t('quoteSection.quote')}
          </blockquote>
          <h3 className={styles.chefName}>{t('quoteSection.chefName')}</h3>
          <div className={styles.chefAvatar}>
            <img 
              src="/chef_michael.png" 
              alt="Head chef Michael portrait" 
              loading="lazy"
              width="100"
              height="100"
            />
          </div>
        </div>
        <div className={styles.quoteImage}>
          <img 
            src="/food_dish.png" 
            alt="Signature dish - Alpine gourmet cuisine at Alpen Tesitin Hotel" 
            loading="lazy"
            width="600"
            height="400"
          />
        </div>
      </section>
      
      <section className={styles.introSimple}>
        <div className={styles.introContainer}>
          <h2 className={styles.introHeading}>
            {t('introSection.title')}<br />
            <span>{t('introSection.subtitle')}</span>
          </h2>
          <p className={styles.introText}>
            {t.rich('introSection.description', {
              underlineText: (chunks) => <span className={styles.underlineText}>{chunks}</span>
            })}
          </p>
        </div>
      </section>
      
      <BigCarousel 
        slideData={slideData} 
        images={images} 
        autoPlayInterval={6000}
      />
      
      <Footer />
    </div>
  );
}