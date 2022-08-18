const bcrypt = require('bcryptjs')

const hashPassword = (password) =>{
    const salt = bcrypt.genSaltSync(8)
    return bcrypt.hashSync(password, salt)
}

const checkPassword = (inputPassword, dbPassword) => {
    return bcrypt.compareSync(inputPassword, dbPassword)
}

module.exports = {hashPassword, checkPassword}