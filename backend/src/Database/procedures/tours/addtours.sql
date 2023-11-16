-- use xploraTours

-- SELECT * from Users

CREATE OR ALTER PROCEDURE addtour(
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
    INSERT INTO tours (tourID, imageUrl, tourName, tourDescription, tourPrice, tourStartDate, tourEndDateName, tourCount)
    VALUES (@tourID, @imageUrl, @tourName, @tourDescription, @tourPrice, @tourStartDate, @tourEndDateName, @tourCount)
END

DROP PROCEDURE addtour