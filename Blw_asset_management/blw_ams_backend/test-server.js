const express = require("express");
const app = express();
const PORT = 3000;

// 1. A specific route
app.get("/test", (req, res) => {
  res.send("You reached the specific /test page.");
});

// 2. The catch-all route using '*'
app.get("*", (req, res) => {
  res.send("This is the CATCH-ALL page because the URL wasn't '/test'.");
});

app.listen(PORT, () => {
  console.log(`✅ Test server is running on http://localhost:${PORT}`);
});