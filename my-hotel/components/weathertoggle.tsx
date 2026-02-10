"use client";

import { useWeather } from "@/context/WeatherContext";
import { Sun, Snowflake } from "lucide-react"; 
import styles from "./page.module.css"; 

export default function WeatherToggle() {
  
  const { isSnow, setIsSnow } = useWeather();

  return (
    <div className={styles.weatherContainer}>
      <div
        className={`${styles.toggleSwitch} ${isSnow ? styles.active : ""}`}
        onClick={() => setIsSnow(!isSnow)}
        role="button"
        aria-label="Change weather"
      >
        <div className={styles.thumb}>
          {isSnow ? (
            <Snowflake className={styles.icon} />
          ) : (
            <Sun className={styles.icon} />
          )}
        </div>
      </div>
    </div>
  );
}