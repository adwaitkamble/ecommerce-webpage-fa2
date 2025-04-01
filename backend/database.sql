
-- Create database
DROP DATABASE IF EXISTS commerece;
CREATE DATABASE IF NOT EXISTS commerece;
USE commerece;

CREATE TABLE Admin (
    Admin_ID VARCHAR(50) PRIMARY KEY, 
    First_Name VARCHAR(50) NOT NULL, 
    Middle_Name VARCHAR(50), 
    Last_Name VARCHAR(50) NOT NULL, 
    Team_Size INT, 
    Admin_Role VARCHAR(50) NOT NULL, 
    Salary DECIMAL(10,2)
);

CREATE TABLE Admin_Role_Salary (
    Admin_Role VARCHAR(50) PRIMARY KEY, 
    Salary DECIMAL(10,2) NOT NULL
);

INSERT INTO Admin_Role_Salary (Admin_Role, Salary) VALUES
('Manager', 75000.00),
('Assistant Manager', 65000.00),
('Supervisor', 55000.00),
('HR', 50000.00),
('Operations Head', 80000.00),
('Finance Head', 72000.00),
('Technical Lead', 68000.00);

ALTER TABLE Admin DROP COLUMN Salary, ADD FOREIGN KEY (Admin_Role) REFERENCES Admin_Role_Salary(Admin_Role);

INSERT INTO Admin (Admin_ID, First_Name, Middle_Name, Last_Name, Team_Size, Admin_Role) VALUES
('ADM001', 'Adwait', 'A.', 'Kamble', 10, 'Manager'),
('ADM002', 'Aryan', 'A.', 'Aradhye', 8, 'Assistant Manager'),
('ADM003', 'Ankit', 'R.', 'Gupta', 5, 'Supervisor'),
('ADM004', 'Neha', 'S.', 'Verma', 6, 'HR'),
('ADM005', 'Vikram', 'D.', 'Singh', 7, 'Operations Head'),
('ADM006', 'Kiran', 'P.', 'Yadav', 4, 'Finance Head'),
('ADM007', 'Sunil', 'M.', 'Chopra', 3, 'Technical Lead');

-- Shopping Website table
CREATE TABLE Shopping_Website (
    Website_ID VARCHAR(50) PRIMARY KEY, 
    Website_Name VARCHAR(100) NOT NULL, 
    Website_URL VARCHAR(255) NOT NULL, 
    Website_Logo VARCHAR(255), 
    Admin_ID VARCHAR(50), 
    FOREIGN KEY (Admin_ID) REFERENCES Admin(Admin_ID)
);

INSERT INTO Shopping_Website (Website_ID, Website_Name, Website_URL, Admin_ID) VALUES
('WEB001', 'ShopEase', 'https://www.shopease com', 'ADM001'),
('WEB002', 'QuickBuy', 'https://www.quickbuy com', 'ADM002'),
('WEB003', 'MegaMart', 'https://www.megamart com', 'ADM003'),
('WEB004', 'FastCart', 'https://www.fastcart com', 'ADM004'),
('WEB005', 'DailyDeals', 'https://www.dailydeals com', 'ADM005'),
('WEB006', 'BuyItNow', 'https://www.buyitnow com', 'ADM006'),
('WEB007', 'ShopNow', 'https://www.shopnow com', 'ADM007');

-- Supplier table
CREATE TABLE Supplier (
    Supplier_ID VARCHAR(50) PRIMARY KEY, 
    First_Name VARCHAR(50) NOT NULL, 
    Middle_Name VARCHAR(50), 
    Last_Name VARCHAR(50) NOT NULL, 
    Category VARCHAR(100)
);

INSERT INTO Supplier (Supplier_ID, First_Name, Middle_Name, Last_Name, Category) VALUES
('SUP001', 'Atharva', 'G.', 'Zope', 'Electronics'),
('SUP002', 'Sonia', 'R.', 'Kapoor', 'Clothing'),
('SUP003', 'Vikas', 'M.', 'Jain', 'Furniture'),
('SUP004', 'Amit', 'L.', 'Kumar', 'Grocery'),
('SUP005', 'Pooja', 'S.', 'Sharma', 'Toys'),
('SUP006', 'Dinesh', 'P.', 'Verma', 'Footwear'),
('SUP007', 'Manisha', 'T.', 'Roy', 'Accessories');

