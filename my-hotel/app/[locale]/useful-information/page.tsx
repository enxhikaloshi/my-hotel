import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from '@/components/usefulInfo.module.css';
import Link from 'next/link';
import AccordionItem from '@/components/AccordionItem';
import InsuranceForm from '@/components/Insurance';

export default function Moments() {
  return (
    <>
     <Header forceSmall={true} />
      
      <section className={styles.heroContainer}>
        <h1 className={styles.title}>Important information about your stay</h1>
        
        <div className={styles.descriptionWrapper}>
          <p className={styles.description}>
           Do you have questions? We have the answers. From staying here with your four-legged friend to cancellation conditions, you’ll find <strong>everything</strong> you need to know <strong>about your holiday in Val Pusteria/Pustertal</strong> here on this page. For any additional questions or queries, please feel free to contact us at any time.
          </p>
        </div>
      </section>
      <AccordionItem title="Arrival and departure ">
        <p>Your room will be available to you <strong>from 3 p.m. on your arrival day.</strong> If you’ll be arriving after 7 p.m., please let us know. We kindly ask you to vacate your room by <strong>10.30 a.m. on your departure day.</strong> </p>
      </AccordionItem>
      <AccordionItem title="Children’s discounts">
        <p>Children and teenagers staying in a room with two full-paying guests get a special rate:<br/>0 – 2 years: €40 per day incl. cot, food, and milk<br/>3 – 6 years old: 60% discount on the daily rate<br/>7 – 11 years old: 50% discount on the daily rate<br/>12 – 16 years old: 40% discount on the daily rate<br/>from 17 years old: 20% discount on the daily rate</p>
      </AccordionItem>
      <AccordionItem title="Parking">
        <p>We’ll be happy to reserve <strong>a parking space in the underground garage</strong> for the rate of just €10 per day for stays in the Alm single room, Wiesen double room, or the Dolomites suite. For all other suites, garage parking is included in the rate. If you’re travelling without your car or fancy something new, you can<Link href="/rental-car"> rent one of our cars.</Link></p>
      </AccordionItem>
        <AccordionItem title="Rate Information">    
        <p><strong>Rates</strong> are <strong>per person per night including ¾ gourmet board.</strong> An extra local tax of €4.00 per person (from 14 years old) per night is charged at the hotel. </p>
      </AccordionItem>
        <AccordionItem title="Travel cancellation insurance">
        <p>Despite how much you’re looking forward to your holiday in Val Pusteria/Pustertal, you never know what might come up beforehand. To make sure you’re covered in those cases, we recommend you take out our <strong>“Hotel Cancellation Plus” travel cancellation insurance</strong>. Europäische Reiseversicherung will then take care of any cancellation fees. Travel cancellation insurance should be taken out at the time of booking. <a href='/useful-information'>You can do it right here</a></p>
      </AccordionItem>
      <AccordionItem title="Cancellation policy">
     <p>
    In case of <strong>cancellation</strong>, please inform us <strong>in writing as soon as possible</strong>. 
    The cancellation only becomes valid once you have received our written confirmation.
  </p>
  
  <ul className={styles.bulletList}>
    <li>No cancellation fees are charged up to 4 weeks before arrival.</li>
    <li>For cancellations made between 4 weeks and 1 week before arrival, we charge 50% of the value of the booked stay.</li>
    <li>For cancellations made less than 7 days before arrival, we charge 75% of the value of the booked stay.</li>
    <li>In the case of late arrival, early departure, or no-show, we charge 100% of the value of the booked stay.</li>
  </ul>
        </AccordionItem>
        <AccordionItem title="Holiday with your dog">
        <p>Do you want to bring your <strong>dog on holiday</strong> with you at the Alpen Tesitin? Simply contact our reception team, as prior agreement is needed before your dog can accompany you. Furry friends are welcome in the Alm single room, Wiesen double room, Dolomites suite and Mountain suite. Thank you for understanding that your dog is not allowed in the swimming pool area, sauna and beauty area, sunbathing lawn, or dining rooms. We charge an additional fee of €50 per dog for the final cleaning of the room. Please bring a dog basket with you.</p>
        </AccordionItem>
   <InsuranceForm/>
      <Footer />
    </>
  );
}