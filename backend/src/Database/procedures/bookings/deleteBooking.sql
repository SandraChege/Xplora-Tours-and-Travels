
CREATE OR ALTER PROCEDURE deleteBooking
(@bookID VARCHAR(200))
AS
BEGIN
    UPDATE bookings
    SET isDeleted = 1
    WHERE bookID = @bookID
END 

SELECT * FROM bookings