// Load data from Aids.csv
var url = "/deaths"
d3.json(url, function(err,data){
    console.log(data);

// Plotly.d3.csv('CSV files/death_age_2013_to_2017.csv', function(err, rows){
    
    function unpack(data, key) {
        return data.map(function(data) { return data[key]; });
    }
    var allCountryNames = unpack(data, 'Entity'),
        allYear = unpack(data, 'Year'),
        toddlers = unpack(data, 'Toddlers'),
        teens = unpack(data, 'Teens'),
        adults = unpack(data, 'Adults'),
        retired = unpack(data, 'Elderly'),
        elderly = unpack(data, 'Retired'),
        listofCountries = [],
        currentCountry,
        currentYear = [],
        currentToddlers = [],
        currentTeens = [],
        currentAdults = [],
        currentRetired = [],
        currentElderly= [];

    for (var i = 0; i < allCountryNames.length; i++ ){
        if (listofCountries.indexOf(allCountryNames[i]) === -1 ){
            listofCountries.push(allCountryNames[i]);
        }
    }

    function getCountryData(chosenCountry) {
        currentYear = [];
        currentToddlers = [];
        currentTeens = [];
        currentAdults = [];
        currentRetired = [];
        currentElderly= [];
        console.log("inside getCountryData");
        for (var i = 0 ; i < allCountryNames.length ; i++){
            if ( allCountryNames[i] === chosenCountry ) {
                currentYear.push(allYear[i]);
                console.log("Current year inside getCountryData: " + currentYear[0]);
                currentToddlers.push(toddlers[i]);
                currentTeens.push(teens[i]);
                currentAdults.push(adults[i]);
                currentRetired.push(retired[i]);
                currentElderly.push(elderly[i]);

            }
        }
    };
        
    // Default Country Data
    setBubblePlot('Afghanistan');

    function setBubblePlot(chosenCountry) {
        getCountryData(chosenCountry);
        console.log(currentYear);

        var allLabels = ['Toddlers','Teens','Adults','Retired','Elderly'];

        var allValues = [
            [currentToddlers[0], currentTeens[0], currentAdults[0], currentRetired[0], currentElderly[0]],
            [currentToddlers[1], currentTeens[1], currentAdults[1], currentRetired[1], currentElderly[1]],
            [currentToddlers[2], currentTeens[2], currentAdults[2], currentRetired[2], currentElderly[2]],
            [currentToddlers[3], currentTeens[3], currentAdults[3], currentRetired[3], currentElderly[3]],
            [currentToddlers[4], currentTeens[4], currentAdults[4], currentRetired[4], currentElderly[4]]
        ];
        console.log("The data for baby1" + currentToddlers[0]);
        console.log("The data for baby2" + currentToddlers[1]);

        var ultimateColors = [
        ['rgb(255, 0, 0)', 'rgb(0, 0, 204)', 'rgb(0, 153, 0)', 'rgb(255, 255, 0)', 'rgb(255, 128, 0)']
        ];

        var data = [{
        values: allValues[0],
        labels: allLabels,
        title: '2013',
        type: 'pie',
        name: '2013',
        marker: {
            colors: ultimateColors
        },
        domain: {
            row: 0,
            column: 0
        },
        hoverinfo: 'label+percent+name',
        textinfo: 'none'
        }, {
        values: allValues[1],
        labels: allLabels,
        title: '2014',
        type: 'pie',
        name: '2014',
        marker: {
            colors: ultimateColors
        },
        domain: {
            row: 0,
            column: 1
        },
        hoverinfo: 'label+percent+name',
        textinfo: 'none'
        },{
        values: allValues[2],
        labels: allLabels,
        title: '2015',
        type: 'pie',
        name: '2015',
        marker: {
            colors: ultimateColors
        },
        domain: {
            row: 1,
            column: 0
        },
        hoverinfo: 'label+percent+name',
        textinfo: 'none'
        },
        
        {
        values: allValues[3],
        labels: allLabels,
        title: '2016',
        type: 'pie',
        name: '2016',
        marker: {
            colors: ultimateColors
        },
        domain: {
            row: 1,
            column: 1
        },
        hoverinfo: 'label+percent+name',
        textinfo: 'none'
        },
        {
        values: allValues[4],
        labels: allLabels,
        title: '2017',
        type: 'pie',
        name: '2017',
        marker: {
            colors: ultimateColors
        },
        domain: {
            row: 2,
            column: 0
        },
        hoverinfo: 'label+percent+name',
        textinfo: 'none'
        }
        ];

        var layout = {
        title: 'Death by Age Group 2013-2017',
        showlegend: true,
        grid: {rows: 3, columns: 3}
        };
        

        Plotly.newPlot('myAge', data, layout, {showSendToCloud:true});
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