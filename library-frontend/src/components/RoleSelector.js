// src/components/RoleSelector.js
import { auth } from '../utils/api.js';

export default function RoleSelector() {
  const container = document.createElement('div');
  container.className = 'container mt-5';
  
  container.innerHTML = `
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card shadow">
          <div class="card-header bg-primary text-white">
            <h4 class="mb-0">
              <i class="bi bi-shield-lock me-2"></i>Select Your Role
            </h4>
          </div>
          <div class="card-body">
            <div class="row text-center">
              <div class="col-md-6 mb-3">
                <div class="card border-primary h-100 role-card" data-role="admin">
                  <div class="card-body">
                    <div class="mb-3">
                      <i class="bi bi-shield-check text-primary" style="font-size: 3rem;"></i>
                    </div>
                    <h5 class="card-title">Administrator</h5>
                    <p class="card-text">Manage books, view all records, and system administration.</p>
                    <div class="mt-3">
                      <span class="badge bg-primary">Full Access</span>
                    </div>
                  </div>
                  <div class="card-footer bg-transparent">
                    <button class="btn btn-primary w-100" data-select-role="admin">
                      Select as Admin
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="col-md-6 mb-3">
                <div class="card border-success h-100 role-card" data-role="user">
                  <div class="card-body">
                    <div class="mb-3">
                      <i class="bi bi-person-check text-success" style="font-size: 3rem;"></i>
                    </div>
                    <h5 class="card-title">Library User</h5>
                    <p class="card-text">Browse books, borrow books with location tracking.</p>
                    <div class="mt-3">
                      <span class="badge bg-success">Borrow Access</span>
                    </div>
                  </div>
                  <div class="card-footer bg-transparent">
                    <button class="btn btn-success w-100" data-select-role="user">
                      Select as User
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            ${auth.isUser() ? `
              <div class="mt-4">
                <div class="card">
                  <div class="card-body">
                    <h6><i class="bi bi-info-circle me-1"></i>Set User ID</h6>
                    <div class="input-group">
                      <input type="number" 
                             class="form-control" 
                             id="user-id-input" 
                             placeholder="Enter your User ID" 
                             value="${auth.currentUserId || ''}">
                      <button class="btn btn-outline-primary" id="save-user-id-btn">
                        Save
                      </button>
                    </div>
                    <small class="text-muted">User ID is required for borrowing books</small>
                  </div>
                </div>
              </div>
            ` : ''}
            
            ${auth.isLoggedIn() ? `
              <div class="mt-4 text-center">
                <a href="#books" class="btn btn-outline-primary">
                  <i class="bi bi-arrow-right me-1"></i>Continue to Library
                </a>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add event listeners
  setTimeout(() => {
    // Role selection
    container.querySelectorAll('[data-select-role]').forEach(button => {
      button.addEventListener('click', () => {
        const role = button.getAttribute('data-select-role');
        auth.setRole(role);
        
        // Auto generate user ID for demo
        if (role === 'user' && !auth.currentUserId) {
          const randomId = Math.floor(Math.random() * 1000) + 1;
          auth.setUserId(randomId.toString());
        }
        
        window.dispatchEvent(new CustomEvent('authChanged'));
      });
    });
    
    // User ID input
    const saveUserIdBtn = container.querySelector('#save-user-id-btn');
    const userIdInput = container.querySelector('#user-id-input');
    
    if (saveUserIdBtn && userIdInput) {
      saveUserIdBtn.addEventListener('click', () => {
        const userId = userIdInput.value.trim();
        if (userId) {
          auth.setUserId(userId);
          alert('User ID saved successfully!');
        }
      });
    }
    
    // Card hover effects
    container.querySelectorAll('.role-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.02)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
      });
    });
  }, 0);
  
  return container;
}