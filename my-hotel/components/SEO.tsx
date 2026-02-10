// components/SEO.tsx
import React from 'react';
import Head from 'next/head';
import { useTranslations } from 'next-intl';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile' | 'product';
  locale?: string;
  noindex?: boolean;
  structuredData?: any;
  children?: React.ReactNode;
}

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  locale,
  noindex = false,
  structuredData,
  children
}: SEOProps) {
  const tMetadata = useTranslations('metadata');
  
  // Site URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alpentesitin.com';
  
  // Default values
  const pageTitle = title || tMetadata('title');
  const pageDescription = description || tMetadata('description');
  const pageKeywords = keywords || tMetadata('keywords');
  const pageImage = image || `${siteUrl}/og-image.jpg`;
  const pageUrl = url || siteUrl;
  const pageLocale = locale || 'en_US';
  
  // Structured data for hotel (default)
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "Alpen Tesitin Hotel",
    "description": pageDescription,
    "image": pageImage,
    "url": siteUrl,
    "telephone": "+39-0474-XXXXXX",
    "priceRange": "$$$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via Tesitin 1",
      "addressLocality": "Tesitin/Taisten",
      "addressRegion": "South Tyrol",
      "postalCode": "39030",
      "addressCountry": "IT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "46.8936",
      "longitude": "11.8761"
    },
    "starRating": {
      "@type": "Rating",
      "ratingValue": "5"
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Spa",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Restaurant",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Fitness Center",
        "value": true
      }
    ]
  };
  
  const schemaData = structuredData || defaultStructuredData;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />
      
      {/* Robots */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={tMetadata('ogImageAlt') || "Alpen Tesitin Hotel"} />
      <meta property="og:site_name" content={tMetadata('siteName')} />
      <meta property="og:locale" content={pageLocale} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      
      {/* Additional SEO Tags */}
      <meta name="author" content={tMetadata('author')} />
      <meta name="language" content={pageLocale.split('_')[0]} />
      
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      {/* Viewport for mobile optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      
      {/* Additional children components */}
      {children}
    </Head>
  );
}