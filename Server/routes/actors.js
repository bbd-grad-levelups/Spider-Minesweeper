// Actors route (testing only)

const express = require('express');
const { pool } = require('../db');
const router = express.Router();

// Get all actors
router.get('/', (req, res) => {
  pool.query('SELECT actorID, FirstName FROM dbo.Actors', (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.json(result.recordset);
  });
});

// Get a specific actor by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  pool.query('SELECT actorID, FirstName FROM dbo.Actors WHERE id = ?', id, (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).send('Internal Server Error');
    }
    if (result.recordset.length === 0) {
      return res.status(404).send('Actor not found');
    }
    res.json(result.recordset[0]);
  });
});

// Add a new actor
router.put('/', (req, res) => {
  const { firstname } = req.body;
  if (!firstname) {
    return res.status(400).send('First name is required');
  }
  pool.query('INSERT INTO dbo.Actors (firstname) VALUES (?)', firstname, (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.status(201).send('Actor added successfully');
  });
});

module.exports = router;
