import Footer from '@/components/Footer';
import SmallHeader from '@/components/Smallheader';
import styles from '@/components/weather.module.css';
import { getWeatherData } from '@/lib/weather';

const CITIES = [
  { name: "Bolzano", bottom: 25, right: 45 },
  { name: "Sterzing", bottom: 66, right: 50 },
  { name: "Bruneck", bottom: 75, right: 20 },
  { name: "Brixen", bottom: 60, right: 35 },
  { name: "Meran", bottom: 45, right: 50 },
  { name: "Schlanders", bottom: 55, right: 85 },
];

export default async function WeatherWidget() {
  const citiesData = await Promise.all(
    CITIES.map(async (city) => {
      const weather = await getWeatherData(city.name);
      return { ...city, weather };
    })
  );

  // Marrim të dhënat kryesore nga qyteti i parë (Bolzano)
  const mainWeather = citiesData[0]?.weather;
  const today = mainWeather?.today;
  const tomorrow = mainWeather?.tomorrow;
  const forecast = mainWeather?.forecast;

  const getPremiumIcon = (iconCode: string | undefined) => {
    if (!iconCode) return "https://img.icons8.com/fluency/96/sun.png";

    const map: { [key: string]: string } = {
      '01d': 'https://img.icons8.com/fluency/96/sun.png',
      '01n': 'https://img.icons8.com/fluency/96/full-moon.png',
      '02d': 'https://img.icons8.com/fluency/96/partly-cloudy-day.png',
      '02n': 'https://img.icons8.com/fluency/96/partly-cloudy-night.png',
      '03d': 'https://img.icons8.com/fluency/96/moderate-rain.png',
      '03n': 'https://img.icons8.com/fluency/96/cloud.png',
      '04d': 'https://img.icons8.com/fluency/96/clouds.png',
      '09d': 'https://img.icons8.com/fluency/96/rain.png',
      '10d': 'https://img.icons8.com/fluency/96/weather.png',
      '13d': 'https://img.icons8.com/fluency/96/snow.png',
      '50d': 'https://img.icons8.com/fluency/96/haze.png',
    };

    return map[iconCode] || `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const getWindDirection = (degrees: number): string => {
  if (degrees === undefined || degrees === null) return 'N/A';
  const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index] || 'North';
};

  const generateForecastDescriptions = () => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return forecast?.slice(2, 6).map((f: any, idx: number) => {
      const futureDate = new Date(Date.now() + (idx + 2) * 86400000);
      const dayName = dayNames[futureDate.getDay()];
      const apiDescription = f?.weather?.[0]?.description || 'stable conditions';
      const cloudCover = f?.clouds?.all || 0;
      const temp = Math.round(f?.main?.temp ?? 0);
      let detailedDescription = `On ${dayName}, the weather will be ${apiDescription}`;
      if (cloudCover > 70) detailedDescription += `, with significant cloud cover`;
      else if (cloudCover > 40) detailedDescription += `, with partial cloud cover`;
      else if (cloudCover < 20) detailedDescription += `, with clear skies expected`;
      
      detailedDescription += `. Temperatures around ${temp}°C.`;
      return detailedDescription;
    }) || [];
  };

  const descriptions = {
    situation: today?.wind?.speed 
      ? `The wind will shift to the ${getWindDirection(today.wind.deg || 0)}, bringing ${today.main?.humidity > 70 ? 'moist' : 'dry'} air. Speed: ${Math.round(today.wind.speed)} km/h.`
      : today?.weather?.[0]?.description || "Clear weather conditions",
    todayDetail: today?.main?.temp 
      ? `Today it will be ${today.weather?.[0]?.description || 'pleasant'} with ${Math.round(today.main.temp)}°C. Humidity at ${today.main.humidity}%.`
      : "No details available"
  };

  const tomorrowDescriptions = {
    situation: tomorrow?.wind?.speed 
      ? `The wind will shift to the ${getWindDirection(tomorrow.wind.deg || 0)}. Speed: ${Math.round(tomorrow.wind.speed)} km/h.`
      : tomorrow?.weather?.[0]?.description || "Stable weather conditions",
    tomorrowDetail: tomorrow?.main?.temp 
      ? `Tomorrow it will be ${tomorrow.weather?.[0]?.description || 'pleasant'} with ${Math.round(tomorrow.main.temp)}°C.`
      : "No details available"
  };

  const forecastDescriptions = generateForecastDescriptions();
  const formattedDate = new Date().toLocaleDateString('en-GB');
  const formattedDateTomorrow = new Date(Date.now() + 86400000).toLocaleDateString('en-GB');

  return (
    <div className={styles.pageWrapper}>
      <SmallHeader />
      <section className={styles.currentWeatherHeader}>
        <h1 className={styles.mainTitle}>The current weather</h1>
        <p className={styles.introText}>
          Whether <a href="/snowy">snowy</a> or <a href="/summer">sunny</a> – your holiday will be unforgettably beautiful!
        </p>
      </section>

      {/* TODAY SECTION */}
      <div className={styles.container}>
        <h1 className={styles.title}>The weather today – {formattedDate}</h1>
        <div className={styles.content}>
          <div className={styles.textSide}>
            <h2 className={styles.sectionTitle}>Weather situation</h2>
            <p className={styles.description}>{descriptions.situation}</p>
            <h2 className={styles.sectionTitle}>The weather today</h2>
            <p className={styles.description}>{descriptions.todayDetail}</p>
            <div className={styles.reliability}>Reliability 95%</div>
          </div>

          <div className={styles.mapWrapper}>
            {citiesData.map((cityObj) => (
              <div 
                key={cityObj.name}
                className={styles.weatherPoint}
                style={{ bottom: `${cityObj.bottom}%`, right: `${cityObj.right}%` }}
              >
                <img 
                  className={styles.weatherIcon}
                  src={getPremiumIcon(cityObj.weather?.today?.weather?.[0]?.icon)} 
                  alt={cityObj.name} 
                />
                <div className={styles.tempRange}>
                  <span className={styles.tempLow}>{Math.round(cityObj.weather?.today?.main?.temp_min ?? 0)}°</span>
                  <span className={styles.tempHigh}>{Math.round(cityObj.weather?.today?.main?.temp_max ?? 0)}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TOMORROW SECTION */}
      <div className={styles.container}>
        <h1 className={styles.title}>The weather tomorrow – {formattedDateTomorrow}</h1>
        <div className={styles.content}>
          <div className={styles.textSide}>
            <h2 className={styles.sectionTitle}>Weather situation</h2>
            <p className={styles.description}>{tomorrowDescriptions.situation}</p>
            <h2 className={styles.sectionTitle}>The weather tomorrow</h2>
            <p className={styles.description}>{tomorrowDescriptions.tomorrowDetail}</p>
            <div className={styles.reliability}>Reliability 90%</div>
          </div>

          <div className={styles.mapWrapper}>
            {citiesData.map((cityObj) => (
              <div 
                key={`tomorrow-${cityObj.name}`}
                className={styles.weatherPoint}
                style={{ bottom: `${cityObj.bottom}%`, right: `${cityObj.right}%` }}
              >
                <img 
                  className={styles.weatherIcon}
                  src={getPremiumIcon(cityObj.weather?.tomorrow?.weather?.[0]?.icon)} 
                  alt={cityObj.name} 
                />
                <div className={styles.tempRange}>
                  <span className={styles.tempLow}>{Math.round(cityObj.weather?.tomorrow?.main?.temp_min ?? 0)}°</span>
                  <span className={styles.tempHigh}>{Math.round(cityObj.weather?.tomorrow?.main?.temp_max ?? 0)}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FORECAST SECTION */}
      <div className={styles.container}>
        <h1 className={styles.title}>Forecast for the next few days</h1>
        <div className={styles.forecastContent}>
          <div className={styles.forecastText}>
            <h2 className={styles.sectionTitle}>Sun and clouds</h2>
            {forecastDescriptions.map((desc: string, idx: number) => (
              <p key={idx} className={styles.description}>{desc}</p>
            ))}
          </div>
          <div className={styles.forecastCards}>
            {forecast?.slice(2, 6).map((forecastDay: any, idx: number) => {
              const forecastDate = new Date(Date.now() + (idx + 2) * 86400000);
              const dateStr = forecastDate.toLocaleDateString('en-GB');
              return (
                <div key={idx} className={styles.forecastCard}>
                  <div className={styles.forecastDate}>{dateStr}</div>
                  <div className={styles.forecastReliability}>85%</div>
                  <img 
                    className={styles.forecastWeatherIcon}
                    src={getPremiumIcon(forecastDay?.weather?.[0]?.icon)} 
                    alt="weather" 
                  />
                  <div className={styles.forecastTemp}>
                    <div>min. {Math.round(forecastDay?.main?.temp_min ?? 0)}°</div>
                    <div>max. {Math.round(forecastDay?.main?.temp_max ?? 0)}°</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}