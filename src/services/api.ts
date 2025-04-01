
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Admin authentication
export const adminLogin = async (adminId: string, firstName: string, lastName: string) => {
  try {
    const response = await api.post('/admin/login', { adminId, firstName, lastName });
    return response.data;
  } catch (error) {
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
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Orders
export const getOrders = async () => {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Consumers
export const getConsumers = async () => {
  try {
    const response = await api.get('/consumers');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Suppliers
export const getSuppliers = async () => {
  try {
    const response = await api.get('/suppliers');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
