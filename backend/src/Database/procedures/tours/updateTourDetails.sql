-- USE xploraTours

-- SELECT * from tours

CREATE OR ALTER PROCEDURE updateTourDetails
(
    @tourID VARCHAR(300),
    @imageUrl VARCHAR(300),
    @tourName VARCHAR(300),
    @tourDescription VARCHAR(300),
    @tourPrice INT,
    @tourStartDate DATE,
    @tourEndDateName DATE,
    @tourCount INT
)
AS
BEGIN
    UPDATE tours
    SET tourName = @tourName, tourDescription = @tourDescription, tourPrice = @tourPrice, tourStartDate = @tourStartDate, tourEndDateName = @tourEndDateName, tourCount = @tourCount
    WHERE tourID = @tourID
END