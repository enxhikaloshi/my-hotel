import { useState } from 'react';
import styles from './AvailableRoomCard.module.css';
import { Users,Info, ChevronDown, ChevronUp,Maximize,CalendarDays, UtensilsCrossed } from 'lucide-react';

// Ky interface duhet të jetë fiks si JSON-i që të kthen API yt
interface Room {
  id: number;
  name: string;
  price: number;
  capacity?: string;
  equipment?: string[];
  size?: string;
  description?: string;
  images?: string[]; 
}


export default function AvailableRoomCard({
  room,
  onSelect,
  startDate,
  endDate,
  adults,
  children
}: {
  room: Room;
  onSelect: (room: Room) => void;
  startDate?: Date;
  endDate?: Date;
  adults: number;
  children: number;
 
}) {
const occupancyText = `${adults} adult${adults > 1 ? 's' : ''}` + (children > 0 ? ` + ${children} child${children > 1 ? 'ren' : ''}` : '');
const [detailsOpen, setDetailsOpen] = useState(false);
const [ratesOpen, setRatesOpen] = useState(true);
function getRefundableDate(date?: Date) {
  if (!date) return '';

  const d = new Date(date);
  d.setDate(d.getDate() + 2);

  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long'
  });
}
const [showModal, setShowModal] = useState(false);
  return (
    <div className={styles.cardContainer}>
      <div className={styles.mainSection}>
        {/* Image */}
        <div className={styles.imageWrapper}>
          {room.images && room.images.length > 0 && (
            <img src={room.images[0]} alt={room.name} className={styles.roomImagee} />
          )}
        </div>

        {/* Information */}
        <div className={styles.contentWrapper}>
          <div className={styles.headerRow}>
            <h2 className={styles.roomName}>{room.name}</h2>
            <span className={styles.totalPrice}>€{room.price.toLocaleString()}</span>
          </div>
          
          <div className={styles.specs}>
            <span><Users size={16} /> Occupancy: {room.capacity}</span>
            <span><Maximize size={16} /> Area: {room.size}</span>
            <span className={styles.lastRoom}><Info size={16} /> Only 1 room left.</span>
          </div>

          <p className={styles.description}>{room.description}</p>
           {/* Details */}
                  {room.equipment && room.equipment.length > 0 && (
                    <div className={styles.detailsContainer}>
                      <button
                       type="button"
                        className={styles.detailsButton}
                       onClick={(e) => {
                       e.stopPropagation(); 
                       setDetailsOpen(!detailsOpen);
                      }}
                      >
                        Details {detailsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>
                  )}
                </div> 
      </div>
       {detailsOpen && room.equipment && (
              <div className={styles.fullWidthEquipment}>
                <h4 className={styles.equipmentTitle}>Equipment</h4>
                <div className={styles.equipmentGrid}>
                  {room.equipment.map((item, index) => (
                    <div key={index} className={styles.equipmentItem}>
                      <span className={styles.checkIcon}>✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

      {/* Rreshti i Rates (fiks si në foto) */}
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
         €{room.price.toLocaleString()} {ratesOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </div>
     
      {/* Rates */}
      {ratesOpen && (
      <div className={styles.ratesSection}>
        <div className={styles.rateRow}>
          <div className={styles.rateLeft}>
             <div className={styles.boardType}><UtensilsCrossed /> 3/4 board</div>
             <div className={styles.occupancySmall}>{occupancyText}</div>
          </div>
          <div className={styles.rateMiddle}>
            <span className={styles.refundable}>✓ Booking refundable until {getRefundableDate(startDate)}</span>
            <button type="button" className={styles.learnMore} 
           onClick={(e) => {
    e.stopPropagation(); 
    setShowModal(true);
  }}
>
  Learn more
</button>

          </div>
          <div className={styles.rateRight}>
            <span className={styles.bottomPrice}>€{room.price.toLocaleString() }</span>
            <button className={styles.selectBtn} onClick={() => onSelect(room)}>
              Select
            </button>
          </div>
          {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
              ×
            </button>
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
        </div>
      </div>
      )}
    </div>
  );
}