CREATE TABLE Users (
  UserId INT IDENTITY(1,1) PRIMARY KEY,
  Username VARCHAR(50) NOT NULL,
	UserUid VARCHAR(50),
);

CREATE TABLE Difficulty (
  DifficultyId INT IDENTITY(1,1) PRIMARY KEY,
  Difficultyname VARCHAR(50) NOT NULL,
	BombPercentage INT,
	ScoreMult FLOAT,
);

CREATE TABLE BoardSize (
  BoardSizeId INT IDENTITY(1,1) PRIMARY KEY,
	SizeDescription VARCHAR(100),
  BoardSize INT,
	ScoreMult FLOAT,
);

CREATE TABLE GameStatus (
  GameStatusId INT IDENTITY(1,1) PRIMARY KEY,
	GameStatusName VARCHAR(100),
);

CREATE TABLE Games (
  GameId INT IDENTITY(1,1) PRIMARY KEY,
  UserId INT NOT NULL,
  Gameboard VARCHAR(1000) NOT NULL,
  TimePlayed INT,
	GameStatusId INT,
	DifficultyId INT,
	BoardSizeId INT,
  CONSTRAINT FK_UserId FOREIGN KEY (UserId)
    REFERENCES Users(UserId),
  CONSTRAINT FK_DifficultyId FOREIGN KEY (DifficultyId)
    REFERENCES Difficulty(DifficultyId),
  CONSTRAINT FK_BoardSizeId FOREIGN KEY (BoardSizeId)
    REFERENCES BoardSize(BoardSizeId),
  CONSTRAINT FK_GameStatusId FOREIGN KEY (GameStatusId)
    REFERENCES GameStatus(GameStatusId),
);

CREATE TABLE Score (
  ScoreId INT IDENTITY(1,1) PRIMARY KEY,
  ScoreAmount INT,
	GameId INT,
	CONSTRAINT FK_GameId FOREIGN KEY (GameId)
    REFERENCES Games(GameId),
);
