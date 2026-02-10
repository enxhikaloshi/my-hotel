'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import styles from '@/components/spontaneous.module.css'; 
import Footer from '@/components/Footer';
import Link from 'next/link';

interface SpontaneousDeal {
  id: number;
  room_id: number;
  deal_title: string;
  new_price: number;
  check_in: string;
  check_out: string;
  room_name: string;
  room_capacity: string;
  room_size: string;
  room_images: string[];
}

export default function SpontaneousPage() {
  const [deals, setDeals] = useState<SpontaneousDeal[]>([]);
  const [loading, setLoading] = useState(true);
  
  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays > 0 ? differenceInDays : 1;
  };

  useEffect(() => {
    async function fetchDeals() {
      try {
        const res = await fetch('/api/spontaneous-travellers');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setDeals(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDeals();
  }, []);

  if (loading) return <div className={styles.loading}>Loading offers...</div>;
  return (
   <div className={styles.spontaneousPage}>
     <Header forceSmall={true} />
      
      <section className={styles.heroContainer}>
        <h1 className={styles.title}>The last opportunities for spontaneous travellers</h1>
        
        <div className={styles.descriptionWrapper}>
          <p className={styles.description}>
            For those who love to embrace the magic of the moment and follow their desire for a spontaneous <Link href='/experience'className={styles.link}> adventure</Link>  – here are our <strong>final availabilities for the next 30 days.</strong>
          </p>
        </div>
      </section>
      <div className={styles.gridContainer}>
        <div className={styles.dealsGrid}>
          {deals.map((deal) => {
            const nights = calculateNights(deal.check_in, deal.check_out);
            
            return (
            <div key={deal.id} className={styles.dealCard}>
              <div className={styles.imageWrapper}>
                  <img 
                    src={deal.room_images[0]} 
                    alt={deal.room_name} 
                    className={styles.dealImage} 
                  />
                

                {/* Badge i çmimit (poshtë majtas si në foto) */}
                <div className={styles.priceBadge}>
                 €{deal.new_price}.00 p. P. with ¾ gourmet board ({nights} {nights === 1 ? 'night' : 'nights'})
                </div>
              </div>

              <div className={styles.dealInfo}>
                <h3 className={styles.dealTitle}>{deal.room_name}</h3>
                <p className={styles.dealDetails}>
                  {deal.room_capacity} | {deal.room_size}
                </p>
                <p className={styles.dates}>
                   {new Date(deal.check_in).toLocaleDateString('de-DE')} – {new Date(deal.check_out).toLocaleDateString('de-DE')}
                </p>
                
                <Link 
                    href={`/enquire?room=${deal.room_id}&from=${deal.check_in}&to=${deal.check_out}`} 
                    className={styles.enquireButton}
                  >
                    Enquire
                  </Link>
              </div>
            </div>
            );
          })}   
        </div>
      </div>
      <Footer />
    </div>
  );
}