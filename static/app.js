
// Loading in CSV file
d3.csv("CSV files/aids_2013_to_2017.csv", function(err, d) {
  if (err) throw err;
  var selectedYear = 2017;
  console.log(d)
  var countryData = {};
  for (var i = 0; i < d.length; i++){
    countryData[d[i]["Entity"] + d[i]["Year"] ] = d[i]["HIV_Incidents(tens)"]
  }
  // var prevCountry = ""
  // for (var i =0; i< d.length; i++){
  //   if (d[i]["Entity"] == prevCountry){
  //     countryData[d[i]["Entity"]][d[i]["Year"]] = d[i]["HIV_Incidents(tens)"]
  //   } else {
  //     countryData[d[i]["Entity"]] = {};
  //     countryData[d[i]["Entity"]][d[i]["Year"]] = d[i]["HIV_Incidents(tens)"]
  //   }
  //   prevCountry = d[i]["Entity"];
  // }
 

// Create a map object
var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 2
  });
  
  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-basic",
    accessToken: API_KEY
  }).addTo(myMap);

// Loading GeoJSON file - 
d3.json("geoJSON/countries.geojson",function(data){

// Creating a geoJSON layer that will retrieve data
  L.geoJson(data, {
    // Called on each feature. Set mouseover/mouseout/click events
    onEachFeature: function(feature, layer) {
      layer.on({
          mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
          mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.2
          });
        },
          click: function(event) {
            myMap.fitBounds(event.target.getBounds());
        }
      });
      // Bind text to popup when country is clicked
      layer.bindPopup("Country: " + feature.properties.ADMIN + "<hr> HIV Rate: " + countryData[feature.properties.ADMIN + selectedYear]);
    }


  }).addTo(myMap);
});




  // return {
  //   Country: d.Entity,
  //   Year: +d.year,
  //   HIV_Incidents: d["HIV_Incidents(tens)"]
  // };
  console.log(countryData);
})


// function getColor(HIV) {
//   return HIV > 800000 ? '#800026':
//   HIV > 600000  ? '#BD0026' :
//   HIV > 400000  ? '#E31A1C' :
//   HIV > 200000  ? '#FC4E2A' :
//   HIV > 100000  ? '#FD8D3C' :
//   HIV > 50000   ? '#FEB24C' :
//   HIV > 0       ? '#FED976' :
//                   '#FFEDA0';

// }

// function style(feature) {
//   return {
//     fillColor: getColor(feature.properties.HIV_Incidents),
//     weight: 2,
//     opacity: 1,
//     color: 'white',
//     dashArray: '3',
//     fillOpacity: 0.7
//   };

// }
// L.geoJson(countries.geojson, {style:style}).addTo(myMap);