"use client";
import React from 'react';
import styles from './downloads.module.css';
import { ArrowDownToLine, MoveRight } from 'lucide-react';

interface MenuProps {
  title: string;
  pdfUrl: string;
}

const DownloadMenu = ({ menus }: { menus: MenuProps[] }) => {
  return (
    <div className={styles.sectionContainer}>
      <div className={styles.grid}>
        {menus.map((menu, index) => (
          <a 
            key={index} 
            href={menu.pdfUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.card}
          >
            <div className={styles.iconCircle}>
              <ArrowDownToLine size={24} strokeWidth={1.5} />
            </div>
            <div className={styles.textContainer}>
              <h3 className={styles.title}>{menu.title}</h3>
              <div className={styles.downloadLink}>
                <span>Download</span>
                <MoveRight size={18} />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default DownloadMenu;