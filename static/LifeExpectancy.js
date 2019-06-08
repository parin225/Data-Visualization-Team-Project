// Load data from life-expectancy.csv
Plotly.d3.csv('CSV files/life_expectancy_2000to2017.csv', function(err, rows){
    
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }
    var allCountryNames = unpack(rows, 'Entity'),
        allYear = unpack(rows, 'Year'),
        allLife = unpack(rows, 'Life Expectancy'),
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
        console.log(currentLife);
        var trace1 = {
            x: currentYear,
            y: currentLife,
            mode: 'lines+markers',
            marker: {
                size: 12,
                opacity: 0.5
            }
        };

        var data = [trace1];

        var layout = {
            title:'Life Expectency',
            height: 700,
            width: 700
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


    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }
    
    var allCountryNames = unpack(rows, 'Entity'),
        allYear = unpack(rows, 'Year'),
        allLife = unpack(rows, 'Life Expectancy'),
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

});