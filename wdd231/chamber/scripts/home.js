// Chamber Home Page JS
// Weather API and Spotlights

// --- WEATHER ---
const weatherCurrent = document.getElementById('weather-current');
const weatherForecast = document.getElementById('weather-forecast');
const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your API key
const city = 'Kingman';
const state = 'AZ';

async function fetchWeather() {
  try {
    // Current weather
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},US&units=imperial&appid=${apiKey}`;
    const currentRes = await fetch(currentUrl);
    const currentData = await currentRes.json();
    weatherCurrent.innerHTML = `<strong>${currentData.weather[0].main}</strong>: ${currentData.weather[0].description}<br>Temp: ${Math.round(currentData.main.temp)}°F`;

    // 3-day forecast
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${state},US&units=imperial&appid=${apiKey}`;
    const forecastRes = await fetch(forecastUrl);
    const forecastData = await forecastRes.json();
    let days = {};
    forecastData.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!days[date] && Object.keys(days).length < 3) {
        days[date] = item;
      }
    });
    weatherForecast.innerHTML = Object.entries(days).map(([date, item]) => {
      return `<div><strong>${date}</strong>: ${item.weather[0].description}, ${Math.round(item.main.temp)}°F</div>`;
    }).join('');
  } catch (e) {
    weatherCurrent.textContent = 'Unable to load weather.';
    weatherForecast.textContent = '';
  }
}

// --- SPOTLIGHTS ---
async function fetchSpotlights() {
  const res = await fetch('data/members.json');
  const members = await res.json();
  const goldSilver = members.filter(m => m.membership === 'Gold' || m.membership === 'Silver');
  // Randomly select 2 or 3
  const count = Math.floor(Math.random() * 2) + 2;
  const spotlights = [];
  while (spotlights.length < count && goldSilver.length) {
    const idx = Math.floor(Math.random() * goldSilver.length);
    spotlights.push(goldSilver.splice(idx, 1)[0]);
  }
  const spotlightsDiv = document.getElementById('spotlights');
  spotlightsDiv.innerHTML = spotlights.map(m => `
    <div class="course-card ${m.membership.toLowerCase()}">
      <img src="images/${m.image}" alt="${m.name} logo">
      <h3>${m.name}</h3>
      <p><strong>Phone:</strong> ${m.phone}</p>
      <p><strong>Address:</strong> ${m.address}</p>
      <a href="${m.website}" target="_blank">Visit Website</a>
      <span>${m.membership} Member</span>
    </div>
  `).join('');
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
  fetchWeather();
  fetchSpotlights();
});
