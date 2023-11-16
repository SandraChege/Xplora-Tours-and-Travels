CREATE OR ALTER PROCEDURE deleteReview
(@reviewID VARCHAR(200))
AS
BEGIN
    UPDATE reviews
    SET isDeleted = 1
    WHERE reviewID = @reviewID
END 

SELECT * FROM reviews 