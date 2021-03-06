const router = require('express').Router();
const userService = new (require('./userService.js'))();

router.get('/', (req,res) => {
    const users = userService.getAll();
    res.send(users);
});

router.post('/', (req,res) => {
    userService.create(req.body);
    res.sendStatus(201);
});

router.get('/:id', (req,res) => {
    const users = userService.getById(req.params.id);
    res.send(users);

});

router.delete('/:id', (req,res) => {
    const result = userService.delete(req.params.id);
    res.send(result);
});

router.put('/', (req,res) => {
    const result = userService.update(req.body);
    res.send(result);
});

module.exports = router;