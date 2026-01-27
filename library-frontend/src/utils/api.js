// src/utils/api.js
import axios from 'axios';

const API_BASE_URL = '/api';

// Set default headers
const setAuthHeaders = (role = null, userId = null) => {
  if (role) {
    axios.defaults.headers.common['x-user-role'] = role;
  } else {
    delete axios.defaults.headers.common['x-user-role'];
  }
  
  if (userId) {
    axios.defaults.headers.common['x-user-id'] = userId;
  } else {
    delete axios.defaults.headers.common['x-user-id'];
  }
};

// Book API
const bookAPI = {
  getAll: () => axios.get(`${API_BASE_URL}/books`),
  getById: (id) => axios.get(`${API_BASE_URL}/books/${id}`),
  create: (bookData) => axios.post(`${API_BASE_URL}/books`, bookData),
  update: (id, bookData) => axios.put(`${API_BASE_URL}/books/${id}`, bookData),
  delete: (id) => axios.delete(`${API_BASE_URL}/books/${id}`)
};

// Borrow API
const borrowAPI = {
  borrow: (borrowData) => axios.post(`${API_BASE_URL}/borrow`, borrowData)
};

// Auth utility
const auth = {
  currentRole: localStorage.getItem('userRole') || null,
  currentUserId: localStorage.getItem('userId') || null,
  
  setRole: (role) => {
    auth.currentRole = role;
    localStorage.setItem('userRole', role);
    setAuthHeaders(role, auth.currentUserId);
  },
  
  setUserId: (userId) => {
    auth.currentUserId = userId;
    localStorage.setItem('userId', userId);
    setAuthHeaders(auth.currentRole, userId);
  },
  
  clear: () => {
    auth.currentRole = null;
    auth.currentUserId = null;
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    setAuthHeaders(null, null);
  },
  
  isAdmin: () => auth.currentRole === 'admin',
  isUser: () => auth.currentRole === 'user',
  isLoggedIn: () => !!auth.currentRole
};

// Initialize headers
if (auth.currentRole) {
  setAuthHeaders(auth.currentRole, auth.currentUserId);
}

export { bookAPI, borrowAPI, auth, setAuthHeaders };