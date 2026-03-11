const express = require('express');
const router = express.Router();
const db = require('../config/db');
const verifyToken = require('../middleware/auth');
const upload = require('../middleware/upload');

// Get all
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM gallery ORDER BY upload_date DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add with image
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
    const { category, title, description } = req.body;
    const image_url = req.file ? req.file.path.replace(/\\/g, "/") : null;
    try {
        await db.query('INSERT INTO gallery (image_url, title, category, description) VALUES (?, ?, ?, ?)', [image_url, title, category, description]);
        res.json({ message: "Image added to gallery" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await db.query('DELETE FROM gallery WHERE id = ?', [req.params.id]);
        res.json({ message: "Image deleted from gallery" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
