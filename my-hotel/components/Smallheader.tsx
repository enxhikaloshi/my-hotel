"use client";

import Link from "next/link";
import { PiPhoneLight } from "react-icons/pi";
import WeatherToggle from "./weathertoggle"; // sigurohu që rruga është e saktë
import styles from "./page.module.css";
import React from "react";

const availableLanguages = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italian" },
];

export default function SmallHeader() {
  const [currentLang, setCurrentLang] = React.useState(availableLanguages[0]);

  return (
    <header className={`${styles.header} ${styles.headerSmall}`}>
      {/* 🟢 LEFT */}
      <div className={styles.headerLeft}>
        <Link href="/menu">
          <button className={styles.menuIcon}>☰</button>
        </Link>
        <WeatherToggle />
        <div className={styles.languageDropdown}>
          <span className={styles.currentLang}>
            {currentLang.label} <span className={styles.chevron}>▼</span>
          </span>
          <div className={styles.dropdownMenu}>
            {availableLanguages
              .filter((lang) => lang.code !== currentLang.code)
              .map((lang) => (
                <div
                  key={lang.code}
                  className={styles.dropdownItem}
                  onClick={() => setCurrentLang(lang)}
                >
                  {lang.label}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* 🟡 CENTER */}
      <div className={styles.headerCenter}>
        <Link href="/homepage" className={styles.logoLink}>
          <button className={styles.logo}>AT ALPEN TESITIN</button>
        </Link>
      </div>

      {/* 🔴 RIGHT */}
      <div className={styles.headerRight}>
  <button className={styles.phoneIcon} aria-label="Call us">
    <PiPhoneLight />
  </button>
  <button className={styles.enquireButton}>Enquire</button>
  <button className={styles.bookButton}>Book</button>
</div>
    </header>
  );
}
