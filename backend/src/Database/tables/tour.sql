-- USE xploraTours

-- SELECT * FROM tours


CREATE TABLE tours (
    tourID VARCHAR(300) NOT NULL PRIMARY KEY,
    imageUrl VARCHAR(255) NOT NULL,
    tourName VARCHAR(255) NOT NULL,
    tourDescription VARCHAR(255) NOT NULL,
    isDeleted BIT DEFAULT 0,
    tourPrice INT NOT NULL,
    tourStartDate DATE NOT NULL,
    tourEndDateName DATE NOT NULL,
    tourCount INT NOT NULL,
);


-- DROP TABLE tours
