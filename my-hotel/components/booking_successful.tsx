"use client";
import React from 'react';
import { Check } from 'lucide-react';
import styles from './success.module.css';

interface SuccessStepProps {
  name: string;
  email: string;
}

export default function SuccessStep({ name, email }: SuccessStepProps) {
  return (
    <div className={styles.container}>
      {/* Icon Check  */}
      <div className={styles.iconWrapper}>
        <Check size={48} strokeWidth={3} className={styles.checkIcon} />
      </div>

      <h2 className={styles.title}>Booking successful</h2>
      
      <p className={styles.confirmationText}>
        Thank you! Your booking has been confirmed.<br />
        A confirmation email has been sent to <strong>{email}</strong>.
      </p>

      {/* Insurance Section */}
      <div className={styles.insuranceSection}>
        <h3 className={styles.insuranceTitle}>Take out travel insurance now</h3>
        
        <p className={styles.insuranceDescription}>
          Please note that the travel insurance's conclusion does not occur automatically 
          with the booking's completion. Follow the link below to take out the insurance 
          and be covered for unexpected events.
        </p>

        <button className={styles.purchaseBtn}>
          Purchase insurance
        </button>
      </div>
    </div>
  );
}