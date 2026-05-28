const { Router } = require('express');
const { addTask, getTasks, getTask } = require('../controllers/task.js');
const validateToken = require('../middleware/validateToken.js');

const router = Router();

router.post('/addTask', validateToken, addTask);
router.get('/getTasks/:id', validateToken, getTasks);
router.get('/getTask/:id', validateToken, getTask);

module.exports = router;