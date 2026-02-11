"use client";
import { useState } from 'react';
import styles from './PaymentShipping.module.css';

export type PaymentMethod = 'credit_card' | 'bank_transfer';
export type ShipmentMethod = 'pdf_download' | 'postal_mail';

export interface PaymentShippingData {
  paymentMethod: PaymentMethod;
  shipmentMethod: ShipmentMethod;
}

interface PaymentShippingProps {
  onNext: (data: PaymentShippingData) => void;
  onBack: () => void;
}

export default function PaymentShipping({ onNext, onBack }: PaymentShippingProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [shipmentMethod, setShipmentMethod] = useState<ShipmentMethod>('pdf_download');

  const handleSubmit = () => {
    onNext({ paymentMethod, shipmentMethod });
  };

  return (
    <div className={styles.stepThreeContent}>
      <h2>Payment method</h2>
      <p className={styles.subtitle}>Select your desired payment method here.</p>

      <div className={styles.section}>
        <div className={styles.optionCard}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="payment"
              value="credit_card"
              checked={paymentMethod === 'credit_card'}
              onChange={() => setPaymentMethod('credit_card')}
              className={styles.radioInput}
            />
            <span className={styles.radioCustom}></span>
            <span className={styles.optionText}>Credit card</span>
          </label>
        </div>

        <div className={styles.optionCard}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="payment"
              value="bank_transfer"
              checked={paymentMethod === 'bank_transfer'}
              onChange={() => setPaymentMethod('bank_transfer')}
              className={styles.radioInput}
            />
            <span className={styles.radioCustom}></span>
            <span className={styles.optionText}>Bank transfer</span>
          </label>
        </div>

        {paymentMethod === 'bank_transfer' && (
          <p className={styles.infoText}>
            You will receive an e-mail with the instructions for the bank transfer. The voucher will be valid only after we get the payment.
          </p>
        )}
      </div>

      <h2 className={styles.sectionTitle}>Shipment option</h2>

      <div className={styles.section}>
        <div className={styles.optionCard}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="shipment"
              value="pdf_download"
              checked={shipmentMethod === 'pdf_download'}
              onChange={() => setShipmentMethod('pdf_download')}
              className={styles.radioInput}
            />
            <span className={styles.radioCustom}></span>
            <span className={styles.optionText}>PDF download</span>
          </label>
        </div>

        <p className={styles.infoText}>
          Immediately after completing your voucher order, you can download and print the voucher.
        </p>
      </div>

      <div className={styles.buttonGroup}>
        <button type="button" onClick={onBack} className={styles.backBtn}>
          <span className={styles.backArrow}>←</span> Back
        </button>
        <button type="button" onClick={handleSubmit} className={styles.proceedBtn}>
          Proceed to overview
        </button>
      </div>
    </div>
  );
}