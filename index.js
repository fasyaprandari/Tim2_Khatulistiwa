// khofifah
let key = "ba98deab6ce9cd74af9735fb0625c520";
let city = "Jakarta";
let container = document.getElementById("container");

async function getWeather() {
        city = document.getElementById('city').value;
        
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
        console.log(data);
        appendsData(data)
}

getWeather();

function appendsData(data) {
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    Wheather(lat, lon);
    async function Wheather(lat, lon) {
            let daily = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=,hourly,minutely&units=metric&appid=${key}`);
            let dailyData = await daily.json();
            console.log(dailyData);
            week(dailyData);
    }


// naufal
    function week(Data) {
        document.getElementById("days").innerHTML = null;
        document.getElementById("rightOne").innerHTML = null;
        for (let i = 0; i < 7; i++) {
            if (i == 0) {
                let divRight = document.createElement("div");
                let loc = document.createElement("div");
                loc.id = "loc";
                let icon = document.createElement("i");
                icon.innerHTML = `<i id="log" class="fas fa-map-marker-alt"></i>`
                let pTag = document.createElement("p");
                pTag.innerText = data.name;
                pTag.id = "cityName";

                loc.append(icon, pTag);
                let p = document.createElement("p");
                p.innerText = `${window.moment(Data.daily[i].dt * 1000).format('ddd')}`;
                p.id = "curDay";

                let divLogo = document.createElement("div");
                let locImage = document.createElement("img");
                locImage.src = `http://openweathermap.org/img/wn/${Data.daily[i].weather[0].icon}@2x.png`
                locImage.id = "wImg";
                divLogo.append(p, locImage);

                let tempDiv = document.createElement("div");
                tempDiv.innerHTML = `<span id="temp">${data.main.temp}</span><span id="sel">&#176;C</span>`;
                tempDiv.id = "temp";

                divRight.append(loc, divLogo, tempDiv);

                document.getElementById("rightOne").append(divRight);
            }
            else {
                let div = document.createElement("div");
                let p = document.createElement("p");
                p.innerText = `${window.moment(Data.daily[i].dt * 1000).format('ddd')}`;

                let img = document.createElement("img");
                img.src = `http://openweathermap.org/img/wn/${Data.daily[i].weather[0].icon}@2x.png`
                img.setAttribute("id", "icon");

                let dayCal = document.createElement("div");
                dayCal.innerText = "Max-" + Data.daily[i].temp.max;
                dayCal.setAttribute("id", "cals");
                let nightCal = document.createElement("div");
                nightCal.setAttribute("id", "Ncals");
                nightCal.innerText = "Min-" + Data.daily[i].temp.min;

                div.append(p, img, dayCal, nightCal);

                document.querySelector("#days").append(div);
            }
        }
    }
}


// fiqri
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
    // document.querySelector("#Rightdate").innerHTML = days[day] + ', ' + date + ' ' + months[month];
}, 1000);


// finna
function nightTheme() {
    document.getElementById("right").style.backgroundImage = `url("https://wallpaper.dog/large/996706.jpg")`;
    document.getElementById("left").style.backgroundImage = `url("https://wallpaper.dog/large/996706.jpg")`;
    document.getElementById("time").style.color = "white";
    document.getElementById("date").style.color = "white";
    document.getElementById("night").style.backgroundColor = "white";
    document.getElementById("day").style.backgroundColor = "white";
    document.getElementById("days").style.backgroundColor = "#1a395c";
    document.getElementById("days").style.opacity = ".9";
    document.getElementById("rightOne").style.opacity = ".9";
    document.getElementById("rightOne").style.backgroundImage = `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYAaC6ipoTqIXe2vruft6e7IWx5pALMXoPWA&usqp=CAU")`;
    document.getElementById("Search").style.backgroundColor = "white";
    document.getElementById("Search").style.color = "#1a395c";
}

function dayTheme() {
    document.getElementById("rightOne").style.backgroundImage = `url("https://i.pinimg.com/originals/c4/f5/33/c4f533bd49a7784ccba3870590c2dfaf.jpg")`;
    document.getElementById("right").style.backgroundColor = "white";
    document.getElementById("left").style.backgroundImage = `url("https://wallpaperaccess.com/full/8108608.jpg")`;
    document.getElementById("right").style.backgroundImage = `url("https://wallpaperaccess.com/full/8108608.jpg")`;
    document.getElementById("left").style.backgroundColor = "rgb(237, 251, 253)";
    document.getElementById("time").style.color = "#1a395c";
    document.getElementById("date").style.color = "#1a395c";
    document.getElementById("night").style.backgroundColor = "white";
    document.getElementById("day").style.backgroundColor = "white";
    document.getElementById("days").style.backgroundColor = "#d6e5ec";
}
