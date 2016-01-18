var $today,
	$forcast,
	$toolbar,
	loc;

$(document).ready(function() {
	loc = window.location.hash.replace("#", "");

	if (!loc) {
		loc = window.prompt("Enter Your Location", "Baltimore, MD");
		window.location.hash = loc;
	}

	$today    = $(".js-today");
	$forecast = $(".js-forecast");
	$toolbar  = $(".js-toolbar");

	$toolbar.on("click", ".js-refresh", onRefresh);

	getWeather();
	drawTime();

	setInterval(getWeather, 600000);
	setInterval(drawTime, 1000);
});

function drawTime() {
	var time = moment();

	$today.find(".js-time").html(time.format('h:mm'));
}

function getWeather() {
	$.simpleWeather({
		location: loc,
		woeid: '',
		unit: 'f',
		success: drawWeather,
		error: onError
	});
}

function drawWeather(weather) {
	console.log(weather);

	var date = moment(weather.date);

	// Today

	$today.find(".js-date").html(date.format('ddd, MMM M YYYY'));

	$today.find(".js-icon").html('<i class="wi wi-yahoo-' + weather.code + '"></i>');
	$today.find(".js-currently").html(weather.currently);

	$today.find(".js-temp").html(weather.temp + '&deg;'/*  + weather.units.temp */);
	$today.find(".js-low").html(weather.low + '&deg;'/*  + weather.units.temp */);
	$today.find(".js-high").html(weather.high + '&deg;'/*  + weather.units.temp */);

	// Forecast
	var day,
		date,
		html = '';

	for (var i = 0; i < weather.forecast.length; i++) {
		day = weather.forecast[i];

		html += '<div class="day">';
		html += '<div class="day_name left">' + day.day + '</div>';
		html += '<div class="day_icon left"><i class="wi wi-yahoo-' + day.code + '"></i></div>';
		html += '<div class="day_temp right">' + day.high + '&deg;</div>';
		html += '</div>';
	}

	$forecast.html(html);

	// Location

	$toolbar.find(".js-location").html(weather.city + ", " + weather.region);
}

function onError(error) {
	$("#weather").html('<p>'+error+'</p>');
}

function onRefresh() {
	window.location.reload();
}