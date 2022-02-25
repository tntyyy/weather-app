const apiKey = '33b4f48d3366c7a5b03dd00e4a2a342c';


// ip

function saveIP(resIP, letIP) {
    letIP = resIP;
    return letIP;
}

async function getIP() {
    const resp = await fetch('https://api64.ipify.org?format=json');
    const data = await resp.json();
    return await data.ip;
}

let IP = '';
let respIP = getIP().then(res => {
    IP = res;
});


// geo

async function getGeoposition() {
    const response = await fetch(`http://ipwhois.app/json/${IP}`);
    // const response = await fetch(`http://ipwhois.app/json/86.117.185.21`);

    const data = await response.json();
    return await data;
}

const city = document.querySelector('.location__text .text__title');

let latitude = 0;
let longitude = 0;



// weather

async function getWeather(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    // const response = await fetch (`https://api.openweathermap.org/data/2.5/find?q=London&appid=${apiKey}`);

    const data = await response.json();
    return await data;
}
const weatherDeg = document.querySelector('.weather__title'),
      weatherIcon = document.querySelector('.weather-icon-wrapper'),
      weatherDesc = document.querySelector('.weather__subtitle');

let currentWeather = 0;

let addCity = getGeoposition().then(res => {
    city.textContent = res.city;
    latitude = res.latitude;
    longitude = res.longitude;
}).then(() => {
    getWeather(latitude, longitude).then(data => {
        currentWeather = (data.main.temp - 273).toFixed(0);
        weatherDeg.textContent = `${currentWeather}°С`;
        weatherIcon.innerHTML = `<img src="img/${data.weather[0].main}.png" alt="weather" class="weather-icon">`;
        weatherDesc.textContent = data.weather[0].description;
    });
});

// date

const date = document.querySelector('.date__text .text__title'),
      day = document.querySelector('.date__text .text__subtitle');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturay'];

let nowDate = new Date();

date.textContent = nowDate.toLocaleDateString();
day.textContent = days[nowDate.getDay()];