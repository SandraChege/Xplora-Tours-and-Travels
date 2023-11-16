-- USE xploraTours
-- SELECT * from tours

CREATE OR ALTER PROCEDURE deletetour
(@tourID VARCHAR(200))
AS
BEGIN
    UPDATE tours
    SET isDeleted = 1
    WHERE tourID = @tourID
END 
