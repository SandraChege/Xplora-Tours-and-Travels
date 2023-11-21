-- USE xploraTours

-- SELECT * from Users

CREATE OR ALTER PROCEDURE fetchAllUsers
AS 
BEGIN
    SELECT * FROM Users where isDeleted = 0 AND role = 'user'  
END
