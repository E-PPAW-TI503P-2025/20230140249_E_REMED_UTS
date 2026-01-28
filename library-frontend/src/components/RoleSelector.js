// src/components/RoleSelector.js - VERSION IMPROVED & FULL SCREEN
import { auth } from '../utils/api.js';

export default function RoleSelector() {
  const container = document.createElement('div');
  container.className = 'container-fluid px-0';
  
  // Determine current user info
  const isLoggedIn = auth.isLoggedIn();
  const isAdmin = auth.isAdmin();
  const isUser = auth.isUser();
  
  container.innerHTML = `
    <!-- Hero Section -->
    <div class="bg-gradient-primary text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h1 class="display-3 fw-bold mb-3">
              <i class="bi bi-door-open me-3"></i>Welcome to Library System
            </h1>
            <p class="lead mb-4 opacity-75">
              Select your role to access the digital library management system with geolocation tracking
            </p>
            ${isLoggedIn ? `
              <div class="d-flex align-items-center flex-wrap gap-3">
                <div class="bg-white bg-opacity-20 rounded-pill px-4 py-2">
                  <i class="bi bi-person-circle me-2"></i>
                  <span class="fw-bold">${isAdmin ? 'Administrator' : 'User'}</span>
                </div>
                ${auth.currentUserId ? `
                  <div class="bg-white bg-opacity-20 rounded-pill px-4 py-2">
                    <i class="bi bi-123 me-2"></i>
                    <span class="fw-bold">ID: ${auth.currentUserId}</span>
                  </div>
                ` : ''}
                <a href="#books" class="btn btn-light btn-lg px-4">
                  <i class="bi bi-arrow-right me-2"></i>Enter Library
                </a>
              </div>
            ` : `
              <p class="mb-0">
                <i class="bi bi-info-circle me-2"></i>
                Choose your role below to get started
              </p>
            `}
          </div>
          <div class="col-lg-4 text-lg-end mt-4 mt-lg-0">
            <div class="bg-white bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-4">
              <i class="bi bi-shield-lock text-white" style="font-size: 4rem;"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-xl-10">
          <!-- Role Selection Cards -->
          <div class="row g-4">
            <!-- Admin Card -->
            <div class="col-md-6">
              <div class="card border-0 shadow-lg h-100 hover-lift ${isAdmin ? 'border-primary border-3' : ''}" data-role="admin">
                <div class="card-body p-5">
                  <div class="text-center mb-4">
                    <div class="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3">
                      <i class="bi bi-shield-check text-primary" style="font-size: 3rem;"></i>
                    </div>
                    <h2 class="card-title fw-bold mb-2">Administrator</h2>
                    <div class="badge bg-primary fs-6 px-3 py-2 mb-3">Full System Access</div>
                    <p class="text-muted mb-4">
                      Complete control over the library management system. Add, edit, delete books, and monitor all user activities.
                    </p>
                  </div>
                  
                  <div class="mb-4">
                    <h6 class="text-muted mb-3">
                      <i class="bi bi-list-check me-2"></i>Administrator Privileges
                    </h6>
                    <ul class="list-unstyled mb-0">
                      <li class="mb-2">
                        <i class="bi bi-check-circle text-success me-2"></i>
                        Manage all books and inventory
                      </li>
                      <li class="mb-2">
                        <i class="bi bi-check-circle text-success me-2"></i>
                        View all borrowing activities
                      </li>
                      <li class="mb-2">
                        <i class="bi bi-check-circle text-success me-2"></i>
                        Access user borrowing reports
                      </li>
                      <li>
                        <i class="bi bi-check-circle text-success me-2"></i>
                        System configuration access
                      </li>
                    </ul>
                  </div>
                  
                  <div class="d-grid mt-4">
                    <button class="btn btn-primary btn-lg py-3" data-select-role="admin">
                      ${isAdmin ? `
                        <i class="bi bi-check-circle me-2"></i>
                        <span class="fw-bold">Currently Selected</span>
                        <small class="d-block opacity-75">Click to switch to User</small>
                      ` : `
                        <i class="bi bi-shield-check me-2"></i>
                        <span class="fw-bold">Select as Administrator</span>
                        <small class="d-block opacity-75">Full system access</small>
                      `}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- User Card -->
            <div class="col-md-6">
              <div class="card border-0 shadow-lg h-100 hover-lift ${isUser ? 'border-success border-3' : ''}" data-role="user">
                <div class="card-body p-5">
                  <div class="text-center mb-4">
                    <div class="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3">
                      <i class="bi bi-person-check text-success" style="font-size: 3rem;"></i>
                    </div>
                    <h2 class="card-title fw-bold mb-2">Library User</h2>
                    <div class="badge bg-success fs-6 px-3 py-2 mb-3">Borrowing Access</div>
                    <p class="text-muted mb-4">
                      Browse and borrow books with geolocation tracking. Track your borrowed items and manage your reading list.
                    </p>
                  </div>
                  
                  <div class="mb-4">
                    <h6 class="text-muted mb-3">
                      <i class="bi bi-list-check me-2"></i>User Features
                    </h6>
                    <ul class="list-unstyled mb-0">
                      <li class="mb-2">
                        <i class="bi bi-check-circle text-success me-2"></i>
                        Browse available books
                      </li>
                      <li class="mb-2">
                        <i class="bi bi-check-circle text-success me-2"></i>
                        Borrow books with location tracking
                      </li>
                      <li class="mb-2">
                        <i class="bi bi-check-circle text-success me-2"></i>
                        View your borrowing history
                      </li>
                      <li>
                        <i class="bi bi-check-circle text-success me-2"></i>
                        Real-time book availability
                      </li>
                    </ul>
                  </div>
                  
                  <div class="d-grid mt-4">
                    <button class="btn btn-success btn-lg py-3" data-select-role="user">
                      ${isUser ? `
                        <i class="bi bi-check-circle me-2"></i>
                        <span class="fw-bold">Currently Selected</span>
                        <small class="d-block opacity-75">Click to switch to Admin</small>
                      ` : `
                        <i class="bi bi-person-check me-2"></i>
                        <span class="fw-bold">Select as Library User</span>
                        <small class="d-block opacity-75">Book borrowing access</small>
                      `}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- User ID Management (if user role selected) -->
          ${isUser ? `
            <div class="row mt-5">
              <div class="col-lg-8 mx-auto">
                <div class="card border-0 shadow">
                  <div class="card-body p-5">
                    <div class="text-center mb-4">
                      <div class="bg-info bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3">
                        <i class="bi bi-person-badge text-info" style="font-size: 2.5rem;"></i>
                      </div>
                      <h3 class="fw-bold mb-2">Your User ID</h3>
                      <p class="text-muted mb-4">
                        A unique identifier is required for borrowing books and tracking your activities.
                      </p>
                    </div>
                    
                    <div class="row g-4">
                      <div class="col-md-6">
                        <div class="card border-0 bg-light">
                          <div class="card-body text-center py-4">
                            <div class="display-4 fw-bold text-primary mb-2">
                              ${auth.currentUserId || 'Not Set'}
                            </div>
                            <small class="text-muted">Current User ID</small>
                          </div>
                        </div>
                      </div>
                      
                      <div class="col-md-6">
                        <div class="card border-0 bg-light">
                          <div class="card-body">
                            <h6 class="text-muted mb-3">
                              <i class="bi bi-pencil-square me-2"></i>Update User ID
                            </h6>
                            <div class="input-group input-group-lg mb-3">
                              <span class="input-group-text bg-white">
                                <i class="bi bi-123 text-muted"></i>
                              </span>
                              <input type="number" 
                                     class="form-control" 
                                     id="user-id-input" 
                                     placeholder="Enter new User ID"
                                     min="1"
                                     value="${auth.currentUserId || ''}">
                            </div>
                            <div class="d-grid">
                              <button class="btn btn-primary btn-lg" id="save-user-id-btn">
                                <i class="bi bi-save me-2"></i>Save User ID
                              </button>
                            </div>
                            <small class="text-muted mt-2 d-block">
                              <i class="bi bi-info-circle me-1"></i>
                              This ID will be used for all your borrowing activities
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="mt-4">
                      <div class="alert alert-info border-0 bg-info bg-opacity-10">
                        <div class="d-flex">
                          <i class="bi bi-lightbulb fs-4 me-3"></i>
                          <div>
                            <h6 class="alert-heading mb-2">Quick Tips</h6>
                            <ul class="mb-0 small">
                              <li>User ID must be a positive number</li>
                              <li>Use a memorable ID for easy login</li>
                              <li>Your ID is used to track all borrowed books</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ` : ''}
          
          <!-- Action Buttons -->
          ${isLoggedIn ? `
            <div class="row mt-5">
              <div class="col-lg-8 mx-auto">
                <div class="card border-0 shadow-sm">
                  <div class="card-body">
                    <div class="text-center">
                      <h4 class="mb-4">
                        <i class="bi bi-rocket-takeoff text-primary me-2"></i>
                        Ready to Explore?
                      </h4>
                      <div class="d-flex flex-column flex-md-row justify-content-center gap-3">
                        <a href="#books" class="btn btn-primary btn-lg px-5">
                          <i class="bi bi-bookshelf me-2"></i>Browse Library
                        </a>
                        ${isUser ? `
                          <a href="#my-books" class="btn btn-success btn-lg px-5">
                            <i class="bi bi-bag-check me-2"></i>My Borrowed Books
                          </a>
                        ` : ''}
                        ${isAdmin ? `
                          <a href="#admin-borrowed" class="btn btn-dark btn-lg px-5">
                            <i class="bi bi-people me-2"></i>Borrow Management
                          </a>
                        ` : ''}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ` : ''}
          
          <!-- System Info -->
          <div class="row mt-5">
            <div class="col-12">
              <div class="text-center">
                <h6 class="text-muted mb-3">
                  <i class="bi bi-info-circle me-2"></i>System Information
                </h6>
                <div class="d-flex flex-wrap justify-content-center gap-4">
                  <div class="d-flex align-items-center">
                    <i class="bi bi-geo-alt text-primary me-2"></i>
                    <span>Geolocation Tracking</span>
                  </div>
                  <div class="d-flex align-items-center">
                    <i class="bi bi-book text-success me-2"></i>
                    <span>Digital Library Management</span>
                  </div>
                  <div class="d-flex align-items-center">
                    <i class="bi bi-shield-check text-warning me-2"></i>
                    <span>Role-Based Access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add custom CSS
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
      box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
    }
    
    .border-3 {
      border-width: 3px !important;
    }
    
    .btn-lg {
      padding: 1rem 2rem;
      font-size: 1.1rem;
    }
    
    @media (max-width: 768px) {
      .display-3 {
        font-size: 2.5rem;
      }
      
      .btn-lg {
        padding: 0.75rem 1.5rem;
      }
    }
  `;
  container.appendChild(style);
  
  // Add event listeners
  setTimeout(() => {
    // Role selection buttons
    container.querySelectorAll('[data-select-role]').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const role = button.getAttribute('data-select-role');
        const currentRole = auth.currentRole;
        
        // Show loading state
        const originalHTML = button.innerHTML;
        button.innerHTML = `
          <span class="spinner-border spinner-border-sm me-2"></span>
          Switching Role...
        `;
        button.disabled = true;
        
        setTimeout(() => {
          auth.setRole(role);
          
          // Auto generate user ID for demo if switching to user
          if (role === 'user' && !auth.currentUserId) {
            const randomId = Math.floor(Math.random() * 1000) + 1;
            auth.setUserId(randomId.toString());
            
            // Show notification
            const toast = document.createElement('div');
            toast.className = 'toast align-items-center text-bg-success border-0 position-fixed';
            toast.style.cssText = `
              top: 20px;
              right: 20px;
              z-index: 9999;
            `;
            toast.innerHTML = `
              <div class="d-flex">
                <div class="toast-body">
                  <i class="bi bi-check-circle me-2"></i>
                  Auto-assigned User ID: ${randomId}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
              </div>
            `;
            
            document.body.appendChild(toast);
            const bsToast = new bootstrap.Toast(toast, { autohide: true, delay: 3000 });
            bsToast.show();
          }
          
          // Show success message
          const successMsg = role === 'admin' 
            ? 'Switched to Administrator role with full system access'
            : 'Switched to User role with borrowing access';
          
          const successToast = document.createElement('div');
          successToast.className = 'toast align-items-center text-bg-info border-0 position-fixed';
          successToast.style.cssText = `
            top: 60px;
            right: 20px;
            z-index: 9999;
          `;
          successToast.innerHTML = `
            <div class="d-flex">
              <div class="toast-body">
                <i class="bi ${role === 'admin' ? 'bi-shield-check' : 'bi-person-check'} me-2"></i>
                ${successMsg}
              </div>
              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
          `;
          
          document.body.appendChild(successToast);
          const successBsToast = new bootstrap.Toast(successToast, { autohide: true, delay: 3000 });
          successBsToast.show();
          
          // Dispatch auth changed event
          window.dispatchEvent(new CustomEvent('authChanged'));
          
        }, 500);
      });
    });
    
    // User ID save button
    const saveUserIdBtn = container.querySelector('#save-user-id-btn');
    const userIdInput = container.querySelector('#user-id-input');
    
    if (saveUserIdBtn && userIdInput) {
      saveUserIdBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const userId = userIdInput.value.trim();
        
        if (!userId) {
          userIdInput.classList.add('is-invalid');
          return;
        }
        
        if (parseInt(userId) <= 0) {
          userIdInput.classList.add('is-invalid');
          return;
        }
        
        // Show loading
        const originalHTML = saveUserIdBtn.innerHTML;
        saveUserIdBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Saving...';
        saveUserIdBtn.disabled = true;
        
        setTimeout(() => {
          auth.setUserId(userId);
          
          // Show success
          saveUserIdBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Saved!';
          saveUserIdBtn.classList.remove('btn-primary');
          saveUserIdBtn.classList.add('btn-success');
          
          // Update current ID display
          const currentIdDisplay = container.querySelector('.display-4.fw-bold.text-primary');
          if (currentIdDisplay) {
            currentIdDisplay.textContent = userId;
          }
          
          // Show toast
          const toast = document.createElement('div');
          toast.className = 'toast align-items-center text-bg-success border-0 position-fixed';
          toast.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
          `;
          toast.innerHTML = `
            <div class="d-flex">
              <div class="toast-body">
                <i class="bi bi-check-circle me-2"></i>
                User ID updated to: ${userId}
              </div>
              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
          `;
          
          document.body.appendChild(toast);
          const bsToast = new bootstrap.Toast(toast, { autohide: true, delay: 3000 });
          bsToast.show();
          
          // Reset button after 2 seconds
          setTimeout(() => {
            saveUserIdBtn.innerHTML = originalHTML;
            saveUserIdBtn.disabled = false;
            saveUserIdBtn.classList.remove('btn-success');
            saveUserIdBtn.classList.add('btn-primary');
          }, 2000);
          
        }, 500);
      });
      
      // Input validation
      if (userIdInput) {
        userIdInput.addEventListener('input', () => {
          userIdInput.classList.remove('is-invalid');
          
          // Only allow positive numbers
          if (userIdInput.value && parseInt(userIdInput.value) <= 0) {
            userIdInput.value = '';
          }
        });
      }
    }
    
    // Navigation buttons
    container.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.hash = link.getAttribute('href').substring(1);
      });
    });
    
    // Card hover effects
    container.querySelectorAll('.hover-lift').forEach(card => {
      card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('border-3')) {
          card.style.transform = 'translateY(-5px)';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('border-3')) {
          card.style.transform = 'translateY(0)';
        }
      });
    });
    
  }, 0);
  
  return container;
}