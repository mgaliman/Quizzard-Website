var config = require('./dbConfig');
const sql = require('mssql');
const { password } = require('./dbConfig');
const { map } = require('jquery');

sql.on('error', err => {
    console.log(err.message);
})

async function GetQuizzesFromUser(id) {
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('IDUserAccount', sql.Int, id)
            .execute('ReadQuizzesFromUser');
        return users.recordsets[0];
    } catch (err) {
        console.log(err.message);
    } finally {
        sql.close();
    }
}

// async function GetQuizzesFromUser(id) {
//     try {
//         let pool = await sql.connect(config);
//         try {
//             let users = await pool
//                 .request()
//                 .input('IDUserAccount', sql.Int, id)
//                 .execute('ReadQuizzesFromUser');
//             return users.recordsets[0];

//         } catch (err) {
//             console.log(err.message);

//         } finally {
//             pool.close();

//         }
//     } catch (err) {
//         console.log(err.message);
//     }
// }

async function createQuiz(title, UserID) {
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('Title', sql.NVarChar(50), title)
            .input('UserAccountID', sql.Int, UserID)
            .output('IDQuiz', sql.Int)
            .execute('CreateQuiz');
        return users.output.IDQuiz;
    } catch (err) {
        console.log(err.message);
    } finally {
        sql.close();
    }
}

async function deleteQuiz(quizID) {
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('IDQuiz', sql.Int, quizID)
            .execute('SoftDeleteQuiz');
    } catch (err) {
        console.log(err.message);
    } finally {
        sql.close();
    }
}

async function checkQuizTitle(user, title) {
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('UserAccountID', sql.int, user)
            .input('Title', sql.NVarChar(sql.MAX), title)
            .query('select * from Quiz where UserAccountID = @UserAccountID and Title = @Title');
        if (users !== null) {
            if (users.rowsAffected[0] > 0) {
                return users.recordset;
            }
        }
        return null;
    } catch (err) {
        console.log(err.message);
    } finally {
        sql.close();
    }
}
async function createQuestion(question, duration, points, quizID) {
    try {
        let pool = await sql.connect(config);
        let questions = await pool
            .request()
            .input('Question', sql.NVarChar(50), question)
            .input('Duration', sql.Int, duration)
            .input('Points', sql.Int, points)
            .input('QuizID', sql.Int, quizID)
            .output('IDQuestion', sql.Int)
            .execute('CreateQuestion');
        return questions.output.IDQuestion;
    } catch (err) {
        console.log(err.message);
    } finally {
        // pool.close();
    }
}

async function createAnswer(answer, rightAnswer, questionID) {
    try {
        let pool = await sql.connect(config);
        let answers = await pool
            .request()
            .input('Answer', sql.NVarChar(50), answer)
            .input('RightAnswer', sql.Bit, rightAnswer)
            .input('QuestionID', sql.Int, questionID)
            .output('IDAnswer', sql.Int)
            .execute('CreateAnswer');
        return answers.output.IDAnswer;
    } catch (err) {
        console.log(err);
    } finally {
        sql.close();
    }
}


async function getQuiz(id) {
    try {
        let pool = await sql.connect(config);
        let quiz = await pool
            .request()
            .input('IDQuiz', sql.Int, id)
            .execute('ReadQuiz');
        return quiz.recordsets[0][0];
    } catch (err) {
        console.log(err.message);
    } finally {
        sql.close();
    }
}
async function getQuestionsFromQuiz(id) {
    try {
        let pool = await sql.connect(config);
        let questions = await pool
            .request()
            .input('IDQuiz', sql.Int, id)
            .execute('ReadQuestionsFromQuiz');
        return questions.recordsets[0];
    } catch (err) {
        console.log(err.message);
    } finally {
        sql.close();
    }
}

async function getAnswersFromQuestion(idQuestion) {
    try {
        let pool = await sql.connect(config);
        let answers = await pool
            .request()
            .input('IDQuestion', sql.Int, idQuestion)
            .execute('ReadAnswersFromQuestion');
        return answers.recordsets[0];
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}
// const questions = new Map();
async function getQuestion(key, qnum) {
    // if (!questions.has(key)) {
    try {
        let pool = await sql.connect(config);
        let question = await pool
            .request()
            .input('GameKey', sql.NVarChar(50), key)
            .input('Qnum', sql.Int, qnum)
            .execute('ReadQuestion');
        // questions.set(key, question.recordsets[0][0]);
        return question.recordsets[0][0];
    } catch (err) {
        console.log(err.message);
    }
    // } else {
    //     return questions.get(key);
    // }
}
async function getAnswer(id) {
    try {
        let pool = await sql.connect(config);
        let question = await pool
            .request()
            .input('IDAnswer', sql.Int, id)
            .execute('ReadAnswer');
        return question.recordsets[0][0];
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}

module.exports = {
    GetQuizzesFromUser: GetQuizzesFromUser,
    createQuiz: createQuiz,
    checkQuizTitle: checkQuizTitle,
    deleteQuiz: deleteQuiz,
    createQuestion: createQuestion,
    createAnswer: createAnswer,
    getQuiz: getQuiz,
    getQuestionsFromQuiz: getQuestionsFromQuiz,
    getAnswersFromQuestion: getAnswersFromQuestion,
    getQuestion: getQuestion,
    getAnswer: getAnswer
}