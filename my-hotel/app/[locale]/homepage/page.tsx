'use client';
import React, { useEffect } from 'react';
import Head from 'next/head';
import { Link } from '@/src/navigation'
import styles from "@/components/page.module.css"
import HotelCarousel from '@/components/hotelcarousel';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroCarousel from '@/components/HeroCarousel';
import BigCarousel from '@/components/carouselSection';
import { useTranslations, useLocale } from 'next-intl';
import SideSection from '@/components/SideSection';

// Importo komponentin SEO nga app/components/
import SEO from '@/components/SEO';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const tMetadata = useTranslations('metadata');
  const locale = useLocale();
  
  // Site URL - për Netlify deployment
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alpentesitin.com';
  const pageUrl = `${siteUrl}/${locale}/homepage`;
  
  // Structured data specifike për homepage
  const homepageStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Hotel",
        "@id": `${siteUrl}/#hotel`,
        "name": "Alpen Tesitin Hotel",
        "description": "Exclusive 5-star luxury hotel in the heart of the Dolomites. Experience unparalleled alpine elegance with panoramic suites, gourmet dining, and a world-class wellness spa.",
        "image": `${siteUrl}/og-image.jpg`,
        "url": siteUrl,
        "telephone": "+39-0474-XXXXXX", // Vendos numrin tënd aktual
        "priceRange": "$$$$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Via Tesitin 1",
          "addressLocality": "Tesitin/Taisten",
          "addressRegion": "South Tyrol",
          "postalCode": "39030",
          "addressCountry": "IT"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "46.8936",
          "longitude": "11.8761"
        },
        "starRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "amenityFeature": [
          {
            "@type": "LocationFeatureSpecification",
            "name": "Spa",
            "value": true
          },
          {
            "@type": "LocationFeatureSpecification",
            "name": "Restaurant",
            "value": true
          },
          {
            "@type": "LocationFeatureSpecification",
            "name": "Fitness Center",
            "value": true
          },
          {
            "@type": "LocationFeatureSpecification",
            "name": "Free WiFi",
            "value": true
          },
          {
            "@type": "LocationFeatureSpecification",
            "name": "Parking",
            "value": true
          },
          {
            "@type": "LocationFeatureSpecification",
            "name": "Swimming Pool",
            "value": true
          },
          {
            "@type": "LocationFeatureSpecification",
            "name": "Conference Rooms",
            "value": true
          }
        ],
        "sameAs": [
          "https://www.facebook.com/alpentesitin",
          "https://www.instagram.com/alpentesitin",
          "https://twitter.com/alpentesitin"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "Alpen Tesitin Hotel",
        "description": "Official website of Alpen Tesitin Hotel",
        "publisher": {
          "@id": `${siteUrl}/#hotel`
        }
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        "url": pageUrl,
        "inLanguage": locale === 'en' ? 'en-US' : locale === 'it' ? 'it-IT' : 'de-DE',
        "name": "Alpen Tesitin Hotel - Luxury 5-Star Resort",
        "description": "Experience unparalleled alpine luxury at Alpen Tesitin Hotel. 5-star resort with panoramic suites, gourmet dining, and world-class wellness spa.",
        "isPartOf": {
          "@id": `${siteUrl}/#website`
        },
        "about": {
          "@id": `${siteUrl}/#hotel`
        }
      }
    ]
  };

  const summerImages = [
    "/hotel_page2.png",
    "/hotel_page3.png",
    "/hotel_page4.png",
  ];

  const winterImages = [
    "/hotel_page1.jpg",
    "/hotel_page5.png",
    "/hotel_page6.png",
  ];
  
  const images = [
    "/hotel_imagee13.png",
    "/hotel_photo16p.png",
    "/hotel_imagee1.png",
    "/hotel_imagee3.png",
    "/hotel_imagee10.png",
    "/hotel_imagee4.png",
    "/hotel_aperitif.png",
    "/hotel_gourmet.png",
    "/hotel_imagee8.png",
    "/hotel_cozy.png",
  ];
  
  const Items = [
    { 
      title: t('sideSection.items.wellness.title'), 
      imageUrl: "/hotel_photo8.png", 
      description: t.rich('sideSection.items.wellness.description', {
        link: (chunks) => <Link href='/relax'>{chunks}</Link>
      })
    },
    { 
      title: t('sideSection.items.architecture.title'), 
      imageUrl: "/info_summer1.jpg", 
      description: t('sideSection.items.architecture.description')
    },
    {
      title: t('sideSection.items.cuisine.title'), 
      imageUrl: "/cuisine11.jpg",
      description: t('sideSection.items.cuisine.description')
    },
    {
      title: t('sideSection.items.panoramicLocation.title'),
      imageUrl: "/hotel_page1.jpg",
      description: t('sideSection.items.panoramicLocation.description')
    }
  ];
  
  const Activities = [
    { 
      title: t('sideSection.activities.experiences.title'), 
      imageUrl: "/skiing1.png", 
      description: t('sideSection.activities.experiences.description'),
      linkHref: "/experience" 
    },
    { 
      title: t('sideSection.activities.carRental.title'), 
      imageUrl: "/car_rental1.jpg", 
      description: t('sideSection.activities.carRental.description'),
      linkHref: "/car-rental" 
    },
    { 
      title: t('sideSection.activities.vouchers.title'),
      imageUrl: "/gift1.jpg", 
      description: t('sideSection.activities.vouchers.description'),
      linkHref: "/gift_vouchers" 
    },
    {
      title: t('sideSection.activities.impressions.title'),
      imageUrl: "/impressions.jpg",
      description: t('sideSection.activities.impressions.description'),
      linkHref: "/photo-video"
    }
  ];
  
  const slideData = [
    {
      time: "7 a.m.",
      title: t('slide1_title'),
      description: t('slide1_desc')
    },
    {
      time: "7.15 a.m.",
      title: t('slide2_title'),
      description: t('slide2_desc')
    },
    {
      time: "10 a.m.",
      title: t('slide3_title'),
      description: t('slide3_desc')
    },
    {
      time: "2.30 p.m.",
      title: t('slide4_title'),
      description: t('slide4_desc')
    },
    {
      time: "3 p.m.",
      title: t('slide5_title'),
      description: t('slide5_desc')
    },
    {
      time: "5 p.m.",
      title: t('slide6_title'),
      description: t('slide6_desc')
    },
    {
      time: "7 p.m.",
      title: t('slide7_title'),
      description: t('slide7_desc')
    },
    {
      time: "7.30 p.m.",
      title: t('slide8_title'),
      description: t('slide8_desc')
    },
    {
      time: "9.30 p.m.",
      title: t('slide9_title'),
      description: t('slide9_desc')
    },
    {
      time: "11 p.m.",
      title: t('slide10_title'),
      description: t('slide10_desc')
    }
  ];

  // function to scroll to white section
  const scrollToSection = () => {
    const section = document.getElementById('whiteSection');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // USE EFFECT for FADE-IN WHITE SECTION DURING SCROLL
  useEffect(() => {
    const section = document.getElementById('whiteSection');
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visibleSection);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* SEO KOMPONENTI - Zëvendëson <Head> */}
      <SEO
        title="Alpen Tesitin Hotel - Luxury 5-Star Resort in Dolomites"
        description="Experience unparalleled alpine luxury at Alpen Tesitin Hotel. 5-star resort with panoramic suites, gourmet dining, and world-class wellness spa in the heart of Dolomites."
        keywords="luxury hotel Dolomites, 5-star hotel Italy, alpine luxury resort, wellness spa hotel, gourmet restaurant South Tyrol, panoramic suites, luxury accommodation Dolomites"
        url={pageUrl}
        locale={locale === 'en' ? 'en_US' : locale === 'it' ? 'it_IT' : 'de_DE'}
        structuredData={homepageStructuredData}
      >
        {/* Additional meta tags specifike për homepage */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Alpen Tesitin Hotel" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@alpentesitin" />
        <meta name="twitter:creator" content="@alpentesitin" />
        
        {/* Preload critical images for better performance */}
        <link rel="preload" as="image" href="/hotel_page1.jpg" />
        <link rel="preload" as="image" href="/og-image.jpg" />
        <link rel="preload" as="image" href="/hotel_photo9.png" />
        
        {/* Additional hreflang tags for multilingual SEO */}
        <link rel="alternate" href={`https://alpentesitin.com/en/homepage`} hrefLang="en" />
        <link rel="alternate" href={`https://alpentesitin.com/it/homepage`} hrefLang="it" />
        <link rel="alternate" href={`https://alpentesitin.com/de/homepage`} hrefLang="de" />
        <link rel="alternate" href={`https://alpentesitin.com/en/homepage`} hrefLang="x-default" />
      </SEO>

      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        <HeroCarousel 
          summerImages={summerImages} 
          winterImages={winterImages} 
        />
        <Header isMenuPage={false} />
      </section>
      
      {/* WHITE SECTION - Changed h2 to h1 for main page title */}
      <section
        id="whiteSection"
        className={`${styles.whiteSection} ${styles.hiddenSection}`}
      >
        <div className={styles.whiteSectionContent}>
          <h1 className={styles.whiteTitle}> {/* H1 për SEO */}
            {t('main_title')}
          </h1>
          <p className={styles.whiteText}>
            {t('main_description')}
          </p>
        </div>
      </section>

      {/* WHITE SECTION 2 */}
      <SideSection 
        items={Items} 
        backgroundColor="#fff" 
      />

      {/* Offers Section - Changed h1 to h2 */}
      <section className={styles.offersSection}>
        <div className={styles.content}>
          <h2 className={styles.title}>{t('offers_title')}</h2> {/* H2 për hierarki të mirë */}
          <p className={styles.subtitle}>
            {t('offers_subtitle')}
          </p>

          <Link 
            href={`/offers`} 
            className={styles.showLinkk}
            aria-label="View all special offers and packages at Alpen Tesitin Hotel"
          >
            {t('show_offers')} <span className={styles.arrow}>→</span>
          </Link>
        </div>

        {/* Gradient fade at the bottom of the blue section */}
        <div className={styles.bottomFade}></div>
      </section>

      <section className={styles.carouselSection}>
        {/* LARGE BACKGROUND IMAGE */}
        <div className={styles.largeBackgroundWrapper}>
          <img 
            src="/hotel_photo9.png" 
            alt="Panoramic view of Alpen Tesitin Hotel in Taisten with Dolomites mountains" 
            className={styles.largeBackground}
            loading="lazy"
            width="1920"
            height="1080"
          />
        </div>

        {/* CAROUSEL ABSOLUTELY ON TOP OF THE IMAGE */}
        <div className={styles.carouselWrapper}>
          <HotelCarousel />
        </div>
      </section>

      <section className={styles.testimonialSection}>
        <div className={styles.quoteWrapper}>
          <blockquote className={styles.quoteText}> {/* Using blockquote for semantic SEO */}
            {t('testimonial_text')}
          </blockquote>
          <p className={styles.quoteAuthor}>{t('testimonial_author')}</p>
        </div>
        <div className={styles.decorativeCircle}></div>
        {/* Foto nga fundi */}
        <div className={styles.bottomImageWrapper}>
          <img 
            src="/hotel_photo13.png" 
            alt="Evening view of Alpen Tesitin Hotel with beautiful mountain sunset" 
            className={styles.bottomImage}
            loading="lazy"
            width="1920"
            height="1080"
          />
        </div>
      </section>

      <section className={styles.whiteSection3}></section>

      <section className={styles.textSection}>
        <h2 className={styles.sectionTitle}>{t('holiday_title')}</h2>
        <p className={styles.sectionParagraph}>
          {t('holiday_text')}
        </p>
      </section>
      
      <section className={styles.whiteBlockSection}>
        <SideSection items={Activities} isWhite={true} isDarkLink={true} backgroundColor='#efebe9' />
      </section>
      
      <div className={styles.fullWidthWrapper}>
        <BigCarousel 
          slideData={slideData} 
          images={images} 
          autoPlayInterval={6000} 
        />
      </div>
      
      <Footer/>
    </div>
  );
}