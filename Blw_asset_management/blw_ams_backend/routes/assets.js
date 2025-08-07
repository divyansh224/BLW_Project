const express = require("express");
const router = express.Router();
const db = require("../db/database");

// GET /assets - Get all assets with their latest maintenance log
router.get("/", (req, res) => {
  const query = `
    SELECT
      a.*,
      m.date as lastLogDate,
      m.technician as lastLogTechnician
    FROM
      assets a
    LEFT JOIN
      (SELECT assetId, MAX(date) as max_date FROM maintenance_logs GROUP BY assetId) latest_logs
      ON a.id = latest_logs.assetId
    LEFT JOIN
      maintenance_logs m
      ON latest_logs.assetId = m.assetId AND latest_logs.max_date = m.date
  `;

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(rows);
  });
});

// POST /assets - Create a new asset
router.post("/", (req, res) => {
  const { id, name, category, location, status, lastMaintenance, purchaseDate, warrantyExpiry, assignedUser } = req.body;
  const query = `INSERT INTO assets (id, name, category, location, status, lastMaintenance, purchaseDate, warrantyExpiry, assignedUser) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.run(query, [id, name, category, location, status, lastMaintenance, purchaseDate, warrantyExpiry, assignedUser], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ success: true, id: this.lastID });
    }
  );
});

// GET /assets/:id - Get a single asset
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM assets WHERE id = ?";
  db.get(query, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "Asset not found" });
    res.status(200).json(row);
  });
});

// PUT /assets/:id - Update an asset
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, category, location, status, lastMaintenance } = req.body;
    const query = `UPDATE assets SET name = ?, category = ?, location = ?, status = ?, lastMaintenance = ? WHERE id = ?`;
    db.run(query, [name, category, location, status, lastMaintenance, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Asset not found' });
        res.status(200).json({ success: true });
    });
});

module.exports = router;