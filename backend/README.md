
# E-Commerce Backend

This is an Express.js backend for the E-Commerce Portal application.

## Setup Instructions

### Database Setup
1. Install MySQL if you haven't already
2. Create a database named `commerece` (note the spelling)
3. Run the SQL commands in `database.sql` to set up the tables and sample data

### Install Dependencies
```
npm install
```

### Start the Server
```
npm start
```

For development with auto-restart:
```
npm run dev
```

### Configuration
Edit the database connection in `server.js` to match your MySQL credentials:
```javascript
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'commerece'
});
```

## API Endpoints

### Authentication
- POST /api/admin/login - Admin login
- POST /api/consumer/login - Consumer login

### Data Endpoints
- GET /api/products - Get all products with their categories
- GET /api/orders - Get all orders with consumer and payment information
- GET /api/consumers - Get all consumers with their contact information
- GET /api/suppliers - Get all suppliers with their addresses