-- Supplier Address (Multi-valued attribute)
CREATE TABLE Supplier_Address (
    Supplier_ID VARCHAR(50), 
    Address VARCHAR(255) NOT NULL, 
    PRIMARY KEY (Supplier_ID, Address), 
    FOREIGN KEY (Supplier_ID) REFERENCES Supplier(Supplier_ID)
);

INSERT INTO Supplier_Address (Supplier_ID, Address) VALUES
('SUP001', 'Mumbai, Maharashtra'),
('SUP002', 'Delhi, India'),
('SUP003', 'Bangalore, Karnataka'),
('SUP004', 'Chennai, Tamil Nadu'),
('SUP005', 'Kolkata, West Bengal'),
('SUP006', 'Hyderabad, Telangana'),
('SUP007', 'Pune, Maharashtra');

-- Product Category table
CREATE TABLE Product_Category (
    Category_ID VARCHAR(50) PRIMARY KEY, 
    Category_Name VARCHAR(100) NOT NULL, 
    Supplier_ID VARCHAR(50), 
    FOREIGN KEY (Supplier_ID) REFERENCES Supplier(Supplier_ID)
);

CREATE TABLE Product_Statistics (
    Category_ID VARCHAR(50) PRIMARY KEY,
    Average_Profit DECIMAL(10,2),
    Price_Range VARCHAR(50),
    FOREIGN KEY (Category_ID) REFERENCES Product_Category(Category_ID)
);

INSERT INTO Product_Category (Category_ID, Category_Name, Supplier_ID) VALUES
('CAT001', 'Electronics', 'SUP001'),
('CAT002', 'Clothing', 'SUP002'),
('CAT003', 'Home Appliances', 'SUP003'),
('CAT004', 'Furniture', 'SUP004'),
('CAT005', 'Books', 'SUP005'),
('CAT006', 'Running Shoes', 'SUP006'),
('CAT007', 'Sunglasses','SUP007');

INSERT INTO Product_Statistics (Category_ID, Average_Profit, Price_Range) VALUES
('CAT001', 50000.75, '1000-50000'),
('CAT002', 12000.00, '500-5000'),
('CAT003', 25000.50, '2000-30000'),
('CAT004', 35000.80, '5000-70000'),
('CAT005', 8000.00, '100-2000');

-- Target Audience (Multi-valued attribute for Product Category)
CREATE TABLE Category_Target_Audience (
    Category_ID VARCHAR(50), 
    Target_Audience ENUM('Rich', 'Middle', 'Poor'), 
    PRIMARY KEY (Category_ID, Target_Audience), 
    FOREIGN KEY (Category_ID) REFERENCES Product_Category(Category_ID)
);

INSERT INTO Category_Target_Audience (Category_ID, Target_Audience) VALUES
('CAT001', 'Rich'), ('CAT001', 'Middle'), ('CAT001', 'Poor'),
('CAT002', 'Middle'), ('CAT002', 'Poor'),
('CAT003', 'Rich'), ('CAT003', 'Middle'),
('CAT004', 'Middle'), ('CAT004', 'Poor'),
('CAT005', 'Middle'), ('CAT005', 'Poor'),
('CAT006', 'Rich'), ('CAT006', 'Middle'),
('CAT007', 'Rich'), ('CAT007', 'Middle'), ('CAT007', 'Poor');

-- Product table
CREATE TABLE Product (
    Product_ID VARCHAR(50) PRIMARY KEY, 
    Product_Name VARCHAR(100) NOT NULL, 
    Product_Status ENUM('In Stock', 'Out of Stock', 'Discontinued') NOT NULL, 
    Rating DECIMAL(3,2), 
    Stocking_Period INT, 
    Sales INT DEFAULT 0, 
    Category_ID VARCHAR(50), 
    FOREIGN KEY (Category_ID) REFERENCES Product_Category(Category_ID)
);

