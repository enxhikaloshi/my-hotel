"use client";
import React from 'react';
import styles from './PoolSection.module.css';

export interface InfoItem {
  title: string;
  specs?: string; 
  text: string | React.ReactNode;
  image: string;
  bgColor?: string;
  hasReadMore?: boolean;
}

interface InfoSectionProps {
  data: InfoItem[];
  
}

export default function InfoSection({ data }: InfoSectionProps) {
 const [expandedIndices, setExpandedIndices] = React.useState<number[]>([]);

const toggleExpand = (index: number) => {
  setExpandedIndices(prev => 
    prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
  );
};
 return (
    <section className={styles.mainContainer}>
     {data.map((item, index) => {
      const isExpanded = expandedIndices.includes(index);
      const shouldLimit = item.hasReadMore;

        return (
          <div 
            key={index} 
            className={`${styles.rowFullWidth} ${index % 2 !== 0 ? styles.reversed : ''}`}
            style={{ backgroundColor: item.bgColor || '#ffffff' }}
          >
            <div className={styles.contentInner}>
              {/* Imazhi */}
              <div className={styles.imageWrapper}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className={styles.mainImage} 
                />
              </div>
              
              {/* Teksti */}
              <div className={styles.contentWrapper}>
                <div className={styles.textContent}>
                  <h2 className={styles.title} style={{ color: item.bgColor === '#1a2b3c' ? '#ffffff' : '#333' }}>
                    {item.title}
                    {item.specs && (
                      <>
                        <br />
                        <span className={styles.specs}>{item.specs}</span>
                      </>
                    )}
                  </h2>
                 <div className={shouldLimit ? (isExpanded ? styles.expanded : styles.collapsed) : ""}>
                  <div 
  className={styles.description} 
  style={{ color: item.bgColor === '#1a2b3c' ? '#e0e0e0' : '#555' }}
>
  {typeof item.text === 'string' ? 
    <span dangerouslySetInnerHTML={{ __html: item.text }} /> : 
    item.text
  }
</div>
                </div>

                {/* Butoni shfaqet vetëm nëse hasReadMore është true */}
                {shouldLimit && (
                  <button 
                    onClick={() => toggleExpand(index)} 
                    className={styles.readMoreBtn}
                    style={{ color: item.bgColor === '#1a2b3c' ? '#ffffff' : '#333' }}
                  >
                    {isExpanded ? "Show less" : "Continue reading"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </section>
);}