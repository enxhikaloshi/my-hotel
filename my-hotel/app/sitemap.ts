import { MetadataRoute } from 'next';
import { query } from '@/lib/db';

// Fetch all room IDs from database
async function getRoomIds(): Promise<number[]> {
  try {
    const rows = await query('SELECT id FROM rooms') as any[];
    return rows.map((row: any) => row.id);
  } catch (error) {
    console.error('Error fetching room IDs:', error);
    return [];
  }
}

// Fetch all deal IDs from database
async function getDealIds(): Promise<number[]> {
  try {
    const rows = await query('SELECT id FROM hotel_deals') as any[];
    return rows.map((row: any) => row.id);
  } catch (error) {
    console.error('Error fetching deal IDs:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alpen-tesitin.com';
  const locales = ['en', 'it', 'de'];
  
  // Static routes
  const staticRoutes = [
    '',
    '/homepage',
    '/live',
    '/relax',
    '/experience',
    '/info',
    '/enquire',
    '/book',
    '/menu',
    '/rooms',
    '/details',
    '/rates',
    '/spontaneous-travellers',
    '/inclusiveServices',
    '/pool',
    '/sauna',
    '/treatment',
    '/hair-salon',
    '/gym',
    '/cuisine',
    '/summer',
    '/winter',
    '/luxury-cars',
    '/magic-moments',
    '/useful-information',
    '/car-rental',
    '/gift_vouchers',
    '/photo-video',
    '/download',
    '/privacy-policy',
    '/weather',
    '/catalogue-request'
  ];

  // Fetch dynamic IDs
  const roomIds = await getRoomIds();
  const dealIds = await getDealIds();

  const sitemap: MetadataRoute.Sitemap = [];

  // Generate entries for static routes
  staticRoutes.forEach(route => {
    locales.forEach(locale => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' || route === '/homepage' ? 'daily' : 'weekly',
        priority: route === '' || route === '/homepage' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map(loc => [loc, `${baseUrl}/${loc}${route}`])
          ),
        },
      });
    });
  });

  // Generate entries for individual rooms
  roomIds.forEach(roomId => {
    locales.forEach(locale => {
      sitemap.push({
        url: `${baseUrl}/${locale}/rooms/${roomId}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map(loc => [loc, `${baseUrl}/${loc}/rooms/${roomId}`])
          ),
        },
      });
    });
  });

  // Generate entries for individual deals/offers
  dealIds.forEach(dealId => {
    locales.forEach(locale => {
      sitemap.push({
        url: `${baseUrl}/${locale}/offers/${dealId}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.75,
        alternates: {
          languages: Object.fromEntries(
            locales.map(loc => [loc, `${baseUrl}/${loc}/offers/${dealId}`])
          ),
        },
      });
    });
  });

  return sitemap;
}