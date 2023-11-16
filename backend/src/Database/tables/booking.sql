-- USE xploraTours;

-- SELECT * FROM booking;

CREATE TABLE BOOKING(
    bookID VARCHAR(300) NOT NULL PRIMARY KEY,
    bookCount INT NOT NULL,
    totalprice INT NOT NULL,
    tourID VARCHAR(300) NOT NULL,
    userID VARCHAR(300) NOT NULL,
    tourStartDate VARCHAR(255) NOT NULL,
    tourEndDateName VARCHAR(255) NOT NULL,

    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (tourID) REFERENCES tours(tourID)
    -- FOREIGN KEY (tourStartDate) REFERENCES tours(tourStartDate),
    -- FOREIGN KEY (tourEndDateName) REFERENCES tours(tourEndDateName),

);
DROP TABLE BOOKING