use master
go

drop database DBQuizzes
go

create database DBQuizzes
go

use DBQuizzes
go


create table UserAccount (
	IDUserAccount int primary key identity,
	FirstName nvarchar(100) not null,
	LastName nvarchar(100) not null,
	Email nvarchar (100) not null,
	UserPassword nvarchar (max) not null,

)

create table QuizType (
	IDQuizType int primary key identity,
	QuizType nvarchar(50) not null,
)

create table Quiz (
	IDQuiz int primary key identity,
	Title nvarchar(50) not null,
	UserAccountID int foreign key references UserAccount(IDUserAccount),
	Active bit default 1
)

create table Question (
	IDQuestion int primary key identity,
	Question nvarchar(50) not null,
	Duration int not null,
	Points int not null,
	QuizID int foreign key references Quiz(IDQuiz)
)

create table Answer (
	IDAnswer int primary key identity,
	Answer nvarchar(50) not null,
	RightAnswer bit not null,
	QuestionID int foreign key references Question(IDQuestion)
)

go


--Korisnik CRUD

create proc CreateUserAccount
	@FirstName nvarchar(100),
	@LastName nvarchar(100),
	@Email nvarchar(100),
	@UserPassword nvarchar(max),
	@IDUserAccount int output
as
	insert into UserAccount values (@FirstName, @LastName, @Email, @UserPassword)
	set @IDUserAccount = SCOPE_IDENTITY()

go

create proc ReadUserAccount
	@IDUserAccount int
as
	select *
	from UserAccount
	where IDUserAccount = @IDUserAccount
	
go

create proc ReadUserAccounts
as
	select *
	from UserAccount

go

create proc UpdateUserAccount 
	@IDUserAccount int,
	@FirstName nvarchar(100),
	@LastName nvarchar(100),
	@UserPassword nvarchar(max)
as
	update UserAccount 
	set	
	FirstName = @FirstName,
	LastName = @LastName,
	UserPassword = @UserPassword
	where IDUserAccount = @IDUserAccount

go

create proc DeleteUserAccount
	@IDUserAccount int
as
	 delete from UserAccount
	 where IDUserAccount = @IDUserAccount

go

create proc LoginUser
	@Email nvarchar(100),
	@UserPassword nvarchar(max)
as
	 select *
	 from UserAccount
	 where Email = @Email and UserPassword = @UserPassword

go

create proc ReadQuizzesFromUser
	@IDUserAccount int
as
	 select *
	 from Quiz
	 where UserAccountID = @IDUserAccount and Active = 1

go


--Tip CRUD

create proc CreateQuizType
	@QuizType nvarchar(50),
	@IDQuizType int output
as
	insert into QuizType values (@QuizType)
	set @IDQuizType = SCOPE_IDENTITY()
go

create proc ReadQuizType
	@IDQuizType int
as
	select QuizType
	from QuizType
	where IDQuizType = @IDQuizType
	
go

create proc ReadQuizTypes
as
	select *
	from QuizType

go

create proc UpdateQuizTypes
	@IDQuizType int,
	@QuizType nvarchar(50)
as
	update QuizType
	set	
	QuizType = @QuizType
	where IDQuizType = @IDQuizType

go

create proc DeleteQuizType
	@IDQuizType int
as
	 delete from QuizType
	 where IDQuizType = @IDQuizType

go


--kviz CRUD 


create proc CreateQuiz
	@Title nvarchar(50),
	@UserAccountID int,
	@IDQuiz int output
as
	insert into Quiz (Title, UserAccountID) values (@Title, @UserAccountID)
	set @IDQuiz = SCOPE_IDENTITY()
go

create proc ReadQuiz
	@IDQuiz int
as
	select *
	from Quiz
	where IDQuiz = @IDQuiz and Active = 1
	
go

create proc ReadQuizzes
as
	select *
	from Quiz where Active = 1
go

create proc UpdataQuiz
	@IDQuiz int,
	@Title nvarchar(50),
	@UserAccountID nvarchar(50),
	@Active bit
as
	update Quiz
	set	
	Title = @Title,
	UserAccountID = @UserAccountID,
	Active = @Active
	where IDQuiz = @IDQuiz

go

create proc SoftDeleteQuiz
	@IDQuiz int
as
	 UPDATE Quiz
		set Active = 0 where IDQuiz = @IDQuiz

go

create proc DeleteQuiz
	@IDQuiz int
as
	 delete from Quiz
	 where IDQuiz = @IDQuiz
go

create proc ReadQuestionsFromQuiz
	@IDQuiz int
as
	select * 
	from Question
	where QuizID = @IDQuiz

go

--pitanje CRUD

create proc CreateQuestion
	@Question nvarchar(50),
	@Duration int,
	@Points int,
	@QuizID int,
	@IDQuestion int output
