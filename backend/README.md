
# E-Commerce Backend

This is a simple Express.js backend for the E-Commerce Portal application.

## Setup Instructions

### Database Setup
1. Install MySQL if you haven't already
2. Create a database named `ecommerce_db`
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
  database: 'ecommerce_db'
});
```

## API Endpoints

### Authentication
- POST /api/admin/login - Admin login
- POST /api/consumer/login - Consumer login

### Data Endpoints
- GET /api/products - Get all products
- GET /api/orders - Get all orders
- GET /api/consumers - Get all consumers
- GET /api/suppliers - Get all suppliers