INSERT INTO Product (Product_ID, Product_Name, Product_Status, Rating, Stocking_Period, Sales, Category_ID) VALUES
('PROD001', 'iPhone 12', 'In Stock', 4.5, 30, 100, 'CAT001'),
('PROD002', 'Samsung Galaxy S21', 'In Stock', 4.6,30, 150, 'CAT001'),
('PROD003', 'Levi\'s Jeans', 'In Stock', 4.2, 60, 200, 'CAT002'),
('PROD004', 'Wooden Sofa Set', 'Out of Stock', 4.8, 90, 50, 'CAT003'),
('PROD005', 'Organic Vegetables', 'In Stock', 4.9, 7, 300, 'CAT004'),
('PROD006', 'Lego Building Blocks', 'In Stock', 4.7, 15, 120, 'CAT005'),
('PROD007', 'Nike Running Shoes', 'In Stock', 4.3, 30, 80, 'CAT006'),
('PROD008', 'Ray-Ban Sunglasses', 'In Stock', 4.4, 60, 110, 'CAT007'),
('PROD009', 'Dell Inspiron', 'In Stock', 4.7, 45, 90, 'CAT001'),
('PROD010', 'Adidas T-shirt', 'Out of Stock', 4.5, 30, 70, 'CAT002'),
('PROD011', 'Dining Table Set', 'In Stock', 4.8, 80, 40, 'CAT003'),
('PROD012', 'Milk', 'In Stock', 4.9, 5, 400, 'CAT004'),
('PROD013', 'Barbie Doll', 'In Stock', 4.7, 10, 150, 'CAT005'),
('PROD014', 'Puma Running Shoes', 'In Stock', 4.4, 30, 60, 'CAT006'),
('PROD015', 'Fossil Watch', 'In Stock', 4.6, 60, 100, 'CAT007');

-- Cart table
CREATE TABLE Cart (
    Cart_ID VARCHAR(50) PRIMARY KEY, 
    Size VARCHAR(20), 
    Quantity INT NOT NULL DEFAULT 1
);

INSERT INTO Cart (Cart_ID, Size, Quantity) VALUES
('CART001', 'Small', 2),
('CART002', 'Medium', 5),
('CART003', 'Large', 1);

-- Consumer table with composite Address
CREATE TABLE Consumer (
    Consumer_ID VARCHAR(50) PRIMARY KEY, 
    First_Name VARCHAR(50) NOT NULL, 
    Middle_Name VARCHAR(50), 
    Last_Name VARCHAR(50) NOT NULL, 
    Type ENUM('Normal', 'Subscribed') NOT NULL DEFAULT 'Normal', 
    House_No VARCHAR(50), 
    Pincode VARCHAR(10), 
    City VARCHAR(50), 
    State VARCHAR(50)
);

INSERT INTO Consumer (Consumer_ID, First_Name, Middle_Name, Last_Name, Type, House_No, Pincode, City, State) VALUES
('CON001', 'CHAUDHARI', 'SHREYASH', 'MANOJ', 'Normal', '123', '400001', 'Mumbai', 'Maharashtra'),
('CON002', 'DAMEDHAR', 'ANIKET', 'SUNIRAO', 'Subscribed', '456', '110001', 'Delhi', 'Delhi'),
('CON003', 'DHAME', 'VIJAY', 'DATTATRAY', 'Normal', '789', '560001', 'Bangalore', 'Karnataka'),
('CON004', 'DIDWAGH', 'SUSHANT', 'VITHOBA', 'Subscribed', '101', '600001', 'Chennai', 'Tamil Nadu'),
('CON005', 'PRITESH', 'PANDHARINATH', 'BAGUL','Normal', '102', '500001', 'Hyderabad', 'Telangana'),
('CON006', 'PUJARI', 'DHRUV', 'SIDRAM', 'Subscribed', '201', '700001', 'Kolkata', 'West Bengal'),
('CON007', 'PUPPALWAR', 'NIKHIL', 'DILIP', 'Normal', '301', '380001', 'Ahmedabad', 'Gujarat'),
('CON008', 'SAKHARE', 'ATHARV', 'VIJAYKUMAR','Subscribed', '1010', '110003', 'Delhi', 'Delhi'),
('CON009', 'SALVE', 'SHIVAM', 'PRASHANT', 'Normal', '102', '110004', 'Delhi', 'Delhi'),
('CON010', 'SAROKTE', 'ISHWARI', 'KALU', 'Subscribed', '103', '110005', 'Mumbai', 'Maharashtra');

-- Consumer Contact Numbers (Multi-valued attribute)
CREATE TABLE Consumer_Contact (
    Consumer_ID VARCHAR(50), 
    Contact_No VARCHAR(15), 
    PRIMARY KEY (Consumer_ID, Contact_No), 
    FOREIGN KEY (Consumer_ID) REFERENCES Consumer(Consumer_ID)
);

