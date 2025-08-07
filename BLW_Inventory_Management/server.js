const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

// 🗂️ Database Connections
const inventoryDB = require('./inventory');  // Inventory DB
const userDB = require('./database');        // User DB

// 🌐 Middleware
app.use(cors());
app.use(express.json());

// 🧾 Serve static assets
app.use(express.static(path.join(__dirname, 'blw_login_full_background')));

// 🔐 Login Page Direct Access
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'blw_login_full_background', 'login.html'));
});

// 📦 Dashboard Page
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'blw_login_full_background', 'BLW_Inventory_Package', 'dashboard.html'));
});

// 📋 Inventory Page
app.get('/inventory', (req, res) => {
  res.sendFile(path.join(__dirname, 'blw_login_full_background', 'BLW_Inventory_Package', 'inventory.html'));
});

// 🧾 Get all inventory parts
app.get('/api/parts', (req, res) => {
  inventoryDB.all('SELECT * FROM inventory', (err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch parts' });
    res.json(rows);
  });
});

// 🔁 Update part values
app.post('/api/parts/update', (req, res) => {
  const { rfid, field, value } = req.body;
  const allowed = ['in_use', 'in_repair', 'available'];

  if (!allowed.includes(field)) {
    return res.status(400).json({ error: 'Invalid field' });
  }

  const query = `UPDATE inventory SET ${field} = ${field} + ? WHERE rfid = ?`;
  inventoryDB.run(query, [value, rfid], function(err) {
    if (err) return res.status(500).json({ error: 'Update failed' });
    res.json({ message: 'Update successful' });
  });
});

// 📊 Summary stats for dashboard
app.get('/api/summary', (req, res) => {
  const summaryQuery = `
    SELECT 
      SUM(in_use) AS in_use_total,
      SUM(in_repair) AS in_repair_total,
      SUM(available) AS available_total
    FROM inventory
  `;
  inventoryDB.get(summaryQuery, (err, row) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch summary' });
    res.json(row);
  });
});

// 🔐 Login from users.db
app.post('/api/login', (req, res) => {
  const { user_id, password } = req.body;
  const query = `SELECT * FROM users WHERE user_id = ? AND password = ?`;

  userDB.get(query, [user_id, password], (err, row) => {
    if (err) {
      console.error('❌ DB Error during login:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (!row) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ message: 'Login success', name: row.name || 'User' });
  });
});

// 📝 Sign-Up from modal
app.post('/api/signup', (req, res) => {
  const { user_id, password, name } = req.body;
console.log("Signup request received:",{ user_id,name});
  if (!user_id || !password || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Check if user already exists
  userDB.get(`SELECT * FROM users WHERE user_id = ?`, [user_id], (err, row) => {
    if (err){
      console.error("❌ SELECT error:",err.message); return res.status(500).json({ error: 'Database error during signup' });}
    if (row) {return res.status(409).json({ error: 'User ID already exists'});}
    // Insert new user
    const query = `INSERT INTO users (user_id, password, name) VALUES (?, ?, ?)`;
    userDB.run(query, [user_id, password, name], function(err) {
      if (err){
        console.error('❌ DB Insert Error:',err.message);
        return res.status(500).json({ error: 'Failed to create user' });
      }
      res.json({ message: 'Sign-up successful!' });
    });
  });
});

// 🟢 Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});