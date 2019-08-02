const uuid = require('uuid/v1');
const AuthService = require('../auth/authService.js');
const db = require('../db.js');

//let users = [{id: '3c6cb310-b390-11e9-ab74-75a34bd43f1a', name: 'petro', pass: AuthService.hash('incognito')}];

class UserService {

    constructor() {
        this.pool = db.getPool();
    }

    async getAll() {
        return await this.pool.query(`SELECT * FROM users`);
    }

    async create(user) {
        user.id = uuid();
        user.pass = AuthService.hash(user.pass);
        return await this.pool.query(`INSERT into users (login,pass) VALUES ($1, $2)`, [
            user.name,
            user.pass
        ]);
    };

    getById(id) {
        return users.find(user => user.id === id);
    }

    delete (id){
        let d = users.findIndex(user => user.id === id);
        users.splice(d,1);
        return {n:d === -1 ? 0 : 1};
    }

    update (user) {
        let u = users.findIndex(u => u.id === user.id);
        users[u].name = user.name;
        if (user.pass)
            users[u].pass = AuthService.hash(user.pass);
        return users[u];
    }
}

module.exports = UserService;