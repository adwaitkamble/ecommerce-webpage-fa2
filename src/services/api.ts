
import axios from 'axios';

// Create a URL that works in both development and production environments
// In a Lovable environment, we'll use a relative URL to avoid CORS issues
const API_URL = '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add timeout to prevent hanging requests
  timeout: 10000
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  error => {
    // Log detailed error information
    if (error.response) {
      // Server responded with non-2xx status
      console.error('API Error Response:', { 
        status: error.response.status,
        data: error.response.data 
      });
    } else if (error.request) {
      // Request made but no response received
      console.error('API No Response:', error.request);
      // Create a more user-friendly error message
      error.message = "Cannot connect to server. Please check if the backend is running.";
    } else {
      // Error in setting up request
      console.error('API Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Admin authentication - Store user info in localStorage
export const adminLogin = async (adminId: string, firstName: string, lastName: string) => {
  try {
    console.log('Sending admin login request with:', { adminId, firstName, lastName });
    
    const response = await api.post('/admin/login', { adminId, firstName, lastName });
    
    console.log('Admin login response:', response.data);
    
    // Store admin data in localStorage if login successful
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify({
        type: 'admin',
        ...response.data.admin
      }));
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Admin login error:', error);
    console.error('Error response:', error.response?.data);
    throw error;
  }
};

// Consumer authentication
export const consumerLogin = async (consumerId: string, firstName: string, lastName: string) => {
  try {
    const response = await api.post('/consumer/login', { consumerId, firstName, lastName });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Products
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    
    // Transform the data to match expected format in the frontend
    const transformedData = response.data.map((product: any) => ({
      id: product.Product_ID,
      name: product.Product_Name,
      category: product.Category_Name,
      status: product.Product_Status,
      rating: product.Rating,
      sales: product.Sales
    }));
    
    return transformedData;
  } catch (error) {
    throw error;
  }
};

// Orders
export const getOrders = async () => {
  try {
    const response = await api.get('/orders');
    
    // Transform the data to match expected format in the frontend
    const transformedData = response.data.map((order: any) => ({
      id: order.Order_No,
      customer: `${order.First_Name} ${order.Last_Name}`,
      date: new Date(order.Order_Date).toLocaleDateString(),
      amount: order.Amount,
      status: order.Order_Status
    }));
    
    return transformedData;
  } catch (error) {
    throw error;
  }
};

// Consumers
export const getConsumers = async () => {
  try {
    const response = await api.get('/consumers');
    
    // Transform the data to match expected format in the frontend
    const transformedData = response.data.map((consumer: any) => ({
      id: consumer.Consumer_ID,
      name: `${consumer.First_Name} ${consumer.Middle_Name || ''} ${consumer.Last_Name}`.trim().replace(/\s+/g, ' '),
      type: consumer.Type,
      city: consumer.City,
      state: consumer.State,
      contact: consumer.Contact_Numbers?.split(',')[0] || 'N/A'
    }));
    
    return transformedData;
  } catch (error) {
    throw error;
  }
};

// Suppliers
export const getSuppliers = async () => {
  try {
    const response = await api.get('/suppliers');
    
    // Transform the data to match expected format in the frontend
    const transformedData = response.data.map((supplier: any) => ({
      id: supplier.Supplier_ID,
      name: `${supplier.First_Name} ${supplier.Middle_Name || ''} ${supplier.Last_Name}`.trim().replace(/\s+/g, ' '),
      category: supplier.Category,
      address: supplier.Addresses || 'N/A'
    }));
    
    return transformedData;
  } catch (error) {
    throw error;
  }
};

export default api;
