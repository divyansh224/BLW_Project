const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit-table"); // Using pdfkit-table for better formatting
const db = require("../db/database");
const fs = require('fs');
const path = require('path');

// Helper function to add a standard header to each PDF page
const addHeader = (doc) => {
    // Ensure you have a logo image at 'blw_ams_backend/assets/logo.png'
    const logoPath = path.join(__dirname, 'assets/logo.png');
    if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 50, 45, { width: 50 });
    }

    doc.fontSize(18).text('BLW Asset Management Report', 110, 57);
    doc.moveTo(50, 100).lineTo(550, 100).stroke(); // Header line
};

// Helper function to add a footer to each PDF page
const addFooter = (doc) => {
    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
        doc.switchToPage(i);
        doc.fontSize(8).text(`Page ${i + 1} of ${range.count}`, 50, 750, { align: 'right', width: 500 });
        doc.fontSize(8).text(`Generated on: ${new Date().toLocaleDateString()}`, 50, 750, { align: 'left' });
    }
};

// Route for generating a departmental inventory PDF
router.get("/inventory/:department/pdf", (req, res) => {
  const department = req.params.department;

  db.all("SELECT item, quantity FROM inventory WHERE department = ?", [department], (err, rows) => {
    if (err || !rows || rows.length === 0) {
      return res.status(404).send("No inventory data found for this department.");
    }

    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${department}_inventory_report.pdf`);
    doc.pipe(res);

    addHeader(doc);
    doc.fontSize(18).text(`Department: ${department}`, { align: 'center' });
    doc.moveDown(2);

    const table = {
        headers: ["Item Name", "Quantity"],
        rows: rows.map(row => [row.item, row.quantity])
    };

    doc.table(table, {
        prepareHeader: () => doc.font('Helvetica-Bold').fontSize(16),
        prepareRow: (row, i) => doc.font('Helvetica').fontSize(16)
    });

    addFooter(doc);
    doc.end();
  });
});

// Route for generating a PDF for a single asset
router.get("/assets/:id", (req, res) => {
  const assetId = req.params.id;

  db.get("SELECT * FROM assets WHERE id = ?", [assetId], (err, asset) => {
    if (err || !asset) {
      return res.status(404).send("Asset not found.");
    }

    db.get("SELECT date, technician FROM maintenance_logs WHERE assetId = ? ORDER BY date DESC LIMIT 1", [assetId], (err, log) => {
        const lastMaint = log ? `${log.date} by ${log.technician}` : asset.lastMaintenance || "N/A";
        
        const doc = new PDFDocument({ margin: 50, size: 'A4' });
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=asset_${assetId}_report.pdf`);
        doc.pipe(res);

        addHeader(doc);
        doc.fontSize(20).text(`Individual Asset Report: ${asset.name}`, { align: 'center' });
        doc.moveDown(0.5);

        const table = {
            headers: ["Field", "Value"], // These headers will be hidden
            rows: [
                ["Asset ID", asset.id],
                ["Name", asset.name],
                ["Category", asset.category],
                ["Location", asset.location],
                ["Status", asset.status],
                ["Purchase Date", asset.purchaseDate || "N/A"],
                ["Warranty Expiry", asset.warrantyExpiry || "N/A"],
                ["Last Maintenance", lastMaint]
            ]
        };

        doc.table(table, {
            prepareHeader: () => doc.font('Helvetica-Bold').fontSize(14),
            prepareRow: (row, i) => doc.font('Helvetica').fontSize(14),
            hideHeader: true,
            columnsSize: [180, 350] // Custom column widths
        });
        
        addFooter(doc);
        doc.end();
    });
  });
});

// Note: The GET /assets route for a full report is not included here
// but can be added back using a similar table structure.

module.exports = router;