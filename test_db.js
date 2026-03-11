const db = require('./backend/config/db');

async function testDB() {
    try {
        const [rows] = await db.query('SELECT * FROM notices');
        console.log('Notices found:', rows.length);
    } catch (err) {
        console.error('Database Error:', err.message);
    } finally {
        // Since it's a pool, we should ideally close it if it's a one-off script, 
        // but for now, we'll let it exit after timeout or just ctrl+c if needed.
        process.exit();
    }
}

testDB();
