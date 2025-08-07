const db = require("./database");
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT,
    department TEXT
  )
`, err => {
  if (err) {
    console.error("❌ Failed to create users table:", err.message);
    return;
  }

  console.log("✅ Users table created or already exists.");

  // 🎯 Insert default admin using user_id
  const query = `INSERT INTO users (user_id, password, role, department) VALUES (?, ?, ?, ?)`;

  db.run(query, ["admin", "admin123", "Admin", "General Administration"], function (err) {
    if (err) {
      if (err.message.includes("UNIQUE")) {
        console.log("⚠️ Default user 'admin' already exists.");
      } else {
        console.error("❌ Failed to insert default user:", err.message);
      }
    } else {
      console.log("✅ Default user 'admin' added.");
    }
  });
});
