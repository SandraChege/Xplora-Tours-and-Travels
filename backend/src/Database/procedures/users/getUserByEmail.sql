CREATE OR ALTER PROCEDURE getUserByEmail
	(@email varchar(250))
as

begin
	select	
        userID ,
        userName,
        email,
        phone_no,
        password
	FROM	users  WHERE email = @email AND isDeleted = 0;
end;

