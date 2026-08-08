const API_KEY = "51831c57c720ab1896b0fdb66dadcf7f";

const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");
const weatherInfo = document.getElementById("weather-info");

async function getWeather() {
    const city = searchBox.value;

    if (city === "") {
        alert("市区町村名を入力してください")
        return;
    }



    const url = (
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ja`
    );


    const response = await fetch(url);
    if (!response.ok) {
        alert("天気情報の取得に失敗しました。再度時間をおいてお試しください。")
        return;
    }
    const data = await response.json();
    console.log(data);

    const weather = data.weather[0].main;

    const weatherIcon = document.getElementById("weather-icon");
    const weatherText = document.getElementById("weather-text");

    if (weather === "Clear") {
        weatherIcon.className = "bi bi-sun";
    } else if (weather === "Clouds") {
        weatherIcon.className = "bi bi-cloud";
    } else if (weather === "Rain") {
        weatherIcon.className = "bi bi-cloud-rain";
    } else if (weather === "Drizzle") {
        weatherIcon.className = "bi bi-cloud-drizzle";
    } else if (weather === "Thunderstorm") {
        weatherIcon.className = "bi bi-cloud-lightning-rain";
    } else if (weather === "Snow") {
        weatherIcon.className = "bi bi-snow";
    } else if (weather === "Mist") {
        weatherIcon.className = "bi bi-cloud-fog";
    }

    weatherInfo.style.display = "block";

    //都市名
    document.getElementById("city-name").innerHTML = `<i class="bi bi-geo-alt-fill"></i> ${data.name}`;

    // 天気
    weatherText.textContent = data.weather[0].description;

    // 気温
    document.getElementById("temperature").innerHTML =
        `<i class="bi bi-thermometer"></i> ${data.main.temp}℃`;

    // 湿度
    document.getElementById("humidity").innerHTML =
        `<i class="bi bi-droplet"></i> ${data.main.humidity}%`;

    // 風速
    document.getElementById("wind-speed").innerHTML =
        `<i class="bi bi-wind"></i> ${data.wind.speed} m/s`;
}

searchButton.addEventListener("click", getWeather);