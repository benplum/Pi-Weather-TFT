$(document).ready(function() {
	geatWeather();

	setInterval(getWeather, 600000);

	$(".refresh").on("click", onRefresh);
});

function getWeather() {
	$.simpleWeather({
		location: '21211',
		woeid: '',
		unit: 'f',
		success: drawWeather,
		error: onError
	});
}

function drawWeather(weather) {
	console.log(weather);

	html = '<h2><i class="wi wi-yahoo-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
	html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
	html += '<li class="currently">'+weather.currently+'</li>';
	html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';

	html += 'Width: ' + $(window).width() + "<br>";
	html += 'Height: ' + $(window).height() + "<br>";

	$("#weather").html(html);
}

function onError(error) {
	$("#weather").html('<p>'+error+'</p>');
}

function onRefresh() {
	window.location.refresh();
}