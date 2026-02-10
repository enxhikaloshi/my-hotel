import { query } from '@/lib/db';
import SmallHeader from '@/components/Smallheader';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from '@/components/dealDetail.module.css';
import { Calendar, Euro, UtensilsCrossed } from 'lucide-react';

export default async function DealDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const sqlQuery = 'SELECT * FROM hotel_deals WHERE id = ?';
  const rows = await query(sqlQuery, [id]) as any[];
  const deal = rows[0];

  if (!deal) {
    notFound();
  }

  const otherDealsQuery = 'SELECT id, title, image, minimum_stay FROM hotel_deals WHERE id != ? LIMIT 4';
  const otherDeals = await query(otherDealsQuery, [id]) as any[];

  return (
    <div className={styles.pageContainer}>
      <SmallHeader />
      
      <main className={styles.mainContent}>
        
        {/* SECTION 1: */}
        <section className={styles.heroSection}>
          
          <div className={styles.mainImageWrapper}>
            {deal.image ? (
              <Image 
                src={deal.image} 
                alt={deal.title} 
                width={1100} 
                height={500} 
                className={styles.heroImg}
                priority
              />
            ) : (
              <div className={styles.noImage}>No Image Available</div>
            )}
          </div>
          <div className={styles.topNavigation}>
            <Link href="/details" className={styles.backLink}>
              <span className={styles.arrowIcon}>←</span> Back to overview
            </Link>
          </div>
        </section>

        {/* SECTION 2: (Text + Booking Widget) */}
<section className={styles.detailsLayout}>
  
  <div className={styles.infoColumn}>
    <h1 className={styles.title}>{deal.title}</h1>
    
    {/* Valid Dates */}
    {deal.valid_from && deal.valid_to && (
      <div className={styles.validDatesSection}>
        <p className={styles.validDatesText}>
          {new Date(deal.valid_from).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric' })} – {new Date(deal.valid_to).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}
        </p>
      </div>
    )}
    
    {/* Rreshti i ikonave - Stili Alpen Tesitin */}
    <div className={styles.quickInfoIcons}>
      <div className={styles.iconItem}>
        <div className={styles.iconCircle}><Calendar /></div> 
        <span>{deal.minimum_stay} nights</span>
      </div>
      <div className={styles.iconItem}>
        <div className={styles.iconCircle}><UtensilsCrossed /></div>
        <span>¾ gourmet board</span>
      </div>
      <div className={styles.iconItem}>
        <div className={styles.iconCircle}> <Euro /></div>
        <span>from €{deal.price || '1,477.00'} per person</span>
      </div>
    </div>

    <div className={styles.descriptionWrapper}>
  
      <div className={styles.mainDescription}>
        {deal.description}
      </div>
      
  </div>
  </div>

  <aside className={styles.sidebarColumn}>
    <div className={styles.bookingWidgetCard}>
      <div className={styles.widgetPriceInfo}>
        <h3>from €{deal.price || '1,477.00'}</h3>
        <p>p. P. with ¾ gourmet board</p>
      </div>
      
      <div className={styles.widgetActions}>
        <Link href={`/enquire?deal=${deal.id}`} className={styles.widgetEnquireBtn}>
          Enquire
        </Link>
        <Link href={`/book?deal=${deal.id}`} className={styles.widgetBookBtn}>
          Book
        </Link>
      </div>
    </div>
  </aside>

</section>
      </main>

      <Footer />
    </div>
  );
}