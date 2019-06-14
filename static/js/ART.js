// Load in data
var url = "/art"
d3.json(url,function(err, data){ 

// Plotly.d3.csv('../CSV files/art_2000to2015.csv', function(err, rows){

    function unpack(data, key) {
        return data.map(function(data) { return data[key]; });
    }
    var allCountryNames = unpack(data, 'Entity'),
        allYear = unpack(data, 'Year'),
        allLife = unpack(data, 'Percent_Living_With_HIV'),
        listofCountries = [],
        currentCountry,
        currentLife = [],
        currentYear = [];
        
    for (var i = 0; i < allCountryNames.length; i++ ){
        if (listofCountries.indexOf(allCountryNames[i]) === -1 ){
            listofCountries.push(allCountryNames[i]);
        }
    }

    function getCountryData(chosenCountry) {
        currentLife = [];
        currentYear = [];
        for (var i = 0 ; i < allCountryNames.length ; i++){
            if ( allCountryNames[i] === chosenCountry ) {
                
                currentLife.push(allLife[i]);
                currentYear.push(allYear[i]);
            }
        }
        
    };

    // Default Country Data
    setBubblePlot('Albania');

    function setBubblePlot(chosenCountry) {
        getCountryData(chosenCountry);
    
        var trace1 = {
            x: currentYear,
            y: currentLife,
            mode: 'lines+markers',
            marker: {
                size: 12,
                color: 'red',
                opacity: 1
                
            }
        };

        var data = [trace1];

        var layout = {
            title:'ART Treament',
            xaxis: {title: 'Year'},
            yaxis: {title: '% of People Living With HIV'},
            height: 500,
            width: 500
        };

        Plotly.newPlot('myART', data, layout);
    };

    var innerContainer = document.querySelector('[data-num="0"'),
        plotEl = innerContainer.querySelector('.plot'),
        countrySelector = innerContainer.querySelector('.countrydata');

    // function assignOptions(textArray, selector) {
    //     for (var i = 0; i < textArray.length;  i++) {
    //         var currentOption = document.createElement('option');
    //         currentOption.text = textArray[i];
    //         selector.appendChild(currentOption);
    //     }
    // }

    // assignOptions(listofCountries, countrySelector);

    function updateCountry(){
        setBubblePlot(countrySelector.value);
    }

    countrySelector.addEventListener('change', updateCountry, false);


});