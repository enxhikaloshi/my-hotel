'use client';

import { useEffect, useState, useMemo } from 'react';
import styles from './page.module.css';
import RoomList from './RoomList';
import { CalendarDays, Gift, Tag } from 'lucide-react';
import AvailableRoomCard from './AvailableRoomCard';

interface Room {
  id: number;
  name: string;
  [key: string]: any; 
}
export default function RoomDescription({
  setBookedDates,
  setSelectedRoom,
  setStep,
  dates,
  adults,
  children,
  onCheckAvailability,
  onSelect,
  onlyShowId,
}: any) {
  const [allRooms, setAllRooms] = useState<any[]>([]);
  const [availableRooms, setAvailableRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<any>(null); // dev debug helper
  const [activeTab, setActiveTab] = useState<'rooms' | 'deals'>('rooms');
  const [deals, setDeals] = useState<any[]>([]);
  const [showRoomsMap, setShowRoomsMap] = useState<Map<number, boolean>>(new Map());

  
  const startDate = dates?.startDate;
  const endDate = dates?.endDate;

  const isRangeSelected = useMemo(() => {
    // Consider the range "selected" as soon as both dates exist (Date or ISO string).
    if (!startDate || !endDate) return false;

    const hasStart = startDate instanceof Date || typeof startDate === 'string';
    const hasEnd = endDate instanceof Date || typeof endDate === 'string';
    return !!(hasStart && hasEnd);
  }, [startDate, endDate]);

 useEffect(() => {
  const fetchRooms = async () => {
    try {
      const res = await fetch('/api/rooms');
      const data = await res.json();
      
      if (onlyShowId) {
        const filtered = data.filter((r: Room) => r.id === Number(onlyShowId));
        setAllRooms(filtered); 
      } else {
        setAllRooms(data);
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };
  
  fetchRooms();
}, [onlyShowId]);
  // 2. Fetch Available Rooms 
  useEffect(() => {
  if (isRangeSelected && startDate && endDate) {
    // defensive: accept Date or ISO string
    const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
    const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

    console.debug('[roomdescription] fetch trigger', { start, end, isRangeSelected, onlyShowId });

    setLoading(true);
    
    // use ISO format YYYY-MM-DD to avoid locale differences
    const startStr = start.toISOString().split('T')[0];
    const endStr = end.toISOString().split('T')[0];

    (async () => {
      try {
        const res = await fetch(`/api/available-rooms?startDate=${startStr}&endDate=${endStr}`);
        const data = await res.json();
        console.debug('[available-rooms] request', { startStr, endStr, status: res.status, payload: data });

        setLastFetch({ startStr, endStr, status: res.status, payload: data });

        if (!res.ok) {
          console.error('Availability API returned error:', data);
          setAvailableRooms([]);
          setErrorMsg(data?.error || 'Availability check failed');
          setLoading(false);
          return;
        }

        // Ensure an array is returned for the list case
        if (!Array.isArray(data)) {
          console.warn('Availability API returned unexpected payload:', data);
          setAvailableRooms([]);
          setErrorMsg('Unexpected response from availability service');
          setLoading(false);
          return;
        }

        setErrorMsg(null);
        if (onlyShowId) {
          const filtered = data.filter((r: any) => r.id === Number(onlyShowId));
          setAvailableRooms(filtered);
        } else {
          setAvailableRooms(data);
        }
      } catch (err) {
        console.error('Availability API Error:', err);
        // Fallback: if we already have the full room list, show it so UX isn't broken in production.
        if (Array.isArray(allRooms) && allRooms.length > 0) {
          setAvailableRooms(allRooms);
          setErrorMsg('Failed to fetch availability — showing all rooms as a fallback');
        } else {
          setAvailableRooms([]);
          setErrorMsg('Failed to fetch availability — please try again');
        }
      } finally {
        setLoading(false);
      }
    })();
  }
}, [isRangeSelected, startDate, endDate, onlyShowId]); 
  // 3. Fetch Deals
  useEffect(() => {
    if (activeTab === 'deals') {
      fetch('/api/hotel_deals')
        .then((res) => res.json())
        .then((data) => setDeals(data))
        .catch((err) => console.error(err));
    }
  }, [activeTab]);

  const formatReadableDate = (isoString?: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };
    return (
    <div className={styles.bookingContainer}>
      
      {/* 1. SUMMARY BAR  */}
      {activeTab === 'rooms' && isRangeSelected && (
        <div className={styles.summaryBar}>
          <div className={styles.summaryItem}>
            <CalendarDays size={18} />
            <span>
              {startDate?.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })} to{' '}
              {endDate?.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <div className={styles.summaryItem}>
            <Tag size={18} />
            <div className={styles.summaryTextGroup}>
              <span className={styles.summaryMainText}>Select room</span>
              <span className={styles.summarySubText}>{adults} adults</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. TABS (Rooms / Holiday Deals) */}
      <div className={styles.tabsWrapper}>
        <div className={styles.tabButtons}>
          <button
            type="button"
            className={`${styles.tabbtn} ${activeTab === 'rooms' ? styles.active : ''}`}
            onClick={() => setActiveTab('rooms')}
          >
            <Tag size={20} className={styles.tabIcon} />
            <span>rooms</span>
          </button>

          <button
            type="button"
            className={`${styles.tabbtn} ${activeTab === 'deals' ? styles.active : ''}`}
            onClick={() => setActiveTab('deals')}
          >
            <Gift size={20} className={styles.tabIcon} />
            <span>holiday deals</span>
          </button>
        </div>
      </div>

      {/* 3. CONTENT AREA */}
      {activeTab === 'rooms' && (
        <div className={styles.roomsWrapper}>
          {isRangeSelected ? (
            <>
              {loading ? (
                <div className={styles.loadingMessage}>Loading...</div>
              ) : errorMsg ? (
                <div className={styles.noResults}>
                  <p>{errorMsg}</p>
                  <button type="button" onClick={() => setStep(1)} className={styles.backBtn}>
                    Change Dates
                  </button>
                </div>
              ) : availableRooms.length > 0 ? (
                availableRooms.map((room) => (
                  <AvailableRoomCard
                    key={room.id}
                    room={room}
                    startDate={startDate}
                    endDate={endDate}
                    adults={adults}
                    children={children}
                    onSelect={(selected: any) => {
                      onSelect(selected);
                      setStep(3);
                    }}
                  />
                ))

              ) : (
                <div className={styles.noResults}>
                  <p>No rooms available for these dates.</p>
                  <button type="button" onClick={() => setStep(1)} className={styles.backBtn}>
                    Change Dates
                  </button>
                  {process.env.NODE_ENV !== 'production' && lastFetch && (
                    <div style={{ marginTop: 12, fontSize: 13, color: '#666' }}>
                      <strong>Debug:</strong>
                      <div>start: {lastFetch.startStr} — end: {lastFetch.endStr}</div>
                      <div>status: {lastFetch.status} — results: {Array.isArray(lastFetch.payload) ? lastFetch.payload.length : 'n/a'}</div>
                      <pre style={{ whiteSpace: 'pre-wrap', marginTop: 6 }}>{JSON.stringify(lastFetch.payload?.slice?.(0,2) ?? lastFetch.payload, null, 2)}</pre>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            /*when it doesn't have dates ,show all rooms */
            <RoomList
              rooms={allRooms}
              loading={loading}
              checkAvailability={() => {
                if (onCheckAvailability) onCheckAvailability();
                setStep(1); 
              }}
              setSelectedRoom={(room: any) => {
                setSelectedRoom(room);
                setStep(1); 
              }}
            />
          )}
        </div>
      )}
      {activeTab === 'deals' && (
        <div className={styles.dealsWrapper}>
          <div className={styles.bookingContainerr}>
            {[...deals]
              .sort((a, b) => a.id - b.id)
              .map((deal) => {
                const showRooms = showRoomsMap.get(deal.id) || false;

                return (
                  <div key={deal.id} className={styles.dealContainer}>
                    <div className={styles.dealTopSection}>
                      {deal.image && (
                        <div className={styles.dealImageColumn}>
                          <img src={deal.image} alt={deal.title} className={styles.dealMainImage} />
                          {deal.valid_from && deal.valid_to && (
                            <div className={styles.validityBox}>
                              <p className={styles.dealDetailText}>Valid from</p>
                              <p className={styles.dealDetailText}>
                                {formatReadableDate(deal.valid_from)} to {formatReadableDate(deal.valid_to)}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      <div className={styles.dealMainContent}>
                        <div className={styles.dealHeaderRow}>
                          <div className={styles.dealTitleInfo}>
                            <h3 className={styles.dealTitle}>{deal.title}</h3>
                            <p className={styles.dealDetailText}>Minimum {deal.minimum_stay} nights</p>

                            {deal.included_services && (
                              <div className={styles.includedServicesGroup}>
                                <p className={styles.dealDetailText}>Included services</p>
                                <p className={styles.dealDetailText}>
                                  <span className={styles.giftIconSmall}><Gift /></span> {deal.included_services}
                                </p>
                              </div>
                            )}

                            <button
                              type="button"
                              className={styles.toggleRoomsBtn}
                              onClick={() =>
                                setShowRoomsMap((prev) => {
                                  const newMap = new Map(prev);
                                  newMap.set(deal.id, !newMap.get(deal.id));
                                  return newMap;
                                })
                              }
                            >
                              {showRooms ? 'Hide rooms ▲' : 'Show rooms ▼'}
                            </button>
                          </div>

                          <div className={styles.dealActionButtons}>
                            <button className={styles.checkAvailabilityBtnMain} onClick={() => setStep(1)}>
                              Check availability
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {showRooms && (
                      <div className={styles.expandedContent}>
                        <div className={styles.dealDescriptionTextFull}>{deal.description}</div>
                        <div className={styles.roomListNested}>
                          <RoomList
                            rooms={allRooms}
                            loading={loading}
                            checkAvailability={() => setStep(1)}
                            setSelectedRoom={(room: any) => {
                              setSelectedRoom(room);
                              setStep(1);
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}