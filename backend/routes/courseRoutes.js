const express = require('express');
const router = express.Router();
const db = require('../config/db');
const verifyToken = require('../middleware/auth');

// Get all
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM courses');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add
router.post('/', verifyToken, async (req, res) => {
    const { course_name, duration, description } = req.body;
    try {
        await db.query('INSERT INTO courses (course_name, duration, description) VALUES (?, ?, ?)', [course_name, duration, description]);
        res.json({ message: "Course added" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update
router.put('/:id', verifyToken, async (req, res) => {
    const { course_name, duration, description } = req.body;
    try {
        await db.query('UPDATE courses SET course_name = ?, duration = ?, description = ? WHERE id = ?', [course_name, duration, description, req.params.id]);
        res.json({ message: "Course updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await db.query('DELETE FROM courses WHERE id = ?', [req.params.id]);
        res.json({ message: "Course deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
