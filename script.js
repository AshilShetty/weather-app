const apiKey = "API KEY"; // Replace with your actual WeatherAPI key


async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "Please enter a city name.";
    return;
  }

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=3`
    );
    const data = await response.json();

    if (data.error) {
      resultDiv.innerHTML = `City not found: ${city}`;
      return;
    }

    const {
      location: { name },
      current: {
        temp_c,
        humidity,
        condition: { text: conditionText, icon }
      },
      forecast: { forecastday }
    } = data;

    

    // Build forecast HTML
    let forecastHTML = "<h3>3-Day Forecast:</h3><div class='forecast-container'>";
    forecastday.forEach(day => {
      forecastHTML += `
        <div class="forecast-box">
          <p><strong>${day.date}</strong></p>
          <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" />
          <p>${day.day.condition.text}</p>
          <p>Max: ${day.day.maxtemp_c}°C</p>
          <p>Min: ${day.day.mintemp_c}°C</p>
        </div>
      `;
    });
    forecastHTML += "</div>";

    resultDiv.innerHTML = `
      <h2>${name}</h2>
      <img src="https:${icon}" alt="${conditionText}" />
      <p>Temperature: ${temp_c}°C</p>
      <p>Humidity: ${humidity}%</p>
      <p>Condition: ${conditionText}</p>
      <br />
      ${forecastHTML}
    `;
  } catch (error) {
    resultDiv.innerHTML = "Error fetching weather. Please try again.";
    console.error(error);
  }
}


