const bcrypt = require('bcrypt');
const config = require('config');

function hashPassword(password)
{
    const salt = bcrypt.genSaltSync(config.get("bcrypt.salt"));
    return bcrypt.hashSync(password, salt);
}

function comparePassword(password, hash)
{
    // const salt = bcrypt.genSaltSync(config.get("bcrypt.salt"));
    // const newHash = bcrypt.hashSync(password, salt);
    // if (newHash === hash)
    //     return true;
    
    //     console.log(newHash);
    //     console.log(hash);

    // return false;

    return bcrypt.compareSync(password, hash);
}

exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;