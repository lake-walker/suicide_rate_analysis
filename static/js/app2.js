// // Outlines for every country
// var myMap = L.map("map", {
//   center: [40.7128, -74.0059],
//   zoom: 3
// });

// // Adding tile layer
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/streets-v11",
//   accessToken: API_KEY
// }).addTo(myMap);

// Define arrays to hold created country markers 
var suicideMarkers = [];
var happinessMarkers = [];
var gdpMarkers = [];
var hdiMarkers = [];

d3.json('data/countries.geojson').then(function (data) {
d3.csv('data/new_country_data.csv').then(function (csv) {
  var world = data.features;
  console.log(world[39].properties.ADMIN);
  console.log(csv);
  csv.forEach(function(d, i) {
    world.forEach(function(e, j) {
      if (e.properties.ADMIN === d.country) {
        e.properties.sui_per_100k_2015 = +d.sui_per_100k_2015,
        e.properties.human_development_index = +d.human_development_index,
        e.properties.economy_gdp_per_capita_2015 = +d.economy_gdp_per_capita_2015,
        e.properties.happiness_score_2015 = +d.happiness_score_2015
      }
      // else {
      //   e.properties.sui_per_100k_2015 = 'N/A'
      // }
    })
  })
  console.log(data);
  for(var i = 0; i < data.length; i++) {
    suicideMarkers.push(
      L.geoJson(data, {
      style: function(feature) {
        return {
          color: 'white',
          fillColor: getColor(feature.properties.sui_per_100k_2015)
        }
      }

    }).bindPopup("<h3>" + data[i].country + "</h3><hr><p>" + data[i].sui_per_100k_2015 + "</p>"));
    
    happinessMarkers.push(
      L.geoJson(data, {
      style: function(feature) {
        return {
          color: 'white',
          fillColor: getColor(feature.properties.happiness_score_2015)
        }
      }

    }).bindPopup("<h3>" + data[i].country + "</h3><hr><p>" + data[i].sui_per_100k_2015 + "</p>"));
    
    gdpMarkers.push(
      L.geoJson(data, {
      style: function(feature) {
        return {
          color: 'white',
          fillColor: getColor(feature.properties.economy_gdp_per_capita_2015)
        }
      }

    }).bindPopup("<h3>" + data[i].country + "</h3><hr><p>" + data[i].sui_per_100k_2015 + "</p>"));
    
    hdiMarkers.push(
      L.geoJson(data, {
      style: function(feature) {
        return {
          color: 'white',
          fillColor: getColor(feature.properties.human_development_index)
        }
      }

    }).bindPopup("<h3>" + data[i].country + "</h3><hr><p>" + data[i].sui_per_100k_2015 + "</p>"));

}
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/light-v10",
      accessToken: API_KEY
  });

    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "dark-v10",
      accessToken: API_KEY
  });

  var suicides = L.layerGroup(suicideMarkers);
  var happiness = L.layerGroup(happinessMarkers);
  var gdp = L.layerGroup(gdpMarkers);
  var hdi = L.layerGroup(hdiMarkers); 

  var baseMaps = {
    'Street Map': suicides,
    'Dark Map': darkmap
  };

  var overlayMaps = {
    'Suicide Number': suicides,
    'Happiness Score': happiness,
    'GDP per Capita': gdp,
    'Human Development Index': hdi
  };

  var myMap = L.map('map', {
    center: [51.4934, 0.0098],
    zoom: 2,
    layers: [streetmap, suicides, happiness, gdp, hdi]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
})

})

function getColor(d) {
  return d > 10 ? '#00FFFF' :
        d > 7 ? '#0000FF' :
        d > 5 ? '#9900e6' :
        d > 3 ? '#CCCCFF' :
        d > 1 ? '#E97451' :
        d > 0 ? '#800000' :
        'black';
};


// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
};
