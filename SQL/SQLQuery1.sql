


Insert into Quiz (Title, QuizTypeID, UserAccountID) values ('Quiz 1', (select IDQuizType from QuizType where QuizType = 'Edukacija'), (select IDUserAccount from UserAccount where UserName = 'a'))
Insert into Quiz (Title, QuizTypeID, UserAccountID) values ('Quiz 2', (select IDQuizType from QuizType where QuizType = 'Edukacija'), (select IDUserAccount from UserAccount where UserName = 'a'))
Insert into Quiz (Title, QuizTypeID, UserAccountID) values ('Quiz 3', (select IDQuizType from QuizType where QuizType = 'Edukacija'), (select IDUserAccount from UserAccount where UserName = 'a'))


delete from Quiz where UserAccountID > 4
delete from UserAccount where IDUserAccount > 4
delete from Quiz where UserAccountID = (select IDUserAccount from UserAccount where UserName = 'a')


select * from UserAccount
