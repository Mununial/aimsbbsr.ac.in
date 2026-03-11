const express = require('express');
const router = express.Router();
const db = require('../config/db');
const verifyToken = require('../middleware/auth');
const upload = require('../middleware/upload');

// Get all
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT f.*, d.department_name FROM faculty f LEFT JOIN departments d ON f.department_id = d.id');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add with image
router.post('/', verifyToken, upload.single('photo'), async (req, res) => {
    const { name, designation, qualification, department_id } = req.body;
    const photo = req.file ? req.file.path.replace(/\\/g, "/") : null;
    try {
        const [result] = await db.query('INSERT INTO faculty (name, designation, qualification, department_id, photo) VALUES (?, ?, ?, ?, ?)', [name, designation, qualification, department_id, photo]);
        res.json({ id: result.insertId, name, designation, qualification, department_id, photo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update
router.put('/:id', verifyToken, upload.single('photo'), async (req, res) => {
    const { name, designation, qualification, department_id } = req.body;
    let photo = req.body.photo; // existing photo path
    if (req.file) {
        photo = req.file.path.replace(/\\/g, "/");
    }
    try {
        await db.query('UPDATE faculty SET name = ?, designation = ?, qualification = ?, department_id = ?, photo = ? WHERE id = ?', [name, designation, qualification, department_id, photo, req.params.id]);
        res.json({ message: "Faculty updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await db.query('DELETE FROM faculty WHERE id = ?', [req.params.id]);
        res.json({ message: "Faculty deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
