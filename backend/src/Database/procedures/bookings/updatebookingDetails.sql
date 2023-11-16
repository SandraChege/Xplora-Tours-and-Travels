
-- USE xploraTours

-- SELECT * from bookings

-- CREATE OR ALTER PROCEDURE updatebookingDetails
-- (
--     @tourID VARCHAR(255),
--     @userID VARCHAR(255),
--     @totalprice INT,
--     @totalBookCount INT,
--     @bookID VARCHAR(255)
-- )
-- AS
-- BEGIN
--     UPDATE bookings
--     SET tourID = @tourID, userID = @userID, totalprice = @totalprice, totalBookCount = @totalBookCount
--     WHERE bookID = @bookID
-- END