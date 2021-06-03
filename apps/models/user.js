const q = require('q');
const db = require('../common/database');

const conn = db.getConnection();

function addUser(user)
{
    if (user)
    {
        const defer = q.defer();

        conn.query('INSERT INTO user SET ?', user, (err, result) => {
            if (err)
                defer.reject(err);
            else 
                defer.resolve(result);
        });

        return defer.promise;
    }
}

function findUserByEmail(email)
{
    if (email)
    {
        const defer = q.defer();

        conn.query('SELECT * FROM user WHERE ?', {email: email}, (err, result) => {
            if (err)
                defer.reject(err);
            else 
                defer.resolve(result);
        });

        return defer.promise;
    }

    return false;
}

exports.addUser = addUser;
exports.findUserByEmail = findUserByEmail;