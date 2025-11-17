// src/routes/job.routes.js
const express = require('express');
const router = express.Router();
const jobCtrl = require('../controllers/job.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', jobCtrl.getJobs);
router.post('/', protect, jobCtrl.createJob); // criar vaga (empregador)
router.post('/:id/apply', protect, jobCtrl.applyJob);



module.exports = router;
