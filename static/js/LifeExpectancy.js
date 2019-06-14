// Load data from life-expectancy.csv
var url = "/life-expectancy"
d3.json(url,function(err, data){ 

    function unpack(data, key) {
        return data.map(function(data) { return data[key]; });
    }
    var allCountryNames = unpack(data, 'Entity'),
        allYear = unpack(data, 'Year'),
        allLife = unpack(data, 'Life_Expectancy'),
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
                color: 'red',
                size: 12,
                opacity: 1
            }
        };

        var data = [trace1];
       
        var layout = {
            title:'Life Expectancy',
            xaxis: {title: 'Year'},
            yaxis: {title: 'Age'},
            height: 500,
            width: 500
        };

        Plotly.newPlot('myDiv', data, layout);
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