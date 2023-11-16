CREATE OR ALTER PROCEDURE createnewbookings
    (@bookID VARCHAR (255),
    @userID VARCHAR (255),
    @tourID VARCHAR (255),
    @totalprice INT,
    @totalBookCount INT)
AS
BEGIN
    INSERT INTO bookings
    (bookID, userID, tourID, totalprice, totalBookCount)
    VALUES
    (@bookID, @userID,@tourID, @totalprice,@totalBookCount)
END