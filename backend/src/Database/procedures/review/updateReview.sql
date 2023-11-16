-- USE xploraTours

-- SELECT * from reviews

CREATE OR ALTER PROCEDURE updateReviewDetails
(
    @reviewID VARCHAR(300),
    @reviewContent VARCHAR(300)
)
AS
BEGIN
    UPDATE reviews
    SET reviewContent = @reviewContent
    WHERE reviewID = @reviewID
END