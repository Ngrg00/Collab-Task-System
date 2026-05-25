const express = require('express');
const validateToken = require('../middleware/validateToken.js');
const { createProject, getProject } = require('../controllers/project.js');

const router = express.Router();

router.post('/createProject', validateToken, createProject);
router.get('/getProject', validateToken, getProject)