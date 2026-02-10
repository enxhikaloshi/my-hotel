'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from '@/components/rates.module.css';
import { Link } from '@/src/navigation';
import AccordionItem from '@/components/AccordionItem';
import MoreRoomsCarousel from '@/components/OtherRoomCarousel'; 

// Define types
type Season = 'winter' | 'summer';

interface Room {
  id: number;
  name: string;
  capacity: string;
  size: string;
}

interface Deal {
  id: number;
  title: string;
  valid_from: string;
  valid_to: string;
}

interface Price {
  room_id: number;
  deal_id: number;
  price_1_to_5_nights: number;
  price_6_plus_nights: number;
}

export default function RatesPage() {
  const searchParams = useSearchParams();
  const currentSeason = (searchParams.get('season') as Season) || 'winter';
  
  const [dbRooms, setDbRooms] = useState<any[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all data
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Fetch rooms for carousel
        const roomsResponse = await fetch('/api/rooms');
        const roomsData = await roomsResponse.json();
        const allRooms = roomsData.rooms || roomsData;
        setDbRooms(allRooms.slice(0, 4));
        
        // Fetch all rooms for table (exclude room with id=14)
        const allRoomsResponse = await fetch('/api/rooms');
        const allRoomsData = await allRoomsResponse.json();
        const filteredRooms = (allRoomsData.rooms || allRoomsData).filter((room: Room) => room.id !== 14);
        setRooms(filteredRooms);
        
        // Fetch deals for current season
        const dealsResponse = await fetch(`/api/hotel_deals?season=${currentSeason}`);
        const dealsData = await dealsResponse.json();
        
        // Filter deals based on season
        const dealIds = currentSeason === 'winter' 
          ? [4, 5, 6, 7, 8] 
          : [13, 14, 15, 16, 17];
        
        const filteredDeals = dealsData
          .filter((deal: Deal) => dealIds.includes(deal.id))
          .sort((a: Deal, b: Deal) => dealIds.indexOf(a.id) - dealIds.indexOf(b.id));
        
        setDeals(filteredDeals);
        
        // Fetch prices for current season
        const pricesResponse = await fetch(`/api/deal_room_prices?season=${currentSeason}`);
        const pricesData = await pricesResponse.json();
        setPrices(pricesData);
        
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [currentSeason]);

  // Function to get price for a specific room and deal
  const getPrice = (roomId: number, dealId: number, nights: string) => {
    const price = prices.find((p: Price) => p.room_id === roomId && p.deal_id === dealId);
    if (!price) return '—';
    return nights === '1-5' 
      ? `€${Number(price.price_1_to_5_nights).toFixed(2)}`
      : `€${Number(price.price_6_plus_nights).toFixed(2)}`;
  };

  if (loading) {
    return (
      <>
        <Header forceSmall={true} />
        <div style={{ padding: '100px 20px', textAlign: 'center' }}>Loading...</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header forceSmall={true} />
      
      <section className={styles.heroContainer}>
        <h1 className={styles.title}>Our current rates</h1>
        
        <div className={styles.descriptionWrapper}>
          <p className={styles.description}>
            Spring, summer, autumn, and winter – holidays at the <Link href='/live'>Alpen Tesitin</Link> are always amazing. Visit us and find out for yourself.
          </p>
        </div>
      </section>
      
      <div className={styles.seasonToggle}>
        <Link 
          href="?season=winter" 
          className={currentSeason === 'winter' ? styles.activeSeason : styles.inactiveSeason}
        >
          <span className={styles.statusDot}></span> Winter
        </Link>

        <Link 
          href="?season=summer" 
          className={currentSeason === 'summer' ? styles.activeSeason : styles.inactiveSeason}
        >
          <span className={styles.statusDot}></span> Summer
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          <table className={styles.ratesTable}>
            <thead>
              <tr>
                <th className={styles.roomColumn}></th>
                <th className={styles.nightsColumn}></th>
                {deals.map((deal) => {
                  const fromDate = new Date(deal.valid_from).toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: '2-digit' 
                  });
                  const toDate = new Date(deal.valid_to).toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: '2-digit',
                    year: 'numeric'
                  });

                  return (
                    <th key={deal.id} className={styles.dealColumn}>
                      <div className={styles.dealHeader}>
                        <div className={styles.dealTitle}>{deal.title}</div>
                        <div className={styles.dateRange}>
                          {fromDate} – {toDate}
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, index) => (
                <>
                  {/* Row for 1-5 nights */}
                  <tr key={`${room.id}-1-5`}>
                    <td rowSpan={2} className={styles.roomNameCell}>
                      <Link href={`/rooms/${room.id}`} className={styles.roomLink}>
                        {room.name}
                      </Link>
                      <div className={styles.roomMeta}>
                        {room.capacity} | {room.size}
                      </div>
                    </td>
                    <td className={styles.nightsCell}>1–5 nights</td>
                    {deals.map((deal) => (
                      <td key={deal.id} className={styles.priceCell}>
                        {getPrice(room.id, deal.id, '1-5')}
                      </td>
                    ))}
                  </tr>
                  
                  {/* Row for 6+ nights */}
                  <tr key={`${room.id}-6+`}>
                    <td className={styles.nightsCell}>from 6 nights</td>
                    {deals.map((deal) => (
                      <td key={deal.id} className={styles.priceCell}>
                        {getPrice(room.id, deal.id, '6+')}
                      </td>
                    ))}
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AccordionItem title="Children's discounts">
        <p>
          Children and teens benefit from a special rate when they stay in a room with two full-paying guests.<br/>
          0 – 2 years old: €40 per day incl. cot, food, and milk<br/>
          3 – 6 years old: 60% discount on the daily rate<br/>
          7 – 11 years old: 50% discount on the daily rate<br/>
          12 – 16 years old: 40% discount on the daily rate<br/>
          from 17 years old: 20% discount on the daily rate
        </p>
      </AccordionItem>
      
      <div style={{marginBottom: '0px' }}>
        <MoreRoomsCarousel rooms={dbRooms} noBackground={true}/>
      </div>
      
      <Footer />
    </>
  );
}