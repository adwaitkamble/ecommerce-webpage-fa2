
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Replace with your MySQL username
  password: '',      // Replace with your MySQL password
  database: 'ecommerce_db' // Replace with your database name
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Routes
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend connection successful!' });
});

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { adminId, firstName, lastName } = req.body;
  
  const query = 'SELECT * FROM admins WHERE admin_id = ? AND first_name = ? AND last_name = ?';
  
  db.query(query, [adminId, firstName, lastName], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    res.json({ success: true, admin: results[0] });
  });
});

// Consumer Login
app.post('/api/consumer/login', (req, res) => {
  const { consumerId, firstName, lastName } = req.body;
  
  const query = 'SELECT * FROM consumers WHERE consumer_id = ? AND first_name = ? AND last_name = ?';
  
  db.query(query, [consumerId, firstName, lastName], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    res.json({ success: true, consumer: results[0] });
  });
});

// Products API
app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM products';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.json(results);
  });
});

// Orders API
app.get('/api/orders', (req, res) => {
  const query = 'SELECT * FROM orders';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.json(results);
  });
});

// Consumers API
app.get('/api/consumers', (req, res) => {
  const query = 'SELECT * FROM consumers';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching consumers:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.json(results);
  });
});

// Suppliers API
app.get('/api/suppliers', (req, res) => {
  const query = 'SELECT * FROM suppliers';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching suppliers:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.json(results);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
