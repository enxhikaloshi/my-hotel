'use client'
import { useState } from 'react';
import { HiDownload } from 'react-icons/hi';
import { TiWeatherSunny } from 'react-icons/ti';
import { BiWebcam } from 'react-icons/bi';
import { LiaGiftSolid } from 'react-icons/lia';
import { TbView360Number } from 'react-icons/tb';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import styles from './page.module.css';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState<string>(''); 
  const [consentChecked, setConsentChecked] = useState<boolean>(false);
  const [consentError, setConsentError] = useState<boolean>(true);
  const [partnersOpen, setPartnersOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // nëse checkbox nuk është zgjedhur, mbetet kuq
    if (!consentChecked) {
      setConsentError(true);
      return;
    }
    setConsentError(false);
    console.log('Form submitted!');
  };

  return (
    <div>
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerColumn}>
            <h4>{t('address.title')}</h4>
            <p>
              {t('address.family')}<br />
              {t('address.street')}<br />
              {t('address.city')}<br />
              {t('address.region')}<br />
              {t('address.country')}
            </p>
            <div className={styles.footerIcons}>
              <a href="/download" aria-label={t('icons.download')}><HiDownload /></a>
              <a href="/weather" aria-label={t('icons.weather')}><TiWeatherSunny /></a>
              <a href="/gift-vouchers" aria-label={t('icons.gift')}><LiaGiftSolid /></a>
              <a href="/photo_video" aria-label={t('icons.photos')}><TbView360Number /></a>
            </div>
          </div>

          <div className={styles.footerColumn}>
            <h4>{t('contact.title')}</h4>
            <p>
              <a href="tel:+390474950020" className={styles.contactLink}>{t('contact.phone')}</a><br />
              <a href="mailto:info@alpentesitin.it" className={styles.contactLink}>{t('contact.email')}</a>
            </p>
            <div className={styles.socialIcons}>
              <a href="https://www.facebook.com/hotel_alpentesitin" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook"><FaFacebookF /></a>
              <a href="https://www.instagram.com/hotel_alpentesitin" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram"><FaInstagram /></a>
            </div>
          </div>

          <div className={styles.footerColumn}>
            <h4>{t('links.title')}</h4>
            <ul className={styles.footerLinks}>
              <li><a href="/guestnet" className={styles.footerLink}>{t('links.guestnet')}</a></li>
              <li><a href="/live" className={styles.footerLink}>{t('links.live')}</a></li>
              <li><a href="/relax" className={styles.footerLink}>{t('links.relax')}</a></li>
              <li><a href="/experience" className={styles.footerLink}>{t('links.experience')}</a></li>
              <li><a href="/info" className={styles.footerLink}>{t('links.info')}</a></li>
              <li><a href="/belvita" className={styles.footerLink}>{t('links.belvita')}</a></li>
              <li><a href="/catalogue-request" className={styles.footerLink}>{t('links.catalogue')}</a></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h4>{t('newsletter.title')}</h4>
            <div className={styles.newsletterForm}>
              <input 
                type="email" 
                placeholder={t('newsletter.placeholder')} 
                className={styles.newsletterInput}  
                onClick={() => setIsModalOpen(true)}
              />
              <button
                className={styles.newsletterButton}
                onClick={() => setIsModalOpen(true)}
              >
                {t('newsletter.button')}
              </button>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>
            <a href="/homepage" className={styles.footerBottomLink}>{t('bottom.home')}</a> |
            <a href="/privacy-policy" className={styles.footerBottomLink}>{t('bottom.privacy')}</a> |
            <a href="/privacy-settings" className={styles.footerBottomLink}>{t('bottom.settings')}</a> |
            <span>{t('bottom.copyright')}</span>
          </p>
          <div className={styles.footerBottomIcons}>
            {/* Partners */}
            <div className={styles.dropdown}>
              <span
                onClick={() => setPartnersOpen(!partnersOpen)}
                className={styles.dropdownTitle}
              >
                {t('dropdowns.partners')}
                <span
                  className={`${styles.arrow} ${partnersOpen ? styles.rotated : ''}`}
                >
                  ▼
                </span>
              </span>
              {partnersOpen && (
                <div className={styles.partnersSection}>
                  <a href="https://www.altoadige.it" target="_blank" rel="noopener noreferrer"><img src="/logo1.png" alt="Alto Adige" /></a>
                  <a href="https://www.kronplatz.com" target="_blank" rel="noopener noreferrer"><img src="/logo2.png" alt="Kronplatz" /></a>
                  <a href="https://www.gsiesertal-welsberg-taisten.com" target="_blank" rel="noopener noreferrer"><img src="/logo3.png" alt="Gsiesertal Welsberg Taisten" /></a>
                  <a href="https://www.gsieser-tal.com/en/the-region.html" target="_blank" rel="noopener noreferrer"><img src="/logo4.png" alt="Gsiesertal Welsberg Taisten" /></a>
                  <a href="https://www.belvita.it/en" target="_blank" rel="noopener noreferrer"><img src="/logo5.png" alt="Belvita" /></a>
                  <a href="https://www.selectedhotels.com/en" target="_blank" rel="noopener noreferrer"><img src="/logo6.png" alt="Selected Hotels" /></a>
                  <a href="https://www.selectedhotels.com/en" target="_blank" rel="noopener noreferrer"><img src="/logo7.png" alt="Suedtirol Hotels" /></a>
                  <a href="https://www.bookingsuedtirol.com/en/monguelfotesidowelsbergtaisten/hotel-alpen-tesitin-panorama-wellness-resort?guests=%5B%5B18%2C18%5D%5D" target="_blank" rel="noopener noreferrer"><img src="/logo8.png" alt="Booking Sudtirol" /></a>
                  <a href="https://www.dolomitinordicski.com/en" target="_blank" rel="noopener noreferrer"><img src="/logo9.png" alt="Dolomiti NordicSki" /></a>
                </div>
              )}
            </div>

            {/* Interesting Pages */}
            <div className={styles.dropdown}>
              <span
                onClick={() => setPagesOpen(!pagesOpen)}
                className={styles.dropdownTitle}
              >
                {t('dropdowns.pages')}
                <span
                  className={`${styles.arrow} ${pagesOpen ? styles.rotated : ''}`}
                >
                  ▼
                </span>
              </span>
              {pagesOpen && (
                <div className={styles.dropdownContent}>
                  {[
                    { key: 'luxury', url: "/luxury-hotel" },
                    { key: 'spa', url: "/spa-hotel" },
                    { key: 'pool', url: "/pool" },
                    { key: 'sport', url: "/sport-hotel" },
                    { key: 'gourmet', url: "/gourmet-hotel" },
                    { key: 'hiking', url: "/hiking-hotel" },
                    { key: 'ski', url: "/ski-holiday" },
                    { key: 'rent', url: "/rent-sports-car" },
                  ].map((page, index) => (
                    <a
                      key={index}
                      href={page.url}
                      className={styles.pageLink}
                    >
                      {t(`dropdowns.pageItems.${page.key}`)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Newsletter Modal */}
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>×</button>
              <h2 className={styles.modalTitle}>{t('modal.title')}</h2>

              {/* Title: radio buttons */}
              <label className={styles.smalltitle}>{t('modal.titleLabel')}</label>
              <div className={styles.titleSection}>
                <label className={`${styles.titleOption} ${selectedTitle === 'family' ? styles.active : ''}`}>
                  <input
                    type="radio"
                    name="title"
                    value="family"
                    checked={selectedTitle === 'family'}
                    onChange={(e) => setSelectedTitle(e.target.value)}
                  />
                  {t('modal.titles.family')}
                </label>

                <label className={`${styles.titleOption} ${selectedTitle === 'mr' ? styles.active : ''}`}>
                  <input
                    type="radio"
                    name="title"
                    value="mr"
                    checked={selectedTitle === 'mr'}
                    onChange={(e) => setSelectedTitle(e.target.value)}
                  />
                  {t('modal.titles.mr')}
                </label>

                <label className={`${styles.titleOption} ${selectedTitle === 'ms' ? styles.active : ''}`}>
                  <input
                    type="radio"
                    name="title"
                    value="ms"
                    checked={selectedTitle === 'ms'}
                    onChange={(e) => setSelectedTitle(e.target.value)}
                  />
                  {t('modal.titles.ms')}
                </label>
              </div>

              <form className={styles.modalForm} onSubmit={handleFormSubmit}>
                <div className={styles.nameRow}>
                  <label className={styles.smallLabel}>
                    <input type="text" name="Name" placeholder={t('modal.placeholders.name')} />
                  </label>

                  <label className={styles.smallLabel}>
                    <input type="text" name="Surname" placeholder={t('modal.placeholders.surname')} required />
                  </label>
                </div>
                <label>
                  <input type="email" name="email" placeholder={t('modal.placeholders.email')} required />
                </label>

                <label className={`${styles.consentLabel} ${consentError ? styles.errorText : ''}`}>
                  <input
                    type="checkbox"
                    name="consent"
                    checked={consentChecked}
                    onChange={() => {
                      setConsentChecked(!consentChecked);
                      if (consentError) setConsentError(false);
                    }}
                    className={consentChecked ? styles.checkedCheckbox : ''}
                  />
                  {t('modal.consent.text')}
                  <AiOutlineInfoCircle 
                    className={styles.infoIcon} 
                    title={t('modal.consent.tooltip')}
                  />
                </label>
                <label className={styles.smalltitle}>{t('modal.requiredFields')}</label>
                <button type="submit" className={styles.submitButton}>{t('modal.submitButton')}</button>
              </form>
            </div>
          </div>
        )}
      </footer>
    </div>
  );
}