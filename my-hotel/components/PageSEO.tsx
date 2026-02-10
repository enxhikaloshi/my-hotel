
import React from 'react';
import SEO from './SEO';
import { useLocale } from 'next-intl';

interface PageSEOProps {
  pageTitle?: string;
  pageDescription?: string;
  pageKeywords?: string;
  pageImage?: string;
  pagePath?: string;
  structuredData?: any;
  noindex?: boolean;
}

export default function PageSEO({
  pageTitle,
  pageDescription,
  pageKeywords,
  pageImage,
  pagePath = '',
  structuredData,
  noindex = false
}: PageSEOProps) {
  const locale = useLocale();
  
  // Site URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alpentesitin.com';
  
  // Build full URL
  const fullUrl = `${siteUrl}/${locale}${pagePath ? `/${pagePath}` : ''}`;
  
  // Convert locale to og:locale format
  const ogLocale = locale === 'en' ? 'en_US' : 
                   locale === 'it' ? 'it_IT' : 
                   'de_DE';

  return (
    <SEO
      title={pageTitle}
      description={pageDescription}
      keywords={pageKeywords}
      image={pageImage}
      url={fullUrl}
      locale={ogLocale}
      noindex={noindex}
      structuredData={structuredData}
    />
  );
}