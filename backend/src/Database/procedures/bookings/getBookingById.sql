CREATE OR ALTER PROCEDURE getBookingById
	@bookID VARCHAR(100)
AS
BEGIN
    SELECT * FROM bookings
    WHERE bookID = @bookID
    AND isDeleted = 0
END