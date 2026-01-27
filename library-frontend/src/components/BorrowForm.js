// src/components/BorrowForm.js - VERSION BARU & FINAL
import { borrowAPI, bookAPI, auth } from '../utils/api.js';

export default function BorrowForm({ bookId = null }) {
  const container = document.createElement('div');
  container.className = 'container mt-4';
  
  // Add data attribute for debugging
  container.setAttribute('data-component', 'borrow-form');
  container.setAttribute('data-book-id', bookId || 'null');
  
  container.innerHTML = `
    <div class="row justify-content-center">
      <div class="col-md-10 col-lg-8">
        <div class="card shadow border-0">
          <div class="card-header bg-success text-white py-3">
            <div class="d-flex align-items-center">
              <i class="bi bi-bag-check fs-4 me-3"></i>
              <div>
                <h4 class="mb-0">Borrow Book</h4>
                <small class="opacity-75">Track your borrowing with geolocation</small>
              </div>
            </div>
          </div>
          
          <div class="card-body p-4">
            ${!auth.isUser() ? `
              <!-- Not Logged In as User -->
              <div class="alert alert-warning">
                <div class="d-flex align-items-center">
                  <i class="bi bi-exclamation-triangle fs-4 me-3"></i>
                  <div>
                    <h5 class="alert-heading mb-2">User Access Required</h5>
                    <p class="mb-0">Please select "User" role to borrow books from the library.</p>
                  </div>
                </div>
              </div>
              
              <div class="text-center mt-4">
                <a href="#select-role" class="btn btn-warning btn-lg" id="switch-to-user-btn">
                  <i class="bi bi-person-badge me-2"></i>Switch to User Role
                </a>
                <a href="#books" class="btn btn-outline-secondary btn-lg ms-2" id="browse-books-btn">
                  <i class="bi bi-book me-2"></i>Browse Books
                </a>
              </div>
            ` : !auth.currentUserId ? `
              <!-- User Role but No User ID -->
              <div class="alert alert-warning">
                <div class="d-flex align-items-center">
                  <i class="bi bi-person-plus fs-4 me-3"></i>
                  <div>
                    <h5 class="alert-heading mb-2">User ID Required</h5>
                    <p class="mb-0">Please set your User ID before borrowing books.</p>
                  </div>
                </div>
              </div>
              
              <div class="text-center mt-4">
                <a href="#select-role" class="btn btn-warning btn-lg" id="set-user-id-btn">
                  <i class="bi bi-person-plus me-2"></i>Set User ID
                </a>
              </div>
            ` : `
              <!-- Borrow Form -->
              <div id="borrow-content">
                <!-- Header -->
                <div class="text-center mb-5">
                  <div class="mb-3">
                    <i class="bi bi-book text-success" style="font-size: 4rem;"></i>
                  </div>
                  <h2 class="mb-2">Borrow a Book</h2>
                  <p class="text-muted">Fill in the details below to borrow a book with location tracking</p>
                </div>
                
                ${bookId ? `
                  <!-- Pre-selected Book Info -->
                  <div class="alert alert-info mb-4">
                    <div class="d-flex align-items-center">
                      <i class="bi bi-info-circle fs-4 me-3"></i>
                      <div>
                        <h6 class="alert-heading mb-1">Pre-selected Book</h6>
                        <p class="mb-0">You are borrowing Book ID: <strong>${bookId}</strong></p>
                      </div>
                    </div>
                  </div>
                ` : ''}
                
                <!-- Main Form -->
                <form id="borrow-form" class="needs-validation" novalidate>
                  <!-- Book ID Field -->
                  <div class="mb-4">
                    <label for="book-id" class="form-label fw-bold">
                      <i class="bi bi-book me-2"></i>Book ID *
                    </label>
                    <div class="input-group">
                      <span class="input-group-text bg-light">
                        <i class="bi bi-123 text-muted"></i>
                      </span>
                      <input type="number" 
                             class="form-control py-2" 
                             id="book-id" 
                             required
                             min="1"
                             ${bookId ? `value="${bookId}" readonly` : 'placeholder="Enter book ID to borrow"'}
                             oninput="this.value = this.value.replace(/[^0-9]/g, '')">
                    </div>
                    <div class="invalid-feedback">Please enter a valid book ID</div>
                    ${!bookId ? `
                      <small class="text-muted">
                        <i class="bi bi-info-circle me-1"></i>
                        Find the Book ID from the books list
                      </small>
                    ` : ''}
                  </div>
                  
                  <!-- Location Fields -->
                  <div class="row mb-4">
                    <div class="col-md-6 mb-3">
                      <label for="latitude" class="form-label fw-bold">
                        <i class="bi bi-geo-alt me-2"></i>Latitude *
                      </label>
                      <div class="input-group">
                        <span class="input-group-text bg-light">
                          <i class="bi bi-globe text-muted"></i>
                        </span>
                        <input type="number" 
                               step="any"
                               class="form-control py-2" 
                               id="latitude" 
                               required
                               placeholder="-6.2088"
                               min="-90"
                               max="90">
                        <button type="button" 
                                class="btn btn-outline-primary" 
                                id="get-location-btn"
                                title="Get current location">
                          <i class="bi bi-geo-fill"></i> Auto
                        </button>
                      </div>
                      <div class="invalid-feedback">Please enter a valid latitude (-90 to 90)</div>
                      <small class="text-muted">Example: -6.2088 (Jakarta)</small>
                    </div>
                    
                    <div class="col-md-6 mb-3">
                      <label for="longitude" class="form-label fw-bold">
                        <i class="bi bi-geo-alt me-2"></i>Longitude *
                      </label>
                      <div class="input-group">
                        <span class="input-group-text bg-light">
                          <i class="bi bi-globe text-muted"></i>
                        </span>
                        <input type="number" 
                               step="any"
                               class="form-control py-2" 
                               id="longitude" 
                               required
                               placeholder="106.8456"
                               min="-180"
                               max="180">
                        <button type="button" 
                                class="btn btn-outline-secondary" 
                                id="demo-location-btn"
                                title="Use demo location">
                          <i class="bi bi-geo"></i> Demo
                        </button>
                      </div>
                      <div class="invalid-feedback">Please enter a valid longitude (-180 to 180)</div>
                      <small class="text-muted">Example: 106.8456 (Jakarta)</small>
                    </div>
                  </div>
                  
                  <!-- User Info Card -->
                  <div class="card mb-4 border-success">
                    <div class="card-header bg-success bg-opacity-10 border-success">
                      <h6 class="mb-0">
                        <i class="bi bi-person-circle me-2"></i>Your Information
                      </h6>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-6 mb-2">
                          <div class="d-flex align-items-center">
                            <i class="bi bi-person-badge text-muted me-2"></i>
                            <div>
                              <small class="text-muted">User ID</small>
                              <div class="fw-bold">${auth.currentUserId}</div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6 mb-2">
                          <div class="d-flex align-items-center">
                            <i class="bi bi-shield-check text-muted me-2"></i>
                            <div>
                              <small class="text-muted">Role</small>
                              <div><span class="badge bg-success">User</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Terms and Conditions -->
                  <div class="card mb-4">
                    <div class="card-body">
                      <div class="form-check mb-3">
                        <input class="form-check-input" 
                               type="checkbox" 
                               id="confirm-check" 
                               required>
                        <label class="form-check-label fw-bold" for="confirm-check">
                          I agree to the borrowing terms
                        </label>
                        <div class="invalid-feedback">You must agree to the terms before borrowing</div>
                      </div>
                      
                      <div class="bg-light p-3 rounded">
                        <h6 class="mb-2">
                          <i class="bi bi-journal-check me-2"></i>Borrowing Terms:
                        </h6>
                        <ul class="mb-0 small">
                          <li>Books must be returned within 14 days</li>
                          <li>A late fee of $1 per day applies after due date</li>
                          <li>You are responsible for any damage to the book</li>
                          <li>Location data is recorded for tracking purposes</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Action Buttons -->
                  <div class="d-flex flex-column flex-md-row justify-content-between align-items-center border-top pt-4">
                    <div class="mb-3 mb-md-0">
                      <a href="#books" class="btn btn-outline-secondary" id="back-to-books-btn">
                        <i class="bi bi-arrow-left me-2"></i>Back to Books
                      </a>
                    </div>
                    
                    <div class="d-flex gap-2">
                      <button type="reset" class="btn btn-outline-danger" id="clear-form-btn">
                        <i class="bi bi-x-circle me-2"></i>Clear Form
                      </button>
                      <button type="submit" class="btn btn-success btn-lg px-4" id="submit-borrow-btn">
                        <i class="bi bi-check-circle me-2"></i>Borrow Book
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            `}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Success Modal Template -->
    <div class="modal fade" id="successModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title text-success">
              <i class="bi bi-check-circle me-2"></i>Success!
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-center py-4">
            <i class="bi bi-check-circle text-success" style="font-size: 3rem;"></i>
            <h4 class="mt-3 text-success">Book Borrowed Successfully!</h4>
            <p id="success-message" class="text-muted">Your book has been borrowed.</p>
          </div>
          <div class="modal-footer border-0 justify-content-center">
            <button type="button" class="btn btn-success" data-bs-dismiss="modal" id="continue-btn">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add event listeners - VERSION SEDERHANA & PASTI WORK
  setTimeout(() => {
    // Helper untuk safe navigation
    const safeNavigate = (hash) => {
      console.log('BorrowForm: Navigating to', hash);
      window.location.hash = hash;
      return false;
    };
    
    // Helper untuk safe click handler
    const addSafeClick = (elementId, handler) => {
      const element = container.querySelector(`#${elementId}`);
      if (!element) return;
      
      element.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        handler(e);
      });
    };
    
    // Navigation buttons
    addSafeClick('switch-to-user-btn', () => safeNavigate('select-role'));
    addSafeClick('browse-books-btn', () => safeNavigate('books'));
    addSafeClick('set-user-id-btn', () => safeNavigate('select-role'));
    addSafeClick('back-to-books-btn', () => safeNavigate('books'));
    
    // Jika user sudah login
    if (auth.isUser() && auth.currentUserId) {
      // Get location button
      const getLocationBtn = container.querySelector('#get-location-btn');
      if (getLocationBtn) {
        getLocationBtn.addEventListener('click', () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                document.getElementById('latitude').value = position.coords.latitude.toFixed(6);
                document.getElementById('longitude').value = position.coords.longitude.toFixed(6);
              },
              (error) => {
                alert('Unable to get location: ' + error.message);
                document.getElementById('latitude').value = -6.2088;
                document.getElementById('longitude').value = 106.8456;
              }
            );
          } else {
            alert('Geolocation not supported');
            document.getElementById('latitude').value = -6.2088;
            document.getElementById('longitude').value = 106.8456;
          }
        });
      }
      
      // Demo location button
      const demoLocationBtn = container.querySelector('#demo-location-btn');
      if (demoLocationBtn) {
        demoLocationBtn.addEventListener('click', () => {
          document.getElementById('latitude').value = -6.2088;
          document.getElementById('longitude').value = 106.8456;
        });
      }
      
      // Form submission
      const form = container.querySelector('#borrow-form');
      if (form) {
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
          }
          
          const borrowData = {
            bookId: parseInt(document.getElementById('book-id').value),
            latitude: parseFloat(document.getElementById('latitude').value),
            longitude: parseFloat(document.getElementById('longitude').value)
          };
          
          try {
            const submitBtn = container.querySelector('#submit-borrow-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
            
            // Check book stock
            const bookResponse = await bookAPI.getById(borrowData.bookId);
            const book = bookResponse.data.data;
            
            if (book.stock <= 0) {
              throw new Error(`Book "${book.title}" is out of stock`);
            }
            
            // Process borrow
            const response = await borrowAPI.borrow(borrowData);
            const result = response.data;
            
            // Show success modal
            const modal = new bootstrap.Modal(container.querySelector('#successModal'));
            container.querySelector('#success-message').innerHTML = `
              You have successfully borrowed "<strong>${book.title}</strong>"<br>
              <small class="text-muted">Remaining stock: ${result.data.remainingStock}</small>
            `;
            
            modal.show();
            
            // Handle continue button
            container.querySelector('#continue-btn').addEventListener('click', () => {
              modal.hide();
              safeNavigate('books');
              window.dispatchEvent(new CustomEvent('booksUpdated'));
            });
            
            // Auto redirect after 3 seconds
            setTimeout(() => {
              if (document.querySelector('#successModal.show')) {
                modal.hide();
                safeNavigate('books');
                window.dispatchEvent(new CustomEvent('booksUpdated'));
              }
            }, 3000);
            
          } catch (error) {
            console.error('Borrow error:', error);
            alert('Failed to borrow book: ' + (error.response?.data?.error || error.message));
            
            const submitBtn = container.querySelector('#submit-borrow-btn');
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Borrow Book';
          }
        });
      }
      
      // Clear form button
      const clearBtn = container.querySelector('#clear-form-btn');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          const form = container.querySelector('#borrow-form');
          if (form) {
            form.reset();
            form.classList.remove('was-validated');
          }
        });
      }
    }
    
  }, 0);
  
  return container;
}