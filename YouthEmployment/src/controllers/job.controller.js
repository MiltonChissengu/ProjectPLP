// src/controllers/job.controller.js
const Job = require('../models/job.model');
const Application = require('../models/application.model');

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll({ order: [['createdAt', 'DESC']] });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createJob = async (req, res) => {
  try {
    // só empregadores podem criar — aqui simplificamos: se role === 'EMPLOYER'
    if (!req.user || req.user.role !== 'EMPLOYER') return res.status(403).json({ error: 'Only employers can create vacancies' });

    const { employer_name, title, description, location, salary } = req.body;
    if (!title || !description) return res.status(400).json({ error: 'Incomplete data' });

    const job = await Job.create({ employer_name, title, description, location, salary });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.applyJob = async (req, res) => {
  try {
    const user = req.user;
    const jobId = req.params.id;
    if (!user) return res.status(401).json({ error: 'Authentication required' });

    // previne duplicata simples
    const exists = await Application.findOne({ where: { UserId: user.id, JobId: jobId } });
    if (exists) return res.status(400).json({ error: 'You have already applied for this position' });

    const app = await Application.create({ UserId: user.id, JobId: jobId });
    res.json({ message: 'Application submitted', application: app });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
