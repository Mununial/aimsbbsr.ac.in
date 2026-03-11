const express = require('express');
const router = express.Router();
const db = require('../config/db');
const verifyToken = require('../middleware/auth');

// Get all
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT d.*, c.course_name FROM departments d LEFT JOIN courses c ON d.course_id = c.id');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add
router.post('/', verifyToken, async (req, res) => {
    const { department_name, course_id, description } = req.body;
    try {
        await db.query('INSERT INTO departments (department_name, course_id, description) VALUES (?, ?, ?)', [department_name, course_id, description]);
        res.json({ message: "Department added" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update
router.put('/:id', verifyToken, async (req, res) => {
    const { department_name, course_id, description } = req.body;
    try {
        await db.query('UPDATE departments SET department_name = ?, course_id = ?, description = ? WHERE id = ?', [department_name, course_id, description, req.params.id]);
        res.json({ message: "Department updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await db.query('DELETE FROM departments WHERE id = ?', [req.params.id]);
        res.json({ message: "Department deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
