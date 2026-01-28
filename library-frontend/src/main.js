// src/main.js - VERSION IMPROVED & FULL FEATURES
import './styles/main.css';
import Navbar from './components/Navbar.js';
import RoleSelector from './components/RoleSelector.js';
import BookList from './components/BookList.js';
import BookForm from './components/BookForm.js';
import BorrowForm from './components/BorrowForm.js';
import BookDetails from './components/BookDetails.js';
import { auth } from './utils/api.js';

const app = document.getElementById('app');
let currentPage = null;

// Debug mode
const DEBUG = true;

// Debug logging helper
function log(message, data = null) {
  if (DEBUG) {
    console.log(`[ROUTER] ${message}`, data || '');
  }
}

// Router function dengan semua fitur
async function router() {
  const hash = window.location.hash.replace('#', '');
  const [page, param] = hash.split('/');
  
  log('Navigation:', { page, param, hash });
  log('Auth State:', {
    isLoggedIn: auth.isLoggedIn(),
    role: auth.currentRole,
    userId: auth.currentUserId,
    isAdmin: auth.isAdmin(),
    isUser: auth.isUser()
  });
  
  // Clear current page
  if (currentPage && currentPage.parentNode === app) {
    app.removeChild(currentPage);
  }
  
  // Render Navbar
  const navbar = Navbar();
  const existingNavbar = document.querySelector('nav');
  if (existingNavbar && existingNavbar.parentNode === app) {
    existingNavbar.replaceWith(navbar);
  } else {
    app.appendChild(navbar);
  }
  
  // Show loading indicator
  app.innerHTML += `
    <div id="loading-overlay" class="d-none">
      <div class="loading-spinner">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  `;
  
  // Render content based on route
  let content = null;
  
  try {
    switch (page) {
      case 'select-role':
      case '':
        log('Rendering RoleSelector');
        content = RoleSelector();
        break;
        
      case 'home':
        log('Rendering Home');
        content = await renderHome();
        break;
        
      case 'books':
        log('Rendering BookList');
        content = await BookList();
        break;
        
      case 'add-book':
        log('Rendering BookForm (ADD)');
        if (!auth.isAdmin()) {
          showToast('Admin access required', 'warning');
          setTimeout(() => window.location.hash = 'select-role', 500);
          return;
        }
        content = BookForm({ mode: 'add' });
        break;
        
      case 'edit-book':
        log('Rendering BookForm (EDIT), ID:', param);
        if (!auth.isAdmin()) {
          showToast('Admin access required', 'warning');
          setTimeout(() => window.location.hash = 'select-role', 500);
          return;
        }
        if (param) {
          content = BookForm({ bookId: param, mode: 'edit' });
        } else {
          window.location.hash = 'books';
        }
        break;
        
      case 'borrow':
        log('Rendering BorrowForm, Book ID:', param);
        if (!auth.isUser()) {
          showToast('Please select User role first', 'warning');
          setTimeout(() => window.location.hash = 'select-role', 500);
          return;
        }
        content = BorrowForm({ bookId: param });
        break;
        
      case 'book-details':
        log('Rendering BookDetails, ID:', param);
        if (param) {
          content = await BookDetails({ bookId: param });
        } else {
          window.location.hash = 'books';
        }
        break;
        
      case 'my-books':
        log('Rendering UserBorrowedBooks');
        if (!auth.isUser()) {
          showToast('User access required', 'warning');
          setTimeout(() => window.location.hash = 'select-role', 500);
          return;
        }
        content = await UserBorrowedBooks();
        break;
        
      case 'admin-borrowed':
        log('Rendering AdminBorrowedBooks');
        if (!auth.isAdmin()) {
          showToast('Admin access required', 'warning');
          setTimeout(() => window.location.hash = 'select-role', 500);
          return;
        }
        content = await AdminBorrowedBooks();
        break;
        
      default:
        log('Rendering Home (default)');
        content = await renderHome();
    }
    
  } catch (error) {
    log('Router error:', error);
    content = renderErrorPage(error);
  }
  
  // Add content to app
  if (content) {
    currentPage = content;
    app.appendChild(content);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  // Hide loading
  const loadingOverlay = document.getElementById('loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.remove();
  }
}

// Home page dengan design lebih baik
async function renderHome() {
  const container = document.createElement('div');
  container.className = 'container-fluid px-0';
  
  const booksCount = await getBooksCount();
  
  container.innerHTML = `
    <!-- Hero Section -->
    <div class="bg-gradient-primary text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h1 class="display-3 fw-bold mb-3">
              <i class="bi bi-bookshelf me-3"></i>Digital Library System
            </h1>
            <p class="lead mb-4 opacity-75">
              Modern library management with geolocation tracking for efficient book borrowing and inventory management.
            </p>
            <div class="d-flex flex-wrap gap-3">
              <a href="#books" class="btn btn-light btn-lg px-4">
                <i class="bi bi-search me-2"></i>Browse Books
              </a>
              <a href="#select-role" class="btn btn-outline-light btn-lg px-4">
                <i class="bi bi-person-plus me-2"></i>Get Started
              </a>
            </div>
          </div>
          <div class="col-lg-4 text-lg-end mt-4 mt-lg-0">
            <div class="bg-white bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-4">
              <i class="bi bi-book text-white" style="font-size: 4rem;"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Features Section -->
    <div class="container py-5">
      <div class="row mb-5">
        <div class="col-12 text-center">
          <h2 class="display-5 fw-bold mb-3">Why Choose Our System?</h2>
          <p class="lead text-muted mb-0">Modern features for efficient library management</p>
        </div>
      </div>
      
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card border-0 shadow-sm h-100 hover-lift">
            <div class="card-body text-center p-4">
              <div class="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3">
                <i class="bi bi-geo-alt text-primary fs-2"></i>
              </div>
              <h4 class="fw-bold mb-3">Geolocation Tracking</h4>
              <p class="text-muted mb-0">
                Track book borrowing locations for better inventory management and user analytics.
              </p>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="card border-0 shadow-sm h-100 hover-lift">
            <div class="card-body text-center p-4">
              <div class="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3">
                <i class="bi bi-shield-check text-success fs-2"></i>
              </div>
              <h4 class="fw-bold mb-3">Role-Based Access</h4>
              <p class="text-muted mb-0">
                Secure system with separate admin and user roles for controlled access and permissions.
              </p>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="card border-0 shadow-sm h-100 hover-lift">
            <div class="card-body text-center p-4">
              <div class="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3">
                <i class="bi bi-graph-up text-warning fs-2"></i>
              </div>
              <h4 class="fw-bold mb-3">Real-Time Management</h4>
              <p class="text-muted mb-0">
                Live updates for book availability, borrowing status, and inventory tracking.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Quick Stats -->
      <div class="row mt-5">
        <div class="col-12">
          <div class="card border-0 shadow-lg">
            <div class="card-body p-5">
              <div class="row text-center">
                <div class="col-md-3 col-6 mb-4">
                  <div class="display-4 fw-bold text-primary mb-2">${booksCount}</div>
                  <div class="text-muted">Total Books</div>
                </div>
                <div class="col-md-3 col-6 mb-4">
                  <div class="display-4 fw-bold text-success mb-2">2</div>
                  <div class="text-muted">User Roles</div>
                </div>
                <div class="col-md-3 col-6 mb-4">
                  <div class="display-4 fw-bold text-warning mb-2">100%</div>
                  <div class="text-muted">Digital System</div>
                </div>
                <div class="col-md-3 col-6 mb-4">
                  <div class="display-4 fw-bold text-info mb-2">24/7</div>
                  <div class="text-muted">Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Call to Action -->
      <div class="row mt-5">
        <div class="col-12 text-center">
          <h3 class="fw-bold mb-4">Ready to Get Started?</h3>
          <div class="d-flex flex-column flex-md-row justify-content-center gap-3">
            ${!auth.isLoggedIn() ? `
              <a href="#select-role" class="btn btn-primary btn-lg px-5">
                <i class="bi bi-person-plus me-2"></i>Select Your Role
              </a>
            ` : ''}
            <a href="#books" class="btn btn-success btn-lg px-5">
              <i class="bi bi-bookshelf me-2"></i>Browse Collection
            </a>
            ${auth.isUser() ? `
              <a href="#my-books" class="btn btn-info btn-lg px-5">
                <i class="bi bi-bag-check me-2"></i>My Borrowed Books
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="bg-dark text-white py-4 mt-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h5 class="mb-0">
              <i class="bi bi-book me-2"></i>Library Management System
            </h5>
            <small class="text-white-50">v1.0.0</small>
          </div>
          <div class="col-md-6 text-md-end">
            <small class="text-white-50">
              © 2024 Digital Library System. All rights reserved.
            </small>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add CSS
  const style = document.createElement('style');
  style.textContent = `
    .bg-gradient-primary {
      background: linear-gradient(135deg, #4f6df5 0%, #3b82f6 100%);
    }
    
    .hover-lift {
      transition: all 0.3s ease;
    }
    
    .hover-lift:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
    }
    
    #loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
    
    .loading-spinner {
      text-align: center;
    }
    
    .loading-spinner .spinner-border {
      width: 4rem;
      height: 4rem;
    }
  `;
  container.appendChild(style);
  
  return container;
}

// Error page render
function renderErrorPage(error) {
  const container = document.createElement('div');
  container.className = 'container py-5';
  
  container.innerHTML = `
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card border-0 shadow-lg">
          <div class="card-body text-center py-5">
            <div class="mb-4">
              <i class="bi bi-exclamation-triangle text-danger display-1"></i>
            </div>
            <h2 class="text-danger mb-4">Something Went Wrong</h2>
            <p class="text-muted mb-4 lead">
              ${error.message || 'Unable to load the requested page. Please try again.'}
            </p>
            <div class="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <button class="btn btn-primary btn-lg px-4" id="retry-btn">
                <i class="bi bi-arrow-clockwise me-2"></i>Try Again
              </button>
              <a href="#home" class="btn btn-outline-secondary btn-lg px-4">
                <i class="bi bi-house me-2"></i>Go Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  setTimeout(() => {
    const retryBtn = container.querySelector('#retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        window.location.reload();
      });
    }
    
    container.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = link.getAttribute('href').substring(1);
      });
    });
  }, 0);
  
  return container;
}

// Helper function to get books count
async function getBooksCount() {
  try {
    const { bookAPI } = await import('./utils/api.js');
    const response = await bookAPI.getAll();
    return response.data.data?.length || 0;
  } catch (error) {
    console.warn('Failed to fetch books count:', error);
    return 0;
  }
}

// Toast notification function
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-bg-${type} border-0 position-fixed`;
  toast.style.cssText = `
    top: 20px;
    right: 20px;
    z-index: 9999;
    min-width: 300px;
  `;
  
  const icons = {
    success: 'bi-check-circle',
    danger: 'bi-exclamation-triangle',
    warning: 'bi-exclamation-circle',
    info: 'bi-info-circle'
  };
  
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body d-flex align-items-center">
        <i class="bi ${icons[type] || 'bi-info-circle'} fs-5 me-3"></i>
        <span>${message}</span>
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;
  
  document.body.appendChild(toast);
  const bsToast = new bootstrap.Toast(toast, { 
    autohide: true, 
    delay: 3000 
  });
  bsToast.show();
  
  toast.addEventListener('hidden.bs.toast', () => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  });
}

