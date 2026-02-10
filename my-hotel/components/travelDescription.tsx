'use client';

import { useState, useEffect } from 'react';
// Heqim DateRange nga react-day-picker pasi do përdorim formatin e kalendarit tonë
import styles from './page.module.css';
import { Range } from 'react-date-range';
import { Tag, UsersRound, X } from 'lucide-react';
import { Calendar } from './calendar'; // Importojmë kalendarin e ri

export interface RoomData {
  adults: number;
  children: number;
  childAges: string[];
}

interface TravelDescriptionProps {
  rooms: RoomData[];
  setRooms: React.Dispatch<React.SetStateAction<RoomData[]>>;
  dates: Range[];
  setDates: React.Dispatch<React.SetStateAction<Range[]>>;
  bookedDates?: Date[]; 
  selectedRoom: any;
  setSelectedRoom: (room: any) => void;
}

export default function TravelDescription({ rooms, setRooms, dates, setDates, bookedDates,selectedRoom,setSelectedRoom }: TravelDescriptionProps) {
  // 1. Inicializojmë dateRange me vlerat që vijnë nga prindi (startDate/endDate)
  // Kalendari i ri pret formatin { from?: Date; to?: Date }
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date } | undefined>({
    from: dates[0]?.startDate,
    to: dates[0]?.endDate
  });

  // 2. Sinkronizimi me prindin (BookingForm)
  // Këtu njoftojmë prindin vetëm kur përdoruesi bën një përzgjedhje (edhe nëse është vetëm 1 datë)
  useEffect(() => {
    if (dateRange?.from) {
      setDates([{ 
        startDate: dateRange.from, 
        endDate: dateRange.to || dateRange.from, // Nëse to mungon, e lëmë si startDate
        key: 'selection' 
      }]);
    }
  }, [dateRange, setDates]);

  // Pjesa tjetër e funksioneve (updateAdults, updateChildren, addRoom, etj.) mbetet e paprekur
  const updateAdults = (roomIndex: number, value: number) => {
    const updated = [...rooms];
    updated[roomIndex].adults = value;
    setRooms(updated);
  };

  const updateChildren = (roomIndex: number, value: number) => {
    const updated = [...rooms];
    updated[roomIndex].children = value;
    const currentAges = updated[roomIndex].childAges;
    updated[roomIndex].childAges =
      value > currentAges.length
        ? [...currentAges, ...Array(value - currentAges.length).fill('Under 1 year')]
        : currentAges.slice(0, value);
    setRooms(updated);
  };

  const updateChildAge = (roomIndex: number, childIndex: number, age: string) => {
    const updated = [...rooms];
    updated[roomIndex].childAges[childIndex] = age;
    setRooms(updated);
  };

  const addRoom = () => {
    if (rooms.length >= 3) return;
    setRooms([...rooms, { adults: 1, children: 0, childAges: [] }]);
  };

  const removeRoom = (index: number) => {
    if (index === 0) return;
    setRooms(rooms.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.bookingContainer}>
      {/* Seksioni i Personave dhe Dhomave  */}
      {rooms.map((room, i) => (
        <div key={i} className={styles.occupancyBox}>
          <div className={styles.occupancyHeader}>
            <div className={styles.occupancyText}>
              <h3>Occupancy</h3>
              <div className={styles.occupancyIcon}>
                <UsersRound />
                <span>
                 {room.adults} adult{room.adults !== 1 ? 's' : ''}
                 {room.children > 0 && (
                 <>
                 {`, ${room.children} child${room.children !== 1 ? 'ren' : ''} `}
                 ({room.childAges.map((age, idx) => (
                 <span key={idx}>
                  {age === "Under 1 year" ? "0" : age.replace("  years", "y")}
                  {idx < room.childAges.length - 1 ? ", " : ""}
                </span>
              ))})
              </>
               )}
                     </span>
              </div>
            </div>
          </div>

          <div className={styles.occupancyContent}>
            <div className={styles.occupancySections}>
              <div className={styles.occupancySection}>
                <label>Adults</label>
                <div className={styles.occupancyButtons}>
                  {[1, 2, 3, 4].map(n => (
                    <button 
                      key={n} 
                      type="button" 
                      onClick={() => updateAdults(i, n)} 
                      className={room.adults === n ? styles.active : styles.inactive}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.occupancySection}>
                <label>Children</label>
                <div className={styles.occupancyButtons}>
                  {[0, 1, 2, 3].map(n => (
                    <button 
                      key={n} 
                      type="button" 
                      onClick={() => updateChildren(i, n)} 
                      className={room.children === n ? styles.active : styles.inactive}
                    >
                      {n}
                    </button>
                  ))}
                </div>

                {room.children > 0 && (
                  <div className={styles.childAgesContainer}>
                    {room.childAges.map((age, index) => (
                      <select
                        key={index}
                        className={styles.childAgeSelect}
                        value={age}
                        aria-label='select-child'
                        onChange={e => updateChildAge(i, index, e.target.value)}
                      >
                        <option>Under 1 year</option>
                        {Array.from({ length: 17 }, (_, x) => (
                          <option key={x + 1}>{x + 1} years</option>
                        ))}
                      </select>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.roomActions}>
            {i === rooms.length - 1 && rooms.length < 3 && (
              <button className={styles.addRoomBtn} type="button" onClick={addRoom}>
                + Add Room
              </button>
            )}
            {i > 0 && (
              <button 
                className={styles.removeRoomBtn} 
                type="button" 
                aria-label='remove-button'
                onClick={() => removeRoom(i)}
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      ))}
       {/* 2. FILTER BAR (Doli jashtë map-it që të jetë rresht i plotë si në foto) */}
      {selectedRoom && (
        <div className={styles.filterBar}>
          <div className={styles.filterLeft}>
            <Tag size={16} className={styles.tagIcon} />
            <span className={styles.selectedRoomName}>{selectedRoom.name}</span>
          </div>
          <button 
            type="button" 
            className={styles.removeFilterBtn}
            onClick={() => {
              setSelectedRoom(null);
              window.history.pushState({}, '', '/book'); 
            }}
          >
            Remove filter ✕
          </button>
        </div>
      )}
      {/* Seksioni i Kalendarit të RI */}
      <div className={styles.calendarWrapper}>
        <Calendar
          dateRange={dateRange}
          setDateRange={setDateRange}
          bookedDates={bookedDates}
        />
      </div>
    </div>
  );
}