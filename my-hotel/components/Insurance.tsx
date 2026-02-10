'use client';

import { useState } from 'react';
import styles from './moments.module.css';

interface Step {
  number: number;
  label: string;
}
interface FormData {
    deposit: boolean;
    tripCancellation: boolean;
    paymentMethod: string;
}
export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    deposit: true,
    tripCancellation: false,
    paymentMethod: 'online'
  });
 const [isOpen, setIsOpen] = useState(false);
  const steps = [
    { number: 1, label: 'SELECTION' },
    { number: 2, label: 'DATA ENTRY' },
    { number: 3, label: 'SUMMARY' },
    { number: 4, label: 'CLOSURE' }
  ];

  const validateStep = (step:number):boolean => {
    switch (step) {
      case 1:
        // Step 1 requires at least one product selected
        return formData.deposit || formData.tripCancellation;
      case 2:
        // Add your data entry validation here
        return true;
      case 3:
        // Add your summary validation here
        return true;
      default:
        return true;
    }
  };

  const handleContinue = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      alert('Please complete the required fields before continuing.');
    }
  };

  const handleStepClick = (stepNumber:number) => {
    // Only allow going back or to completed steps
    if (stepNumber <= currentStep) {
      setCurrentStep(stepNumber);
    }
  };

  const handleCheckboxChange = (field: keyof Pick<FormData, 'deposit' | 'tripCancellation'>) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };
 

  return (
    
    <div className={styles.container}>
      <div className={styles.formCard}>
       <h2>Travel Cancellation Insurance</h2>
      <h3>ALPEN TESITIN - MONGUELFO-TESIDO</h3>
        {/* Progress Steps */}
        <div className={styles.progressContainer}>
          {steps.map((step, index) => (
            <div key={step.number} className={styles.stepWrapper}>
              <div
                className={`${styles.stepBox} ${
                  currentStep === step.number
                    ? styles.stepActive
                    : currentStep > step.number
                    ? styles.stepCompleted
                    : styles.stepInactive
                }`}
                onClick={() => handleStepClick(step.number)}
              >
                {step.number}
              </div>
              <div className={styles.stepLabel}>{step.label}</div>
              {index < steps.length - 1 && (
                <div className={styles.stepConnector}></div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.divider}></div>

        {/* Step Content */}
        <div className={styles.content}>
          {currentStep === 1 && (
            <div className={styles.stepContent}>
              <h2 className={styles.sectionTitle}>PRODUCT SELECTION</h2>
              <p className={styles.instruction}>
                please select <strong>one</strong> or <strong>both</strong> of the possible products
              </p>

              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.deposit}
                    onChange={() => handleCheckboxChange('deposit')}
                    className={styles.checkbox}
                  />
                  <span className={styles.checkboxText}>deposit</span>
                </label>

                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.tripCancellation}
                    onChange={() => handleCheckboxChange('tripCancellation')}
                    className={styles.checkbox}
                  />
                  <span className={styles.checkboxText}>
                    Trip cancellation protection Hotel Cancellation Plus
                  </span>
                </label>
                <button 
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '- ' : '+ '}
        What does the insurance cover?
      </button>

      {isOpen && (
        <div className={styles.infoBox}>
          <div className={styles.coverageItem}>
            <strong>Trip cancellation:</strong> Reimbursement of cancellation costs if trip not started up to selected trip price (no excess)
          </div>
          
          <div className={styles.coverageItem}>
            <strong>Trip interruption:</strong> Reimbursement of the booked but unused travel service up to selectet trip price
          </div>
          
          <div className={styles.coverageItem}>
            <strong>Delayed arrival:</strong> Reimbursement of additional costs of overnight accomodation and meals during the outward journey up to € 600.-
          </div>
          
          <div className={styles.coverageItem}>
            <strong>Involuntary extension of holiday:</strong> Reimbursement of additional costs of overnight accomodation and meals at the holiday destination up to € 2,000.-
          </div>
          
          <div className={styles.coverageItem}>
            <strong>Search and rescue costs:</strong> in the event of an accident or in the event of distress in the mountains or at sea up to € 7,500.- (incl. helicopter rescue)
          </div>

          <div className={styles.linksContainer}>
            <div className={styles.iconWrapper}>
              <svg className={styles.infoIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
            </div>
            <div className={styles.links}>
              <a href="#" className={styles.link}>Coverage Description</a>
              <a href="#" className={styles.link}>Terms and conditions of insurance</a>
            </div>
          </div>
        </div>
      )}
              </div>

              <div className={styles.paymentSection}>
                <h3 className={styles.paymentTitle}>PAYMENT WITH</h3>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={formData.paymentMethod === 'online'}
                    onChange={(e) =>
                      setFormData(prev => ({
                        ...prev,
                        paymentMethod: e.target.value
                      }))
                    }
                    className={styles.radio}
                  />
                  <span className={styles.radioText}>pay online via a secure site</span>
                </label>
                <div className={styles.paymentIcons}>
                  <img src="/visa.svg" alt="Visa" className={styles.paymentIcon} />
                  <img src="/mastercard.svg" alt="Mastercard" className={styles.paymentIcon} />
                  <img src="/maestro.svg" alt="Maestro" className={styles.paymentIcon} />
                  <img src="/vpay.svg" alt="V Pay" className={styles.paymentIcon} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className={styles.stepContent}>
              <h2 className={styles.sectionTitle}>DATA ENTRY</h2>
              <p>Enter your personal information here...</p>
              {/* Add your data entry form fields here */}
            </div>
          )}

          {currentStep === 3 && (
            <div className={styles.stepContent}>
              <h2 className={styles.sectionTitle}>SUMMARY</h2>
              <p>Review your information...</p>
              {/* Add your summary content here */}
            </div>
          )}

          {currentStep === 4 && (
            <div className={styles.stepContent}>
              <h2 className={styles.sectionTitle}>CLOSURE</h2>
              <p>Thank you for completing the form!</p>
              {/* Add your closure content here */}
            </div>
          )}
        </div>

        {/* Continue Button */}
        {currentStep < 4 && (
          <div className={styles.buttonContainer}>
            <button
              onClick={handleContinue}
              className={styles.continueButton}
              disabled={!validateStep(currentStep)}
            >
              CONTINUE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}