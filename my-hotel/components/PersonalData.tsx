'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, Tag, FileText } from 'lucide-react';
import styles from './page.module.css';

interface PersonalDataProps {
  dates: { startDate: Date | undefined; endDate: Date | undefined; year: string };
  people: number;
  roomName: string;
  price: number;
  setName: (val: string) => void;
  setEmail: (val: string) => void;
  setPhone: (val: string) => void;
  setBillingData: (data: any) => void;
  setCountry: (val: string) => void;
}

export default function PersonalData({ 
  dates, 
  people, 
  roomName, 
  price,
  setName,
  setEmail,
  setPhone, 
  setCountry,
  setBillingData
}: PersonalDataProps) {
  const [touched, setTouched] = useState({ 
    firstName: false, 
    lastName: false, 
    email: false, 
    companyName: false, 
    vatNumber: false, 
    agreedToTerms: false 
  });
  
  const [values, setValues] = useState({ 
    title: '', 
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '', 
    country: '-', 
    specialRequests: '', 
    isBusiness: false, 
    companyName: '',
    vatNumber: '',
    recipientCode: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    billingCountry: '-',
    paymentSelected: false,
    agreedToTerms: false
  });
  const [isInsuranceSelected, setIsInsuranceSelected] = useState(false);
  const insurancePrice = 149.00;
  useEffect(() => {
    if (values.isBusiness) {
      setBillingData({
        companyName: values.companyName,
        vatNumber: values.vatNumber,
        recipientCode: values.recipientCode,
        streetAddress: values.streetAddress,
        city: values.city,
        postalCode: values.postalCode,
        billingCountry: values.billingCountry
      });
    } else {
      setBillingData(null); 
    }
  }, [values, setBillingData]);
  useEffect(() => {
    const fullName = `${values.title} ${values.firstName} ${values.lastName}`.trim();
    setName(fullName); 
    setEmail(values.email);
    setPhone(values.phone);
    setCountry(values.country);
  }, [values.firstName, values.lastName, values.title, values.email, values.phone, values.country, setName, setEmail, setPhone, setCountry]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (e.target.name !== 'title') {
      setTouched({ ...touched, [e.target.name]: true });
    }
  };

  const isLastNameValid = (lastName: string) => /^[A-Za-z]+$/.test(lastName);
  const isFirstNameValid = (firstName: string) => /^[A-Za-z]+$/.test(firstName);
  const isEmailValid = (email: string) => !!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  return (
    <>
      {/* SUMMARY BAR  */}
      <div className={styles.summaryBar}>
        <div className={styles.summaryItem}>
          <Calendar size={18} />
          <span>{dates.startDate?.toLocaleDateString()} to {dates.endDate?.toLocaleDateString()} </span>
        </div>

        <div className={styles.summaryItem}>
          <Tag size={18} />
          <div className={styles.roomInfo}>
            <strong>{roomName}</strong>
            <span>{people} people</span>
          </div>
        </div>

        <div className={styles.priceSectionRight}>
          <div className={styles.totalLabelGroup}>
            <FileText size={18} />
            <div className={styles.summaryTextGroup}>
              <span className={styles.summaryMainText}>Total</span>
            </div>
          </div>
          <span className={styles.totalAmount}>€{price}</span>
        </div>
      </div>

      <div className={styles.containerPersonal}>
        <h2 className={styles.sectionTitle}>Contact</h2>
        
        <div className={styles.formContent}>
          
          {/* ROW 1: Title, First Name, Last Name */}
          <div className={styles.rowPersonal}>
            <div className={styles.fieldGroupSmallPersonal}>
              <label>Title</label>
              <select name="title" className={styles.selectFieldPersonal} value={values.title} onChange={handleChange} aria-label="Title">
                <option value="">No specification</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
              </select>
            </div>
            <div className={styles.fieldGroupPersonal}>
              <label>First name *</label>
              <input type="text" name="firstName" className={`${styles.inputField} ${touched.firstName && !values.firstName ? styles.inputError : ''}`} value={values.firstName} onChange={handleChange} onBlur={handleBlur} placeholder="First Name" aria-label="First name" />
              {touched.firstName && (!values.firstName || !isFirstNameValid(values.firstName)) && (
                <span className={styles.errorText}>Please enter a valid first name.</span>
              )}
            </div>
            <div className={styles.fieldGroupPersonal}>
              <label>Last name *</label>
              <input type="text" name="lastName" className={`${styles.inputField} ${touched.lastName && !values.lastName ? styles.inputError : ''}`} value={values.lastName} onChange={handleChange} onBlur={handleBlur} placeholder="Last Name" aria-label="Last name" />
              {touched.lastName && (!values.lastName || !isLastNameValid(values.lastName)) && (
                <span className={styles.errorText}>Please enter a valid last name.</span>
              )}
            </div>
          </div>

          {/* ROW 2: Email & Phone */}
          <div className={styles.rowPersonal}>
            <div className={styles.fieldGroup}>
              <label>Email address *</label>
              <input type="email" name="email" className={`${styles.inputField} ${(touched.email && !values.email) || (touched.email && values.email && !isEmailValid(values.email)) ? styles.inputError : ''}`} value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder="Please be careful of your spelling" aria-label="Email address" />
              <div className={styles.infoBox}><p className={styles.infoText}>The confirmation email will be sent to this email address.</p></div>
              {touched.email && (!values.email || !isEmailValid(values.email)) && (
                <span className={styles.errorText}>Please enter a valid email address.</span>
              )}
            </div>
            <div className={styles.fieldGroupPersonal}>
              <label>Phone number</label>
              <input type="tel" name="phone" className={styles.inputField} value={values.phone} onChange={handleChange} aria-label="Phone number" />
            </div>
          </div>

          {/* ROW 3: Country */}
          <div className={styles.rowPersonal}>
            <div className={styles.fieldGroupFullPersonal}>
              <label>Country</label>
              <select className={styles.selectFieldPersonal} name="country" value={values.country} onChange={handleChange} aria-label="Country">
                <option value="-">-</option>
                <option value="Albania">Albania</option>
                <option value="Italy">Italy</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>  
                <option value="Spain">Spain</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>  
                <option value="Switzerland">Switzerland</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Belgium">Belgium</option>
                <option value="Austria">Austria</option>
                <option value="Belgium">Belgium</option>
                <option value="Croatia">Croatia</option>
                <option value="Greece">Greece</option>
                <option value="Serbia">Serbia</option>
                <option value="Portugal">Portugal</option>
                <option value="Ireland">Ireland</option>
                <option value="Sweden">Sweden</option>
                <option value="Norway">Norway</option>
                <option value="Denmark">Denmark</option>
                <option value="Finland">Finland</option>
                <option value="Poland">Poland</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Hungary">Hungary</option>
                <option value="Slovakia">Slovakia</option>
                <option value="Slovenia">Slovenia</option>
                <option value="Romania">Romania</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Turkey">Turkey</option>
                <option value="Scotland">Scotland</option>
                <option value="Luxembourg">Luxembourg</option>
                <option value="Iceland">Iceland</option>
                <option value="Malta">Malta</option>
                <option value="Cyprus">Cyprus</option>
              </select>
            </div>
          </div>

          {/* ROW 4: Special Requests */}
          <div className={styles.rowPersonal}>
            <div className={styles.fieldGroupFullPersonal}>
              <label>Special requests</label>
              <textarea name="specialRequests" className={styles.textareaFieldPersonal} rows={4} value={values.specialRequests} onChange={handleChange} aria-label="Special requests" />
            </div>
          </div>

          {/* BUSINESS CHECKBOX */}
          <div className={styles.checkboxRowPersonal}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="isBusiness" checked={values.isBusiness} onChange={handleChange} aria-label="I'm a business customer and need an invoice" />
              <span className={styles.checkboxText}>I'm a business customer and need an invoice</span>
            </label>
          </div>

          {/* BILLING ADDRESS */}
          {values.isBusiness && (
            <div className={styles.billingSection}>
              <h3 className={styles.billingTitle}>Billing address</h3>
              <div className={styles.rowPersonal}>
                <div className={styles.fieldGroupPersonal}>
                  <label>Company name *</label>
                  <input type="text" name="companyName" className={`${styles.inputField} ${touched.companyName && !values.companyName ? styles.inputError : ''}`} value={values.companyName} onChange={handleChange} onBlur={handleBlur} aria-label="Company name" />
                  {touched.companyName && !values.companyName && (
                    <span className={styles.errorText}>Please enter the company name.</span>
                  )}
                </div>
                <div className={styles.fieldGroupPersonal}>
                  <label>VAT number *</label>
                  <input type="text" name="vatNumber" className={`${styles.inputField} ${touched.vatNumber && !values.vatNumber ? styles.inputError : ''}`} value={values.vatNumber} onChange={handleChange} onBlur={handleBlur} aria-label="VAT number" />
                  {touched.vatNumber && !values.vatNumber && (
                    <span className={styles.errorText}>Please enter the VAT number.</span>
                  )}
                </div>
              </div>
              <div className={styles.rowPersonal}>
                <div className={styles.fieldGroupPersonal}>
                  <label>Recipient Code</label>
                  <input type="text" name="recipientCode" className={styles.inputField} value={values.recipientCode} onChange={handleChange} aria-label="Recipient Code" />
                </div>
                <div className={styles.fieldGroupPersonal}>
                  <label>Street address</label>
                  <input type="text" name="streetAddress" className={styles.inputField} value={values.streetAddress} onChange={handleChange} aria-label="Street address" />
                </div>
              </div>
              <div className={styles.rowPersonal}>
                <div className={styles.fieldGroupPersonal}>
                  <label>City</label>
                  <input type="text" name="city" className={styles.inputField} value={values.city} onChange={handleChange} aria-label="City" />
                </div>
                <div className={styles.fieldGroupSmallPersonal} style={{ flex: '0 0 150px' }}>
                  <label>Postal code</label>
                  <input type="text" name="postalCode" className={styles.inputField} value={values.postalCode} onChange={handleChange} aria-label="Postal code" />
                </div>
                <div className={styles.fieldGroupPersonal}>
                  <label>Country</label>
                  <select name="billingCountry" className={styles.selectFieldPersonal} value={values.billingCountry} onChange={handleChange} aria-label="Billing country">
                    <option value="-">-</option>
                    <option value="Albania">Albania</option>
                    <option value="Italy">Italy</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>  
                    <option value="Spain">Spain</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>  
                    <option value="Switzerland">Switzerland</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Austria">Austria</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Greece">Greece</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Norway">Norway</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Finland">Finland</option>
                    <option value="Poland">Poland</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Romania">Romania</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Scotland">Scotland</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Iceland">Iceland</option>
                    <option value="Malta">Malta</option>
                    <option value="Cyprus">Cyprus</option>
                </select>
                </div>
              </div>
            </div>
          )}

          {/* PAYMENT OPTIONS */}
          <div className={styles.paymentSection}>
            <h2 className={styles.sectionTitle}>Payment options</h2>
            <div className={styles.paymentBox}>
              <p className={styles.paymentPrice}>€2,240.00 - Payment on site</p>
              <div className={styles.radioRow}>
                <input type="radio" id="paymentOnSite" name="paymentType" checked={values.paymentSelected} onChange={() => setValues({ ...values, paymentSelected: true })} aria-label="Payment on site" />
                <label htmlFor="paymentOnSite">Payment on site</label>
              </div>
              <p className={styles.paymentInfo}>
                For a fixed booking we always ask for a deposit. All necessary information will follow in an email.
              </p>

              <div className={styles.termsWrapper}>
                <label className={`${styles.checkboxLabel} ${touched.agreedToTerms && !values.agreedToTerms ? styles.rowError : ''}`}>
                  <input 
                    type="checkbox" 
                    name="agreedToTerms" 
                    checked={values.agreedToTerms} 
                    onChange={(e) => {
                      e.stopPropagation();
                      handleChange(e);
                      setTouched({ ...touched, agreedToTerms: true });
                    }}
                    aria-label="I agree to the booking conditions, the privacy policy and the general terms and conditions"
                  />
                  <span className={styles.checkboxText}>
                    I agree to the booking conditions, the privacy policy and the general terms and conditions.
                  </span>
                </label>
                {touched.agreedToTerms && !values.agreedToTerms && (
                  <p className={styles.errorText}>
                    Please accept and confirm the privacy terms and general conditions.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* TRAVEL INSURANCE */}
          <div className={styles.insuranceSection}>
            <h2 className={styles.sectionTitleInsurance}>Add travel insurance</h2>
            <div className={styles.insuranceCard}>
              <div className={styles.insuranceMain}>
                <div className={styles.insuranceLogo}>
                  <img src="/logo_europaeische.png" alt="Europäische Reiseversicherung" />
                </div>
                <div className={styles.insuranceDescription}>
                  <p>Play it safe and take out travel insurance with “Europäische Reiseversicherung” to be covered from the day of your arrival until the day of your departure.</p>
                  <p className={styles.boldText}>What does the insurance cover include?</p>
                  <ul className={styles.insuranceList}>
                    <li><strong>Cancellation cover:</strong> Reimbursement of cancellation costs if the trip is not commenced (without deductible)</li>
                    <li><strong>Trip interruption:</strong> Compensation for booked and unused travel services</li>
                    <li><strong>Delayed arrival of the booked stay:</strong>Reimbursement of additional costs of accommodation and board during the journey up to € 600.00</li>
                    <li><strong>Involuntary extension of vacation:</strong> Reimbursement of additional accommodation and board costs at the vacation destination up to € 2,000.00</li>
                    <li><strong>Search and rescue costs:</strong> In the event of an accident, mountain rescue, or distress at sea (incl. helicopter rescue) up to € 7,500.00</li>
                  </ul>
                  <p className={styles.infoLink}>Additional information about travel insurance as well as the exact coverage description can be found here.</p>
                </div>
              </div>
              <div className={styles.insuranceAction}>
                <div className={styles.priceTag}>
                  <span className={styles.amount}>€149.00</span>
                  <span className={styles.subtext}>insurance tax incl.</span>
                </div>
                <button 
                 type="button" 
                 className={isInsuranceSelected ? styles.selectButton : styles.selectButton} 
                 onClick={() => setIsInsuranceSelected(!isInsuranceSelected)}
                 aria-label={isInsuranceSelected ? "Deselect travel insurance" : "Select travel insurance"}
                >
                 {isInsuranceSelected ? "Selected" : "Select"}
                </button>
              </div>
            </div>
          </div>

        </div> 
      </div>
    </>
  );
}