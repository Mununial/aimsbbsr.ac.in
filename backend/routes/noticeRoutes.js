const express = require('express');
const router = express.Router();
const db = require('../config/db');
const verifyToken = require('../middleware/auth');

// Get all
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM notices ORDER BY date DESC');
        res.json(rows);
    } catch (err) {
        console.error("Database Error:", err.message);
        // Fallback to empty array instead of 500 to let frontend handle it gracefully
        res.json([]);
    }
});

// Add
router.post('/', verifyToken, async (req, res) => {
    const { title, description } = req.body;
    try {
        const [result] = await db.query('INSERT INTO notices (title, description) VALUES (?, ?)', [title, description]);
        res.json({ id: result.insertId, title, description });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update
router.put('/:id', verifyToken, async (req, res) => {
    const { title, description } = req.body;
    try {
        await db.query('UPDATE notices SET title = ?, description = ? WHERE id = ?', [title, description, req.params.id]);
        res.json({ message: "Notice updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await db.query('DELETE FROM notices WHERE id = ?', [req.params.id]);
        res.json({ message: "Notice deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
