//saves api info
const apiKey = "key=6d75ed911ffe4661b6a100104240907";
const baseUrl = "http://api.weatherapi.com/v1/current.json?";

//saves Dom Items To Variables
const where = document.getElementById("where");
const temp = document.getElementById("temp");
const weatherIcon = document.getElementById("weatherIcon");
const input = document.getElementById("navsearch");
const weatherStatus = document.getElementById("weatherStatus");
const dateTime = document.getElementById("dateTime");
const uv = document.getElementById("uv");
const visibility = document.getElementById("visibility");
const precip = document.getElementById("precip");
const feelsLike = document.getElementById("feelsLike");

function loadLocation() {
  fetch(`${baseUrl}${apiKey}&q=${userlocation}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      where.innerText = data.location.name;
      temp.innerText = `${Math.floor(data.current.temp_c)}°C`;
      weatherIcon.setAttribute("src", data.current.condition.icon);
      weatherIcon.style.cssText = "visibility:visible;";
      dateTime.innerText = data.location.localtime;
      weatherStatus.innerText = data.current.condition.text;
      uv.innerText = `UV: ${data.current.uv}`;
      visibility.innerText = `Visibility: ${data.current.vis_km}km`;
      precip.innerText = `precipitation: ${data.current.precip_mm}mm`;
      feelsLike.innerText = `Feels Like: ${data.current.feelslike_c}°c`;
      input.value = "";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let searchQuery = `&q=${input.value}`;

    fetch(`${baseUrl}${apiKey}${searchQuery}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        where.innerText = data.location.name;
        temp.innerText = `${Math.floor(data.current.temp_c)}°C`;
        weatherIcon.setAttribute("src", data.current.condition.icon);
        weatherIcon.style.cssText = "visibility:visible;";
        dateTime.innerText = data.location.localtime;
        weatherStatus.innerText = data.current.condition.text;
        uv.innerText = `UV: ${data.current.uv}`;
        visibility.innerText = `Visibility: ${data.current.vis_km}km`;
        precip.innerText = `precipitation: ${data.current.precip_mm}mm`;
        feelsLike.innerText = `Feels Like: ${data.current.feelslike_c}°c`;
        input.value = "";
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("This is not a valid location.");
      });
  }
});

let userlocation;
function getUserLocation(load_loadLocation) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        userlocation = `${latitude},${longitude}`;
        resolve(userlocation);
        load_loadLocation();
      },
      (error) => {
        reject(error.message);
        alert("Please Enter Location Manually");
      }
    );
  });
}

getUserLocation(loadLocation);
