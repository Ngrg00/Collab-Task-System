const { Router } = require('express');
const { addTask, getTasks } = require('../controllers/task.js');
const validateToken = require('../middleware/validateToken.js');

const router = Router();

router.post('/addTask', validateToken, addTask);
router.get('/getTasks/:id', validateToken, getTasks);

module.exports = router;