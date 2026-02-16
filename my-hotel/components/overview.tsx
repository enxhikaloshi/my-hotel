"use client";
import { useState } from 'react';
import styles from './overview.module.css';
import { CircleCheck, CircleDollarSign, CircleUserRound, CreditCard, Mail, Mailbox, Send, Star } from 'lucide-react';

interface VoucherData {
  name: string;
  category: string;
  price: number;
  imageUrl?: string;
}

interface BuyerData {
  title: string;
  firstName: string;
  lastName: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  taxNumber: string;
  additionalEmail: string;
  note: string;
}

interface PaymentData {
  paymentMethod: 'credit_card' | 'bank_transfer';
  shipmentMethod: 'pdf_download' | 'postal_mail';
}

interface AdditionalItem {
  name: string;
  quantity: number;
}

interface OverviewProps {
  voucherData: VoucherData;
  buyerData: BuyerData;
  paymentData: PaymentData;
  additionalItems?: AdditionalItem[];
  onBack: () => void;
  onSubmit: () => void;
}

export default function Overview({
  voucherData,
  buyerData,
  paymentData,
  additionalItems = [],
  onBack,
  onSubmit
}: OverviewProps) {
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const handleSubmit = () => {
    if (privacyAccepted && termsAccepted) {
      onSubmit();
    }
  };

  const isSubmitDisabled = !privacyAccepted || !termsAccepted;

  const getPaymentMethodLabel = (method: string) => {
    return method === 'credit_card' ? 'Credit card' : 'Bank transfer';
  };

  const getShipmentMethodLabel = (method: string) => {
    return method === 'pdf_download' ? 'PDF download' : 'Postal mail';
  };

  return (
    <div className={styles.overviewContent}>
      <h2>Overview</h2>
      <p className={styles.subtitle}>
        Thank you very much for choosing one of our vouchers! Here you have the opportunity to check your
        configuration and order data. We look forward to welcoming you or your loved ones soon!
      </p>

      {/* Voucher Value */}
      <div className={styles.infoCard}>
        <div className={styles.iconText}>
          <span className={styles.icon}><CircleDollarSign /></span>
          <div>
            <div className={styles.mainValue}>€{voucherData.price.toFixed(2)}</div>
            <div className={styles.label}>Voucher value</div>
          </div>
        </div>
      </div>

      {/* Additional Items */}
      {additionalItems.length > 0 && (
        <div className={styles.infoCard}>
          <div className={styles.iconText}>
            <span className={styles.icon}><Star /></span>
            <div>
              <div className={styles.mainValue}>
                {additionalItems.length} selected additional
              </div>
              {additionalItems.map((item, index) => (
                <div key={index} className={styles.subValue}>
                  {item.quantity}x {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Personal Information Grid */}
      <div className={styles.gridContainer}>
        {/* Name */}
        <div className={styles.gridItem}>
          <div className={styles.iconText}>
            <span className={styles.icon}> <CircleUserRound /></span>
            <div>
              <div className={styles.mainValue}>
                {buyerData.title} {buyerData.firstName} {buyerData.lastName}
              </div>
              <div className={styles.label}>Name</div>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className={styles.gridItem}>
          <div className={styles.iconText}>
            <span className={styles.icon}><Mailbox /></span>
            <div>
              <div className={styles.mainValue}>{buyerData.country}</div>
              {buyerData.address && <div className={styles.subValue}>{buyerData.address}</div>}
              {(buyerData.zip || buyerData.city) && (
                <div className={styles.subValue}>
                  {buyerData.zip} {buyerData.city}
                </div>
              )}
              <div className={styles.label}>Address</div>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className={styles.gridItem}>
          <div className={styles.iconText}>
            <span className={styles.icon}> <Mail /></span>
            <div>
              <div className={styles.mainValue}>{buyerData.email}</div>
              <div className={styles.label}>E-mail address</div>
            </div>
          </div>
        </div>

        {/* PEC Email (if provided) */}
        {buyerData.additionalEmail && (
          <div className={styles.gridItem}>
            <div className={styles.iconText}>
              <span className={styles.icon}><CircleCheck /></span>
              <div>
                <div className={styles.mainValue}>{buyerData.additionalEmail}</div>
                <div className={styles.label}>PEC e-mail</div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Method */}
        <div className={styles.gridItem}>
          <div className={styles.iconText}>
            <span className={styles.icon}><CreditCard /></span>
            <div>
              <div className={styles.mainValue}>
                {getPaymentMethodLabel(paymentData.paymentMethod)}
              </div>
              <div className={styles.label}>Payment method</div>
            </div>
          </div>
        </div>

        {/* Shipment Option */}
        <div className={styles.gridItem}>
          <div className={styles.iconText}>
            <span className={styles.icon}><Send /></span>
            <div>
              <div className={styles.mainValue}>
                {getShipmentMethodLabel(paymentData.shipmentMethod)}
              </div>
              <div className={styles.label}>Shipment option</div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkboxes */}
      <div className={styles.checkboxSection}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            className={styles.checkbox}
          />
          <span className={styles.checkboxText}>
            <a href="/privacy-policy" target="/privacy-policy" className={styles.link}>
              Privacy
            </a>{' '}
            *
          </span>
        </label>

        <label className={styles.checkboxLabel}>
  <input
    type="checkbox"
    checked={termsAccepted}
    onChange={(e) => setTermsAccepted(e.target.checked)}
    className={styles.checkbox}
  />
  <span className={styles.checkboxText}>
  
    <span 
      className={styles.link} 
      onClick={() => setIsTermsModalOpen(true)}
      style={{ cursor: 'pointer', textDecoration: 'underline' }}
    >
      General terms and conditions
    </span>{' '}
    *
  </span>
</label>
      </div>

      {/* Buttons */}
      <div className={styles.buttonGroup}>
        <button type="button" onClick={onBack} className={styles.backBtn}>
          <span className={styles.backArrow}>←</span> Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className={styles.submitBtn}
        >
          Submit order
        </button>
      </div>
      {isTermsModalOpen && (
  <div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      <button 
        className={styles.closeModal} 
        onClick={() => setIsTermsModalOpen(false)}
      >
        ×
      </button>
      
      <h2>General terms and conditions for purchasing online vouchers</h2>
      
      <div className={styles.modalBody}>
        <h3>Condition of purchase or delivery</h3>
        <p>The contract will be made with Hotel Alpen Tesitin and will be finalized with the payment of the gift voucher.</p>
        
        <h3>Order</h3>
        <p>The order of the voucher will be made in the online-shop hosted on our homepage and paid by credit card or bank transfer. You will receive the voucher by e-mail. Please print this email as your reference. You can request the voucher by post without incurring postal charges. All of our vouchers have a Barcode to identify them. You must present this voucher with its Barcode reference when requested. The client is responsible for the voucher’s safety. We are not responsible for any loss or abuse of the gift voucher. In case of loss, burglary or devaluation of the voucher we can’t refund the value of the voucher.</p>
        <h3>Prices and products</h3>
        <p>The purchased voucher is not repaiable, in any form, for money. When sending the gift voucher by post, We does not take any responsibility for the time taken for delivery. The voucher is only valid if the payment is entirely completed. Cash Value vouchers have 1 year validity from the date of issue.
</p>
       <h3>Right of withdrawal</h3>
       <p>If the voucher does not correspond to you imagination within 14 days from the date of issue you are able to send the voucher back to us. The cancelation of the order has to be sent within 14 days from the date of issue. The claim to the right of withdrawal can not be enforced if the service from the ordered voucher has already started.</p>
      </div>
    </div>
  </div>
)}
    </div>
  );
}