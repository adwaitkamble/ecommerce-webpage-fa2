
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

// Admin Login - Added more detailed debugging and fixed case sensitivity issues
app.post('/api/admin/login', (req, res) => {
  const { adminId, firstName, lastName } = req.body;
  
  console.log('Login attempt:', { adminId, firstName, lastName });
  
  // First query the database to see if we can find the admin ID
  db.query('SELECT * FROM Admin WHERE Admin_ID = ?', [adminId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    console.log('Found admin by ID:', results);
    
    if (results.length === 0) {
      return res.status(401).json({ error: 'Admin ID not found' });
    }
    
    // Admin ID found, now check if the names match (case insensitive)
    const admin = results[0];
    const dbFirstName = admin.First_Name.toLowerCase();
    const dbLastName = admin.Last_Name.toLowerCase();
    const inputFirstName = firstName.toLowerCase();
    const inputLastName = lastName.toLowerCase();
    
    console.log('Comparing names:', { 
      dbFirstName, inputFirstName, firstNameMatch: dbFirstName === inputFirstName,
      dbLastName, inputLastName, lastNameMatch: dbLastName === inputLastName 
    });
    
    if (dbFirstName === inputFirstName && dbLastName === inputLastName) {
      // Names match, return success
      const adminData = {
        id: admin.Admin_ID,
        firstName: admin.First_Name,
        lastName: admin.Last_Name,
        role: admin.Admin_Role
      };
      
      console.log('Login successful, returning admin data:', adminData);
      return res.json({ success: true, admin: adminData });
    } else {
      // Names don't match
      console.log('Name mismatch, login failed');
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

// Consumer Login with improved error handling and debugging
app.post('/api/consumer/login', (req, res) => {
  const { consumerId, firstName, lastName } = req.body;
  
  console.log('Consumer login attempt:', { consumerId, firstName, lastName });
  
  if (!consumerId || !firstName || !lastName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Query the database with exact ID (case sensitive)
  const query = 'SELECT * FROM Consumer WHERE Consumer_ID = ?';
  
  db.query(query, [consumerId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    console.log('Consumer query results:', results);
    
    if (results.length === 0) {
      console.log('Consumer ID not found:', consumerId);
      return res.status(401).json({ error: 'Consumer ID not found' });
    }
    
    // Consumer ID found, now check if the names match (case insensitive because we're converting both to uppercase)
    const consumer = results[0];
    const dbFirstName = consumer.First_Name.toUpperCase();
    const dbLastName = consumer.Last_Name.toUpperCase();
    const inputFirstName = firstName.toUpperCase();
    const inputLastName = lastName.toUpperCase();
    
    console.log('Comparing consumer names:', { 
      dbFirstName, inputFirstName, firstNameMatch: dbFirstName === inputFirstName,
      dbLastName, inputLastName, lastNameMatch: dbLastName === inputLastName 
    });
    
    if (dbFirstName === inputFirstName && dbLastName === inputLastName) {
      // Names match, return success
      const consumerData = {
        id: consumer.Consumer_ID,
        firstName: consumer.First_Name,
        lastName: consumer.Last_Name,
        type: consumer.Type
      };
      
      console.log('Consumer login successful, returning consumer data:', consumerData);
      return res.json({ success: true, consumer: consumerData });
    } else {
      // Names don't match
      console.log('Consumer name mismatch, login failed');
      return res.status(401).json({ 
        error: 'Invalid credentials', 
        details: 'Name does not match the provided consumer ID'
      });
    }
  });
});

// Add to cart endpoint
app.post('/api/cart/add', (req, res) => {
  const { consumerId, productId, quantity } = req.body;
  console.log('Add to cart request:', { consumerId, productId, quantity });
  
  // Since we don't have actual cart functionality in the database yet,
  // we'll simulate a successful response
  res.json({ 
    success: true, 
    message: 'Product added to cart successfully',
    cartItem: {
      id: Math.floor(Math.random() * 1000),
      consumerId,
      productId,
      quantity,
      dateAdded: new Date().toISOString()
    }
  });
});

// Get cart items endpoint
app.get('/api/cart/:consumerId', (req, res) => {
  const { consumerId } = req.params;
  console.log('Get cart items request for consumer:', consumerId);
  
  // Since we don't have actual cart functionality in the database yet,
  // we'll simulate a response with empty cart items
  res.json({
    success: true,
    cartItems: []
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
