// src/main.js - VERSION DIPERBAIKI
import './styles/main.css';
import Navbar from './components/Navbar.js';
import RoleSelector from './components/RoleSelector.js';
import BookList from './components/BookList.js';
import BookForm from './components/BookForm.js';
import BorrowForm from './components/BorrowForm.js';
import { auth } from './utils/api.js';
import BookDetails from './components/BookDetails.js'; 
import 'bootstrap';

const app = document.getElementById('app');
let currentPage = null;

// DEBUG: Log semua navigation
console.log('=== LIBRARY SYSTEM STARTED ===');

// Router function - VERSION SEDERHANA
async function router() {
  const hash = window.location.hash.replace('#', '');
  const [page, param] = hash.split('/');
  
  console.log('ROUTER: Page:', page, 'Param:', param);
  console.log('ROUTER: Auth:', {
    isLoggedIn: auth.isLoggedIn(),
    role: auth.currentRole,
    isAdmin: auth.isAdmin(),
    isUser: auth.isUser()
  });
  
  // Clear current page
  if (currentPage) {
    app.removeChild(currentPage);
  }
  
  // Render Navbar
  const navbar = Navbar();
  const existingNavbar = document.querySelector('nav');
  if (existingNavbar) {
    existingNavbar.replaceWith(navbar);
  } else {
    app.appendChild(navbar);
  }
  
  // Render content based on route
  let content = null;
  
  switch (page) {
    case 'select-role':
    case '':
      console.log('ROUTER: Rendering RoleSelector');
      content = RoleSelector();
      break;
      
    case 'home':
      console.log('ROUTER: Rendering Home');
      content = await renderHome();
      break;
      
    case 'books':
      console.log('ROUTER: Rendering BookList');
      content = await BookList();
      break;
      
    case 'add-book':
      console.log('ROUTER: Rendering BookForm (ADD)');
      if (!auth.isAdmin()) {
        alert('Admin access required');
        window.location.hash = 'select-role';
        return;
      }
      content = BookForm({ mode: 'add' });
      break;
      
    case 'edit-book':
      console.log('ROUTER: Rendering BookForm (EDIT), ID:', param);
      if (!auth.isAdmin()) {
        alert('Admin access required');
        window.location.hash = 'select-role';
        return;
      }
      if (param) {
        content = BookForm({ bookId: param, mode: 'edit' });
      } else {
        window.location.hash = 'books';
      }
      break;
      
    case 'borrow':
      console.log('ROUTER: Rendering BorrowForm, Book ID:', param);
      if (!auth.isUser()) {
        alert('Please select User role first');
        window.location.hash = 'select-role';
        return;
      }
      content = BorrowForm({ bookId: param });
      break;

      case 'book-details':
    console.log('ROUTER: Rendering BookDetails, ID:', param);
    if (param) {
      content = await BookDetails({ bookId: param });
    } else {
      window.location.hash = 'books';
    }
    break;
      
    default:
      console.log('ROUTER: Rendering Home (default)');
      content = await renderHome();
  }
  
  if (content) {
    currentPage = content;
    app.appendChild(content);
  }
}

// Home page render (sederhana)
async function renderHome() {
  const container = document.createElement('div');
  container.className = 'container mt-5';
  
  container.innerHTML = `
    <div class="text-center">
      <h1>Library Management System</h1>
      <p class="lead">Manage books with geolocation tracking</p>
      <div class="mt-4">
        <a href="#books" class="btn btn-primary me-2">Browse Books</a>
        <a href="#select-role" class="btn btn-outline-primary">Select Role</a>
      </div>
    </div>
  `;
  
  return container;
}

// Initialize app
function init() {
  console.log('App initializing...');
  
  // Listen for hash changes
  window.addEventListener('hashchange', router);
  
  // Listen for auth changes
  window.addEventListener('authChanged', router);
  
  // Listen for book updates
  window.addEventListener('booksUpdated', router);
  
  // Initial route
  router();
}

// Start app
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}