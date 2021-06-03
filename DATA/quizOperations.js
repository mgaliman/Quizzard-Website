var config = require('./dbConfig');
const sql = require('mssql');
const { password } = require('./dbConfig');

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
        return users.recordsets;
    } catch (err) {
        console.log(err.message);
    } finally {
        sql.close();
    }
}

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


module.exports = {
    GetQuizzesFromUser: GetQuizzesFromUser,
    createQuiz: createQuiz,
    checkQuizTitle: checkQuizTitle,
    deleteQuiz: deleteQuiz
}