const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    return console.error('❌ Failed to connect to users.db:', err.message);
  }
  console.log('📦 Connected to users.db');
});

db.serialize(() => {
  // 🧱 Ensure schema exists
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT,
      role TEXT DEFAULT 'user'
    )
  `, (err) => {
    if (err) {
      console.error('❌ Failed to create users table:', err.message);
    } else {
      console.log('✅ Users table is ready');
    }
  });

  // 👤 Seed default admin if no users exist
  db.get(`SELECT COUNT(*) AS count FROM users`, (err, row) => {
    if (err) {
      return console.error('❌ Failed to check user count:', err.message);
    }

    if (row.count === 0) {
      db.run(
        `INSERT INTO users (user_id, password, name, role) VALUES (?, ?, ?, ?)`,
        ['admin', 'password123', 'System Admin', 'admin'],
        (insertErr) => {
          if (insertErr) {
            console.error('❌ Failed to insert default admin:', insertErr.message);
          } else {
            console.log('🔑 Default admin user created (admin / password123)');
          }
        }
      );
    }
  });
});

module.exports = db;