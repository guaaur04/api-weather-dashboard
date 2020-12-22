// GIVEN a weather dashboard with form inputs

// WHEN I search for a city

// THEN I am presented with current and future conditions for that city and that city is added to the search history

// WHEN I view current weather conditions for that city

// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

// WHEN I view the UV index

// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

// WHEN I view future weather conditions for that city

// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity

// WHEN I click on a city in the search history

// THEN I am again presented with current and future conditions for that city

// WHEN I open the weather dashboard

// THEN I am presented with the last searched city forecast



//Variable to call for the current day from the Moment library 
var moment = moment().format("dddd, MMMM Do YYYY")
console.log(moment);
$(".date").text(moment);

$("#run-search").on("click", function (event) {
    event.preventDefault();

    //Storing the city input
    var city = $("#search").val().trim();
    searchCity(city);
    today(city);
});

function searchCity(city) {

    var APIKey = "f72e28de327966817541bd3ebea3ba1e";

    // Here we are building the URL we need to query the Open Weather database
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"

        .then(function (response) {

            // Log the queryURL
            console.log(queryURL);

            // Log the resulting object
            console.log(response);
            $(".city").text(response.name);

            //Here we log the latitude and longitude of the city 
            var forecast = "";
            for (let i = 0; i < response.list.length; i = i + 8) {
                forecast += `
            <div class="card" style="width: 18rem;">
            <p>${response.list[i].dt_txt}</p>
            <h6>Description :  ${response.list[i].weather[0].description}</h6>
            <h6>Temp: ${response.list[i].main.temp} <img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png" /></h6>
            <h6>Humidity : ${response.list[i].main.humidity}</h6>
            <p> Wind Speed: ${response.list[i].wind.speed}</p>
            </div>`
            }
            $("#fiveday").html(forecast)

            // Here we are creating a latitude/longitude variable to pull through the UV Index
            var lat = (response.city.coord.lat);
            var lon = (response.city.coord.lon);

            uvFunction(lat, lon);

            // var previousCity = JSON.parse(localStorage.getItem("previousCity")) || []
            // previousCity.push(city)
            // localStorage.setItem("previousCity",JSON.stringify(previousCity))

            // renderInputs()
            // localStorage.clear() // Clears localStorage

            var previousCity = JSON.parse(localStorage.getItem("previousCity")) || [];
            previousCity.push(city)
            localStorage.setItem("previousCity", JSON.stringify(previousCity))

            renderInputs()

        })
}

function renderInputs() {
    var previousCity = JSON.parse(localStorage.getItem("previousCity")) || []
    var string = ""

    for (let i = 0; i < previousCity.length; i++) {
        string += `<h6> <button> ${previousCity[i]} </button></h6>`
    }

    $("#input-history").html(string)
}

renderInputs()

function uvFunction(lat, lon) {

    //Here we run AJAX to call OpenWeather API UV index
    var APIKey = "f72e28de327966817541bd3ebea3ba1e";

    var UVqueryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIKey}`;


    $.ajax({
        url: UVqueryURL,
        method: "GET"
    })

        //We store all the retrieved data inside of an object called "response"

        .then(function (response) {

            //Log the UVqueryURL
            console.log(response);
            let uvIndex = uvFunction()
            $(".uv-index").html(`UV Index: ${response.value}`)
        })

}

//Here we create the funtion for today's weather conditions 
function today(city) {

    var APIKey = "f72e28de327966817541bd3ebea3ba1e";

    // Here we are building the URL we need to query the Open Weather database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"

        .then(function (response) {

            // Log the queryURL
            console.log(queryURL);

            // Log the resulting object
            console.log(response);

            // Transfer content to HTML
            $(".city").html(`<h1>${response.name} <img src="http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png"></h1>`);
            $(".wind-speed").text(`Wind Speed:${response.wind.speed}`);
            $(".humidity").text(`Humidity: ${response.main.humidity}`);
            $(".temperature").text(`Temperature(F):${response.main.temp}`);

           
        })
    }