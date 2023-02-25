const apiKey = "b66909ba55d29d1517293e867b91ac6c";
const apiCountryURL = "https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityTitle = document.querySelector("#city");
const cityTemp = document.querySelector("#temperature span");
const cityDesc = document.querySelector("#description");
const cityIcon = document.querySelector("#weather-icon");
const countryIMG = document.querySelector("#country");
const cityHumidity = document.querySelector("#humidity span");
const cityWind = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");

    // FUNCTIONS

// Loader da página
const toggleLoader = () => {
  loader.classList.toggle("hide");
};
// pegando os dados da API
const getWeatherData = async (city) => {
  toggleLoader();

  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  toggleLoader();

  return data;
};

// tratamento de erro
const showErrorMessage = () => {
  errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
  errorMessageContainer.classList.add("hide");
  weatherContainer.classList.add("hide");

  suggestionContainer.classList.add("hide");
};

const showWeatherData = async (city) => {
  hideInformation();

  const data = await getWeatherData(city);

  if (data.cod === "404") {
    showErrorMessage();
    return;
  }

  cityTitle.innerText = data.name;
  cityTemp.innerText = parseInt(data.main.temp);
  cityDesc.innerText = data.weather[0].description;
  cityIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  countryIMG.setAttribute("src", apiCountryURL + data.sys.country);
  cityHumidity.innerText = `${data.main.humidity}%`;
  cityWind.innerText = `${data.wind.speed}km/h`;

  // Mudar o background de acordo com a cidade
  document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

  weatherContainer.classList.remove("hide");
};

    // EVENTS
    
searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const city = cityInput.value;

  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;

    showWeatherData(city);
  }
});

// Sugestões de teste
suggestionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const city = btn.getAttribute("id");

    showWeatherData(city);
  });
});