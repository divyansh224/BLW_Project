const express = require("express");
const router = express.Router();
const db = require("../db/database");

router.post("/login", (req, res) => {
  console.log("--- Login attempt received ---"); // Debug log 1
  const { user_id, password, department } = req.body;
  console.log("Request Body:", req.body); // Debug log 2

  if (!user_id || !password || !department) {
    console.log("Error: Missing login fields.");
    return res.status(400).json({ error: "Missing login fields" });
  }

  db.get(
    "SELECT * FROM users WHERE user_id = ? AND department = ?",
    [user_id, department],
    (err, user) => {
      if (err) {
        console.error("❌ Database error:", err.message);
        return res.status(500).json({ error: "Database error" });
      }

      console.log("Database result for user:", user); // Debug log 3

      if (!user) {
        console.log("Login failed: User not found.");
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      console.log("User found. Checking admin status and password..."); // Debug log 4

      if (department === "Administration" && user.user_id !== "admin") {
        console.log("Access Denied: Not the admin user for Administration dept.");
        return res.status(403).json({ error: "Access denied" });
      }

      if (password !== user.password) {
        console.log("Login failed: Incorrect password.");
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      console.log("✅ Login successful!");
      res.status(200).json({ message: "Login successful", role: user.role });
    }
  );
});
router.post("/signup", (req, res) => {
    const { department, name, user_id, password } = req.body;

    if (!department || !user_id || !password) {
        return res.status(400).json({ error: "Missing signup fields" });
    }

    // SECURITY NOTE: The plain 'password' should be hashed before being inserted here
    const query = `
        INSERT INTO users (user_id, password, role, department)
        VALUES (?, ?, ?, ?)
    `;

    db.run(query, [user_id, password, "Technician", department], function (err) {
        if (err) {
            if (err.message.includes("UNIQUE")) {
                return res.status(409).json({ error: "User ID already exists" });
            }
            return res.status(500).json({ error: "Signup failed" });
        }
        res.status(200).json({ message: "Signup successful", role: "Technician" });
    });
});

module.exports = router;