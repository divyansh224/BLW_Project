const express = require("express");
const router = express.Router();
const db = require("../db/database");

 // --- ADDED: Route to add a new inventory item ---
router.post("/add", (req, res) => {
  const { department, item, quantity } = req.body;

  // Basic validation
  if (!department || !item || !quantity) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = "INSERT INTO inventory (department, item, quantity) VALUES (?, ?, ?)";
  
  db.run(query, [department, item, quantity], function (err) {
    if (err) {
      // Handle cases where the item might already exist for that department
      if (err.message.includes("UNIQUE constraint failed")) {
        return res.status(409).json({ error: "This item already exists in the specified department." });
      }
      return res.status(500).json({ error: "Database error" });
    }
    // Send back the ID of the new row
    res.status(201).json({ success: true, id: this.lastID });
  });
});

// Get inventory for a department
router.get("/:department", (req, res) => {
  const department = req.params.department;
  db.all(
    //"SELECT item, quantity FROM inventory WHERE department = ?",
     "SELECT * FROM inventory WHERE department = ?",
    [department],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json(rows);
    }
  );
});

// Update inventory count for an item in a department
router.post("/update", (req, res) => {
  const { department, item, quantity } = req.body;
  if (!department || !item || typeof quantity !== "number") {
    return res.status(400).json({ error: "Missing or invalid fields" });
  }
  db.run(
    "UPDATE inventory SET quantity = ? WHERE department = ? AND item = ?",
    [quantity, department, item],
    function (err) {
      if (err) return res.status(500).json({ error: "Database error" });
      if (this.changes === 0) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json({ success: true });
    }
  );
});

// ADD THIS NEW ROUTE TO YOUR inventory.js FILE

// UPDATE an item's maintenance dates
router.put('/update-details', (req, res) => {
    const {
        department,
        item,
        last_maintenance,
        next_maintenance
    } = req.body;

    // Basic validation
    if (!department || !item) {
        return res.status(400).json({ error: 'Missing department or item identifier.' });
    }

    const query = `
        UPDATE inventory 
        SET last_maintenance = ?, next_maintenance = ? 
        WHERE department = ? AND item = ?
    `;

    db.run(query, [last_maintenance, next_maintenance, department, item], function(err) {
        if (err) {
            console.error("Database update error:", err.message);
            return res.status(500).json({ error: 'Database error during update.' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Item not found in the database.' });
        }
        res.status(200).json({ success: true, message: 'Details updated successfully' });
    });
});

module.exports = router;