INSERT INTO Consumer_Contact (Consumer_ID, Contact_No) VALUES
('CON001', '9876543210'), ('CON001', '9123456780'),
('CON002', '8765432109'), ('CON002', '9988776655'),
('CON003', '7654321098'), ('CON004', '6543210987'),
('CON005', '5432109876'), ('CON006', '9123456781'),
('CON007', '9988776656'), ('CON008', '9001234567'),
('CON009', '9998765432'), ('CON010', '9876543211');

-- Order table
CREATE TABLE Orders (
    Order_No VARCHAR(50) PRIMARY KEY, 
    Consumer_ID VARCHAR(50), 
    Order_Date DATE NOT NULL, 
    Amount DECIMAL(10, 2) NOT NULL, 
    Order_Status ENUM('Pending', 'Shipped', 'Delivered', 'Cancelled') NOT NULL DEFAULT 'Pending', 
    FOREIGN KEY (Consumer_ID) REFERENCES Consumer(Consumer_ID)
);

INSERT INTO Orders (Order_No, Consumer_ID, Order_Date, Amount, Order_Status) VALUES
('ORD001', 'CON001', '2025-02-28', 15000.00, 'Shipped'),
('ORD002', 'CON002', '2025-02-27', 5000.00, 'Delivered'),
('ORD003', 'CON003', '2025-02-26', 3000.00, 'Pending'),
('ORD004', 'CON004', '2025-02-25', 12000.00, 'Cancelled'),
('ORD005', 'CON005', '2025-02-24', 8000.00, 'Delivered');

-- Order Details (Relationship between Orders and Products)
CREATE TABLE Order_Details (
    Order_No VARCHAR(50), 
    Product_ID VARCHAR(50), 
    Quantity INT NOT NULL DEFAULT 1, 
    Price DECIMAL(10, 2) NOT NULL, 
    PRIMARY KEY (Order_No, Product_ID), 
    FOREIGN KEY (Order_No) REFERENCES Orders(Order_No), 
    FOREIGN KEY (Product_ID) REFERENCES Product(Product_ID)
);

INSERT INTO Order_Details (Order_No, Product_ID, Quantity, Price) VALUES
('ORD001', 'PROD001', 1, 70000.00),
('ORD001', 'PROD002', 2, 50000.00),
('ORD002', 'PROD005', 3, 300.00),
('ORD003', 'PROD007', 1, 2000.00),
('ORD004', 'PROD004', 1, 40000.00),
('ORD005', 'PROD008', 2, 5000.00);

-- Payment table
CREATE TABLE Payment (
    Payment_ID VARCHAR(50) PRIMARY KEY, 
    Order_No VARCHAR(50), 
    Payment_Method ENUM('Credit Card', 'Debit Card', 'Net Banking', 'UPI', 'COD') NOT NULL, 
    Payment_Status ENUM('Successful', 'Failed', 'Pending') NOT NULL DEFAULT 'Pending', 
    Payment_Date DATE, 
    FOREIGN KEY (Order_No) REFERENCES Orders(Order_No)
);

INSERT INTO Payment (Payment_ID, Order_No, Payment_Method, Payment_Status, Payment_Date) VALUES
('PAY001', 'ORD001', 'Credit Card', 'Successful', '2025-02-28'),
('PAY002', 'ORD002', 'UPI', 'Successful', '2025-02-27'),
('PAY003', 'ORD003', 'Debit Card', 'Pending', NULL),
('PAY004', 'ORD004', 'Net Banking', 'Failed', '2025-02-25'),
('PAY005', 'ORD005', 'COD', 'Successful', '2025-02-24');

-- Tracking Details
CREATE TABLE Tracking_Details (
    Tracking_ID VARCHAR(50) PRIMARY KEY,
    Order_No VARCHAR(50),
    Status ENUM('Shipped', 'Out For Delivery', 'Delivered'),
    Last_Update DATE,
    FOREIGN KEY (Order_No) REFERENCES Orders(Order_No)
);

INSERT INTO Tracking_Details (Tracking_ID, Order_No, Status, Last_Update) VALUES
('TRACK001', 'ORD001', 'Shipped', '2025-03-02'),
('TRACK002', 'ORD002', 'Out For Delivery', '2025-03-02'),
('TRACK003', 'ORD003', 'Delivered', '2025-03-01');
