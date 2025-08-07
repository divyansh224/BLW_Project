const express = require("express");
const router = express.Router();
const db = require("../db/database");

router.post("/", (req, res) => {
  const { assetId, description, technician, date } = req.body;

  const query = `INSERT INTO maintenance_logs (assetId, description, technician, date)
                 VALUES (?, ?, ?, ?)`;

  db.run(query, [assetId, description, technician, date], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ success: true });
  });
});
router.get("/:assetId", (req, res) => {
  const query = `SELECT * FROM maintenance_logs WHERE assetId = ?ORDER BY date DESC LIMIT 1`;

  db.get(query, [req.params.assetId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(rows|| {date: "N/A", technician: "N/A"});
  });
});
module.exports = router;
