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

// Inquiry mailer route
app.use('/api/inquiry', require('./routes/inquiryRoutes'));

// Cloudinary upload route
app.use('/api/upload', require('./routes/uploadRoutes'));

app.get('/', (req, res) => {
    res.send('AIMS Bhubaneswar API is running...');
});

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});
