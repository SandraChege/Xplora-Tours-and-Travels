-- use xploraTours

-- SELECT * from reviews

CREATE OR ALTER PROCEDURE addreviews(
    @tourID VARCHAR(300),
    @userID VARCHAR(300),
    @reviewContent VARCHAR(300),
    @reviewID VARCHAR(300)
)
AS
BEGIN
    INSERT INTO reviews (tourID, userID, reviewContent, reviewID)
    VALUES (@tourID, @userID, @reviewContent,  @reviewID)
END

DROP PROCEDURE addreviews