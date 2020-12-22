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
});

function searchCity(city){

    var APIKey = "f72e28de327966817541bd3ebea3ba1e";

    // Here we are building the URL we need to query the Open Weather database
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

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

            // Transfer content to HTML
             $(".city").html("<h1>" + response.city.name + " Weather Details</h1>"+ "<i>" +response.list[0].weather[0].icon + "</i>");
             $(".wind-speed").text("Wind Speed: " + response.list[0].wind.speed);
             $(".humidity").text("Humidity: " + response.list[0].main.humidity);

             var tempF= (response.list[0].main.temp - 273.15) * 1.80 + 32;

             $(".temperature").text("Temperature(F):" + tempF.toFixed(2));

             $(".uv-index").text("Lat Test"+ response.city.coord.lat);

            // Here we are creating a latitude/longitude variable to pull through the UV Index
             var lat = (response.city.coord.lat);
             var lon = (response.city.coord.lon);

             // card containers

            //  var forecastDate=$("<h5>").text
            //  var futureTemp=$("<")
            //  var futureHumidity=$(".future-humidity")

            // $(".card").append(forecastDate,futureTemp,futureHumidity);
           
        })

        //Here we save user input to local storage and retrieve/display on refresh

        // window.localStorage
        // location.setItem("","");

}

 //Here we run AJAX to call OpenWeather API UV index
 var APIKey = "f72e28de327966817541bd3ebea3ba1e";

 var UVqueryURL ="http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}" + "&appid=" + APIKey;


 $.ajax({
     url: UVqueryURL,
     method: "GET"
 })

     //We store all the retrieved data inside of an object called "response"

     .then(function(response){

         //Log the UVqueryURL
         console.log(UVqueryURL);


     })


