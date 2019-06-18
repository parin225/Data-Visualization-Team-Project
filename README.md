# Data-Visualization-Team-Project

Prior to running the steps/code below in our ETL Pipeline and Website, please ensure you have completed the following in the respective programs:

### Juptyer Notebook-
1.	In order to configure MySQL- within ***Jupyter Notebook***, enter your MySQL username and password in cell #2.
2.	Within the ***“Loading DataFrames into Database”*** section, within the first cell under this header please insert your MySQL username and password within the “connection_string”

### MySQL-
1.	Login to your ***MySQL database***
2.	Within our Github repository "Data-Visualization-Team-Project" we created a MySQL file called "hiv_aids.sql" for you to download within your MySQL. PLease download this file and it will created the HIV_AIDS database that we are using within MySQL prior to running the following.

### Static/js/config.js-
3.	Within the **config.js** file located within Data-Visualization-Team-Project/static/js/config.js, change your API_key from www.mapbox.com after logging in.

## Welcome to our HIV Website

## ETL Pipeline- *Jupyter Notebook(Pandas)/MySQL/Flask*

### Extract- Data sources:

1.	AIDS CSV
•	Institute for Health Metrics and Evaluation (IHME): http://ghdx.healthdata.org/gbd-results-tool
2.	Life Expectancy CSV
•	Clio-Infra's dataset for life expectancy up until 1949: https://datasets.socialhistory.org/dataset.xhtml?persistentId=hdl:10622/LKYT53 
•	The UN Population Division for data from 1950 to 2015: https://esa.un.org/unpd/wpp/Download/Standard/Population/
3.	ART CSV
•	World Bank- Development Indicators: http://data.worldbank.org/data-catalog/world-development-indicators 
4.	HIV Death Rate By Age Group CSV
 HRSA Data Warehouse: https://catalog.data.gov/dataset?tags=hiv

## ETL Transformation
*Cleaning Data within Jupyter Notebook*
1.  Cleaning the***ART CSV file:*** We read the the csv into a dataframe and then filtered on the year, entity=”country” and renamed headers “% of people living with HIV to Percent_Living_With_HIV “ for clarification. 
2.	Cleaning the ***Life Expectancy CSV file:*** we first read the csv into a dataframe and then filtered on years and life expectancy, and then renamed the "Life expectancy (Clio-Infra up to 1949; UN Population Division for 1950 to 2015) (years)" to "Life_Expectancy" to simplify headers.
3.	Cleaning the ***AIDS CSV file***: We read the CSV file into a dataframe and then we filtered on the “Year” and then renamed the headers "Deaths from HIV/AIDS (Number)" to  "Deaths" and "New infections of HIV/AIDS (new cases of HIV infection)" to "New_Infections", and lastly "Number of people living with HIV (tens) (tens of people living with HIV) to "HIV_Incidents(tens)"
4.	Cleaning the ***HIV Death Rate by Age Group CSV:*** Read the CSV into a dataframe and then filtered on year and then we renamed the column headers and grouped the age ranges with their respective labels, such as “Elderly”: “70+"

## ETL Load
*Loading pandas dataframes into MySQL
1. **Note(1): Within Juptyer Notebook - we created a cell (#2) for you to insert your username and password**We loaded each of the dataframes (ART/Life Expectancy/Aids/Death) into the MySQL database via connection_string followed by creating an engine. **Also change your username and password within the connection_string**
***Note(2): Log into MySQL Database and download the ***hiv_aids.sql*** from our github repository which will create our HIV_AIDS database to then load the dataframes into the database.

2. Within our Github repository, we created a MySWL we uploaded the 4 dataframes from Jupyter notebook into the mySQL database and created 4 tables relative to each CSV file/dataframe. We also created two Primary keys: For the AIDS df the primary key is  “country_id” and Primary key for the Life Expectancy/ART/Deaths dfs is “foriegn_id.”

*Flask- (app.py)/JS*
2(a) **Note(3): Within the Flask file/app.py remember to set your MySQL username and password.**
2(b) 	Within the app.py, We created five different routes which will take you/render you to their respective html pages within Javascript- such as: (1)hiv.html, (2)treatments.html, (3)preventions.html, (4)death.html, (5)donate.html. 
2(c)	Additional to the routes that will render to the 5 html pages within JS, we created routes that will render the data/csv’s within mySQL to create their respective charts/graphs within JS. Thus the routes will return the data per each chart/graph such as the death pie charts and line graph and the line graphs for ART and Life Expectancy which is created via Plotly.js. 

### Creating our Website- Javascript- HTML/CSS/Flask/Plotly/GeoJSON/Video

## Homepage 
For our home page we used HTML to upload relative information to HIV, created a dropdown menu and created an interactive map of all countries showing 2017 data on people living with HIV relative to each country. To create the interactive map, we downloaded the GeoJSON from online to trace the borders of the countries. When styling the page, such as for text, text colors, and background we used CSS.
## Preventions Page
We used HTML to upload relative information on preventions and also created an interactive widget to find local treatment centers by entering zipcodes, which was created in HTML. We also created an user-driven interaction of a YouTube video on ART/PrEP which was created using an additional Javascript library - Video.js. Lastly, the styling of the page is created via CSS. 
## Treatments Page
Includes information on treatments related to HIV and a dropdown menu of all the countries to be selected for the charts.  Within JS, We called on the life expectancy and ART flask route within the app.py to retrieve the associated data to create the 2 line graphs on life expectancy and art treatment which is created by Plotly.js. ***Note that not all countries had data related to ART, thus the graphs will not create for those countries lacking ART data.***
## Deaths Page
Information related to HIV deaths and the dropdown is created via HTML, within JS we calleld on the death flask route within app.py to retrieve the data related to the pie chart and line graphs created via Plotly.js
## Donations Page
Includes links and images of organizations aligned with helping/preventing HIV via HTML 










