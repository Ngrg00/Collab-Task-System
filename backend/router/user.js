const express = require('express');
const { register, login, getCurrent } = require('../controllers/user.js');
const validateToken = require('../middleware/validateToken.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/current', validateToken, getCurrent); 

module.exports = router;
