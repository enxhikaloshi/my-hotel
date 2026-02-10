// lib/weather.js

export async function getWeatherData(cityName = "Bolzano") {
  const coords = {
    "Bolzano": { lat: 46.4907, lon: 11.3398 },
    "Sterzing": { lat: 46.8961, lon: 11.4322 },
    "Bruneck": { lat: 46.7949, lon: 11.9334 },
    "Brixen": { lat: 46.7162, lon: 11.6567 },
    "Meran": { lat: 46.6701, lon: 11.1594 },
    "Schlanders": { lat: 46.6282, lon: 10.7725 }
  };

  const location = coords[cityName] || coords["Bolzano"];
  
  // Marrja e të dhënave aktuale dhe parashikimit 7-ditor
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Open-Meteo request failed");
    const data = await res.json();

    // Funksion për të kthyer kodet e Open-Meteo në formatin e ikonave të tua (01d, 02d, etj.)
    const mapCode = (code) => {
      if (code === 0) return '01d'; // Clear sky
      if (code >= 1 && code <= 3) return '02d'; // Partly cloudy
      if (code >= 45 && code <= 48) return '50d'; // Fog
      if (code >= 51 && code <= 67) return '09d'; // Rain
      if (code >= 71 && code <= 77) return '13d'; // Snow
      if (code >= 80 && code <= 82) return '10d'; // Rain showers
      return '03d'; // Default clouds
    };

    // Funksion për përshkrimet tekstuale bazuar në kodin e motit
    const getWeatherDesc = (code) => {
      const descriptions = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Foggy conditions",
        48: "Depositing rime fog",
        51: "Light drizzle",
        61: "Slight rain",
        71: "Slight snow fall",
        80: "Slight rain showers",
        95: "Thunderstorm"
      };
      return descriptions[code] || "Stable weather conditions";
    };

    return {
      // TË DHËNAT PËR SOT
      today: {
        main: {
          temp: data.current.temperature_2m,
          temp_min: data.daily.temperature_2m_min[0],
          temp_max: data.daily.temperature_2m_max[0],
          humidity: data.current.relative_humidity_2m
        },
        weather: [{ 
          description: getWeatherDesc(data.current.weather_code), 
          icon: mapCode(data.current.weather_code) 
        }],
        wind: { 
          speed: data.current.wind_speed_10m, 
          deg: data.current.wind_direction_10m 
        }
      },
      // TË DHËNAT PËR NESËR (Përdoret te Tomorrow Section)
      tomorrow: {
        main: {
          temp: (data.daily.temperature_2m_max[1] + data.daily.temperature_2m_min[1]) / 2,
          temp_min: data.daily.temperature_2m_min[1],
          temp_max: data.daily.temperature_2m_max[1]
        },
        weather: [{ 
          description: getWeatherDesc(data.daily.weather_code[1]), 
          icon: mapCode(data.daily.weather_code[1]) 
        }],
        wind: { 
          speed: data.current.wind_speed_10m, // Open-Meteo daily wind kërkon fushë tjetër, përdorim current si referencë
          deg: data.current.wind_direction_10m 
        }
      },
      // LISTA E PARASHIKIMIT (Përdoret te Forecast Section)
      forecast: data.daily.time.map((date, i) => ({
        dt_txt: date,
        main: {
          temp: (data.daily.temperature_2m_max[i] + data.daily.temperature_2m_min[i]) / 2,
          temp_min: data.daily.temperature_2m_min[i],
          temp_max: data.daily.temperature_2m_max[i]
        },
        weather: [{ 
          description: getWeatherDesc(data.daily.weather_code[i]), 
          icon: mapCode(data.daily.weather_code[i]) 
        }],
        clouds: { all: data.daily.weather_code[i] > 0 ? 50 : 0 } // Thjeshtim për logjikën e reve
      }))
    };
  } catch (e) {
    console.error("Error fetching weather:", e);
    return null; 
  }
}