const express = require('express');
const router = express.Router();
const pool = require('../db/connection');

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM jobs');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const hour = date.getHours();
const minutes = date.getMinutes();
const secound = date.getSeconds();
const createdAt = `${year}-${month}-${day} ${hour}:${minutes}:${secound}`;
const updatedAt = `${year}-${month}-${day} ${hour}:${minutes}:${secound}`;

router.post('/', async (req, res) => {
  const { employer, title, description, location, salary } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO jobs 
      (employer_name, title, description, location, salary, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [employer, title, description, location, salary, createdAt, updatedAt]
    );

    console.log("RESULTADO MYSQL:", result);

    res.json({ id: result.insertId, message: 'Job added successfully' });

  } catch (err) {
    console.error("ERRO SQL:", err);
    res.status(500).json({ error: err.message });
  }
});


// Update job
router.put('/:id', async (req, res) => {
  const { employer, title , description, location, salary } = req.body;
  const { id } = req.params;
  try {
    await pool.query(
      'UPDATE jobs SET employer_name=?, title=?, description=?, location=?, salary=?, createdAt=?, updatedAt=? WHERE id=?',
      [employer, title , description, location, salary, createdAt, updatedAt, id]
    );
    res.json({ message: 'Job updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete job
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM jobs WHERE id=?', [id]);
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;