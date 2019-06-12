CREATE DATABASE HIV;

#to allow ascii characters
ALTER DATABASE HIV CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

#display the ART table
USE HIV;
SELECT * FROM ART;

#display the Life_Expectancy table
USE HIV;
SELECT * FROM Life_Expectancy;

#display the Death table
USE HIV;
SELECT * FROM Death;

#display the AIDS table
USE HIV;
SELECT * FROM AIDS;

#populate the foreign key in the Death table 
UPDATE AIDS, Death
SET death.ID = AIDS.ID
WHERE death.Entity = AIDS.Entity;

#populate the foreign key in the ART table 
UPDATE AIDS, ART
SET ART.ID = AIDS.ID
WHERE ART.Entity = AIDS.Entity;

#populate the foreign key in the Life Expectancy table 
UPDATE AIDS, Life_Expectancy
SET Life_Expectancy.ID = AIDS.ID
WHERE Life_Expectancy.Entity = AIDS.Entity;

