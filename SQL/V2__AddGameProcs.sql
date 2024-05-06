

CREATE PROCEDURE UpdateGameStatusAndInsertScore
    @GameScore INT,
    @GameId INT
AS
BEGIN
    INSERT INTO dbo.Score (ScoreAmount, GameId)
    VALUES (@GameScore, @GameId);

    UPDATE dbo.Games
    SET GameStatusId = (SELECT GameStatusId FROM dbo.GameStatus WHERE GameStatusName = 'Completed')
    WHERE GameId = @GameId;
END;


CREATE PROCEDURE InsertGame
    @UserName NVARCHAR(255),
    @DifficultyName NVARCHAR(255),
    @SizeDescription NVARCHAR(255),
    @GameBoard NVARCHAR(1000)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @GameId INT;

    -- Get the UserId
    DECLARE @UserId INT;
    SELECT @UserId = UserId FROM dbo.Users WHERE Username = @UserName;

    -- Get the GameStatusId
    DECLARE @GameStatusId INT;
    SELECT @GameStatusId = GameStatusId FROM dbo.GameStatus WHERE GameStatusName = 'In Progress';

    -- Get the DifficultyId
    DECLARE @DifficultyId INT;
    SELECT @DifficultyId = DifficultyId FROM dbo.Difficulty WHERE Difficultyname = @DifficultyName;

    -- Get the BoardSizeId
    DECLARE @BoardSizeId INT;
    SELECT @BoardSizeId = BoardSizeId FROM dbo.BoardSize WHERE SizeDescription = @SizeDescription;

    -- Insert into Games table
    INSERT INTO dbo.Games (UserId, GameStatusId, DifficultyId, BoardSizeId, Gameboard)
    VALUES (@UserId, @GameStatusId, @DifficultyId, @BoardSizeId, @GameBoard);

    -- Get the inserted GameId
    SET @GameId = SCOPE_IDENTITY();

    -- Return the GameId
    SELECT @GameId AS GameId;
END
