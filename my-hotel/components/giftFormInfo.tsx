"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import styles from './BuyerInfoForm.module.css';

interface FormData {
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

interface FormErrors {
  title?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  email?: string;
}
interface BuyerInfoFormProps {
  onNext: (formData: FormData) => void;
  onBack: () => void; 
}

export default function BuyerInfoForm({ onNext ,onBack}: BuyerInfoFormProps) {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    firstName: '',
    lastName: '',
    address: '',
    zip: '',
    city: '',
    country: '',
    email: '',
    phone: '',
    taxNumber: '',
    additionalEmail: '',
    note: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleTitleSelect = (title: string) => {
    setFormData({ ...formData, title });
    if (errors.title) {
      setErrors({ ...errors, title: '' });
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title) {
      newErrors.title = 'Please select a title';
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.country) {
      newErrors.country = 'Country is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form is valid, proceed to next step
      onNext(formData);
    }
  };

  return (
    <div className={styles.stepTwoContent}>
      <h2>Buyer information</h2>
      <p className={styles.subtitle}>Please fill in your personal data.</p>

      <form className={styles.buyerForm} onSubmit={handleSubmit}>
       <div className={styles.formGroup}>
  <label className={styles.label}>
    Title<span className={styles.required}>*</span>
  </label>
  <div className={styles.titleButtonGroup}>
    <button
      type="button"
      className={formData.title === 'Ms' ? styles.titleBtnActive : styles.titleBtn}
      onClick={() => handleTitleSelect('Ms')}
    >
      Ms
    </button>
    <button
      type="button"
      className={formData.title === 'Mr' ? styles.titleBtnActive : styles.titleBtn}
      onClick={() => handleTitleSelect('Mr')}
    >
      Mr
    </button>
    <button
      type="button"
      className={formData.title === 'Company' ? styles.titleBtnActive : styles.titleBtn}
      onClick={() => handleTitleSelect('Company')}
    >
      Company
    </button>
  </div>
  {errors.title && <span className={styles.error}>{errors.title}</span>}
</div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Name<span className={styles.required}>*</span>
          </label>
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First name"
                className={errors.firstName ? styles.inputError : ''}
              />
              {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
            </div>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last name"
                className={errors.lastName ? styles.inputError : ''}
              />
              {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
            </div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
          />
        </div>

        <div className={styles.formGroup}>
          <div className={styles.row}>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
              placeholder="ZIP"
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
            />
            <select
            aria-label='country'
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className={errors.country ? styles.inputError : ''}
              required
            >
              <option value="" disabled hidden>Country</option>
              <option value="Albania">Albania</option>
              <option value="Austria">Austria</option>
              <option value="Germany">Germany</option>
              <option value="Italy">Italy</option>
              <option value="Switzerland">Switzerland</option>
              <option value='Turkey'>Turkey</option>
              <option value='France'>France</option>
              <option value='Netherland'>Netherland</option>
              <option value='Spain'>Spain</option>
              <option value='Portugal'>Portugal</option>
              <option value='Poland'>Poland</option>
            </select>
          </div>
          {errors.country && <span className={styles.error}>{errors.country}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Contact<span className={styles.required}>*</span>
          </label>
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email address"
                className={errors.email ? styles.inputError : ''}
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone number"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>More data</label>
          <div className={styles.row}>
            <input
              type="text"
              name="taxNumber"
              value={formData.taxNumber}
              onChange={handleInputChange}
              placeholder="TAX number"
            />
            <input
              type="email"
              name="additionalEmail"
              value={formData.additionalEmail}
              onChange={handleInputChange}
              placeholder="Additional email"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Note</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleInputChange}
            placeholder="Note"
            rows={4}
            className={styles.textarea}
          />
        </div>
     <div className={styles.buttonActionGroup}>
          <button type="button" className={styles.backStepBtn} onClick={onBack}>
            <span className={styles.backArrow}>←</span> Back
          </button>
          <button type="submit" className={styles.proceedBtn}>
            Proceed to payment methods
          </button>
        </div>
        <p className={styles.requiredNote}>*This field must be completed.</p>
      </form>
    </div>
  );
}