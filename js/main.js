// add your API key inside the quotes on line 5
// add the latitude and longitude for your location one lines 6 and 7
// move on to adding your data requests on line 22
function weatherBalloon() {
  var key = '43dab0cca2b7a0399e67de91eece0340';
  var lat = '42.5195';
  var lon = '-70.8967';
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + key)  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    drawWeather(data);
    console.log(data);
  })
  .catch(function() {
    // catch any errors
  });
}

$('button').click(function(){$('.home').addClass('open-sesame');})

$('.current_weather').click(function(){$('.home').removeClass('open-sesame');})

// display weather information
function drawWeather( d ) {

$('.current_temp h1').html( convertTemp(d.current.temp) );
$('.detail .moon').html( printMoonGraphic(d.daily[0].moon_phase));
$('.detail .extra .c_high p').html( convertTemp(d.daily[0].temp.max) + '&deg;');
$('.detail .extra .c_low p').html( convertTemp(d.daily[0].temp.min) + '&deg;');
$('.detail .extra .c_sunrise p').html( convertTime(d.current.sunrise) + '<span> am</span>' );
$('.detail .extra .c_sunset p').html( convertTime(d.current.sunset) + '<span> pm</span>');
$('.detail .extra .c_humidity p').html((d.current.humidity) + '%' );
$('.detail .extra .c_precipitation p').html( convertPop(d.daily[0].pop) + '%');

$('._6day .day1 h3').html( displayDay(1));
$('._6day .day1 .icon').html( printGraphic(d.daily[1].weather[0].description));
$('._6day .day1 h4').html( convertTemp(d.daily[1].temp.max));
$('._6day .day1 h5').html( convertTemp(d.daily[1].temp.min));

$('._6day .day2 h3').html( displayDay(2));
$('._6day .day2 .icon').html( printGraphic(d.daily[2].weather[0].description));
$('._6day .day2 h4').html( convertTemp(d.daily[2].temp.max));
$('._6day .day2 h5').html( convertTemp(d.daily[2].temp.min));

$('._6day .day3 h3').html( displayDay(3));
$('._6day .day3 .icon').html( printGraphic(d.daily[3].weather[0].description));
$('._6day .day3 h4').html( convertTemp(d.daily[3].temp.max));
$('._6day .day3 h5').html( convertTemp(d.daily[3].temp.min));


$('._6day .day4 h3').html( displayDay(4));
$('._6day .day4 .icon').html( printGraphic(d.daily[4].weather[0].description));
$('._6day .day4 h4').html( convertTemp(d.daily[4].temp.max));
$('._6day .day4 h5').html( convertTemp(d.daily[4].temp.min));


$('._6day .day5 h3').html( displayDay(5));
$('._6day .day5 .icon').html( printGraphic(d.daily[5].weather[0].description));
$('._6day .day5 h4').html( convertTemp(d.daily[5].temp.max));
$('._6day .day5 h5').html( convertTemp(d.daily[5].temp.min));


$('._6day .day6 h3').html( displayDay(6));
$('._6day .day6 .icon').html( printGraphic(d.daily[6].weather[0].description));
$('._6day .day6 h4').html( convertTemp(d.daily[6].temp.max));
$('._6day .day6 h5').html( convertTemp(d.daily[6].temp.min));

changeTheme( d.current.weather[0].description );

}


/* -----------------------------------------------
   Function for converting temp to fahrenheit
   ----------------------------------------------- */

function convertTemp(t){

  return Math.round(((parseFloat(t)-273.15)*1.8)+32);

}

function convertPop(t){

  return t * 100;
}


/* -------------------------------------------------------
   Function for printing weather-specific class on body
   ------------------------------------------------------- */

function changeTheme(d){
  
  // if the description includes the word "rain"
  if( d.indexOf('rain') > 0 ) {
    $('body').addClass('rainy');

  // if the description includes the word "cloud"
  } else if( d.indexOf('cloud') > 0 ) {
    $('body').addClass('cloudy');

  // if the description includes the word "sunny"  
  } else if( d.indexOf('sunny') > 0 ) {
    $('body').addClass('sunny');

  } else if( d.indexOf('snow') > 0 ) {
    $('body').addClass('snow');

  // if none of those cases are true, assume it's clear
  } else {
    $('body').addClass('clear');
  }

}

