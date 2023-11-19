-- USE xploraTours

-- SELECT * from Users

CREATE OR ALTER PROCEDURE updateUserDetails
@userName VARCHAR(200),
@userID VARCHAR (200)
AS
BEGIN
    UPDATE Users
    SET userName = @userName
    WHERE userID = @userID
END