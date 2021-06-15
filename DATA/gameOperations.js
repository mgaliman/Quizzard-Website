var config = require('./dbConfig');
const sql = require('mssql');

sql.on('error', err => {
    console.log(err.message);
})

async function createGame(gameKey, quizID) {
    try {
        let pool = await sql.connect(config);
        let games = await pool
            .request()
            .input('GameKey', sql.NVarChar(50), gameKey)
            .input('QuizID', sql.Int, quizID)
            .output('IDGame', sql.Int)
            .execute('CreateGame');
        return games.output.IDGame;
    } catch (err) {
        console.log(err.message);
    } finally {
        sql.close();
    }
}

async function getGameByQuiz(quizID) {
    try {
        let pool = await sql.connect(config);
        let games = await pool
            .request()
            .input('QuizID', sql.Int, quizID)
            .execute('ReadGameByQuiz');
        if (games !== null) {
            if (games.rowsAffected[0] > 0) {
                return games.recordset;
            }
        }
        return null;
    } catch (err) {
        console.log(err.message);
    } finally {
        sql.close();
    }
}

async function getGameByKey(key) {
    try {
        let pool = await sql.connect(config);
        let games = await pool
            .request()
            .input('GameKey', sql.NVarChar(50), key)
            .execute('ReadGameByKey');
        if (games !== null) {
            if (games.rowsAffected[0] > 0) {
                return games.recordset;
            }
        }
        return null;
    } catch (err) {
        console.log(err.message);
    } finally {
        sql.close();
    }
}

async function getGamePlayers(gameID) {
    try {
        let pool = await sql.connect(config);
        let players = await pool
            .request()
            .input('IDGame', sql.Int, gameID)
            .execute('ReadGamePlayers');
        if (players !== null) {
            if (players.rowsAffected[0] > 0) {
                return players.recordset;
            }
        }
        return null;
    } catch (err) {
        console.log(err.message);
    } finally {
        sql.close();
    }
}

async function getGamePlayers(gameID) {
    try {
        let pool = await sql.connect(config);
        let players = await pool
            .request()
            .input('IDGame', sql.Int, gameID)
            .execute('ReadGamePlayers');
        if (players !== null) {
            if (players.rowsAffected[0] > 0) {
                return players.recordset;
            }
        }
        return null;
    } catch (err) {
        console.log(err.message);
    } finally {
        sql.close();
    }
}

async function deleteGame(key) {
    try {
        let pool = await sql.connect(config);
        let games = await pool
            .request()
            .input('GameKey', sql.NVarChar(50), key)
            .execute('DeleteGame');
    } catch (err) {
        console.log(err.message);
    } finally {
        sql.close();
    }
}

async function checkNickname(nickname, key) {
    try {
        let pool = await sql.connect(config);
        let players = await pool
            .request()
            .input('Nickname', sql.NVarChar(50), nickname)
            .input('GameKey', sql.NVarChar(50), key)
            .execute('CheckNickname');
        if (players !== null) {
            if (players.rowsAffected[0] > 0) {
                return players.recordset;
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
    createGame: createGame,
    getGameByQuiz: getGameByQuiz,
    getGamePlayers: getGamePlayers,
    deleteGame: deleteGame,
    getGameByKey: getGameByKey,
    getGamePlayers: getGamePlayers,
    checkNickname: checkNickname
}