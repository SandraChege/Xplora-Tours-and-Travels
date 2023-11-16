-- USE xploraTours

-- SELECT * FROM reviews


CREATE TABLE reviews (
    reviewID VARCHAR(300) NOT NULL PRIMARY KEY,
    reviewContent VARCHAR(255) NOT NULL,
    userID VARCHAR(300) NOT NULL, 
    tourID VARCHAR(300) NOT NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (tourID) REFERENCES tours(tourID)
);

ALTER TABLE reviews
ADD isDeleted BIT DEFAULT 0
-- DROP TABLE reviews

UPDATE reviews SET isDeleted = 0 
