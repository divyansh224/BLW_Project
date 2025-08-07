// File: blw-login-backend/inventory.js
const path = require('path');
const sqlite3 = require('sqlite3').verbose();


// Create a proper path to the inventory database file in the subfolder
const dbPath = path.join(__dirname, 'blw_login_full_background', 'BLW_Inventory_Package', 'inventory.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Failed to connect to inventory database:", err.message);
  } else {
    console.log("✅ Connected to inventory database.");
  }
});

// Initialize the inventory table (if it doesn't exist)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      rfid TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      department TEXT NOT NULL,
      in_use INTEGER DEFAULT 0,
      in_repair INTEGER DEFAULT 0,
      available INTEGER DEFAULT 0
    )
  `, (err) => {
    if (err) {
      console.error("❌ Error creating inventory table:", err.message);
    } else {
      console.log("✅ Inventory table is ready to use.");
    }
  });
});

module.exports = db;