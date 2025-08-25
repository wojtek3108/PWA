const input = document.querySelector('input');
const button = document.querySelector('button');
const errorMsg = document.querySelector('p.error_message');
const cityName = document.querySelector('h2.city_name');
const weatherImg = document.querySelector('img.weather_img');
const temp = document.querySelector('p.temp');
const description = document.querySelector('p.description');
const feelslike = document.querySelector('span.feels_like');
const pressure = document.querySelector('span.pressure');
const humidity = document.querySelector('span.humidity');
const windSpeed = document.querySelector('span.wind_speed');
const clouds = document.querySelector('span.clouds');
const visibility = document.querySelector('span.visibility');
const pollutionImg = document.querySelector('span.pollution_img');
const pollutionValue = document.querySelector('span.pollution_value');

const apiInfo = {
    link: 'https://api.openweathermap.org/data/2.5/weather?q=',
    key: '&appid=e1fdda468c71aa44fa758ce198027754',
    units: '&units=metric',
    lang: '&lang=pl'
}

function getWeatherInfo() {
    const apiInfoCity = input.value;
    const URL = `${apiInfo.link}${apiInfoCity}${apiInfo.key}${apiInfo.units}${apiInfo.lang}`;
    console.log(URL);
    //console.log(URL);

    axios.get(URL).then((response) => {
        console.log(response.data);

        cityName.textContent = `${response.data.name}, ${response.data.sys.country}`;
        weatherImg.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
        temp.textContent = `${Math.round(response.data.main.temp)} ℃`;
        description.textContent = `${response.data.weather[0].description}`;
        feelslike.textContent = `${Math.round(response.data.main.feels_like)} ℃`;
        pressure.textContent = `${response.data.main.pressure} hPa`;
        humidity.textContent = `${response.data.main.humidity} %`;
        visibility.textContent = `${response.data.visibility / 1000} km`;
        clouds.textContent = `${response.data.clouds.all} %`;
        windSpeed.textContent = `${Math.round(response.data.wind.speed * 3.6)} km/h`;
        errorMsg.textContent = "";

        const url_pollution = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${response.data.coord.lat}&
        lon=${response.data.coord.lon}${apiInfo.key}`;
        axios.get(url_pollution).then((res) => {
            console.log(res.data);
            pollutionValue.textContent = `${res.data.list[0].components.pm2_5}`;
        })

    }).catch((error) => {
        errorMsg.textContent = `${error.response.data.message}`;
        [cityName, temp, description, feelslike, pressure, humidity, visibility, clouds, windSpeed].forEach(el => {
            el.textContent = '';
        })
        weatherImg.src = '';

    }).finally(() => {
        input.value = '';
    })

}

function getWeatherInfoByEnter(e) {
    if (e.key == 'Enter') {
        getWeatherInfo();
    }
}

button.addEventListener('click', getWeatherInfo);
input.addEventListener('keypress', getWeatherInfoByEnter);

// przycisk zmiany sekcji
const navButtons = document.querySelectorAll('.nav-btn');
const contentSections = document.querySelectorAll('.content-section');

for(let i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener('click', function() {
        for(let j = 0; j < navButtons.length; j++) {
            navButtons[j].classList.remove('active');
        }
        this.classList.add('active');
        
        for(let k = 0; k < contentSections.length; k++) {
            contentSections[k].classList.remove('active');
        }
        
        let sekcja = this.getAttribute('data-section');
        let pokazSekcje = document.getElementById(sekcja + '-section');
        if (pokazSekcje) {
            pokazSekcje.classList.add('active');
        }
    });
}

// formularz
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

function sprawdzEmail(email) {
    var wzor = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return wzor.test(email);
}

function sprawdzNazwe(nazwa) {
    if(nazwa.length >= 3) {
        return true;
    }
    return false;
}

function sprawdzHaslo(haslo) {
    if(haslo.length >= 6) {
        return true;
    }
    return false;
}

// sprawdzanie formularza
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        var czyDobry = true;
        var bledy = document.querySelectorAll('.error-msg');
        
        for(var i = 0; i < bledy.length; i++) {
            bledy[i].textContent = '';
        }
        
        if (sprawdzNazwe(usernameInput.value) == false) {
            document.getElementById('username-error').textContent = 'Nazwa uzytkownika musi miec min. 3 znaki';
            czyDobry = false;
        }
        
        if (sprawdzEmail(emailInput.value) == false) {
            document.getElementById('email-error').textContent = 'Podaj prawidlowy adres email';
            czyDobry = false;
        }
        
        if (sprawdzHaslo(passwordInput.value) == false) {
            document.getElementById('password-error').textContent = 'Haslo musi miec min. 6 znakow';
            czyDobry = false;
        }
        
        if (passwordInput.value != confirmPasswordInput.value) {
            document.getElementById('confirm-error').textContent = 'Hasla nie sa takie same';
            czyDobry = false;
        }
        
        if (czyDobry == true) {
            var daneUzytkownika = new Object();
            daneUzytkownika.username = usernameInput.value;
            daneUzytkownika.email = emailInput.value;
            
            localStorage.setItem('userData', JSON.stringify(daneUzytkownika));
            alert('Rejestracja udana!');
            loginForm.reset();
        }
    });
}


// zmiana tytulu
const titles = [
    "aplikacja pogodowa",
    "Wojciech Lisiecki",
    "79995"
];

let currentTitleIndex = 0;

function changeTitleAnimation() {
    document.title = titles[currentTitleIndex];
    currentTitleIndex = (currentTitleIndex + 1) % titles.length;
}

document.addEventListener('DOMContentLoaded', () => {
    setInterval(changeTitleAnimation, 2000);
});