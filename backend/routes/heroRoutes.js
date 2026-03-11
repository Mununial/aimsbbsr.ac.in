const express = require('express');
const router = express.Router();
const db = require('../config/db');
const verifyToken = require('../middleware/auth');
const upload = require('../middleware/upload');

// Get all slides
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM hero ORDER BY order_id ASC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add slide
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
    const { title, subtitle, description, order_id, media_type } = req.body;
    const image_url = req.file ? req.file.path.replace(/\\/g, "/") : null;
    try {
        await db.query('INSERT INTO hero (image_url, media_type, title, subtitle, description, order_id) VALUES (?, ?, ?, ?, ?, ?)',
            [image_url, media_type || 'image', title, subtitle, description, order_id || 0]);
        res.json({ message: "Hero slide added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update slide
router.put('/:id', verifyToken, upload.single('image'), async (req, res) => {
    const { title, subtitle, description, order_id, media_type } = req.body;
    let image_url = req.body.image_url;
    if (req.file) {
        image_url = req.file.path.replace(/\\/g, "/");
    }
    try {
        await db.query('UPDATE hero SET image_url = ?, media_type = ?, title = ?, subtitle = ?, description = ?, order_id = ? WHERE id = ?',
            [image_url, media_type, title, subtitle, description, order_id, req.params.id]);
        res.json({ message: "Hero slide updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete slide
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await db.query('DELETE FROM hero WHERE id = ?', [req.params.id]);
        res.json({ message: "Hero slide deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
