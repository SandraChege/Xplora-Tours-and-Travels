-- USE xploraTours

-- SELECT * from tours

CREATE OR ALTER PROCEDURE getAllTours
AS 
BEGIN
    SELECT * FROM tours where isDeleted = 0
END