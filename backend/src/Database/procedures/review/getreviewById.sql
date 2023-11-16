CREATE OR ALTER PROCEDURE getReviewById
	@reviewID VARCHAR(100)
AS
BEGIN
    SELECT * FROM reviews
    WHERE reviewID = @reviewID
END

