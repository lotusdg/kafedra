const router = require('express').Router();
const authService = require('./authService.js');

router.post('/authenticate', (req,res) => {
    const result = authService.authenticate(req.body);
    res.status(result ? 200 : 401).json(result);
});

module.exports = router;