// Initialize app
function init() {
  log('App initializing...');
  
  // Add global error handler
  window.addEventListener('error', (event) => {
    log('Global error:', event.error);
    showToast('An unexpected error occurred', 'danger');
  });
  
  // Listen for hash changes
  window.addEventListener('hashchange', () => {
    log('Hash changed:', window.location.hash);
    router();
  });
  
  // Listen for auth changes
  window.addEventListener('authChanged', () => {
    log('Auth changed, refreshing route');
    router();
  });
  
  // Listen for book updates
  window.addEventListener('booksUpdated', () => {
    log('Books updated, refreshing route');
    router();
  });
  
  // Listen for borrow updates
  window.addEventListener('borrowUpdated', () => {
    log('Borrow updated, refreshing route');
    router();
  });
  
  // Global navigation helper
  window.navigateTo = (hash) => {
    window.location.hash = hash;
  };
  
  // Add global refresh function
  window.refreshApp = () => {
    log('Manual refresh triggered');
    router();
  };
  
  // Initial route
  setTimeout(() => {
    router();
  }, 100);
  
  log('App initialized successfully');
}

// Start app
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for debugging
if (DEBUG) {
  window.__libraryApp = {
    router,
    auth,
    navigateTo: window.navigateTo,
    refreshApp: window.refreshApp,
    showToast
  };
}