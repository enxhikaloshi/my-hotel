"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from '@/components/photo.module.css';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

type FilterType = 'all' | 'hotel' | 'architecture' | 'wellness' | 'cuisine' | 'video' | 'social';

interface MediaItem {
  id: number;
  src: string;
  alt: string;
  category: FilterType[];
  isVideo?: boolean;
  videoUrl?: string;
}

export default function PhotosVideosPage() {
  const t = useTranslations('PhotosVideos');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get filter labels from translations
  const filters = [
    { key: 'all', label: t('filters.all') },
    { key: 'hotel', label: t('filters.hotel') },
    { key: 'architecture', label: t('filters.architecture') },
    { key: 'wellness', label: t('filters.wellness') },
    { key: 'cuisine', label: t('filters.cuisine') },
    { key: 'video', label: t('filters.video') },
    { key: 'social', label: t('filters.social') }
  ];

  // Your media items - replace with your actual image paths
  const mediaItems: MediaItem[] = [
    {
      id: 1,
      src: '/hotel_page1.jpg',
      alt: t('mediaItems.item1.alt'),
      category: ['all', 'hotel']
    },
    {
      id: 2,
      src: '/relax_summer2.jpg',
      alt: t('mediaItems.item2.alt'),
      category: ['all', 'hotel', 'architecture']
    },
    {
      id: 3,
      src: '/hotel_page5.png',
      alt: t('mediaItems.item3.alt'),
      category: ['all', 'hotel', 'architecture']
    },
    {
      id: 4,
      src: '/hotel_photo13.png',
      alt: t('mediaItems.item4.alt'),
      category: ['all', 'architecture']
    },
    {
      id: 5,
      src: '/pool_summer1.png',
      alt: t('mediaItems.item5.alt'),
      category: ['all', 'wellness']
    },
    {
      id: 6,
      src: '/sauna_5.png',
      alt: t('mediaItems.item6.alt'),
      category: ['all', 'wellness']
    },
    {
      id: 7,
      src: '/food_dish.png',
      alt: t('mediaItems.item7.alt'),
      category: ['all', 'cuisine']
    },
    {
      id: 8,
      src: '/hotel_video_thumb.jpg',
      alt: t('mediaItems.item8.alt'),
      category: ['all', 'video'],
      isVideo: true,
      videoUrl: '/videos/hotel-tour.mp4'
    },
    {
      id: 9,
      src: '/gennetay1.jpg',
      alt: t('mediaItems.item9.alt'),
      category: ['all', 'wellness']
    },
    {
      id: 10,
      src: '/cuisine_summer1.png',
      alt: t('mediaItems.item10.alt'),
      category: ['all', 'cuisine']
    },
    {
      id: 11,
      src: '/cuisine7.png',
      alt: t('mediaItems.item11.alt'),
      category: ['all', 'cuisine']
    },
    {
      id: 12,
      src: '/cuisine10.png',
      alt: t('mediaItems.item12.alt'),
      category: ['all', 'cuisine']
    },
  ];

  const filteredItems = mediaItems.filter(item => 
    activeFilter === 'all' ? true : item.category.includes(activeFilter)
  );

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    setCurrentIndex((prev:any) => (prev + 1) % filteredItems.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev:any) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <>
      <Header forceSmall={true} />
      
      <section className={styles.heroContainer}>
        <h1 className={styles.title}>{t('heroTitle')}</h1>
        
        <div className={styles.descriptionWrapper}>
          <p className={styles.description}>
            {t.rich('heroDescription', {
              link: (chunks) => <Link href='/getting-here' className={styles.link}>{chunks}</Link>
            })}
          </p>
        </div>
      </section>
      
      <section className={styles.filterSection}>
        <div className={styles.filterContainer}>
          {filters.map((filter) => (
            <button
              key={filter.key}
              className={`${styles.filterButton} ${
                activeFilter === filter.key ? styles.active : ''
              }`}
              onClick={() => setActiveFilter(filter.key as FilterType)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className={styles.gallerySection}>
        <div className={styles.galleryGrid}>
          {filteredItems.map((item, index) => (
            <div 
              key={item.id} 
              className={styles.galleryItem}
              onClick={() => openLightbox(index)}
            >
              {item.isVideo ? (
                <div className={styles.videoWrapper}>
                  <img src={item.src} alt={item.alt} className={styles.videoThumbnail} />
                  <div className={styles.playIcon}>▶</div>
                </div>
              ) : (
                <img src={item.src} alt={item.alt} className={styles.galleryImage} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className={styles.lightboxOverlay} onClick={closeLightbox}>
          <button className={styles.closeButton} onClick={closeLightbox}>
            ✕
          </button>
          
          <button className={styles.navButton} onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}>
            ‹
          </button>
          
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            {filteredItems[currentIndex]?.isVideo ? (
              <video 
                src={filteredItems[currentIndex].videoUrl} 
                controls 
                autoPlay
                className={styles.lightboxVideo}
              />
            ) : (
              <img 
                src={filteredItems[currentIndex]?.src} 
                alt={filteredItems[currentIndex]?.alt}
                className={styles.lightboxImage}
              />
            )}
          </div>
          
          <button className={styles.navButton} onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}>
            ›
          </button>
        </div>
      )}
      
      <Footer />
    </>
  );
}