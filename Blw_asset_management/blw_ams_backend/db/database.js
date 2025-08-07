const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Use absolute path for database file
const dbPath = path.join(__dirname, "blw.db");
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database", err.message);
    } else {
        // Enable foreign key support
        db.run("PRAGMA foreign_keys = ON;", (err) => {
            if (err) {
                console.error("Failed to enable foreign keys:", err.message);
            }
        });
    }
});

db.serialize(() => {
  // --- Inventory Table with Unique Constraint ---
 
  db.run(`CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    department TEXT NOT NULL,
    item TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    mfg_date TEXT,
    warranty_unto TEXT,
    last_maintenance TEXT,
    next_maintenance TEXT,
    UNIQUE(department, item)
)`);

  // --- Assets Table (No changes needed) ---
  db.run(`CREATE TABLE IF NOT EXISTS assets (
    id TEXT PRIMARY KEY,
    name TEXT,
    category TEXT,
    location TEXT,
    status TEXT,
    lastMaintenance TEXT,
    purchaseDate TEXT,
    warrantyExpiry TEXT,
    assignedUser TEXT
  )`);

  // --- Maintenance Logs Table with Foreign Key ---
  db.run(`CREATE TABLE IF NOT EXISTS maintenance_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    assetId TEXT NOT NULL, -- Changed to NOT NULL
    description TEXT,
    technician TEXT,
    date TEXT,
    FOREIGN KEY(assetId) REFERENCES assets(id) ON DELETE CASCADE -- Links to assets table
  )`);
});

module.exports = db;