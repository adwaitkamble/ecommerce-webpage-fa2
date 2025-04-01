
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
  database: 'commerece' // Using the database name from the SQL
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

// Admin Login - Modified to properly check credentials
app.post('/api/admin/login', (req, res) => {
  const { adminId, firstName, lastName } = req.body;
  
  console.log('Login attempt:', { adminId, firstName, lastName });
  
  const query = 'SELECT * FROM Admin WHERE Admin_ID = ? AND First_Name = ? AND Last_Name = ?';
  
  db.query(query, [adminId, firstName, lastName], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    console.log('Query results:', results);
    
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Return admin data with proper capitalization
    const admin = {
      id: results[0].Admin_ID,
      firstName: results[0].First_Name,
      lastName: results[0].Last_Name,
      role: results[0].Admin_Role
    };
    
    res.json({ success: true, admin });
  });
});

// Consumer Login
app.post('/api/consumer/login', (req, res) => {
  const { consumerId, firstName, lastName } = req.body;
  
  const query = 'SELECT * FROM Consumer WHERE Consumer_ID = ? AND First_Name = ? AND Last_Name = ?';
  
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
  const query = `
    SELECT p.*, pc.Category_Name 
    FROM Product p
    JOIN Product_Category pc ON p.Category_ID = pc.Category_ID
  `;
  
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
  const query = `
    SELECT o.*, 
           c.First_Name, c.Last_Name,
           p.Payment_Method, p.Payment_Status
    FROM Orders o
    LEFT JOIN Consumer c ON o.Consumer_ID = c.Consumer_ID
    LEFT JOIN Payment p ON o.Order_No = p.Order_No
  `;
  
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
  const query = `
    SELECT c.*, 
           GROUP_CONCAT(cc.Contact_No) as Contact_Numbers
    FROM Consumer c
    LEFT JOIN Consumer_Contact cc ON c.Consumer_ID = cc.Consumer_ID
    GROUP BY c.Consumer_ID
  `;
  
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
  const query = `
    SELECT s.*, 
           GROUP_CONCAT(sa.Address) as Addresses
    FROM Supplier s
    LEFT JOIN Supplier_Address sa ON s.Supplier_ID = sa.Supplier_ID
    GROUP BY s.Supplier_ID
  `;
  
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
