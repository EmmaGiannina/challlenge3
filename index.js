function getAPIdata() {
	let cityName = document.getElementById('cityName').value;
	let request = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&lang=nl&appid=7bd31400ee3ef7aeeb24ca79f8edc6e4';

	fetch(request)
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})

	.then(function(response) {
		onAPISucces(response);
	})

	.catch(function (error) {
		onAPIError(error);
	});
}

function onAPISucces(response) {
  var temp = response.main.temp;
  var gevTemp = response.main.feels_like;
  var windSpeed = response.wind.speed;

  var weatherTemp = document.getElementById('temperatuur');
	weatherTemp.innerHTML = (temp + " °C");
  var weatherGevTemp = document.getElementById('gev-temperatuur');
	weatherGevTemp.innerHTML = (gevTemp + " °C");
  var weatherWind = document.getElementById('windsnelheid');
	weatherWind.innerHTML = (windSpeed + " m/s");
}

function onAPIError(error) {
	console.error('Fetch request failed', error);

  var weatherDes = document.getElementById('temperatuur');
	weatherDes.innerHTML = "";
  var weatherTemp = document.getElementById('gev-temperatuur');
	weatherTemp.innerHTML = "";
  var weatherGevTemp = document.getElementById('windsnelheid');
	weatherGevTemp.innerHTML = "";
}

function mapbox() {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZW1tYWdpYW5uaW5hIiwiYSI6ImNrOGs1N3U4cjAyMnIzdGszOWttNGFlZzEifQ.i959jkNYHhDi-MHxv1FYkw';
  var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/emmagiannina/ck8rc5rfz12bn1iqlwsugmrd0',
  center: [5, 50.5],
  zoom: 5,
  });

  map.addControl(
					new MapboxGeocoder({
					accessToken: mapboxgl.accessToken,
					mapboxgl: mapboxgl
					})
				);

  map.addControl(
  new mapboxgl.NavigationControl()
);
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    trackUserLocation: true
  })
);
}

window.onload = function() {
  mapbox();
}
