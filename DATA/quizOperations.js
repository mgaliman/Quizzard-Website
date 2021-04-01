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


module.exports  = {
    GetQuizzesFromUser : GetQuizzesFromUser,
}