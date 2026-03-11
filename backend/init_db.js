const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function initializeDatabase() {
    // Initial connection without database name
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: 3306,
        ssl: { rejectUnauthorized: false }
    });

    try {
        console.log("⏳ Connected to AWS RDS. Creating database...");

        // 1. Create Database
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
        await connection.query(`USE \`${process.env.DB_NAME}\``);
        console.log(`✅ Database '${process.env.DB_NAME}' ready.`);

        // 2. Admin Table
        await connection.query(`CREATE TABLE IF NOT EXISTS admin (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        )`);

        // 3. Courses Table
        await connection.query(`CREATE TABLE IF NOT EXISTS courses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            duration VARCHAR(50),
            description TEXT
        )`);

        // 4. Faculty Table
        await connection.query(`CREATE TABLE IF NOT EXISTS faculty (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            designation VARCHAR(255),
            qualification VARCHAR(255),
            department_name VARCHAR(100),
            photo VARCHAR(255)
        )`);

        // 5. Notices Table
        await connection.query(`CREATE TABLE IF NOT EXISTS notices (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            category VARCHAR(100),
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            link VARCHAR(255),
            is_new BOOLEAN DEFAULT TRUE
        )`);

        // 6. Gallery Table
        await connection.query(`CREATE TABLE IF NOT EXISTS gallery (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255),
            category VARCHAR(100),
            image_url VARCHAR(255) NOT NULL,
            description TEXT
        )`);

        // 7. Inquiry Table
        await connection.query(`CREATE TABLE IF NOT EXISTS inquiries (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255),
            phone VARCHAR(20),
            category VARCHAR(100),
            message TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

        // 8. Create Default Admin
        const hashedPassword = await bcrypt.hash('Aims@2026', 10);
        await connection.query('INSERT IGNORE INTO admin (username, password) VALUES (?, ?)',
            ['aimsbbsrsupport@gmail.com', hashedPassword]
        );

        console.log("✅ All Tables Created Successfully!");
        console.log("✅ Admin Created: aimsbbsrsupport@gmail.com / Aims@2026");

    } catch (err) {
        console.error("❌ Database Initialization Failed:", err.message);
    } finally {
        await connection.end();
        process.exit();
    }
}

initializeDatabase();
