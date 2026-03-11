const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate Limiting: 100 requests per 15 minutes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use('/api/', limiter);

// Data Sanitization
app.use(hpp()); // Protect against HTTP Parameter Pollution

// Middleware
app.use(compression());
app.use(cors({
    origin: ["https://aimsbbsr-ac-in-1.onrender.com", "http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

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