/* -----------------------------------------------
   Function for printing weather-specific graphic
   ----------------------------------------------- */

function printGraphic(d){
  
  // if the description includes the word "rain"
  if( d.indexOf('rain') > 0 ) {
    return '<img src="img/svg/Cloud.svg" alt="Cloud icon">';
  
  // if the description includes the word "cloud"
  } else if( d.indexOf('cloud') > 0 ) {
    return '<img src="img/svg/Cloud-Rain.svg" alt="Cloud icon">';
  
  // if the description includes the word "sunny"
  } else if( d.indexOf('sunny') > 0 ) {
    return '<img src="img/svg/Sun.svg" alt="Cloud icon">';
  
  // if none of those cases are true, assume it's clear
  } else {
    return '<img src="img/svg/Sun.svg" alt="Cloud icon">';
  }

}

function printMoonGraphic(d){
  
  // .5 is a full moon
  if( d == .5 ) {
    return '<img src="img/svg/Moon-Full.svg" alt="Moon icon">';
  
  // .25 is a new moon
  } else if( d == .25 ) {
    return '<img src="img/svg/Moon-New.svg" alt="Moon icon">';
  
  // .75 is a last quarter moon
  } else if( d == .75 ) {
    return '<img src="img/svg/Moon-Last-Quarter.svg" alt="Moon icon">';

  // less than .25 is a waxing crescent moon
  } else if( d < .25 ) {
    return '<img src="img/svg/Moon-Waxing-Crescent.svg" alt="Moon icon">';

  // greater than .25 but less than .5 is a waxing gibbous moon
  } else if( d > .25 || d < .5 ) {
    return '<img src="img/svg/Moon-Waxing-Gibbous.svg" alt="Moon icon">';

  // greater than .5 but less than .75 is a waning gibbous moon
  } else if( d > .5 || d < .75 ) {
    return '<img src="img/svg/Moon-Waning-Gibbous.svg" alt="Moon icon">';

  // greater than .75 but less than 1 is a waning crescent moon
  } else if( d > .75 || d < 1 ) {
    return '<img src="img/svg/Moon-Waning-Crescent.svg" alt="Moon icon">';
  
  }

}

/* -----------------------------------------------
   Function for converting time to hours/minutes
   ----------------------------------------------- */

function convertTime(t){

  var unixTimestamp = t;
  // since javascript works in milliseconds, you should convert 
  // the time into milliseconds by multiplying it by 1000.
  var date = new Date(unixTimestamp * 1000);
  // hours part from the timestamp (extra code needed to convert from military)
  var hours = (date.getHours() + 24) % 12 || 12;;
  // minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // seconds part from the timestamp
  var seconds = "0" + date.getSeconds();
  // will display time in 11:10 format
  var formatTime = hours + ':' + minutes.substr(-2);
  // send formatted date back
  return formatTime;

}


/* -----------------------------------------------
   Function for creating day of the week
   ----------------------------------------------- */

// based on a system where 0 = today, 1 = tomorrow, etc.
// note: the number system below does not immediately correlate
// for example, 0 for today does not line up with 0 for Sunday below

// how this works – in the return statement, d.getDay() gets today's date
// as a number (if today is Thursday, d.getDay() will be 4)
// adding "n" to this number gives you how many days from today.
// n is passed as an argument to the displayDay() function
// in the main body of the code above.
// if today is Thursday, the 4th day of the week,
// and the number 2 is passed as an argument, 
// the function will return the number 6. 6 maps to Saturday in the 
// weekday array below.

function displayDay(n){

  var d = new Date();
  var weekday = new Array();

  weekday[0] = "SUN";
  weekday[1] = "MON";
  weekday[2] = "TUE";
  weekday[3] = "WED";
  weekday[4] = "THU";
  weekday[5] = "FRI";
  weekday[6] = "SAT";

  var dispDay = d.getDay() + n;

  // adjust number system for numbers over 6
  // subtract 7 from totals higher than 6
  // to keep the day numbers in the array range above
  if(dispDay > 6){
    dispDay = dispDay - 7;
  }

  return weekday[ dispDay ];

}

/* --------------------------------------------------
   Event to get weather information when page loads
   -------------------------------------------------- */

window.onload = function() {
  weatherBalloon();
}
