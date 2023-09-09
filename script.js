"use strict";
const iconEl = document.getElementById("icon");
const locationEl = document.getElementById("location");
const btn = document.getElementById("btn-search");
const formEL = document.getElementById("search-container");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const tempEl = document.getElementById("temp");
const placeEl = document.getElementById("place");
const climateEl = document.getElementById("climate");

//Weather Forecast API Endpoint

let find;
const init = () => {
  find = "chennai";
  weatherApi();
};
btn.addEventListener("click", (event) => {
  event.preventDefault();
  find = String(locationEl.value.trim());
  console.log(find);
  weatherApi();
});
// optional parameters:

// & forecast_days = 7
// & hourly = 1
// & interval = 3
// & units = m
// & language = en
// & callback = MY_CALLBACK

async function weatherApi() {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=922c55fcb09a4894af795239231806&q=${find}&aqi=yes`
    );
    const data = await response.json();
    console.log(data);
    console.log(data.current.condition.icon);
    iconEl.src = `${data.current.condition.icon}`;
    climateEl.innerText = `${data.current.condition.text}`;
    placeEl.innerText = `${data.location.name},${data.location.region}`;
    tempEl.innerHTML = `${data.current.temp_c}<sup><i class="fa-regular fa-circle"></i></sup> &nbsp;C`;
    humidityEl.innerText = `${data.current.humidity}`;
    windEl.innerText = `${data.current.wind_kph}`;
  } catch (error) {
    console.log(error);
    alert("Location not found");
  }
}
init();