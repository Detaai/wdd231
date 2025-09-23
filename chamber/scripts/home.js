// Chamber Home Page JS
// Weather API and Spotlights


// --- WEATHER (Open-Meteo, no API key needed) ---
const weatherCurrent = document.getElementById('weather-current');
const weatherForecast = document.getElementById('weather-forecast');

async function fetchWeather() {
  try {
    // Kingman, AZ coordinates
    const lat = 35.1894;
    const lon = -114.053;
    // Fetch current and next 3 days hourly temperature
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,weathercode&forecast_days=3&temperature_unit=fahrenheit&timezone=auto`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Weather fetch failed');
    const data = await res.json();
    // Current weather
    if (data.current_weather) {
      weatherCurrent.innerHTML = `<strong>${Math.round(data.current_weather.temperature)}°F</strong> &mdash; ${weatherDescription(data.current_weather.weathercode)}`;
    } else {
      weatherCurrent.textContent = 'No current weather data.';
    }
    // 3-day forecast (show daily high/low)
    if (data.hourly && data.hourly.time && data.hourly.temperature_2m) {
      const forecastHTML = buildForecast(data.hourly);
      weatherForecast.innerHTML = forecastHTML;
    } else {
      weatherForecast.textContent = 'No forecast data.';
    }
  } catch (e) {
    weatherCurrent.textContent = 'Unable to load weather.';
    weatherForecast.textContent = '';
  }
}

// Helper: Map Open-Meteo weather codes to description
function weatherDescription(code) {
  const map = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Fog', 48: 'Depositing rime fog',
    51: 'Light drizzle', 53: 'Drizzle', 55: 'Dense drizzle',
    56: 'Freezing drizzle', 57: 'Dense freezing drizzle',
    61: 'Slight rain', 63: 'Rain', 65: 'Heavy rain',
    66: 'Freezing rain', 67: 'Heavy freezing rain',
    71: 'Slight snow', 73: 'Snow', 75: 'Heavy snow',
    77: 'Snow grains', 80: 'Slight rain showers', 81: 'Rain showers', 82: 'Violent rain showers',
    85: 'Slight snow showers', 86: 'Heavy snow showers',
    95: 'Thunderstorm', 96: 'Thunderstorm w/ hail', 99: 'Thunderstorm w/ heavy hail'
  };
  return map[code] || 'Unknown';
}

// Helper: Build 3-day forecast HTML
function buildForecast(hourly) {
  const { time, temperature_2m } = hourly;
  const days = {};
  for (let i = 0; i < time.length; i++) {
    const date = time[i].split('T')[0];
    if (!days[date]) days[date] = [];
    days[date].push(temperature_2m[i]);
  }
  // Only show next 3 days
  const dates = Object.keys(days).slice(0, 3);
  return dates.map(date => {
    const temps = days[date];
    const min = Math.round(Math.min(...temps));
    const max = Math.round(Math.max(...temps));
    return `<div><strong>${date}</strong>: ${min}°F &ndash; ${max}°F</div>`;
  }).join('');
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
  fetchWeather();
  fetchSpotlights();
});
