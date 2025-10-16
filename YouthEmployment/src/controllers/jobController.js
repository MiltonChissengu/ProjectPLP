import Job from '../models/Job.js';
import Application from '../models/Application.js';

export const getJobs = async (req, res) => {
  const jobs = await Job.findAll();
  res.json(jobs);
};

export const applyJob = async (req, res) => {
  const userId = req.user.id;
  const jobId = req.params.id;
  await Application.create({ UserId: userId, JobId: jobId });
  res.json({ message: 'Application submitted successfully' });
};