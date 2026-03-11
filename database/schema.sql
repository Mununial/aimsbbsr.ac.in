CREATE DATABASE IF NOT EXISTS ayush_medical;
USE ayush_medical;

-- Admin Table
CREATE TABLE IF NOT EXISTS admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Courses Table
CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    description TEXT
);

-- Departments Table
CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    course_id INT,
    description TEXT,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL
);

-- Faculty Table
CREATE TABLE IF NOT EXISTS faculty (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    designation VARCHAR(100),
    qualification VARCHAR(100),
    department_id INT,
    photo VARCHAR(255),
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- Notices Table
CREATE TABLE IF NOT EXISTS notices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    category ENUM('Campus', 'Laboratories', 'Events', 'Seminars') DEFAULT 'Campus',
    description TEXT,
    upload_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert Default Admin (password: admin123 - hashed version should be used in production)
-- For now, let's just leave it to be inserted via a script later or manually.
INSERT INTO admin (username, password) VALUES ('admin', '$2a$10$7rLSvRl15Zp8KAt9.DInIuYVv.M.Mh5L4g3vGv3z7vI8L9k/0.f2i'); 
-- password is 'admin123' hashed with bcrypt
