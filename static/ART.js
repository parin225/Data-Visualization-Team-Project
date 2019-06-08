// Load data from life-expectancy.csv
Plotly.d3.csv('CSV files/art_2000to2015.csv', function(err, rows){
    console.log(rows);
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }
    var allCountryNames = unpack(rows, 'Entity'),
        allYear = unpack(rows, 'Year'),
        allLife = unpack(rows, ' (% of people living with HIV)'),
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
        console.log("I am here in ART")
        currentLife = [];
        currentYear = [];
        for (var i = 0 ; i < allCountryNames.length ; i++){
            if ( allCountryNames[i] === chosenCountry ) {
                
                currentLife.push(allLife[i]);
                currentYear.push(allYear[i]);
            }
        }
        c
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
            title:'ART Treameant',
            height: 700,
            width: 700
        };

        Plotly.newPlot('myART', data, layout);
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
        allLife = unpack(rows, ' (% of people living with HIV)'),
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