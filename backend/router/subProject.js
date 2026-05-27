const express = require('express');
const validateToken = require('../middleware/validateToken.js');
const { getSubProjects, addSubProject } = require('../controllers/subProject.js');

const router = express.Router();

router.post('/addSubProject', validateToken, addSubProject);
router.get('/getSubProject/:id', validateToken, getSubProjects);

module.exports = router;