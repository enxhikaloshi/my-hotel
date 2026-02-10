'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './calendar.module.css';

interface CalendarProps {
  dateRange: { from?: Date; to?: Date } | undefined;
  setDateRange: (range: { from?: Date; to?: Date } | undefined) => void;
  bookedDates?: Date[];
}

export const Calendar = ({ dateRange, setDateRange, bookedDates = [] }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const MINIMUM_STAY = 4;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const isAtFirstMonth = currentDate.getFullYear() <= startOfCurrentMonth.getFullYear() && 
                         currentDate.getMonth() <= startOfCurrentMonth.getMonth();

  const isDepartureForbidden = (date: Date) => {
    if (!dateRange?.from || dateRange.to) return false;
    const diffTime = date.getTime() - dateRange.from.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays < MINIMUM_STAY;
  };

  const handleDateClick = (date: Date) => {
    if (date < today || isBooked(date)) return;

    if (!dateRange?.from || (dateRange.from && dateRange.to)) {
      setDateRange({ from: date, to: undefined });
    } else {
      const diffTime = date.getTime() - dateRange.from.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (date < dateRange.from) {
        setDateRange({ from: date, to: undefined });
      } else if (diffDays < MINIMUM_STAY) {
        return; // Bllokon klikimin
      } else {
        setDateRange({ from: dateRange.from, to: date });
      }
    }
  };

  const isBooked = (date: Date) => bookedDates.some(d => d.toDateString() === date.toDateString());
  const isSelected = (date: Date) => {
    if (!dateRange?.from) return false;
    if (dateRange.from && !dateRange.to) return date.getTime() === dateRange.from.getTime();
    return date >= dateRange.from && date <= dateRange.to!;
  };

  const renderMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const startDay = (new Date(year, month, 1).getDay() + 6) % 7;

    const days = [];
    for (let i = 0; i < startDay; i++) days.push(<div key={`empty-${i}`} />);
    
    for (let d = 1; d <= totalDays; d++) {
      const fullDate = new Date(year, month, d);
      fullDate.setHours(0, 0, 0, 0);

      const isPast = fullDate < today;
      const selected = isSelected(fullDate);
      const booked = isBooked(fullDate);
      const forbidden = isDepartureForbidden(fullDate);

      let dayClass = styles.day;
      if (selected) dayClass += ` ${styles.selected}`;
      if (fullDate.getTime() === dateRange?.from?.getTime()) dayClass += ` ${styles.rangeStart}`;
      if (fullDate.getTime() === dateRange?.to?.getTime()) dayClass += ` ${styles.rangeEnd}`;
      if (booked) dayClass += ` ${styles.booked}`;
      if (isPast) dayClass += ` ${styles.past}`;
      if (forbidden) dayClass += ` ${styles.departureNotPossible}`;

      days.push(
        <div 
          key={d} 
          className={dayClass}
          onClick={() => handleDateClick(fullDate)}
          onMouseEnter={() => forbidden && setHoveredDate(fullDate)}
          onMouseLeave={() => setHoveredDate(null)}
        >
          {d}
          {forbidden && hoveredDate?.getTime() === fullDate.getTime() && (
            <div className={styles.tooltip}>
              Departure not possible. The selected period requires a minimum stay.
            </div>
          )}
        </div>
      );
    }

    return (
      <div className={styles.monthContainer}>
        <div className={styles.monthHeader}>{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
        <div className={styles.weekDays}>
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => <span key={day}>{day}</span>)}
        </div>
        <div className={styles.daysGrid}>{days}</div>
      </div>
    );
  };

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.navigation}>
        <button aria-label='Previous Button' onClick={() => !isAtFirstMonth && setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))} className={`${styles.navBtn} ${isAtFirstMonth ? styles.disabled : ''}`} disabled={isAtFirstMonth}>
          <ChevronLeft />
        </button>
        <button aria-label='Next Button' onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))} className={styles.navBtn}>
          <ChevronRight />
        </button>
      </div>
      <div className={styles.monthsFlex}>
        {renderMonth(currentDate)}
        {renderMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
      </div>
      <div className={styles.legend}>
        <div className={styles.legendItem}><span className={styles.arrivalBox}></span> Arrival possible</div>
        <div className={styles.legendItem}><span className={styles.departureBox}></span> Departure not possible</div>
        <div className={styles.legendItem}><span className={styles.selectionBox}></span> Selection</div>
      </div>
    </div>
  );
};