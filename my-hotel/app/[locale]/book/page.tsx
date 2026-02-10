'use client';

import React, { useState, useMemo,useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '@/components/page.module.css';
import SmallHeader from '@/components/Smallheader';
import StepProgress from '@/components/progress';
import TravelDescription, { RoomData } from '@/components/travelDescription';
import { Range } from 'react-date-range';
import Footer from '@/components/Footer';
import RoomDescription from '@/components/roomdescription';
import PersonalData from '@/components/PersonalData';
import Summary from '@/components/summary';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BookingForm(){
  const searchParams = useSearchParams();
  const roomIdFromUrl = searchParams.get('roomId');
  const [step, setStep] = useState(1);
  const [rooms, setRooms] = useState<RoomData[]>([
    { adults: 2, children: 0, childAges: [] }
  ]);

  const [dates, setDates] = useState<Range[]>([
    { 
      startDate: undefined, 
      endDate: undefined, 
      key: 'selection' 
    }
  ]);

  useEffect(() => {
    if (roomIdFromUrl) {
      const fetchPreSelectedRoom = async () => {
        try {
          
          const response = await fetch(`/api/rooms/${roomIdFromUrl}`);
          if (response.ok) {
            const data = await response.json();
            setSelectedRoom(data); // Ruajmë dhomën e gjetur
            console.log("Room pre-selected:", data.name);
          }
        } catch (error) {
          console.error("Error fetching room from URL:", error);
        }
      };
      fetchPreSelectedRoom();
    }
  }, [roomIdFromUrl]);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [country, setCountry] = useState('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [message, setMessage] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const handleRoomSelect = (room: any) => {
   console.log("Room object being saved:", room);
  setSelectedRoom(room); 
  setStep(3); 
};
  const startDate = dates[0]?.startDate;
  const endDate = dates[0]?.endDate;
  const MIN_STAY = 4;
  const [billingData, setBillingData] = useState({
  companyName: '',
  vatNumber: '',
  recipientCode: '',
  streetAddress: '',
  city: '',
  postalCode: '',
  billingCountry: ''
});
  const nights = useMemo(() => {
    if (!startDate || !endDate || startDate.getTime() === endDate.getTime()) return 0;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
  }, [startDate, endDate]);

  const isUnderMinStay = nights > 0 && nights < MIN_STAY;

  // Formatimi i datave për shiritin (Step 2)
  const formattedDates = startDate && endDate 
    ? `${startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })} to ${endDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`
    : "No dates selected";

  const getStatusMessage = () => {
    if (!startDate) return "Please select your arrival date";
    if (startDate && (!endDate || nights === 0)) return "Please select your departure date";
    return `Duration of stay: ${nights} ${nights === 1 ? 'night' : 'nights'}`;
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
  };

  return (
    <div className={styles.bookingPage}>
      <SmallHeader />

      <div className={styles.hero}>
        <h2 className={styles.hertitle}>Book online quickly and easily</h2>
         <p className={styles.hersubtitle}>
            Just a few clicks and you can start looking forward to a holiday full of{' '}
            <span className={styles.textLink}>luxury</span> and{' '}
            <span className={styles.textLink}>indulgence</span> as well as fantastic{' '}
            <span className={styles.textLink}>natural experiences</span> and{' '}
            <span className={styles.textLink}>boundless relaxation</span>. 
            Your getaway at the Alpen Tesitin begins here!
          </p>
      </div>

      <section className={styles.BookingForm}>
        <StepProgress step={step} completedSteps={[1, 2, 3].filter(s => s < step)} />

        <form onSubmit={handleSubmit} className="booking-form">
          {message && <div className={styles.messageBanner}>{message}</div>}

          {/* HAPI 1 */}
          {step === 1 && (
            <TravelDescription
              rooms={rooms}
              setRooms={setRooms}
              dates={dates}
              setDates={setDates}
              bookedDates={bookedDates}
              selectedRoom={selectedRoom}
              setSelectedRoom={setSelectedRoom}
            />
          )}
         {/* HAPI 2 */}
{step === 2 && (
  <div className={styles.availabilityWrapper}>
    <RoomDescription 
      setBookedDates={setBookedDates} 
      onCheckAvailability={() => setStep(1)} 
      dates={{ startDate, endDate }}
      
      onSelect={handleRoomSelect} 
      setStep={setStep} 
      adults={rooms[0].adults}     
      children={rooms[0].children}
      loading={loadingRooms}
      onlyShowId={roomIdFromUrl}
    />
  </div>
)}
{/* STEP 3 */}
{step === 3 && (
  <PersonalData 
    dates={{ 
      startDate: startDate, 
      endDate: endDate, 
      year: startDate?.getFullYear().toString() || '' 
    }} 
    people={rooms[0].adults + rooms[0].children} 
    roomName={selectedRoom?.name || ""} 
    price={selectedRoom?.price || 0}
    setName={setName}
    setEmail={setEmail}
    setPhone={setPhone}
    setCountry={setCountry}
    setBillingData={setBillingData}
  />
)}
{/* STEP 4 */}
{step === 4 && (
  <Summary 
    startDate={startDate}
    endDate={endDate}
    name={name}
    email={email}
    phone={phone}
    country={country}
    selectedRoom={selectedRoom} 
    people={rooms[0].adults + rooms[0].children}
    billingData={billingData}
  />
)}
          {/*  STICKY */}
          {step === 1 && (
            <div className={styles.stickyFooterWrapper}>
              {isUnderMinStay && (
                <div className={styles.attentionBanner}>
                  Attention, the selected period requires a minimum stay. 
                  Please send us a non-binding reservation enquiry.
                </div>
              )}
             <div className={styles.stickyActionBtn}>
    
      <div className={styles.sideElement}></div>

 
      <div className={styles.centerElement}>
        {getStatusMessage()}
      </div>

    
      <div className={styles.sideElement}>
        <button 
          type="button" 
          onClick={() => setStep(2)} 
          className={styles.goToRoomBtn}
        >
          Go to 'Room' <span className={styles.arrowIcon}><ChevronRight size={18} /></span>
        </button>
      </div>
    </div>
  </div>
)}
{/* STEP  2*/}
{step === 2 && (
  <div className={styles.stickyFooterWrapper}>
    <div className={styles.stickyActionBtn}>
      <button type="button" onClick={prevStep} className={styles.backLinkBtn}>
        <ChevronLeft size={18} /> Back
      </button>
      <div className={styles.poweredBy}>
        Powered by HGV
      </div>
      <div style={{ width: '120px' }}></div> 
    </div>
  </div>
)}

{/* STEP 3 */}
{step === 3 && (
  <div className={styles.stickyFooterWrapper}>
    <div className={styles.stickyActionBtn}>
      {/* left:  Back button*/}
      <button type="button" onClick={prevStep} className={styles.backLinkBtn}>
        <span className={styles.arrowIconLeft}><ChevronLeft size={18}/></span> Back
      </button>
      <div className={styles.poweredBy}>
        Powered by HGV
      </div>
      <button 
        type="button" 
        onClick={() => setStep(4)} 
        className={styles.goToRoomBtn}
      >
        Go to 'Summary' <span className={styles.arrowIcon}>›</span>
      </button>
    </div>
  </div>
)}

{/* Step 4: Final Configuration */}
{step === 4 && (
  <div className={styles.stickyFooterWrapper}>
    <div className={styles.stickyActionBtn}>
      <button type="button" onClick={prevStep} className={styles.backLinkBtn}>
        <ChevronLeft size={18} /> Back
      </button>
      <div className={styles.poweredBy}>
        Powered by HGV
      </div>
      <div style={{ width: '120px' }}></div> 
    </div>
  </div>
)}
        </form>
      </section>
      <Footer />
    </div>
  );
}