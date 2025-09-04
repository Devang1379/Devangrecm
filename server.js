const express = require("express");
const mysql = require("mysql");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static("public")); // serves index.html & script.js

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "your_root_password",
  database: "testdb",
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ MySQL Connected");
});

// Ensure table exists
db.query(`
  CREATE TABLE IF NOT EXISTS persons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

// API route to save data
app.post("/submit", (req, res) => {
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).json({ error: "Name and age are required" });
  }

  const sql = "INSERT INTO persons (name, age) VALUES (?, ?)";
  db.query(sql, [name, age], (err, result) => {
    if (err) return res.status(500).json({ error: "DB insert failed" });
    res.json({ id: result.insertId, name, age });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on https://654fa922c34f.ngrok-free.app`)              ;
});
