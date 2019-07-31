const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');


class authService {

    authenticate(){

    }

    static hash(pass) {
        return bcrypt.hashSync(pass, 10);
    }

    static checkPass(pass, hash) {
        return bcrypt.compareSync(pass, hash);
    }

    createToken() {
        const options = {
            algorithm: 'RS256'
        };
        return jwt.sign(payload, privateKey, options)
    }

    decodeToken() {
        return jwt.verify(token, publicKey)
    }
}

module.exports = authService;

