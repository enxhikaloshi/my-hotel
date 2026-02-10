"use client";

import { createContext, useContext, useState, useEffect } from "react";

// 1. create the WeatherContext
const WeatherContext = createContext();

// 2. create the WeatherProvider component
export function WeatherProvider({ children }) {
  //  state to track if it's snowing
  const [isSnow, setIsSnow] = useState(false);

  //  saving state in localStorage to persist between reloads
  useEffect(() => {
    const savedWeather = localStorage.getItem("isSnow");
    if (savedWeather) {
      setIsSnow(JSON.parse(savedWeather));
    }
  }, []);

  const toggleWeather = () => {
    setIsSnow((prev) => {
      const newState = !prev;
      localStorage.setItem("isSnow", JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <WeatherContext.Provider value={{ isSnow, setIsSnow, toggleWeather }}>
      {children}
    </WeatherContext.Provider>
  );
}

// 3. We create a custom hook to use the WeatherContext
export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather should be used within a WeatherProvider");
  }
  return context;
}