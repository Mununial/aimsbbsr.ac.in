const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(compression());
app.use(cors({
    origin: ["https://aimsbbsr-ac-in-1.onrender.com", "http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/departments', require('./routes/departmentRoutes'));
app.use('/api/faculty', require('./routes/facultyRoutes'));
app.use('/api/notices', require('./routes/noticeRoutes'));
app.use('/api/hero', require('./routes/heroRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/inquiry', require('./routes/inquiryRoutes'));

app.get('/', (req, res) => {
    res.send('AIMS Bhubaneswar API is running...');
});

const db = require('./config/db');

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        await db.query('SELECT 1');
        console.log('✅ Connected to MySQL Database');
    } catch (err) {
        console.error('❌ Database Connection Failed:', err.message);
    }
});
