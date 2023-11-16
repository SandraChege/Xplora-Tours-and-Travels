CREATE OR ALTER PROCEDURE getAllBookings
AS 
BEGIN
    SELECT * FROM bookings where isDeleted = 0
END