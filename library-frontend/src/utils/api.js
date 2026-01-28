// src/utils/api.js - VERSION DIPERBAIKI
import axios from 'axios';

const API_BASE_URL = '/api';

// Create axios instance with base config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Set default headers
const setAuthHeaders = (role = null, userId = null) => {
  if (role) {
    api.defaults.headers.common['x-user-role'] = role;
  } else {
    delete api.defaults.headers.common['x-user-role'];
  }
  
  if (userId) {
    api.defaults.headers.common['x-user-id'] = userId;
  } else {
    delete api.defaults.headers.common['x-user-id'];
  }
};

// Auth utility
const auth = {
  currentRole: localStorage.getItem('userRole') || null,
  currentUserId: localStorage.getItem('userId') || null,
  
  setRole: (role) => {
    auth.currentRole = role;
    localStorage.setItem('userRole', role);
    setAuthHeaders(role, auth.currentUserId);
    window.dispatchEvent(new CustomEvent('authChanged'));
  },
  
  setUserId: (userId) => {
    auth.currentUserId = userId;
    localStorage.setItem('userId', userId);
    setAuthHeaders(auth.currentRole, userId);
    window.dispatchEvent(new CustomEvent('authChanged'));
  },
  
  clear: () => {
    auth.currentRole = null;
    auth.currentUserId = null;
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    setAuthHeaders(null, null);
    window.dispatchEvent(new CustomEvent('authChanged'));
  },
  
  isAdmin: () => auth.currentRole === 'admin',
  isUser: () => auth.currentRole === 'user',
  isLoggedIn: () => !!auth.currentRole
};

// Book API
const bookAPI = {
  getAll: () => api.get('/books'),
  getById: (id) => api.get(`/books/${id}`),
  create: (bookData) => api.post('/books', bookData),
  update: (id, bookData) => api.put(`/books/${id}`, bookData),
  delete: (id) => api.delete(`/books/${id}`)
};

// Borrow API - HANYA SATU DEFINISI
const borrowAPI = {
  // Borrow a book
  borrow: (borrowData) => api.post('/borrow', borrowData),
  
  // Get borrowed books by user ID
  getByUserId: (userId) => api.get(`/borrow/user/${userId}`),
  
  // Get all borrowed books (admin only)
  getAll: () => api.get('/borrow'),
  
  // Return a borrowed book
  returnBook: (borrowId) => api.delete(`/borrow/${borrowId}`)
};

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error.message);
    
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      if (status === 401) {
        // Unauthorized - clear auth and redirect
        auth.clear();
        window.location.hash = 'select-role';
      }
      
      if (status === 404) {
        console.warn('Resource not found:', error.config.url);
      }
      
      // Pass the error along
      return Promise.reject(error);
    } else if (error.request) {
      // Request was made but no response
      console.error('No response received:', error.request);
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      // Something else happened
      console.error('Request setup error:', error.message);
      return Promise.reject(error);
    }
  }
);

// Initialize headers on app start
if (auth.currentRole) {
  setAuthHeaders(auth.currentRole, auth.currentUserId);
}

// Debug helper
if (import.meta.env?.MODE === 'development') {
  window.__libraryAPI = {
    bookAPI,
    borrowAPI,
    auth,
    setAuthHeaders
  };
  console.log('API Module Loaded:', { auth: auth });
}

export { bookAPI, borrowAPI, auth, setAuthHeaders };