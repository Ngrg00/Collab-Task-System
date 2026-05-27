const express = require('express');
const { register, login, getCurrent, getProjectCreator } = require('../controllers/user.js');
const validateToken = require('../middleware/validateToken.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/current', validateToken, getCurrent); 
router.get('/projectCreator/:id', validateToken, getProjectCreator);

module.exports = router;
