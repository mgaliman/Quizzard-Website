var config = require('./dbConfig');
const sql = require('mssql');
const { password } = require('./dbConfig');


sql.on('error', err => {
    console.log(err.message);
})

async function getUsers() {
    try {
        let pool = await sql.connect(config);
        let users = await pool.request().execute('ReadUserAccounts');
        return users.recordsets;
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}

async function getUser(id) {
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('IDUserAccount', sql.Int, id)
            .execute('ReadUserAccount');
        return users.recordsets;
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}

async function createUser(firstName, lastName, email, password) {
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('FirstName', sql.NVarChar(100), firstName)
            .input('LastName', sql.NVarChar(100), lastName)
            .input('Email', sql.NVarChar(100), email)
            .input('UserPassword', sql.NVarChar(sql.MAX), password)
            .output('IDUserAccount', sql.Int)
            .execute('CreateUserAccount');
        return users.output.IDUserAccount;
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}
async function UpdateUser(id, firstName, lastName, password) {
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('IDUserAccount', sql.Int, id)
            .input('FirstName', sql.NVarChar(100), firstName)
            .input('LastName', sql.NVarChar(100), lastName)
            .input('UserPassword', sql.NVarChar(sql.MAX), password)
            .execute('UpdateUserAccount');
        return users.output;
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}

async function checkUserEmail(email) {
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('Email', sql.NVarChar(sql.MAX), email)
            .query('select * from UserAccount where Email = @Email');
        if (users !== null) {
            if (users.rowsAffected[0] > 0) {
                return users.recordset;
            }
        }
        return null;
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}

async function loginUser(email, password) {
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('Email', sql.NVarChar(100), email)
            .input('UserPassword', sql.NVarChar(sql.MAX), password)
            .execute('LoginUser');
        if (users !== null) {
            if (users.rowsAffected[0] > 0) {
                return users.recordset;
            }
        }
        return null;
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}

async function readQuizzesFromUser(id) {
    try {
        let pool = await sql.connect(config);
        let users = await pool
            .request()
            .input('IDUserAccount', sql.Int, id)
            .execute('ReadQuizzesFromUser');
        if (users !== null) {
            if (users.rowsAffected[0] > 0) {
                return users.recordset;
            }
        }
        return null;
    } catch (err) {
        console.log(err.message);
    } finally {
    }
}

module.exports = {
    getUsers: getUsers,
    getUser: getUser,
    createUser: createUser,
    checkUserEmail: checkUserEmail,
    loginUser: loginUser,
    UpdateUser: UpdateUser,
    readQuizzesFromUser: readQuizzesFromUser,
}