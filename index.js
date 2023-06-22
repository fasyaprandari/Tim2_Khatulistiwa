let key = "ba98deab6ce9cd74af9735fb0625c520";
let city = "Jakarta";
let container = document.getElementById("container");
let isChanged = false;

async function getWeather() {
  city = document.getElementById('city').value;
  if (!isChanged) {
    city = "Jakarta";
  }

  isChanged = true;
  if (city === "") {
    alert("Please enter a valid city name.");
    return;
  }

  let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);

  if (res.status !== 200) {
    alert("City not found. Please enter a valid city name.");
    return;
  }

  let data = await res.json();
  appendsData(data);
}

getWeather();

function appendsData(data) {
  let lat = data.coord.lat;
  let lon = data.coord.lon;
  Wheather(lat, lon);

  async function Wheather(lat, lon) {
    let daily = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=,hourly,minutely&units=metric&appid=${key}`);
    let dailyData = await daily.json();
    week(dailyData);
  }

  function week(Data) {
    document.getElementById("days").innerHTML = null;
    document.getElementById("rightOne").innerHTML = null;
    for (let i = 0; i < 7; i++) {
      if (i == 0) {
        let divRight = document.createElement("div");
        let loc = document.createElement("div");
        loc.id = "loc";
        let icon = document.createElement("i");
        icon.innerHTML = `<i id="log" class="fas fa-map-marker-alt"></i>`;
        let pTag = document.createElement("p");
        pTag.innerText = data.name;
        pTag.id = "cityName";

        loc.append(icon, pTag);
        let p = document.createElement("p");
        p.innerText = `${window.moment(Data.daily[i].dt * 1000).format('ddd')}`;
        p.id = "curDay";

        let divLogo = document.createElement("div");
        let locImage = document.createElement("img");
        locImage.src = `http://openweathermap.org/img/wn/${Data.daily[i].weather[0].icon}@2x.png`;
        locImage.id = "wImg";
        divLogo.append(p, locImage);

        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = `<span id="temp">${Math.round(data.main.temp)}</span><span id="sel">&#176;C</span>`;
        tempDiv.id = "temp";

        divRight.append(loc, divLogo, tempDiv);

        document.getElementById("rightOne").append(divRight);
      } else {
        let div = document.createElement("div");
        let p = document.createElement("p");
        p.innerText = `${window.moment(Data.daily[i].dt * 1000).format('ddd')}`;

        let img = document.createElement("img");
        img.src = `http://openweathermap.org/img/wn/${Data.daily[i].weather[0].icon}@2x.png`;
        img.setAttribute("id", "icon");

        let dayCal = document.createElement("div");
        dayCal.innerText = "Max " + Math.round(Data.daily[i].temp.max) + "°C";
        dayCal.setAttribute("id", "cals");
        let nightCal = document.createElement("div");
        nightCal.setAttribute("id", "Ncals");
        nightCal.innerText = "Min " + Math.round(Data.daily[i].temp.min) + "°C";

        div.append(p, img, dayCal, nightCal);

        document.querySelector("#days").append(div);
      }
    }
  }
}

function getWeatherLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;

        fetch(weatherUrl)
          .then(response => response.json())
          .then(data => {
            appendsData(data);  
          })
          .catch(error => {
            console.log('Error:', error);
          });
      },
      function (error) {
        console.log('Error:', error);
      }
    );
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}

const weatherButton = document.querySelector('#weather-button');
weatherButton.addEventListener('click', getWeatherLocation);

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

setInterval(function () {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrsFormat = hour >= 13 ? hour % 12 : hour;
  const minutes = time.getMinutes();
  const ampm = hour >= 12 ? 'PM' : 'AM';

  console.log(hoursIn12HrsFormat);
  document.querySelector("#time").innerHTML = (hoursIn12HrsFormat < 10 ? '0' + hoursIn12HrsFormat : hoursIn12HrsFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + `<span id="ampm">${ampm}</span>`;

  document.querySelector("#date").innerHTML = days[day] + ', ' + date + ' ' + months[month];
}, 1000);

function nightTheme() {
  document.getElementById("container").style.backgroundImage = "linear-gradient(360deg, rgba(147, 176, 171, 1) 0%, rgba(13, 37, 59, 1) 54%, rgba(0, 2, 13, 1) 100%)";
  document.getElementById("time").style.color = "white";
  document.getElementById("date").style.color = "white";
  document.getElementById("loc").style.color = "white";
  document.getElementById("temp").style.color = "white";
  document.getElementById("cityName").style.color = "white";
  document.getElementById("curDay").style.color = "white";
  document.getElementById("days").style.opacity = ".9";
  document.getElementById("rightOne").style.opacity = ".9";
  document.getElementById("rightOne").style.backgroundImage = "linear-gradient(360deg, rgba(147, 176, 171, 1) 0%, rgba(13, 37, 59, 1) 54%, rgba(0, 2, 13, 1) 100%)";
  document.getElementById("Search").style.backgroundColor = "white";
  document.getElementById("Search").style.color = "#1a395c";
  document.getElementById("night").style.backgroundColor = "#1a395c";
  document.getElementById("night").style.color = "white";
  document.getElementById("day").style.backgroundColor = "white";
  document.getElementById("day").style.color = "#1a395c";
}

function dayTheme() {
  document.getElementById("container").style.backgroundImage = "linear-gradient(109.6deg, rgb(120, 212, 234) 11.2%, rgb(216, 226, 253) 72.1%)";
  document.getElementById("rightOne").style.backgroundImage = "linear-gradient(109.6deg, rgb(120, 212, 234) 11.2%, rgb(216, 226, 253) 72.1%)";
  document.getElementById("time").style.color = "#1a395c";
  document.getElementById("date").style.color = "#1a395c";
  document.getElementById("loc").style.color = "#1a395c";
  document.getElementById("temp").style.color = "#1a395c";
  document.getElementById("cityName").style.color = "#1a395c";
  document.getElementById("curDay").style.color = "#1a395c";
  document.getElementById("days").style.opacity = ".9";
  document.getElementById("rightOne").style.opacity = ".9";
  document.getElementById("day").style.backgroundColor = "#1a395c";
  document.getElementById("day").style.color = "white";
  document.getElementById("night").style.backgroundColor = "white";
  document.getElementById("night").style.color = "#1a395c";
}

const time = new Date();
const hour = time.getHours();

if (hour >= 6 && hour < 18) {
  dayTheme();
} else {
  nightTheme();
}