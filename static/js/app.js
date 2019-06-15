// Loading in CSV file
d3.csv("/hiv_info", function(err, d) {
  if (err) throw err;
  var countryData = {};
  for (var i = 0; i < d.length; i++){
    countryData[d[i]["Entity"]] = d[i]["HIV_Incidents(tens)"]
  }

// Create a map object
var myMap = L.map("map", {
    center: [34.5994, -10.6731],
    zoom: 0.5
  });
  
  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-basic",
    noWrap: false,
    accessToken: API_KEY
  }).addTo(myMap);

  myMap.fitWorld().zoomIn();

// Loading GeoJSON file - 
d3.json("/geojson",function(data){

    function getColor(HIV) {
      return HIV > 3000000 ? '#800026':
        HIV > 2000000  ? '#BD0026' :
        HIV > 1000000  ? '#E31A1C' :
        HIV > 500000  ? '#FC4E2A' :
        HIV > 100000  ? '#FD8D3C' :
        HIV > 50000   ? '#FEB24C' :
        HIV > 0       ? '#FED976' :
                      '#FFEDA0';

    }

    function style(feature) {
      return {
        fillColor: getColor(countryData[feature.properties.ADMIN]),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
      };

    }
// Creating a geoJSON layer that will retrieve data
  L.geoJson(data, {
    // Called on each feature. Set mouseover/mouseout/click events
    onEachFeature: function(feature, layer) {
      layer.on({
          mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.7
          });
        },
          mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.7
          });
        },
          click: function(event) {
            // myMap.fitBounds(event.target.getBounds());
        }
      });
      // Bind text to popup when country is clicked
      layer.bindPopup("Country: " + feature.properties.ADMIN + "<hr> HIV Rate (2017): " + countryData[feature.properties.ADMIN]);
    }, 
    style: style,
    

  }).addTo(myMap);

  });
});

  var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
        incidents = [0, 50000, 100000, 500000, 1000000, 2000000, 3000000];
        labels = [];

    // loop through our incident intervals and generate a label with a colored square for each interval
    for (var i = 0; i < incidents.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(incidents[i] + 1) + '"></i> ' +
            incidents[i] + (incidents[i + 1] ? '&ndash;' + incidents[i + 1] + '<br>' : '+');
    }

    return div;

legend.addTo(myMap);
};



