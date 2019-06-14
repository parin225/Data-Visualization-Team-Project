CREATE DATABASE HIV_AIDS;

#to allow ascii characters
ALTER DATABASE HIV_AIDS CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

#display the ART table
USE HIV_AIDS;
SELECT * FROM ART;

#display the Life_Expectancy table
USE HIV_AIDS;
SELECT * FROM Life_Expectancy;

#display the Death table
USE HIV_AIDS;
SELECT * FROM Death;

#display the AIDS table
USE HIV_AIDS;
SELECT * FROM AIDS;

#populate the foreign key in the Death table 
UPDATE AIDS, Death
SET death.Country_ID = AIDS.Country_ID
WHERE death.Entity = AIDS.Entity;

#populate the foreign key in the ART table 
UPDATE AIDS, ART
SET ART.Country_ID = AIDS.Country_ID
WHERE ART.Entity = AIDS.Entity;

#populate the foreign key in the Life Expectancy table 
UPDATE AIDS, Life_Expectancy
SET Life_Expectancy.Country_ID = AIDS.Country_ID
WHERE Life_Expectancy.Entity = AIDS.Entity;
