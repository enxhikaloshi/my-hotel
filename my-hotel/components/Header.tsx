"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import WeatherToggle from "./weathertoggle";
import { PiPhoneLight } from "react-icons/pi";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/src/navigation";

interface HeaderProps {
  isMenuPage?: boolean;
  forceSmall?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isMenuPage, forceSmall }) => {
  const t = useTranslations('Header');
  const locale = useLocale(); 
  const pathname = usePathname();
  const router = useRouter();
  
  const availableLanguages = [
    { code: "en", label: t('languages.en') },
    { code: "de", label: t('languages.de') },
    { code: "it", label: t('languages.it') },
  ];
  
  const currentLang = availableLanguages.find((l) => l.code === locale) || availableLanguages[0];
  const [scrolled, setScrolled] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    router.push(pathname, { locale: newLocale });
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const headerClasses = `${styles.header} ${
    scrolled || forceSmall ? styles.headerSmall : ""
  }`;
  
  return (
    <header className={headerClasses}>
      {/* 🟢 LEFT */}
      <div className={styles.headerLeft}>
        {isMenuPage ? (
          <Link href="/homepage">
            <button className={styles.menuIcon} aria-label={t('buttons.close')}>
              X
            </button>
          </Link>
        ) : (
          <Link href="/menu">
            <button className={styles.menuIcon} aria-label={t('buttons.menu')}>
              ☰
            </button>
          </Link>
        )}

        <WeatherToggle />

        <div className={styles.languageDropdown}>
          <span className={styles.currentLang}>
            {currentLang.label} <span className={styles.chevron}>▼</span>
          </span>
          <div className={styles.dropdownMenu}>
            {availableLanguages
              .filter((lang) => lang.code !== locale)
              .map((lang) => (
                <div
                  key={lang.code}
                  className={styles.dropdownItem}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  {lang.label}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* 🟡 CENTER */}
      <div className={styles.headerCenter}>
        <Link href={`/homepage`} className={styles.logoLink}>
          <button className={styles.logo}>{t('logo')}</button>
          <p className={styles.subTitle}>{t('subtitle')}</p>
        </Link>
      </div>

      {/* 🔴 RIGHT */}
      <div className={styles.headerRight}>
        <button className={styles.phoneIcon} aria-label={t('buttons.phone')}>
          <PiPhoneLight />
        </button>
        
        <Link href={`/enquire`}>
          <button className={styles.enquireButton}>{t('buttons.enquire')}</button>
        </Link>

        <Link href={`/book`}>
          <button className={styles.bookButton}>{t('buttons.book')}</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;