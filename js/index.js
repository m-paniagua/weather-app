// get lat and long
var API_KEY = '271d38ae6cbd9ace72d6432471f794fd';
var celcius = false;
var weather;
var zip;

function displayTemp(temp, c) {
  if(c) {
    return Math.round((temp - 32) * (5/9)) + " C";
  }
  else {
    return Math.round(temp) + " F";
  }
}

function render(weather, celcius) {
  var currLoc = weather.name;
  var currWthr = weather.weather[0].description;
  var currentTemp = displayTemp(weather.main.temp, celcius);
  var high = displayTemp(weather.main.temp_max, celcius);
  var low = displayTemp(weather.main.temp_min, celcius);
  var icon = weather.weather[0].icon;

  $("#header").text('Local Weather For ' + currLoc);
  $('#current').text('Condition: ' + currWthr);
  $('#currTemp').text('Current: ' + currentTemp);
  $('#highLow').text('High/Low: ' + high + '/' + low);
  // $('#high').text('Low: ' + low);

  var url = 'http://openweathermap.org/img/w/' + icon + '.png';
  $('#image').html('<img src="' + url + '">'); 
}

function getWeather() {
    // set color
    setColor();
    // get zip code
    $.getJSON('https://ipinfo.io/', function(data){
      zip = data.postal;
       // console.log(zip);
      
        // get current weather
        $.getJSON('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',us&units=imperial&appid=' + API_KEY, function(data) {
        weather = data;
        
        render(weather, celcius);
        
          $('#toggle').on('click', function() {
            celcius = !celcius;
            render(weather, celcius);
          });
      })
    })
  }

function setColor() {
    var currentTime = new Date().getHours();
    if(currentTime >= 6 && currentTime <= 12) {
//        $('#weather').css("background-color", '#ffdb00');
        $('body').css("background-color", "#e8817f");
    }
    else if (currentTime > 12 && currentTime <= 5) {
        $('body').css("background-color", "#c3727c");  
//        $('#weather').css("background-color", "red");
    }
    else if (currentTime > 5 && currentTime <= 8) {
        $('body').css("background-color", "#8d5273");
//        $('#weather').css("background-color", "red");
    }
    else {
        $('body').css("background-color", "#5a336e");
//        $('#weather').css("background-color", "red");
    }
}

$(function() {
  
  getWeather();
});