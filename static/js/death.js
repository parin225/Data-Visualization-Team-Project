// Load in data
var url = "/aids"
d3.json(url, function(err,data){
    console.log(data);

// Load data from Aids.csv
// Plotly.d3.csv('CSV files/aids_2013_to_2017.csv', function(err, rows){
    
    function unpack(data, key) {
        return data.map(function(data) { return data[key]; });
    }
    var allCountryNames = unpack(data, 'Entity'),
        allYear = unpack(data, 'Year'),
        allDeath = unpack(data, 'Deaths'),
        listofCountries = [],
        currentCountry,
        currentDeath = [],
        currentYear = [];

    for (var i = 0; i < allCountryNames.length; i++ ){
        if (listofCountries.indexOf(allCountryNames[i]) === -1 ){
            listofCountries.push(allCountryNames[i]);
        }
    }

    function getCountryData(chosenCountry) {
       
        currentDeath = [];
        currentYear = [];
        for (var i = 0 ; i < allCountryNames.length ; i++){
            if ( allCountryNames[i] === chosenCountry ) {
                currentDeath.push(allDeath[i]);
                currentYear.push(allYear[i]);
            }
        }
    };

    // Default Country Data
    setBubblePlot('Afghanistan');

    function setBubblePlot(chosenCountry) {
        getCountryData(chosenCountry);
        console.log(chosenCountry);
        var trace1 = {
            x: currentYear,
            y: currentDeath,
            mode: 'lines+markers',
            marker: {
                size: 12,
                opacity: 0.5
            }
        };

        var data = [trace1];

        var layout = {
            title:'Deaths',
            height: 700,
            width: 700
        };

        Plotly.newPlot('myDeath', data, layout);
    };

    var innerContainer = document.querySelector('[data-num="0"'),
        plotEl = innerContainer.querySelector('.plot'),
        countrySelector = innerContainer.querySelector('.countrydata');

    function assignOptions(textArray, selector) {
        for (var i = 0; i < textArray.length;  i++) {
            var currentOption = document.createElement('option');
            currentOption.text = textArray[i];
            selector.appendChild(currentOption);
        }
    }

    assignOptions(listofCountries, countrySelector);

    function updateCountry(){
        setBubblePlot(countrySelector.value);
    }

    countrySelector.addEventListener('change', updateCountry, false);


   
});