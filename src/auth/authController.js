const router = require('express').Router();
const userService = new (require('./authService.js'))();

router.post('/authenticate', (req,res) => {

});

module.exports = router;