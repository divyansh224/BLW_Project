const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Frontend Static Files
app.use(express.static(path.join(__dirname, "../blw_ams_frontend")));

// Route Imports
const inventoryRoutes = require("./routes/inventory");
const authRoutes = require("./routes/auth");
const assetRoutes = require("./routes/assets");
const maintenanceRoutes = require("./routes/maintenance");
const reportRoutes = require("./routes/reports");

// API Route Mounting
app.use("/inventory", inventoryRoutes);
app.use("/auth", authRoutes);
app.use("/assets", assetRoutes);
app.use("/maintenance", maintenanceRoutes);
app.use("/reports", reportRoutes);

// ✅ Refined Catch-All Frontend Route (avoids conflict with API paths)
app.get(/^\/(?!api|inventory|auth|assets|maintenance|reports).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../blw_ams_frontend/login.html"));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Server Start
app.listen(PORT, () => {
  console.log(`✅ BLW backend running on http://localhost:${PORT}`);
});