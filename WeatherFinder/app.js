var api="a5141ad506c31403ab4fcaf8db9241d9";
var input=document.getElementById("cityInput");
var button=document.getElementById("btn");
var weatherInfo=document.getElementById("weather-info");
//checking if the input is empty ,if it is givinng an alert message
button.addEventListener("click",function(){
    var cityValue=input.value.trim();
    if( cityValue===""){
        alert("please enter a city name");
    }
    //else making an http request
    else{
            var httpreq = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${api}`;
            var ourRequest = new XMLHttpRequest();
            ourRequest.open('GET', httpreq);
    
            ourRequest.onload = function () {
                if (ourRequest.status === 200) {
                    var ourData = JSON.parse(ourRequest.responseText);
                    renderHTML(ourData);
                    button.classList.add("hide-me");
                } else {
                    alert("please give another city name");
                }
            };
    
            ourRequest.onerror = function () {
                alert("Network error");
            };
    
            ourRequest.send();
        }
});
//creating div to store the weather data
function renderHTML(ourData) {
    let tempcel=ourData.main.temp-273.15;
    tempcel=parseInt(tempcel);
    var weather = document.createElement("div");
    weather.innerHTML = ` <p> The Weather in ${ourData.name} is ${ourData.weather[0].description}. </p>
    <p> The temperature is ${tempcel}°C with a windspeed of ${ourData.wind.speed} m/s. </p>`;
       
    //clearing the previous weather data    
    weatherInfo.innerHTML = "";

    //adding new data 
    weatherInfo.appendChild(weather);

    
}