import { query } from '@/lib/db';
import SmallHeader from '@/components/Smallheader';
import Footer from '@/components/Footer';
import Link from 'next/link';
import styles from '@/components/roomDetail.module.css';
import { notFound } from 'next/navigation';
import { Ban, CircleUserRound, Euro, Eye, MoveDiagonal } from 'lucide-react';
import RoomImagesSlider from '@/components/RoomImagesSlider';
import OtherRoomsCarousel from '@/components/OtherRoomCarousel';

export default async function RoomDetailPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ season?: string }> 
}) {
  const { id } = await params;
  const { season = 'winter' } = await searchParams; 

  const sqlQuery = 'SELECT * FROM rooms WHERE id = ?';
  const rows = await query(sqlQuery, [id]) as any[];
  
  const room = rows[0];

  if (!room) {
    notFound(); 
  }

  const pricesQuery = `
  SELECT 
    hd.title, 
    hd.valid_from, 
    hd.valid_to, 
    drp.price_1_to_5_nights, 
    drp.price_6_plus_nights 
  FROM hotel_deals hd
  JOIN deal_room_prices drp ON hd.id = drp.deal_id
  WHERE drp.room_id = ? AND hd.season = ?
`;
const prices = await query(pricesQuery, [id, season]) as any[];
const otherRoomsQuery = 'SELECT id, name, price, images,capacity,size FROM rooms WHERE id != ? LIMIT 4';
const otherRooms = await query(otherRoomsQuery, [id]) as any[];
  let images: string[] = [];
  if (typeof room.images === 'string') {
    try { images = JSON.parse(room.images); }
    catch { images = room.images.split(',').map((img: string) => img.trim()); }
  } else {
    images = room.images || [];
  }

  
  return (
    <div className={styles.pageContainer}>
      <SmallHeader />
      
      <main className={styles.mainContent}>
        <RoomImagesSlider images={images} />
      

        {/* SECOND NAVIGATION - E thjeshtuar */}
        <div className={styles.secondaryNavigation}>
          <Link href="/rooms" className={styles.backButton}>
            <span className={styles.arrowIcon}>←</span> Back to overview
          </Link>
          <div className={styles.imageNavControls}>
            <span className={styles.pageCount}>{id} / 5</span>
            <div className={styles.arrowGroup}>
              <button className={styles.navArrow}>←</button>
              <button className={styles.navArrow}>→</button>
            </div>
          </div>
        </div>

        {/* SECTION 1: GRID LAYOUT (Description + Widget) */}
        <div className={styles.detailsLayout}>
          <div className={styles.descriptionSide}>
            <h1 className={styles.roomTitle}>{room.name}</h1>
            
            <div className={styles.iconsRow}>
              <div className={styles.iconBox}>
                <div className={styles.iconCircle}><CircleUserRound /></div>
                <span className={styles.iconLabel}>{room.capacity} people</span>
              </div>

              <div className={styles.iconBox}>
                <div className={styles.iconCircle}><MoveDiagonal /></div>
                <span className={styles.iconLabel}>{room.size}</span>
              </div>

              <div className={styles.iconBox}>
                <div className={styles.iconCircle}><Euro /></div>
                <span className={styles.iconLabel}>from €{room.price} per person</span>
              </div>

              <div className={styles.iconBox}>
                <div className={styles.iconCircle}><Ban /></div>
              </div>
            </div>

            <div className={styles.fullDescription}>
              <p className={styles.mainDesc}>{room.description}</p>
              <p className={styles.subDesc}>{room.long_description || ""}</p>
            </div>
          </div>

          {/* Sticky Widget */}
          <aside className={styles.bookingWidget}>
            <div className={styles.widgetContent}>
              <h3 className={styles.widgetPrice}>from €{room.price}.00</h3>
              <p className={styles.widgetInfo}>p. P. with ¾ gourmet board</p>
              
              <div className={styles.widgetActions}>
                <Link 
                    href={`/enquire?roomId=${room.id}&roomName=${encodeURIComponent(room.name)}`} 
                    className={styles.enquireBtn}
                >
                    Enquire
                </Link>
                
                <Link 
                    href={`/book?roomId=${room.id}&roomName=${encodeURIComponent(room.name)}`} 
                    className={styles.bookBtn}
                >
                    Book
                </Link>
              </div>
            </div>
          </aside>
        </div> 

        {/* SEKSIONI 2: Table*/}
        <div className={styles.fullWidthPricing}>
          <div className={styles.pricingSection}>
            <div className={styles.seasonToggle}>
              <Link 
                href={`?season=winter`} 
                className={season === 'winter' ? styles.activeSeason : styles.inactiveSeason}
              >
                <span className={styles.statusDot}></span> Winter
              </Link>

              <Link 
                href={`?season=summer`} 
                className={season === 'summer' ? styles.activeSeason : styles.inactiveSeason}
              >
                <span className={styles.statusDot}></span> Summer
              </Link>
            </div>

            <div className={styles.tableResponsive}>
              <table className={styles.dealsTable}>
                <thead>
                  <tr>
                    <th className={styles.periodCol}>Period</th>
                    {prices.map((deal, idx) => {
                      const fromDate = new Date(deal.valid_from).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' });
                      const toDate = new Date(deal.valid_to).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' });
                      const year = new Date(deal.valid_to).getFullYear();

                      return (
                        <th key={idx} className={styles.dealHeader}>
                          <strong className={styles.dealTitle}>{deal.title}</strong>
                          <div className={styles.dateRange}>
                            {fromDate} – {toDate}/{year}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.periodCol}>1 - 5 nights</td>
                    {prices.map((deal, idx) => (
                      <td key={idx}>€{Number(deal.price_1_to_5_nights).toFixed(2)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className={styles.periodCol}>from 6 nights</td>
                    {prices.map((deal, idx) => (
                      <td key={idx}>€{Number(deal.price_6_plus_nights).toFixed(2)}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <OtherRoomsCarousel rooms={otherRooms} />
      </main>

      <Footer />
    </div>
  );
}