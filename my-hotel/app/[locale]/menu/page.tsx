'use client';
import React from "react";
import styles from "@/components/page.module.css";
import Header from "@/components/Header";

export default function MenuPage() {
  const MENU_ITEMS = [
    { 
      title: "Live",
      titleHref: "/live", // Shto href për titull
      links: [
        { label: "Rooms & suites", href: "/rooms" },
        { label: "Rates", href: "/rates" },
        { label: "Offers", href: "/details" },
        { label: "For spontaneous travellers", href: "/spontaneous-travellers" },
        { label: "Inclusive services", href: "/inclusiveServices" },
      ]
    },
    { 
      title: "Relax",
      titleHref: "/relax",
      links: [
        { label: "Pool world", href: "/pool" },
        { label: "Sauna world", href: "/sauna" },
        { label: "Treatments", href: "/treatment" },
        { label: "Hair salon", href: "/hair-salon" },
        { label: "Gym", href: "/gym" },
      ]
    },
    { 
      title: "Experience",
      titleHref: "/experience",
      links: [
        { label: "Cuisine", href: "/cuisine" },
        { label: "Summer adventure", href: "/summer" },
        { label: "Winter adventures", href: "/winter" },
        { label: "Luxury cabriolet rental", href: "/luxury-cars" },
        { label: "Magic moments", href: "/magic-moments" },
      ]
    },
    { 
      title: "Info",
      titleHref: "/info",
      links: [
        { label: "Photos & videos", href: "/photo_video" },
        { label: "Useful information", href: "/useful-information" },
        { label: "Car rental", href: "/car-rental" },
        { label: "Gift Vouchers", href: "/gift_vouchers" },
        { label: "Getting here", href: "/getting-here" },
      ]
    }
  ];

  return (
    <div className={styles.menuPage}>
      <Header isMenuPage={true} /> 

      <div className={styles.centerContent}>
        <div className={styles.gridMenu}>
          {MENU_ITEMS.map((section, index) => (
            <div key={index} className={styles.menuSection}>
              <a href={section.titleHref} className={styles.menuTitle}>
                {section.title}
              </a>
              <ul className={styles.menuList}>
                {section.links.map((item, i) => (
                  <li key={i}>
                    <a href={item.href} className={styles.menuLink}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}