as
	insert into Question values (@Question, @Duration, @Points, @QuizID)
	set @IDQuestion = SCOPE_IDENTITY()
go

create proc ReadQuestion
	@IDQuestion int
as
	select *
	from Question
	where IDQuestion = @IDQuestion
	
go

create proc ReadQuestions
as
	select *
	from Question
go

create proc UpdataQuestion
	@IDQuestion int,
	@Question nvarchar(50),
	@Duration int,
	@Points int,
	@QuizID int
as
	update Question
	set	
	Question = @Question,
	Duration = @Duration,
	Points = @Points,
	QuizID = @QuizID
	where IDQuestion = @IDQuestion

go

create proc DeleteQuestion
	@IDQuestion int
as
	 delete from Question
	 where IDQuestion = @IDQuestion

go

create proc ReadAnswersFromQuestion
	@IDQuestion int
as
	select *
	from Answer
	where QuestionID = @IDQuestion

go


--odgovor CRUD

create proc CreateAnswer
	@Answer nvarchar(50),
	@RightAnswer bit,
	@QuestionID int,
	@IDAnswer int output
as
	insert into Answer values (@Answer, @RightAnswer, @QuestionID)
	set @IDAnswer = SCOPE_IDENTITY()
go

create proc ReadAnswer
	@IDAnswer int
as
	select *
	from Answer
	where IDAnswer = @IDAnswer
	
go

create proc ReadAnswers
as
	select *
	from Answer
go

create proc UpdataAnswer
	@IDAnswer int,
	@Answer nvarchar(50),
	@RightAnswer bit,
	@QuestionID int
as
	update Answer
	set	
	Answer = @Answer,
	RightAnswer = @RightAnswer,
	QuestionID = @QuestionID
	where IDAnswer = @IDAnswer

go

create proc DeleteAnswer
	@IDAnswer int
as
	 delete from Answer
	 where IDAnswer = @IDAnswer

go

create proc ReadQuestionOfAnswer
	@IDAnswer int
as
	select q.Question
	from Question as q
	inner join Answer as a on q.IDQuestion = a.QuestionID
	where IDAnswer = @IDAnswer

go


-------GAME AND PLAYERS-----


create table Game (
	IDGame int primary key identity,
	GameKey int not null,
	QuizID int foreign key references Quiz(IDQuiz),
	GameStatus int not null default 0,
	Active bit not null default 1
)
go

create table Player (
	IDPlayer int primary key identity,
	Nickname nvarchar(50) not null,
	GameKey int not null, --vjv nije potrebno
	Points float not null default 0,
	GameID int foreign key references Game(IDGame)
)
go

-------GAME AND PLAYERS CRUD-----

-------GAME CRUD---------

create proc CreateGame
	@GameKey int,
	@QuizID int,
	@IDGame int output
as
	insert into Game(GameKey, QuizID) values (@GameKey, @QuizID)
	set @IDGame = SCOPE_IDENTITY()
go

create proc ReadGame
	@IDGame int
as
	select *
	from Game
	where IDGame = @IDGame
	
go

create proc ReadGames
as
	select *
	from Game
go

create proc UpdataGame
	@IDGame int,
	@GameKey int,
	@QuizID int
as
	update Game
	set	
	GameKey = @GameKey,
	QuizID = @QuizID
	where IDGame = @IDGame

go

create proc DeleteGame
	@IDGame int
as
	 delete from Game
	 where IDGame = @IDGame

go

create proc ToggleGame
	@IDGame int
as
	IF (select Active from Game where IDGame = @IDGame) = 0
		UPDATE Game
			set Active = 1 where IDGame = @IDGame
	ELSE
		UPDATE Game
			set Active = 0 where IDGame = @IDGame
go

create proc ReadGamePlayers
	@IDGame int
as
	select * from Player
	where GameID = @IDGame
go

-------PLAYER CRUD---------

create proc CreatePlayer
	@Nickname nvarchar(50),
	@GameKey int,
	@Points int,
	@GameID int,
	@IDPlayer int output
as
	insert into Player values (@Nickname, @GameKey, @Points,@GameID)
	set @IDPlayer = SCOPE_IDENTITY()
go

create proc ReadPlayer
	@IDPlayer int
as
	select *
	from Player
	where IDPlayer = @IDPlayer
	
go

create proc ReadPlayers
as
	select *
	from Player
go

create proc UpdataPlayer
	@IDPlayer int,
	@Nickname nvarchar(50),
	@GameKey int,
	@Points int,
	@GameID int
as
	update Player
	set	
	Nickname = @Nickname,
	GameKey = @GameKey,
	Points = @Points,
	GameID = @GameID
	where IDPlayer = @IDPlayer

go

create proc DeletePlayer
	@IDPlayer int
as
	 delete from Player
	 where IDPlayer = @IDPlayer

go





