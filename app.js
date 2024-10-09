const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');


const app = express();
const PORT = 3000;

// PostgreSQL connection configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


// Route to test database connection
app.get('/db-check', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Database connected successfully! Current time: ${result.rows[0].now}`);
  } catch (err) {
    res.status(500).send('Database connection failed: ' + err.message);
  }
});

app.get('/', (req, res) => {
  res.send('Hello, World! This is a Node.js app connected to PostgreSQL.');
});

// Route to render a form for data submission
app.get('/db', (req, res) => {
  res.send(`
    <form method="POST" action="/submit">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required />
      <button type="submit">Submit</button>
    </form>
  `);
});

// Route to handle form submissions and insert data into the database
app.post('/submit', async (req, res) => {
  const { name } = req.body;

  try {
    const result = await pool.query('INSERT INTO users (name) VALUES ($1) RETURNING *', [name]);
    res.send(`User added: ${result.rows[0].name}`);
  } catch (err) {
    res.status(500).send('Error inserting data: ' + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

