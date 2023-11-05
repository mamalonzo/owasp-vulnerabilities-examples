// Written by: Marc Malonzo
// Server with broken access control

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const ejs = require('ejs');
const path = require('path');

const app = express();

const db = new sqlite3.Database('database.db');

app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.json());

// Create users table if it doesn't exist
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, name TEXT, password TEXT, bio TEXT)");
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/login.html');
});

// Register a user
app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  const bio = "This is my bio"

  db.run("INSERT INTO users(email, name, password, bio) VALUES(?, ?, ?, ?)", [email, name, password, bio], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Registration failed' });
    }

    console.log(`A row has been inserted with rowid ${this.lastID}`)
    res.json({ userId: this.lastID });
  });
});

// Authenticate a user
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT id FROM users WHERE email = ? AND password = ?", [email, password], (err, row) => {
    if (err) {
      return res.status(401).json({ error: 'Login failed' });
    }

    console.log(`User found with id ${row.id}`)
    res.json({ userId: row.id });
  });
});

// Get user profile
app.get('/profile', (req, res) => {
  const userId = req.query.userId;

  db.get("SELECT name, email, bio FROM users WHERE id = ?", [userId], (err, row) => {
    if (err) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = {
      name: row.name,
      email: row.email,
      bio: row.bio
    };

    ejs.renderFile(__dirname + '/frontend/profile.ejs', {user: userData}, (err, html) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to render profile' });
      }
      res.send(html);
    });
  });
});

// Update user profile
app.put('/profile', (req, res) => {
  const userId = req.query.userId;
  const { name, email, bio } = req.body;

  db.run("UPDATE users SET name = ?, email = ?, bio = ? WHERE id = ?", [name, email, bio, userId], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update profile' });
    }
    console.log(`User with id ${userId} updated`)
    res.json();
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});