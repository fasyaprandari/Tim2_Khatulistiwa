key = "1f3186a01cf9592a3d1d9d2368c3f196";

let result = document.getElementById("result");
let SearchButton = document.getElementById("search-btn");
let City = document.getElementById("city");

let getWeather = () => {
  let cityname = City.value;

  if (cityname.length == 0) {
    result.innerHTML = `<h3 class="message">Please enter a city name correctly :)</h3>`;
  } else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${key}&units=metric`;

    City.value = "";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.weather[0].icon);
        console.log(data.weather[0].main);
        console.log(data.weather[0].description);
        console.log(data.name);
        console.log(data.main.temp_min);
        console.log(data.main.temp_max);

        result.innerHTML =
        `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h3>${data.main.temp}&#176;C</h3>
        <h4 class="desc">${data.weather[0].description}</h4>
        <h3>${data.name}</h3>
        <div class="temp-container">
            <div>
                <h5 class="title">Max</h5>
                <h5 class="temp">${data.main.temp_max}&#176;C</h5>
            </div>
            <div>
                <h5 class="title">Min</h5>
                <h5 class="temp">${data.main.temp_min}&#176;C</h5>
            </div>
            
        </div>`;
      })

      //pesan jika user memasukkan data typo/data yang kotanya tidak ada di server/db
      .catch(() => {
        result.innerHTML = `<h3 class="message">City not found</h3>`;
      });
  }
};

SearchButton.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);