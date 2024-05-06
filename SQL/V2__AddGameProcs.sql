CREATE PROCEDURE SubmitGameScore
    @GameId INT,
    @GameScore INT,
    @PlayerUid INT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        IF NOT EXISTS (SELECT 1 FROM dbo.Games WHERE GameId = @GameId)
        BEGIN
            THROW 50001, 'Requested game does not exist', 1;
        END;

        BEGIN TRANSACTION;

        INSERT INTO dbo.Score (ScoreAmount, GameId)
        VALUES (@GameScore, @GameId);

        UPDATE dbo.Games
        SET GameStatusId = (SELECT GameStatusId FROM dbo.GameStatus WHERE GameStatusName = 'Completed')
        WHERE GameId = @GameId;

        COMMIT TRANSACTION;

        RETURN 0;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        THROW;
    END CATCH;
END;
GO

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
GO