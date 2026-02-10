"use client";
import { CalendarDays, Maximize, Users, UtensilsCrossed, Image, ChevronDown, ChevronUp, X, ChevronRight, Info } from 'lucide-react';
import styles from './summary.module.css';
import SuccessStep from './booking_successful';
import { useState } from 'react';

interface SummaryProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  name: string;
  email: string;
  phone: string;
  country: string;
  selectedRoom: any;
  people: number;
  billingData?: {
    companyName?: string;
    vatNumber?: string;
    recipientCode?: string;
    streetAddress?: string;
    city?: string;
    postalCode?: string;
    billingCountry?: string;
  };
}

export default function Summary({ 
  startDate, endDate, selectedRoom, people, billingData, name, email, phone, country, 
}: SummaryProps) {
  
  // States 
  const [isOpen, setIsOpen] = useState(false);
  const [isDone, setIsDone] = useState(false); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [ratesOpen, setRatesOpen] = useState(true); 
  const [showModal, setShowModal] = useState(false);
  const touristTax = selectedRoom.price * 0.0181;
  const totalAmount = selectedRoom.price + touristTax;
  // Helper functions
  const formatDate = (date: Date | undefined) => 
    date ? date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '—';

  const getRefundableDate = (date: Date | undefined) => {
    if (!date) return "—";
    const refDate = new Date(date);
    refDate.setDate(refDate.getDate() - 30); 
    return refDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  if (!selectedRoom) return <div>No room selected</div>;

  // Lightbox logic
  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % selectedRoom.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + selectedRoom.images.length) % selectedRoom.images.length);
  };
  const handleConfirm = async () => {
  setIsSubmitting(true);
  
  // Dates formatting helper
 const formatDateForDB = (date: any) => 
  date ? new Date(date).toISOString().split('T')[0] : '';

  const bookingData = {
    room_id: selectedRoom.id, 
    full_name: name,
    email: email,
    phone: phone || "",
    check_in: formatDateForDB(startDate),
    check_out: formatDateForDB(endDate),
    guests: people
  };

  try {
    const response = await fetch('/api/bookings', { // API Route që postove më lart
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });

    if (response.ok) {
      setIsDone(true); // Shfaqim SuccessStep.tsx
    } else {
      const errData = await response.json();
      alert(errData.message || "Error creating booking");
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("Connection error");
  } finally {
    setIsSubmitting(false);
  }
};
if (isDone) {
    return (
      <SuccessStep name={name} email={email} />
    );
  }
  return (
    <div className={styles.summaryContainer}>
      {/* TRAVEL DETAILS */}
      <div className={styles.travelDetailsSection}>
        <h3 className={styles.travelDetailsTitle}>Travel details</h3>
        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}><span className={styles.detailLabel}>Arrival</span><span className={styles.detailValue}>{formatDate(startDate)}</span></div>
          <div className={styles.detailItem}><span className={styles.detailLabel}>Departure</span><span className={styles.detailValue}>{formatDate(endDate)}</span></div>
          <div className={styles.detailItem}><span className={styles.detailLabel}>Name</span><span className={styles.detailValue}>{name || "—"}</span></div>
          <div className={styles.detailItem}><span className={styles.detailLabel}>Email</span><span className={styles.detailValue}>{email || "—"}</span></div>
          <div className={styles.detailItem}><span className={styles.detailLabel}>Phone</span><span className={styles.detailValue}>{phone || "—"}</span></div>
          <div className={styles.detailItem}><span className={styles.detailLabel}>Country</span><span className={styles.detailValue}>{country || "—"}</span></div>
        </div>
      </div>

      {/* BILLING ADDRESS */}
      {billingData && (
        <div className={styles.travelDetailsSection}>
          <h3 className={styles.travelDetailsTitle}>Billing address</h3>
          <div className={styles.detailsGrid}>
             <div className={styles.detailItem}><span className={styles.detailLabel}>Company name</span><span className={styles.detailValue}>{billingData.companyName}</span></div>
             <div className={styles.detailItem}><span className={styles.detailLabel}>VAT number</span><span className={styles.detailValue}>{billingData.vatNumber}</span></div>
             <div className={styles.detailItem}><span className={styles.detailLabel}>Street address</span><span className={styles.detailValue}>{billingData.streetAddress || "—"}</span></div>
             <div className={styles.detailItem}><span className={styles.detailLabel}>City</span><span className={styles.detailValue}>{billingData.city}</span></div>
             <div className={styles.detailItem}><span className={styles.detailLabel}>Postal code</span><span className={styles.detailValue}>{billingData.postalCode || "—"}</span></div>
             <div className={styles.detailItem}><span className={styles.detailLabel}>Country</span><span className={styles.detailValue}>{billingData.billingCountry}</span></div>
          </div>
        </div>
      )}

      {/* SECTION: ROOM DETAILS */}
      <div className={styles.roomSectionSummary}>
        <h3 className={styles.sectionTitle}>Room</h3>
        
        <div className={styles.roomCardIdentical}>
          <div className={styles.roomTopRow}>
            <div className={styles.imageContainer} onClick={() => openLightbox(0)}>
              <img 
                src={selectedRoom.images?.[0]} 
                alt={selectedRoom.name} 
                className={styles.mainRoomImg} 
              />
              {selectedRoom.images?.length > 1 && (
                <div className={styles.imageCountBadge}>
                  <span className={styles.plusIcon}>+</span>
                  {selectedRoom.images.length}
                  <span className={styles.galleryIcon}><Image size={10} /></span>
                </div>
              )}
            </div>

            <div className={styles.infoContainer}>
              <div className={styles.roomHeader}>
                <h2 className={styles.roomTitle}>{selectedRoom.name}</h2>
                <div className={styles.mainPriceTag}>€{selectedRoom.price.toLocaleString()}</div>
              </div>

              <div className={styles.specsRow}>
                <span className={styles.specItem}><Users size={16} /> Occupancy: {selectedRoom.capacity}</span>
                <span className={styles.specItem}><Maximize size={16} /> Area: {selectedRoom.size}</span>
              </div>

              <div className={styles.descriptionWrapper}>
                <p className={styles.roomFullDescription}>{selectedRoom.description}</p>
              </div>
              
              {selectedRoom.equipment && selectedRoom.equipment.length > 0 && (
                <div className={styles.detailsContainer}>
                  <button
                    type="button"
                    className={styles.detailsButton}
                    onClick={() => setDetailsOpen(!detailsOpen)}
                  >
                    Details {detailsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              )}
            </div> 
          </div>

          {detailsOpen && selectedRoom.equipment && (
            <div className={styles.fullWidthEquipment}>
              <h4 className={styles.equipmentTitle}>Equipment</h4>
              <div className={styles.equipmentGrid}>
                {selectedRoom.equipment.map((item: string, index: number) => (
                  <div key={index} className={styles.equipmentItem}>
                    <span className={styles.checkIcon}>✓</span> {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RATES SECTION */}
          <div className={styles.ratesHeader}>
            <div className={styles.ratesTitle}>
              <span className={styles.calendarIcon}><CalendarDays /></span> Rates
            </div>
            <div
              className={styles.ratesHeaderPrice}
              onClick={(e) => {
                e.stopPropagation(); 
                setRatesOpen(!ratesOpen);
              }}
            >
               {ratesOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </div>
          </div>
          
          {ratesOpen && (
            <div className={styles.ratesSection}>
              <div className={styles.rateRow}>
                <div className={styles.rateLeft}>
                   <div className={styles.boardType}><UtensilsCrossed size={16} /> 3/4 board</div>
                   <div className={styles.occupancySmall}>{people} adults</div>
                </div>
                <div className={styles.rateMiddle}>
                  <span className={styles.refundable}>✓ Booking refundable until {getRefundableDate(startDate)}</span>
                  <button type="button" className={styles.learnMore} onClick={(e) => { e.stopPropagation(); setShowModal(true); }}>
                    Learn more
                  </button>
                </div>
                <div className={styles.rateRight}>
                  <span className={styles.bottomPrice}>€{selectedRoom.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CANCELLATION MODAL */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button aria-label="Close" className={styles.closeBtn} onClick={() => setShowModal(false)}><X /></button>
            <h3>Cancellation and Payment Policy</h3>
            <p>
              For a fixed booking we always ask for a deposit. All necessary information will follow in an email.

The right of withdrawal as laid down in the Consumers Code is not contemplated - however, we are willing to apply the following conditions for withdrawal.
For cancellations made up to 29 days before the date of arrival, no additional fee will be charged.
For cancellations within 28 to 8 days prior to arrival, 50% of the total booking will be charged.
For cancellations within 7 to 1 day prior to arrival, 75% of the total booking will be charged.
For cancellations on the day of arrival, 100% of the total booking will be charged.
In case of early departure, late arrival or no-show, we will charge a cancellation fee of 100% of the amount paid for the missing days.
            </p>
          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {isOpen && (
        <div className={styles.lightboxOverlay} onClick={() => setIsOpen(false)}>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>&times;</button>
          <button className={styles.navBtnPrev} onClick={prevImage}>&#10094;</button>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img src={selectedRoom.images[currentIndex]} alt="Room view" />
            <div className={styles.counter}>{currentIndex + 1} / {selectedRoom.images.length}</div>
          </div>
          <button className={styles.navBtnNext} onClick={nextImage}>&#10095;</button>
        </div>
      )}
      {/* SECTION: TRAVEL INSURANCE */}
      <div className={styles.summaryContainerr}>
    <div className={styles.contenttWrapper}>
      <div className={styles.fullWidthSection}>
      <div className={styles.insuranceSection}>
        <h3 className={styles.sectionTitleSmall}>Travel insurance</h3>
        <div className={styles.insuranceCard}>
          <div className={styles.insuranceLeft}>
            <img src="/logo_europaeische.png" alt="Europäische Reiseversicherung" className={styles.insuranceLogo} />
            <div className={styles.insuranceInfo}>
              <h4>Europäische Reiseversicherung</h4>
              <p>The travel insurance will be paid separately from the total price.</p>
              <p className={styles.insuranceNote}>
                <strong>Note:</strong> Please note that the conclusion of the travel insurance does not automatically occur with the completion of the booking. 
                <strong> After booking</strong>, you will have the possibility to take out insurance from Europäische Reiseversicherung AG.
              </p>
            </div>
          </div>
          <div className={styles.insurancePrice}>
            <span className={styles.taxIncl}>insurance tax incl.</span>
            <span className={styles.amountSmall}>€107.00</span>
          </div>
        </div>
      </div>
        </div>

      {/* SECTION: PRICE DETAILS */}
      <div className={styles.fullWidthSection}>
      <div className={styles.priceDetailsSection}>
        <h3 className={styles.sectionTitleSmall}>Price details</h3>
        <div className={styles.priceTable}>
          <div className={styles.priceRow}>
            <span>Room price</span>
            <span>€{selectedRoom.price.toLocaleString()}</span>
          </div>
          <div className={styles.priceRow}>
            <span className={styles.withInfo}>Tourist tax <span className={styles.infoIconWrapper}><Info /></span>
            </span>
            <span>€{touristTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <div className={styles.totalRow}>
            <span>Total amount <small>(including taxes and fees)</small></span>
           <span className={styles.finalTotal}>€{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>
        </div>
      {/* SECTION: PAYMENT */}
      <div className={styles.fullWidthSection}>
      <div className={styles.paymentSection}>
        <h3 className={styles.sectionTitleSmall}>Payment</h3>
        <div className={styles.paymentRow}>
          <span>To be paid on-site</span>
          <span className={styles.finalTotal}>€{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
    {/* SECTION: FINAL ACTION BUTTON */}
      <div className={styles.finalActionRow}>
       <button className={styles.confirmBookingBtn}
        onClick={handleConfirm}
         disabled={isSubmitting}
>
  {isSubmitting ? (
    "Processing..." 
  ) : (
    <>
      Book with commitment to pay <span className={styles.arrowRight}><ChevronRight /></span>
    </>
  )}
</button>
      </div>
</div>
    </div>
    </div>
  );
}