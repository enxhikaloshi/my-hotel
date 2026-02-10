"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "./accordion.module.css";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export default function AccordionItem({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.accordionContainer}>
      <div 
        className={styles.accordionHeader} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.accordionTitle}>{title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      
      {isOpen && (
        <div className={styles.accordionContent}>
          {children}
        </div>
      )}
    </div>
  );
}