document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=aaa6b71d732e6dd2c5da5cdf4f99d451";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      results += "<h1 class = 'cityWeather'><strong>Weather in " + json.name + "</strong></h1>";
      for (let i=0; i < json.weather.length; i++) {
	       results += '<img class = "weatherPic" src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h2>Current Temperature: ' + Math.trunc(json.main.temp) + " &deg;F</h2>"
      results += '<h3>Feels Like: ' + Math.trunc(json.main.feels_like) + " &deg;F</h3>"
      results += '<p>Humidity: ' + Math.trunc(json.main.humidity) + "%</p>"
      results += '<p>Wind Speed: ' + Math.trunc(json.wind.speed) + " mph</p>"
      results += "<p>"
      for (let i=0; i < json.weather.length; i++) {
	       results += 'Weather is ' + json.weather[i].description + ' currently. The high today will be ' + Math.trunc(json.main.temp_max) + '&deg, and the low will be ' + Math.trunc(json.main.temp_min) + '&deg.';
	       if (i !== json.weather.length - 1)
	  results += ", "
      }
      results += "</p>";
      document.getElementById("weatherResults").innerHTML = results;
    });
  const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=aaa6b71d732e6dd2c5da5cdf4f99d451";
  fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let forecast = "";
      for (let i=0; i < json.list.length; i++) {
        forecast += "<div class = 'forecastItem'>"
	       forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
	        forecast += "<p>Temperature: " + Math.trunc(json.list[i].main.temp) + "&deg</p>";
          forecast += '<p>Humidity: ' + Math.trunc(json.list[i].main.humidity) + "%</p>"
          forecast += '<p>Wind Speed: ' + Math.trunc(json.list[i].wind.speed) + " mph</p>"
	        forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
          forecast += "</div>"
      }
      document.getElementById("forecastResults").innerHTML = forecast;
    });
});
