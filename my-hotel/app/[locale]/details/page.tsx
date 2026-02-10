'use client';
import { useState, useEffect } from 'react';
import SmallHeader from '@/components/Smallheader';
import styles from '@/components/dealDetail.module.css'; 
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

interface Deal {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  valid_from: string;
  valid_to: string;
}

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    async function fetchDeals() {
      try {
        const res = await fetch('/api/hotel_deals');
        const data = await res.json();
        // Filter only deals with images
        const filteredDeals = data.filter((deal: Deal) => deal.image);
        setDeals(filteredDeals);
      } catch (error) {
        console.error("Error fetching deals:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDeals();
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (deals.length === 0) return <div className={styles.loading}>No deals available</div>;

  return (
    <div className={styles.container}>
      <SmallHeader />

      {/* Luxury Intro Section */}
      <section className={styles.herooSection}>
        <h1 className={styles.title}>Your holiday bliss is within reach!</h1>
        <p className={styles.description}>
          Dive into a world where 5-star hospitality goes hand in hand with the stunning beauty of the 
          mountain landscape. Browse our exclusive deals below.
        </p>
      </section>

      {/* Deals Grid */}
      <div className={styles.dealsGrid}>
        {deals.map((deal) => (
          <div key={deal.id} className={styles.dealCard}>
            <div className={styles.imageContainer}>
              <Link href={`/details/${deal.id}`}>
                <Image 
                  src={deal.image || '/placeholder-hotel.jpg'} 
                  alt={deal.title}
                  fill
                  className={styles.hotelImage}
                />
              </Link>
              {/* Badge "From Price" */}
              <div className={styles.priceOverlay}>
                from €{deal.price || '1,477.00'} per person
              </div>
            </div>

            <div className={styles.infoContainer}>
              <h2 className={styles.dealName}>{deal.title}</h2>
              <p className={styles.dealDetails}>
                7 nights with ¾ gourmet board
              </p>
              {deal.valid_from && deal.valid_to && (
                <p className={styles.dealDates}>
                  {new Date(deal.valid_from).toLocaleDateString('de-DE')} – 
                  {new Date(deal.valid_to).toLocaleDateString('de-DE')}
                </p>
              )}
              
              <Link href={`/details/${deal.id}`} className={styles.detailsLink}>
                Show details <span className={styles.arrow}>&rarr;</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}