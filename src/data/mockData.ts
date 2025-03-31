
// Mock data to represent our database

export const mockStats = {
  totalProducts: 15,
  newProducts: 3,
  totalOrders: 5,
  newOrders: 2,
  totalCustomers: 30,
  newCustomers: 5,
  revenue: 43000,
  revenueIncrease: 12
};

export const mockProducts = [
  { id: 'PROD001', name: 'iPhone 12', status: 'In Stock', rating: 4.5, period: 30, sales: 100, category: 'Electronics' },
  { id: 'PROD002', name: 'Samsung Galaxy S21', status: 'In Stock', rating: 4.6, period: 30, sales: 150, category: 'Electronics' },
  { id: 'PROD003', name: 'Levi\'s Jeans', status: 'In Stock', rating: 4.2, period: 60, sales: 200, category: 'Clothing' },
  { id: 'PROD004', name: 'Wooden Sofa Set', status: 'Out of Stock', rating: 4.8, period: 90, sales: 50, category: 'Home Appliances' },
  { id: 'PROD005', name: 'Organic Vegetables', status: 'In Stock', rating: 4.9, period: 7, sales: 300, category: 'Furniture' },
  { id: 'PROD006', name: 'Lego Building Blocks', status: 'In Stock', rating: 4.7, period: 15, sales: 120, category: 'Books' },
  { id: 'PROD007', name: 'Nike Running Shoes', status: 'In Stock', rating: 4.3, period: 30, sales: 80, category: 'Running Shoes' },
  { id: 'PROD008', name: 'Ray-Ban Sunglasses', status: 'In Stock', rating: 4.4, period: 60, sales: 110, category: 'Sunglasses' },
  { id: 'PROD009', name: 'Dell Inspiron', status: 'In Stock', rating: 4.7, period: 45, sales: 90, category: 'Electronics' },
  { id: 'PROD010', name: 'Adidas T-shirt', status: 'Out of Stock', rating: 4.5, period: 30, sales: 70, category: 'Clothing' }
];

export const mockOrders = [
  { id: 'ORD001', customer: 'CHAUDHARI SHREYASH', date: '2025-02-28', amount: 15000.00, status: 'Shipped' },
  { id: 'ORD002', customer: 'DAMEDHAR ANIKET', date: '2025-02-27', amount: 5000.00, status: 'Delivered' },
  { id: 'ORD003', customer: 'DHAME VIJAY', date: '2025-02-26', amount: 3000.00, status: 'Pending' },
  { id: 'ORD004', customer: 'DIDWAGH SUSHANT', date: '2025-02-25', amount: 12000.00, status: 'Cancelled' },
  { id: 'ORD005', customer: 'PRITESH BAGUL', date: '2025-02-24', amount: 8000.00, status: 'Delivered' }
];

export const mockConsumers = [
  { id: 'CON001', name: 'CHAUDHARI SHREYASH', type: 'Normal', city: 'Mumbai', state: 'Maharashtra', contact: '9876543210' },
  { id: 'CON002', name: 'DAMEDHAR ANIKET', type: 'Subscribed', city: 'Delhi', state: 'Delhi', contact: '8765432109' },
  { id: 'CON003', name: 'DHAME VIJAY', type: 'Normal', city: 'Bangalore', state: 'Karnataka', contact: '7654321098' },
  { id: 'CON004', name: 'DIDWAGH SUSHANT', type: 'Subscribed', city: 'Chennai', state: 'Tamil Nadu', contact: '6543210987' },
  { id: 'CON005', name: 'PRITESH BAGUL', type: 'Normal', city: 'Hyderabad', state: 'Telangana', contact: '5432109876' },
  { id: 'CON006', name: 'PUJARI DHRUV', type: 'Subscribed', city: 'Kolkata', state: 'West Bengal', contact: '9123456781' },
  { id: 'CON007', name: 'PUPPALWAR NIKHIL', type: 'Normal', city: 'Ahmedabad', state: 'Gujarat', contact: '9988776656' },
  { id: 'CON008', name: 'SAKHARE ATHARV', type: 'Subscribed', city: 'Delhi', state: 'Delhi', contact: '9001234567' },
  { id: 'CON009', name: 'SALVE SHIVAM', type: 'Normal', city: 'Delhi', state: 'Delhi', contact: '9998765432' },
  { id: 'CON010', name: 'SAROKTE ISHWARI', type: 'Subscribed', city: 'Mumbai', state: 'Maharashtra', contact: '9876543211' }
];

export const mockSuppliers = [
  { id: 'SUP001', name: 'Atharva G. Zope', category: 'Electronics', address: 'Mumbai, Maharashtra' },
  { id: 'SUP002', name: 'Sonia R. Kapoor', category: 'Clothing', address: 'Delhi, India' },
  { id: 'SUP003', name: 'Vikas M. Jain', category: 'Furniture', address: 'Bangalore, Karnataka' },
  { id: 'SUP004', name: 'Amit L. Kumar', category: 'Grocery', address: 'Chennai, Tamil Nadu' },
  { id: 'SUP005', name: 'Pooja S. Sharma', category: 'Toys', address: 'Kolkata, West Bengal' },
  { id: 'SUP006', name: 'Dinesh P. Verma', category: 'Footwear', address: 'Hyderabad, Telangana' },
  { id: 'SUP007', name: 'Manisha T. Roy', category: 'Accessories', address: 'Pune, Maharashtra' }
];
