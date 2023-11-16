-- USE xploraTours;

-- SELECT * FROM bookings;

CREATE TABLE bookings(
    bookID VARCHAR(300) NOT NULL PRIMARY KEY,
    totalBookCount INT NOT NULL,
    totalprice INT NOT NULL,
    tourID VARCHAR(300) NOT NULL,
    userID VARCHAR(300) NOT NULL,
    -- tourStartDate VARCHAR(255) NOT NULL,
    -- tourEndDateName VARCHAR(255) NOT NULL,

    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (tourID) REFERENCES tours(tourID)
    -- FOREIGN KEY (tourStartDate) REFERENCES tours(tourStartDate),
    -- FOREIGN KEY (tourEndDateName) REFERENCES tours(tourEndDateName),

);

-- ALTER TABLE bookings
-- ADD isDeleted BIT DEFAULT 0

-- UPDATE reviews SET isDeleted = 0 

DROP TABLE bookings