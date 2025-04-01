
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
    console.log('Sending consumer login request with:', { consumerId, firstName, lastName });
    
    const response = await api.post('/consumer/login', { consumerId, firstName, lastName });
    
    console.log('Consumer login response:', response.data);
    
    // Store consumer data in localStorage if login successful
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify({
        type: 'consumer',
        ...response.data.consumer
      }));
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Consumer login error:', error);
    console.error('Error response:', error.response?.data);
    throw error;
  }
};

// Add product to cart
export const addToCart = async (productId: number, quantity: number = 1) => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      throw new Error('User not logged in');
    }
    
    const response = await api.post('/cart/add', {
      consumerId: user.id,
      productId,
      quantity
    });
    
    return response.data;
  } catch (error) {
    console.error('Add to cart error:', error);
    throw error;
  }
};

// Get cart items
export const getCartItems = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      throw new Error('User not logged in');
    }
    
    const response = await api.get(`/cart/${user.id}`);
    return response.data;
  } catch (error) {
    console.error('Get cart items error:', error);
    throw error;
  }
};

export default api;
