"use client";

import { useState } from 'react';
import styles from '@/components/Catalogue.module.css';
import Header from  '@/components/Header';
import Footer from '@/components/Footer';
import { Info } from 'lucide-react';

export default function CatalogueRequest() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [formData, setFormData] = useState({
    title: 'Family',
    name: '',
    surname: '',
    phone: '07400 123456',
    email: '',
    street: '',
    postcode: '',
    city: '',
    country: '',
    comment: '',
    marketingConsent: false
  });

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic) 
        : [...prev, topic]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate at least one catalogue is selected
    if (selectedTopics.length === 0) {
      alert('Please select at least one catalogue topic');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/catalogue-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedTopics,
          ...formData
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        alert(`Catalogue request submitted successfully! Request ID: ${result.requestId}`);
        
        // Reset form
        setSelectedTopics([]);
        setFormData({
          title: 'Family',
          name: '',
          surname: '',
          phone: '07400 123456',
          email: '',
          street: '',
          postcode: '',
          city: '',
          country: '',
          comment: '',
          marketingConsent: false
        });
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred while submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Header forceSmall={true} /> 
      {/* Main Content */}
      <main className={styles.main}>
        <h1 className={styles.pageTitle}>Catalogue request</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Catalogue Selection */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Catalogue</h2>
            <p className={styles.sectionSubtitle}>Select topic</p>
            
            <div className={styles.topicButtons}>
              {['Beauty', 'Summer', 'Winter'].map((topic) => (
                <button
                  key={topic}
                  type="button"
                  className={`${styles.topicBtn} ${selectedTopics.includes(topic) ? styles.topicBtnActive : ''}`}
                  onClick={() => toggleTopic(topic)}
                >
                  <span className={styles.checkbox}>
                    {selectedTopics.includes(topic) && '✓'}
                  </span>
                  {topic}
                </button>
              ))}
            </div>
          </section>

          {/* Personal Information */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Personal information</h2>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Title</label>
              <div className={styles.titleButtons}>
                {['Family', 'Mr', 'Ms'].map((title) => (
                  <button
                    key={title}
                    type="button"
                    className={`${styles.titleBtn} ${formData.title === title ? styles.titleBtnActive : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, title }))}
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className={styles.input}
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.formField}>
                <input
                  type="text"
                  name="surname"
                  placeholder="Surname*"
                  className={styles.input}
                  value={formData.surname}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formField}>
                <div className={styles.phoneInput}>
                  <select className={styles.countryCode} aria-label="Country code">
                    <option value="+44">🇬🇧</option>
                    <option value="+1">🇺🇸</option>
                    <option value="+39">🇮🇹</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="07400 123456"
                    className={styles.input}
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <small className={styles.fieldNote}>For possible questions</small>
              </div>
              <div className={styles.formField}>
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail*"
                  className={styles.input}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className={`${styles.formRow} ${styles.row3}`}>
        <div className={styles.formField}>
          <input type="text" name="street" placeholder="Street*" className={styles.input} required />
        </div>
        <div className={styles.formField}>
          <input type="text" name="postcode" placeholder="Postcode*" className={styles.input} required />
        </div>
        <div className={styles.formField}>
          <input type="text" name="city" placeholder="City*" className={styles.input} required />
        </div>
        <div className={styles.formField}>
          <div className={styles.selectWrapper}>
           
            <select 
  aria-label='country' 
  name="country" 
  className={styles.selectInput} 
  required 
  defaultValue=""
>
  <option value="" disabled hidden>Country*</option>
              <option value="UK">United Kingdom</option>
              <option value="France">France</option>
              <option value="Spain">Spain</option>
              <option value="Italy">Italy</option>
              <option value="Portugal">Portugal</option>
              <option value="Netherland">Netherland</option>
              <option value="Austria">Austria</option>
              <option value="Turkey">Turkey</option>

            </select>
          </div>
        </div>
      </div>

            <div className={styles.formField}>
              <textarea
                name="comment"
                placeholder="Comment"
                className={styles.textarea}
                value={formData.comment}
                onChange={handleInputChange}
                rows={4}
              />
            </div>

            <div className={styles.consentGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="marketingConsent"
                  checked={formData.marketingConsent}
                  onChange={handleInputChange}
                  className={styles.checkboxInput}
                />
                <span className={styles.checkboxText}>
                  Consent to marketing activities
                </span>
              </label>
              
              <div 
                className={styles.infoIconWrapper}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <button 
                  type="button" 
                  className={styles.infoIcon}
                  aria-label="Information about consent"
                >
                  <Info/>
                </button>
                
                {showTooltip && (
                  <div className={styles.tooltip}>
                    <p>
                      Having read and understood the <a href="#" className={styles.tooltipLink}>Privacy Statement made available at this link</a>, and with reference to the data processing activities for which the Data Subject's consent is required by law, I hereby consent to my Personal Data being used by Alpen Tesitin***** for the sending of promotional messages and marketing communications, including newsletters, regarding their promotions, offers etc., carried out by automated (e-mail, SMS etc.) and non-automated means (regular mail, telephone calls by operators).
                    </p>
                  </div>
                )}
              </div>
            </div>

            <p className={styles.requiredNote}>*Required fields</p>

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </section>
        </form>
      </main>
      <Footer/>
    </div>
  );
}