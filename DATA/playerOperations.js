var config = require('./dbConfig');
const sql = require('mssql');

sql.on('error', err => {
    console.log(err.message);
})

async function createPlayer(nickname, gameKey, quizID) {
    try {
        let pool = await sql.connect(config);
        let players = await pool
            .request()
            .input('Nickname', sql.NVarChar(50), nickname)
            .input('GameKey', sql.NVarChar(50), gameKey)
            .input('GameID', sql.Int, quizID)
            .output('IDPlayer', sql.Int)
            .execute('CreatePlayer');
        return players.output.IDPlayer;
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}


async function changePassword(email, password) {
    try {
        let pool = await sql.connect(config);
        let players = await pool
            .request()
            .input('Email', sql.NVarChar(50), email)
            .input('UserPassword', sql.NVarChar(50), password)
            .execute('ChangePassword');
        return players.output.IDPlayer;
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}



module.exports = {
    createPlayer: createPlayer,
    changePassword: changePassword
}