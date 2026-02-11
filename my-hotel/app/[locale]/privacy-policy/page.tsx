"use client";
import React from 'react';
import styles from '@/components/privacy.module.css';
import SmallHeader from '@/components/Smallheader';
import Footer from '@/components/Footer';
const PrivacyPage = () => {
  return (
    <div className={styles.container}>
    <div className={styles.privacyContainer}>
        <SmallHeader/>
      <h2 className={styles.mainTitle}>Privacy</h2>
      
      <div className={styles.contentSection}>
        <p className={styles.introSubtitle}>Privacy Statement and Cookie Policy</p>
        
        <p className={styles.bodyText}>
          Alpen Tesitin SRI, having registered office in Via Riva di Sotto 22 , IT-39035 Monguelfo-Tesidio (hereafter <strong>Alpen Tesitin*****</strong>) 
          is committed to protecting the online privacy of users. Pursuant to art. 13 of EU Regulation 2016/679 (hereafter: <strong>"Regulation"</strong>), 
          this statement was written to inform you on our privacy policy and how your personal data is handled when you visit our website (hereafter “Website”), 
          as well as to enable you to give your specific and informed consent to the processing of your Personal Data, where applicable. 
          Please be informed that parental consent is required for children under 16 years of age.
        </p>

        <p className={styles.bodyText}>
          Pursuant to the Regulation, Alpen Tesitin***** shall process Personal Data based on the principles of lawfulness, fairness, transparency, 
          limitation of purpose and retention, data minimisation, accuracy, integrity and confidentiality.
        </p>

                            <h3 className={styles.tableOfContentsTitle}>TABLE OF CONTENTS</h3>
                    <ol className={styles.tocList}>
                    <li>Data Controller</li>
                    <li>
                        Personal Data subject to processing
                        <ul className={styles.subTocList}>
                        <li>a. Browsing data</li>
                        <li>b. Special categories of Personal Data</li>
                        <li>c. Data volunteered by Data Subjects</li>
                        <li>d. Cookies</li>
                        </ul>
                    </li>
                    <li>Purposes of data processing</li>
                    <li>Lawful basis and mandatory or optional nature of data processing</li>
                    <li>Disclosure of Personal Data</li>
                    <li>Transfer of Personal Data</li>
                    <li>Retention of Personal Data</li>
                    <li>Your rights</li>
                    <li>Additional services and external service providers</li>
                    <li>Changes</li>
                    </ol>

        {/* SECTION 1 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Data Controller</h2>
          <p className={styles.bodyText}>
            In relation to the data processing carried out through our website, the Data Controller as defined above is Alpen Tesitin SRL. 
            For any information regarding the processing of Personal Data by the Data Controller, including the list of Data Processors, please write to: 
            <a href="mailto:info@alpentesitin.it" className={styles.link}>info@alpentesitin.it</a>
          </p>
        </section>

        {/* SECTION 2 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Personal Data subject to processing</h2>
          <p className={styles.bodyText}>
            The following Personal Data is processed through our Website:
          </p>
          <div className={styles.subPoint}>
            <p><strong>a. Browsing data</strong></p>
            <p className={styles.bodyText}>During normal operation, the computer systems and software used to operate our Website acquire some Personal Data...</p>
          </div>
          <div className={styles.subPoint}>
            <p><strong>b. Special categories of Personal Data</strong></p>
            <p className={styles.bodyText}>If you send us your application via e-mail or through our website, you might provide us with Personal Data that falls within special categories as set forth in art. 9 of the Regulation...</p>
          </div>
          <div className={styles.subPoint}>
            <p><strong>c. Data volunteered by Data Subjects</strong></p>
            <p className={styles.bodyText}>We may process Personal Data of third parties that you send to the Data Controller when using certain services on our Website (e.g. the request/contact/booking forms).</p>
          </div>
          <div className={styles.subPoint}>
            <p><strong>d. Cookies</strong></p>
            <p className={styles.bodyText}>
              Cookies are small text files which can be stored by a website. You can block cookies in browser settings: 
              <a href="https://support.mozilla.org/en-US/kb/block-websites-storing-site-preferences" target="_blank" rel="noopener noreferrer" className={styles.link}> Firefox</a>, 
    <a href="https://support.google.com/chrome/answer/95647?hl=en" target="_blank" rel="noopener noreferrer" className={styles.link}> Google Chrome</a>, 
    <a href="http://windows.microsoft.com/en-us/windows-vista/block-or-allow-cookies" target="_blank" rel="noopener noreferrer" className={styles.link}> Internet Explorer</a>.
            </p>
          </div>
        </section>

        {/* SECTION 3 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Purposes of data processing</h2>
          <p className={styles.bodyText}>If necessary and with your specific consent, we will process your Personal Data for the following purposes:</p>
          <ul className={styles.bulletList}>
            <li>Provide the services you require;</li>
            <li>Respond to requests for assistance, information or bookings;</li>
            <li>Marketing purposes: the data provided may be used, subject to explicit and specific consent, for the sending of promotional and marketing communications...</li>
          </ul>
        </section>

        {/* SECTION 4 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Lawful basis and mandatory or optional nature of data processing</h2>
          <p className={styles.bodyText}>
            The lawful basis for the processing of Personal Data for the purposes referred to in section 3 (a-b-c) is art. 6(1)(b) of the Regulation (performance of a contract)...
            For the purposes illustrated in section 3.d, the lawful basis is art. 6(1)(c) of the Regulation (compliance with legal obligations).
          </p>
        </section>

        {/* SECTION 5 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Disclosure of Personal Data</h2>
          <p className={styles.bodyText}>Your Personal Data may be shared with:</p>
          <ul className={styles.bulletList}>
            <li>Parties who typically act as Data Processors (marketing, hosting providers, technical maintenance);</li>
            <li>Persons, entities or authorities to whom Personal Data must be disclosed by virtue of legal provisions;</li>
            <li>Parties authorised by the Data Controller who have committed themselves to confidentiality.</li>
          </ul>
        </section>

        {/* SECTION 6 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Transfer of Personal Data</h2>
          <p className={styles.bodyText}>
            Some of your Personal Data is shared with Recipients who may be located outside the European Economic Area. 
            The Data Controller ensures that these Recipients process your Personal Data in compliance with the Regulation.
          </p>
        </section>

        {/* SECTION 7 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>7. Retention of Personal Data</h2>
          <p className={styles.bodyText}>
            Personal Data processed for the purposes referred to in section 3(a-b) will be kept only for as long as strictly necessary to achieve those purposes.
            Personal Data processed for marketing (3.e) will be kept until we have consent.
          </p>
        </section>

        {/* SECTION 8 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>8. Your rights</h2>
          <p className={styles.bodyText}>
            Pursuant to Art. 15 and following of the Regulation, you have the right to obtain access to your Personal Data at any time.
            Requests must be submitted in written form and sent to: <a href="mailto:info@alpentesitin.it" className={styles.link}>info@alpentesitin.it</a>
          </p>
        </section>

        {/* SECTION 9 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>9. Additional services and external service providers</h2>
          <p><strong>Guest Pass</strong></p>
          <p className={styles.bodyText}>
            The personal data provided will be transmitted to the single coordinating body of the Guest Pass. 
            For further information regarding the processing, you can send an email to <a href="mailto:privacy@moko.bz.it" className={styles.link}>privacy@moko.bz.it</a>.
          </p>
        </section>

        {/* SECTION 10 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>10. Changes</h2>
          <p className={styles.bodyText}>
            This Privacy Policy takes effect on <strong>24.02.2025</strong>. 
            The Data Controller reserves the right to amend or update the content of this policy.
          </p>
        </section>
      </div>
      
    </div>
    <Footer/>
    </div>
  );
};

export default PrivacyPage;