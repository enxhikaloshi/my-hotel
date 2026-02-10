'use client';
import { useEffect, useState, Suspense } from 'react';
import SmallHeader from '@/components/Smallheader';
import Footer from '@/components/Footer';
import styles from '@/components/enquire.module.css';
import DatePicker from 'react-datepicker';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, Users, Plus, MessageSquare, List, ChevronDown, Minus, X, Trash2, Info } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import CarouselEnquire from '@/components/CarouselEnquire';
import { useTranslations, useLocale } from 'next-intl';

interface Stay {
  id: number;
  startDate: Date | null;
  endDate: Date | null;
  adults: number;
  children: number;
  selectedRooms: any[];
}
interface Treatment {
  id: number;
  category: string;
  treatment_name: string;
  price_euro: number; 
  duration_min: number;
  description: string;
}


export default function EnquirePage() {
    return (
    <Suspense fallback={<div>Loading...</div>}>
      <EnquireContent />
    </Suspense>
  );
}
function EnquireContent() {
  const t = useTranslations('EnquirePage');
  const locale = useLocale();
  
  const [selectedCategory, setSelectedCategory] = useState("Show all");
  const [isExtrasModalOpen, setIsExtrasModalOpen] = useState(false);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [stays, setStays] = useState<Stay[]>([
    { id: 1, startDate: null, endDate: null, adults: 2, children: 0, selectedRooms: [] }
  ]);
  const [dbRooms, setDbRooms] = useState<any[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [showAddress, setShowAddress] = useState(false);
  const [showGuestsId, setShowGuestsId] = useState<number | null>(null);
  const [showRoomModalForStay, setShowRoomModalForStay] = useState<number | null>(null);
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [errors, setErrors] = useState<{[key: string]: boolean}>({});
  const [touched, setTouched] = useState(false);
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId')|| searchParams.get('room');
  const roomName = searchParams.get('roomName');
  const offerId = searchParams.get('offerId') || searchParams.get('deal');
  const [selectedExtras, setSelectedExtras] = useState<any[]>([]);
  const [count, setCount] = useState(1);
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
 const handleAddServices = () => {
  const toAdd = treatments.filter((item: Treatment) => (quantities[item.id] || 0) > 0);
  
  setSelectedExtras(toAdd);
  setIsExtrasModalOpen(false);
};
  useEffect(() => {
  const fetchData = async () => {
    try {
      
      const roomsResponse = await fetch(`/api/rooms?locale=${locale}`);
      const roomsData = await roomsResponse.json();
      setDbRooms(roomsData);

      
      if (offerId) {
        console.log("Fetching offer with ID:", offerId);
        try {
          const offerResponse = await fetch(`/api/hotel_deals/${offerId}?locale=${locale}`);
          console.log("Offer response status:", offerResponse.status);
          
          if (offerResponse.ok) {
            const offerData = await offerResponse.json();
            console.log("Fetched offer data:", offerData);
            setSelectedOffer(offerData);

            
            if (offerData.valid_from && offerData.valid_to) {
              updateStay(1, { 
                startDate: new Date(offerData.valid_from), 
                endDate: new Date(offerData.valid_to) 
              });
            }
          } else {
            console.error("Failed to fetch offer - Status:", offerResponse.status);
            const errorText = await offerResponse.text();
            console.error("Error response:", errorText);
          }
        } catch (offerError) {
          console.error("Error fetching offer:", offerError);
        }
      } else {
        console.log("No offerId in search params");
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  fetchData();
}, [offerId, locale]);
useEffect(() => {
  const treatmentNameFromUrl = searchParams.get('treatment');
  
  if (treatmentNameFromUrl && treatments.length > 0) {
    const decodedName = decodeURIComponent(treatmentNameFromUrl);
    const foundTreatment = treatments.find((t) => t.treatment_name === decodedName);

    if (foundTreatment) {
  
      setSelectedExtras(prev => {
        const exists = prev.some(item => item.id === foundTreatment.id);
        if (exists) return prev;
        return [...prev, foundTreatment]; 
      });
      
      setQuantities(prev => ({
        ...prev,
        [foundTreatment.id]: prev[foundTreatment.id] || 1
      }));
    }
  }
}, [searchParams, treatments]);
useEffect(() => {
  const fetchTreatments = async () => {
    try {
      const response = await fetch(`/api/treatments?locale=${locale}`); 
      const data = await response.json();
      setTreatments(data);
    } catch (error) {
      console.error("Error while getting the information:", error);
    }
  };
  fetchTreatments();
}, [locale]);
  useEffect(() => {
  if (dbRooms.length > 0 && roomId) {
    const room = dbRooms.find(r => r.id === parseInt(roomId));
    const fromDate = searchParams.get('from');
    const toDate = searchParams.get('to');
    
    if (room) {
      updateStay(1, { 
        selectedRooms: [room],
        ...(fromDate && { startDate: new Date(fromDate) }),
        ...(toDate && { endDate: new Date(toDate) })
      });
    }
  }
}, [dbRooms, roomId, searchParams]);

  const addStay = () => {
    const newId = stays.length > 0 ? Math.max(...stays.map(s => s.id)) + 1 : 1;
    setStays([...stays, { id: newId, startDate: null, endDate: null, adults: 2, children: 0, selectedRooms: [] }]);
  };

  const removeStay = (id: number) => {
    setStays(stays.filter(stay => stay.id !== id));
  };

  const updateStay = (id: number, fields: Partial<Stay>) => {
    setStays(stays.map(stay => stay.id === id ? { ...stay, ...fields } : stay));
  };

  const toggleRoomSelection = (stayId: number, room: any) => {
    const stay = stays.find(s => s.id === stayId);
    if (!stay) return;

    const isSelected = stay.selectedRooms.find(r => r.id === room.id);
    const newRooms = isSelected 
      ? stay.selectedRooms.filter(r => r.id !== room.id)
      : [...stay.selectedRooms, room];
    
    updateStay(stayId, { selectedRooms: newRooms });
  };
  
  const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setTouched(true);
  
  const currentForm = e.currentTarget;
  const formData = new FormData(currentForm);
  const newErrors: { [key: string]: boolean } = {};


  // 1. Validation of personal fields
  if (!formData.get('firstName')) newErrors.firstName = true;
  if (!formData.get('lastName')) newErrors.lastName = true;
  if (!formData.get('email')) newErrors.email = true;

  // 2. Validation of stay dates
  stays.forEach(stay => {
    if (!stay.startDate || !stay.endDate) {
      newErrors[`stay-${stay.id}`] = true;
    }
  });

  setErrors(newErrors);

  // 3. If there are errors, do not submit
  if (Object.keys(newErrors).length > 0) {
    
    return;
  }

  setIsSubmitting(true);

  // 4. Prepare payload
  const payload = {
    personalInfo: {
      title: selectedTitle,
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: phone,
      street: formData.get('street') || null,
      postcode: formData.get('postcode') || null,
      city: formData.get('city') || null,
      country: selectedCountry || null,
      comment: formData.get('comment') || null,
      marketingConsent: formData.get('marketingConsent') === 'on'
    },
    stays: stays.map(s => ({
      startDate: s.startDate ? s.startDate.toISOString().split('T')[0] : null,
      endDate: s.endDate ? s.endDate.toISOString().split('T')[0] : null,
      adults: s.adults,
      children: s.children,
      rooms: s.selectedRooms.map(r => ({ id: r.id, name: r.name }))
    }))
  };

  try {
    const response = await fetch('/api/enquire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      alert(t('alerts.success'));
     
    } else {
      const result = await response.json();
      alert(t('alerts.error') + (result.error || t('alerts.failed')));
    }
  } catch (error) {
    console.error("Submission error:", error);
    alert(t('alerts.wentWrong'));
  } finally {
    setIsSubmitting(false);
  }
};
const handleBlur = (fieldName: string, value: any) => {
  if (value && value !== "" && value !== null) {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }
};
const uniqueCategories = [
  "Show all", 
  ...new Set(treatments.map((t) => t.category))
];

const filteredTreatments = selectedCategory === "" || selectedCategory === "Show all" 
  ? treatments 
  : treatments.filter(t => t.category === selectedCategory);


const [quantities, setQuantities] = useState<Record<number, number>>({});


const updateQuantity = (id: number, val: number) => {
  setQuantities(prev => ({
    ...prev,
    [id]: Math.max(0, (prev[id] || 0) + val)
  }));
};

// Get translated countries
const getTranslatedCountries = () => {
  return [
    { value: "", label: t('personalInfo.fields.country'), disabled: true, hidden: true },
    { value: "GB", label: t('countries.GB') },
    { value: "AL", label: t('countries.AL') },
    { value: "XK", label: t('countries.XK') },
    { value: "IT", label: t('countries.IT') },
    { value: "DE", label: t('countries.DE') },
    { value: "AT", label: t('countries.AT') },
    { value: "CH", label: t('countries.CH') },
    { value: "FR", label: t('countries.FR') },
    { value: "US", label: t('countries.US') },
    { value: "GR", label: t('countries.GR') },
    { value: "MK", label: t('countries.MK') },
    { value: "ME", label: t('countries.ME') },
    { value: "HR", label: t('countries.HR') },
    { value: "SI", label: t('countries.SI') },
    { value: "BE", label: t('countries.BE') },
    { value: "NL", label: t('countries.NL') },
    { value: "ES", label: t('countries.ES') },
    { value: "TR", label: t('countries.TR') },
    { value: "SE", label: t('countries.SE') },
    { value: "NO", label: t('countries.NO') }
  ];
};
  return (
    <div className={styles.pageContainer}>
      <SmallHeader />
      
      <main className={styles.mainContent}>
        <section className={styles.heroSection}>
          <h1 className={styles.mainTitle}>{t('hero.title')}</h1>
          <p className={styles.subTitle}>
            {t.rich('hero.subtitle', {
              bold: (chunks) => <span className={styles.boldText}>{chunks}</span>
            })}
          </p>
        </section>
        {/* SECTION: Selected Treatment (Extras) */}
{selectedExtras.length > 0 && (
  <div className={styles.extrasSection}>
    <h3 className={styles.sectionHeading}>{t('extras.sectionTitle')}</h3>
  
    <p className={styles.fieldLabel}>{t('extras.selectedService')}</p>
   {selectedExtras.map((service) => (
  <div key={service.id} className={styles.extrasContainer} style={{ marginBottom: '20px' }}>
    <div className={styles.treatmentCard}>
      <div className={styles.treatmentTop}>
        <div className={styles.treatmentInfo}>
          <h4>{service.treatment_name}</h4>
          <p>{t('room.approx')} {service.duration_min} min. | €{service.price_euro}.00</p>
        </div>
        <button 
          aria-label={t('ariaLabels.remove')}
          type="button" 
          className={styles.removeOfferX} 
          onClick={() =>{
          const updatedList = selectedExtras.filter(item => item.id !== service.id);
            setSelectedExtras(updatedList);
          }}
        >
          <X size={14} />
        </button>
      </div>
      
      <div className={styles.amountSection}>
        <span className={styles.amountLabel}>{t('extras.amount')}:</span>
        <div className={styles.counter}>
         
          <button type="button" onClick={() => updateQuantity(service.id, -1)}>−</button>
          <span>{quantities[service.id] || 0}</span>
          <button type="button" onClick={() => updateQuantity(service.id, 1)}>+</button>
        </div>
      </div>
    </div>
   
    {/* Kolona e djathtë: Textarea */}
    <textarea 
      className={styles.extrasNote}
      placeholder={t('extras.notePlaceholder')}
    />
  </div>
))}

<button 
  type="button" 
  className={styles.addAdditionalBtn}
  onClick={() => setIsExtrasModalOpen(true)} 
>
  <div className={styles.plusIcon}><Plus size={16} /></div>
  {t('extras.addAdditionalBtn')}
</button>
</div>
)}
{isExtrasModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.extrasModal}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>{t('extras.modal.title')}</h2>
                <button aria-label={t('ariaLabels.close')} className={styles.closeBtn} onClick={() => setIsExtrasModalOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className={styles.modalCategorySelect}>
                <span className={styles.fieldLabel}>{t('extras.modal.category')}</span>
                <select 
                  aria-label={t('ariaLabels.showAll')}
                  className={styles.lineInputSelect}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)} 
                >
                  {uniqueCategories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.servicesGrid}>
                {filteredTreatments.map((item) => (
                  <div key={item.id} className={styles.serviceItemCard}>
                    <div className={styles.serviceItemInfo}>
                      <h5>{item.treatment_name}</h5>
                      <p>{t('room.approx')} {item.duration_min} min. | €{item.price_euro}</p>
                    </div>
                    <div className={styles.serviceActionRow}>
                      <div className={styles.counter}>
                        <button type="button" onClick={() => updateQuantity(item.id, -1)}>−</button>
                        <span>{quantities[item.id] || 0}</span>
                        <button type="button" onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.modalFooter}>
                 <button 
                  type="button" 
                  className={styles.saveBtn} 
                  onClick={handleAddServices}
                >
                  {t('extras.modal.addServices')}
                </button>
              </div>
            </div>
          </div> 
        )}

        <form className={styles.enquireForm} onSubmit={handleSubmit}>
          {/* SECTION: Selected Offer */}
          {selectedOffer && (
    <div className={styles.selectedOfferSection}>
      <h3 className={styles.sectionHeading}>{t('offers.selectedOffer')}</h3>
      <div className={styles.offerCard}>
        <div className={styles.offerThumb}>
          {selectedOffer.image && (
            <img src={selectedOffer.image} alt={selectedOffer.title} />
          )}
        </div>
        <div className={styles.offerDetails}>
          <span className={styles.offerTitleText}>{selectedOffer.title}</span>
          <p className={styles.offerDescriptionText}>
            {t('offers.defaultDescription')}
          </p>
        </div>
        <button 
          type="button" 
          className={styles.removeOfferX} 
          onClick={() => setSelectedOffer(null)}
          title={t('ariaLabels.removeOffer')}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )}
          {stays.map((stay, index) => (
            <div key={stay.id} className={styles.stayWrapper}>
              <div className={styles.stayHeader}>
                <h2 className={styles.sectionHeading}>{t('stay.sectionTitle')}{index + 1}</h2>
                {stays.length > 1 && (
                  <button 
                   aria-label={t('ariaLabels.removeButton')}
                    type="button" 
                    className={styles.removeStayBtn} 
                    onClick={() => removeStay(stay.id)}
                    title={t('ariaLabels.removeStay')}
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.inputWrapper}>
                   <div className={`${styles.inputGroup} ${errors[`stay-${stay.id}`] ? styles.errorBorder : ''}`}> 

                    <Calendar className={styles.inputIcon} size={20} />
                    <div className={styles.datePickerWrapper}>
                    <DatePicker
                    selectsRange={true}
                    startDate={stay.startDate}
                    endDate={stay.endDate}
                    onChange={(update: [Date | null, Date | null]) => {
                        const [start, end] = update;
                        updateStay(stay.id, { startDate: update[0], endDate: update[1] });
                    if (start && end) {
                        handleBlur(`stay-${stay.id}`, true);
                     }
                    }}
                    monthsShown={2} 
                    minDate={new Date()}
                    placeholderText={t('stay.arrivalDeparture')}
                    className={styles.datePickerInput}
                    dateFormat="dd.MM.yyyy"
                    isClearable={true}
                    popperPlacement="bottom-start" 
                    shouldCloseOnSelect={false}
                    id={`date-picker-${stay.id}`}
                    />
                    </div>
                    <ChevronDown className={styles.arrow} size={16} />
                </div>
                {errors[`stay-${stay.id}`] && <p className={styles.errorText}>{t('errors.dateRequired')}</p>}
                </div>

                <div className={styles.inputBox} onClick={() => setShowGuestsId(showGuestsId === stay.id ? null : stay.id)}>
                  <div className={styles.flexCenter}>
                    <Users className={styles.iconn} size={20} />
                    <div className={styles.guestValue}>
                      {stay.adults} {t('stay.guests.adults')}, {stay.children > 0 ? `${stay.children} ${t('stay.guests.children')}, ` : ""} {t('boardOptions.threeQuarter')}
                    </div>
                  </div>
                  <ChevronDown className={styles.arrow} size={16} />

                  {showGuestsId === stay.id && (
                    <div className={styles.guestsDropdown} onClick={(e) => e.stopPropagation()}>
                      <div className={styles.guestRow}>
                        <div>
                          <div className={styles.guestLabel}>{t('stay.guests.adults')}</div>
                          <div className={styles.guestSub}>{t('stay.guests.adultsSub')}</div>
                        </div>
                        <div className={styles.counter}>
                          <button aria-label={t('ariaLabels.decreaseAdults')} type="button" onClick={() => updateStay(stay.id, { adults: Math.max(1, stay.adults - 1) })}><Minus size={16} /></button>
                          <span>{stay.adults}</span>
                          <button aria-label={t('ariaLabels.addAdult')} type="button" onClick={() => updateStay(stay.id, { adults: stay.adults + 1 })}><Plus size={16} /></button>
                        </div>
                      </div>

                      <div className={styles.guestRow}>
                        <div>
                          <div className={styles.guestLabel}>{t('stay.guests.children')}</div>
                          <div className={styles.guestSub}>{t('stay.guests.childrenSub')}</div>
                        </div>
                        <div className={styles.counter}>
                          <button aria-label={t('ariaLabels.decreaseChildren')} type="button" onClick={() => updateStay(stay.id, { children: Math.max(0, stay.children - 1) })}><Minus size={16} /></button>
                          <span>{stay.children}</span>
                          <button aria-label={t('ariaLabels.addChildren')} type="button" onClick={() => updateStay(stay.id, { children: stay.children + 1 })}><Plus size={16} /></button>
                        </div>
                      </div>
                    <div className={styles.boardSection}>
                    <label className={styles.boardLabel}>{t('stay.guests.boardOption')}</label>
                    <div className={styles.boardSelectWrapper}>
                        <select aria-label={t('ariaLabels.chooseBoard')} className={styles.boardSelect}>
                        <option value="three-quarter">{t('boardOptions.threeQuarter')}</option>
                        </select>
                        <ChevronDown size={18} className={styles.boardArrow} />
                    </div>
                    </div>
                      <button aria-label={t('ariaLabels.saveButton')} type="button" className={styles.saveBtn} onClick={() => setShowGuestsId(null)}>{t('stay.guests.save')}</button>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.selectionCards}>
                <label className={styles.selectionCard}>
                  <input 
                    type="radio" 
                    name={`roomRequest-${stay.id}`} 
                    checked={stay.selectedRooms.length === 0}
                    onChange={() => updateStay(stay.id, { selectedRooms: [] })} 
                    className={styles.radioHidden} 
                  />
                  <div className={styles.cardContent}>
                    <div className={styles.radioCircle}></div>
                    <div className={styles.cardText}>
                      <span className={styles.cardTitle}>{t('stay.roomOptions.noParticular')}</span>
                      <span className={styles.cardSub}>{t('stay.roomOptions.noParticularSub')}</span>
                    </div>
                    <MessageSquare size={24} />
                  </div>
                </label>

                <label className={styles.selectionCard} onClick={() => setShowRoomModalForStay(stay.id)}>
                  <input 
                    type="radio" 
                    name={`roomRequest-${stay.id}`} 
                    checked={stay.selectedRooms.length > 0} 
                    className={styles.radioHidden} 
                    readOnly 
                  />
                  <div className={styles.cardContent}>
                    <div className={styles.radioCircle}></div>
                    <div className={styles.cardText}>
                      <span className={styles.cardTitle}>{t('stay.roomOptions.specificRequest')}</span>
                      <span className={styles.cardSub}>{t('stay.roomOptions.specificRequestSub')}</span>
                    </div>
                    <List size={24} />
                  </div>
                </label>
              </div>

              <div className={styles.addedRoomsList}>
                {stay.selectedRooms.map((room) => (
                  <div key={room.id} className={styles.addedRoomItem}>
                    <div className={styles.roomThumb} 
                    style={{ backgroundImage: `url(${room.images?.[0] || ''})` }}>

                    </div>
                    <div className={styles.roomInfo}>
                      <p className={styles.roomNameText}>{room.name}</p>
                      <p className={styles.roomMetaText}>{t('room.approx')}{room.size} | {room.capacity}</p>
                    </div>
                    <button aria-label={t('ariaLabels.removeButton')} type="button" onClick={() => toggleRoomSelection(stay.id, room)} className={styles.removeBtn}><X size={18} /></button>
                  </div>
                ))}
              </div>

              <button aria-label={t('ariaLabels.addRoom')} type="button" className={styles.addroomBtn} onClick={() => setShowRoomModalForStay(stay.id)}>
                <div className={styles.plusIcon}><Plus size={18} /></div>
                {t('stay.roomOptions.addRoom')}
              </button>
              {index < stays.length - 1 && <hr className={styles.stayDivider} />}
            </div>
          ))}
          
          <button type="button" className={styles.addStayBtn} onClick={addStay}>
            <div className={styles.plusIcon}><Plus size={18} /></div>
            {t('stay.addStay')}
          </button>

          <div className={styles.personalInfoSection}>
            <h2 className={styles.sectionHeading}>{t('personalInfo.sectionTitle')}</h2>
            <div className={styles.titleSelection}>
              <p className={styles.fieldLabel}>{t('personalInfo.titleLabel')}</p>
              <div className={styles.titleButtons}>
            <button 
                aria-label={t('ariaLabels.family')}
                type="button" 
                className={`${styles.titleBtn} ${selectedTitle === 'Family' ? styles.activeTitle : ''}`}
                onClick={() => setSelectedTitle(selectedTitle === 'Family' ? null : 'Family')}
            >
                {t('personalInfo.titles.family')}
            </button>
            
            <button 
                aria-label={t('ariaLabels.mr')}
                type="button" 
                className={`${styles.titleBtn} ${selectedTitle === 'Mr' ? styles.activeTitle : ''}`}
                onClick={() => setSelectedTitle(selectedTitle === 'Mr' ? null : 'Mr')}
            >
                {t('personalInfo.titles.mr')}
            </button>
            
            <button 
                aria-label={t('ariaLabels.ms')}
                type="button" 
                className={`${styles.titleBtn} ${selectedTitle === 'Ms' ? styles.activeTitle : ''}`}
                onClick={() => setSelectedTitle(selectedTitle === 'Ms' ? null : 'Ms')}
            >
                {t('personalInfo.titles.ms')}
            </button>
            </div>
            </div>
       
            <div className={styles.formGrid}>
             <div className={styles.inputWrapper}>
            <input 
                name="firstName" 
                type="text" 
                placeholder={t('personalInfo.fields.firstName')}
                className={`${styles.lineInput} ${errors.firstName ? styles.errorLine : ''}`} 
                onBlur={(e) => handleBlur('firstName', e.target.value)}
                required 
            />
            {errors.firstName && <p className={styles.errorText}>{t('errors.required')}</p>}
            </div>
             <div className={styles.inputWrapper}>
            <input 
                name="lastName" 
                type="text" 
                placeholder={t('personalInfo.fields.lastName')}
                className={`${styles.lineInput} ${errors.lastName ? styles.errorLine : ''}`} 
                onBlur={(e) => handleBlur('lastName', e.target.value)}
                required 
            />
            {errors.lastName && <p className={styles.errorText}>{t('errors.required')}</p>}
            </div>
              <div className={styles.phoneInputContainer}>
                <PhoneInput
                    defaultCountry="gb" 
                    value={phone}
                    onChange={(phone) => setPhone(phone)}
                    style={{
                    '--react-international-phone-border-color': 'transparent',
                    '--react-international-phone-bg-color': 'transparent',
                    }  as any}
                    inputClassName={styles.lineInput}
                   countrySelectorStyleProps={{
                        buttonClassName: styles.customSelectorButton,
                    }}
                />
              </div>
              <div className={styles.inputWrapper}>
                <input 
                    name="email" 
                    type="text" 
                    placeholder={t('personalInfo.fields.email')}
                    className={`${styles.lineInput} ${errors.email ? styles.errorLine : ''}`} 
                    onBlur={(e) => handleBlur('email', e.target.value)}
                    required 
                />
                {errors.email && <p className={styles.errorText}>{t('errors.required')}</p>}
                </div>
            </div>

            {/* Address Section */}
            <div className={styles.extraFieldsSection}>
              <button 
                type="button" 
                className={styles.addressToggleBtn} 
                onClick={() => setShowAddress(!showAddress)}
              >
                {showAddress ? (
                  <><Minus size={18} className={styles.toggleIcon} /> {t('personalInfo.address.hide')}</>
                ) : (
                  <><Plus size={18} className={styles.toggleIcon} /> {t('personalInfo.address.show')}</>
                )}
              </button>

              {showAddress && (
                <div className={styles.addressGrid}>
                  <input name="street" type="text" placeholder={t('personalInfo.fields.street')} className={styles.lineInput} />
                  <input name="postcode" type="text" placeholder={t('personalInfo.fields.postcode')} className={styles.lineInput} />
                  <input name="city" type="text" placeholder={t('personalInfo.fields.city')} className={styles.lineInput} />
                  <div className={styles.selectWrapper}>
                    <select aria-label={t('ariaLabels.country')} className={styles.lineInputSelect} value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                    {getTranslatedCountries().map((country) => (
                      <option 
                        key={country.value} 
                        value={country.value}
                        disabled={country.disabled}
                        hidden={country.hidden}
                      >
                        {country.label}
                      </option>
                    ))}
                    </select>
                    <ChevronDown size={14} className={styles.selectArrow} />
                  </div>
                </div>
              )}
            </div>

            <textarea name="comment" placeholder={t('personalInfo.fields.comment')} className={styles.commentArea}></textarea>
            <div className={styles.checkboxRow}>
              <input type="checkbox" id="consent" />
              <label htmlFor="consent">{t('personalInfo.consent')} <span className={styles.infoCircle}><Info/><div className={styles.tooltipBox}>
        {t.rich('personalInfo.privacyText', {
          link: (chunks) => (
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className={styles.privacyLink}>
              {chunks}
            </a>
          )
        })}
      </div>
    </span></label>
         </div>
            <p className={styles.requiredNote}>{t('personalInfo.requiredNote')}</p>
            <button 
            aria-label={t('ariaLabels.submitButton')}
            type="submit" 
            className={styles.submitBtn} 
            disabled={isSubmitting}
            >
            {isSubmitting ? t('personalInfo.submitting') : t('personalInfo.submit')}
            </button>         
         </div>
        </form>
      </main>

      {showRoomModalForStay !== null && (
        <div className={styles.modalOverlay} onClick={() => setShowRoomModalForStay(null)}>
          <div className={styles.roomModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3 className={styles.modalTitle}>{t('stay.roomOptions.modal.title')}</h3>
                <p className={styles.modalSelectionHint}>
                {t('stay.roomOptions.modal.selectionHint')} {
                    (() => {
                    const currentStay = stays.find(s => s.id === showRoomModalForStay);
                    return `${currentStay?.adults || 2} ${t('stay.guests.adults')}, ${currentStay?.children || 0} ${t('stay.guests.children')}`;
                    })()
                } | {t('boardOptions.threeQuarter')}</p>
              </div>
              <button aria-label={t('ariaLabels.removeButton')} className={styles.closeBtn} onClick={() => setShowRoomModalForStay(null)}><X size={24} /></button>
            </div>
            <div className={styles.modalScrollArea}>
              <div className={styles.roomsGrid}>
                {dbRooms.map((room) => {
                  const currentStay = stays.find(s => s.id === showRoomModalForStay);
                  const isChecked = currentStay?.selectedRooms.find(r => r.id === room.id);
                  return (
                    <div key={room.id} className={`${styles.modalRoomCard} ${isChecked ? styles.cardActive : ''}`} onClick={() => toggleRoomSelection(showRoomModalForStay!, room)}>
                      <div className={styles.modalImgWrapper}>
                        <img src={room.images?.[0]} alt={room.name} />
                        <div className={styles.checkIcon}><div className={`${styles.customBox} ${isChecked ? styles.checked : ''}`}></div></div>
                      </div>
                      <div className={styles.modalRoomInfo}>
                        <h4>{room.name}</h4>
                        <p>{t('room.approx')}{room.size} | {room.capacity}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.modalFooter}>
               <button aria-label={t('ariaLabels.saveButton')} type="button" className={styles.saveBtn} onClick={() => setShowRoomModalForStay(null)}>{t('stay.roomOptions.addRoom')} {stays.find(s => s.id === showRoomModalForStay)?.selectedRooms.length || 0}</button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.SectionWrapper}>
        <div className={styles.carouselContainer}>
          <CarouselEnquire />
        </div>
      </div>
      <Footer />
    </div>
  );
}