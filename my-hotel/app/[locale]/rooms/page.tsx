'use client';
import { useState, useEffect, useRef } from 'react';
import SmallHeader from '@/components/Smallheader';
import styles from '@/components/page.module.css';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface Room {
  id: number;
  name: string;
  type: 'single' | 'double' | 'suite';
  price: number;
  images: string[];
  capacity: string; 
  size: string;    
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'single' | 'double' | 'suite'>('all');
  const [expandedRoomId, setExpandedRoomId] = useState<number | null>(null);
  const roomsGridRef = useRef<HTMLDivElement>(null);
  const filteredRooms = rooms.filter(room => filter === 'all' || room.type === filter);

  const toggleRoomImages = (id: number) => {
    setExpandedRoomId(expandedRoomId === id ? null : id);
  };
    const handleFilterClick = (f: typeof filter) => {
    setFilter(f);

    // Scroll at grid
    if (roomsGridRef.current) {
      roomsGridRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  useEffect(() => {
    async function fetchRooms() {
      try {
        const lang = localStorage.getItem('lang') || 'en';
        const res = await fetch(`/api/rooms?lang=${lang}`);
        if (!res.ok) throw new Error('Failed to fetch rooms');
        const data = await res.json();
        setRooms(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;


  return (
    <div className={styles.roomsPage}>
      <SmallHeader />

      {/* Hero Section */}
      <div className={styles.hero}>
        <h1 className={styles.hertitle}>Stay, dream, and soak up majestic views</h1>
        <p className={styles.heroDescription}>
          Enjoy the heights of comfort and let the sight of some of the world's most beautiful mountains enchant you. At the{' '}
          <a href="/homepage" className={styles.textLink}>Alpen Tesitin</a>, you’ll not only dream of the Dolomites – you’ll experience them up close. So that you can see for yourself, we’ve not only snapped photos of our feel-good rooms and suites, but also of the awe-inspiring view from the balcony of your room.
        </p>
      </div>
{/* Filter Buttons */}
      <div className={styles.filterSection}>
        {['all', 'single', 'double', 'suite'].map(f => (
          <button
            key={f}
            className={filter === f ? styles.filterButtonActive : styles.filterButton}
            onClick={() => handleFilterClick(f as typeof filter)}
          >
            {filter === f && <span className={styles.activeIndicator}></span>}
            {f === 'all' ? 'All ' : `${f.charAt(0).toUpperCase() + f.slice(1)} Rooms`}
          </button>
        ))}
      </div>

      <div className={styles.roomsGridContainer}>
        <div ref={roomsGridRef} className={styles.roomsGrid}>
          {filteredRooms.map(room => (
            <div key={room.id} className={styles.roomCard}>
              <div
                className={`${styles.roomImageContainer} ${expandedRoomId === room.id ? styles.expanded : ''}`}
                
              >
                {(expandedRoomId === room.id ? room.images : room.images.slice(0, 1)).map((img, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    <Link href={`/rooms/${room.id}`}>
                      <img src={img} alt={room.name} className={styles.roomImage} />
                    </Link>
                    <span className={styles.roomImageOverlay}>from €{room.price}.00 per person</span>
                  </div>
                ))}
              </div>

              <div className={styles.roomInfo}>
                <h3 className={styles.roomName}>{room.name}</h3>
                <p className={styles.roomCapacity}>{room.capacity} | {room.size}</p>
                <Link href={`/rooms/${room.id}`} className={styles.showDetails}>
                  Show details <span className={styles.arrow}>&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.bottomBackground}></div>
      </div>

      <Footer />
    </div>
  );
}
