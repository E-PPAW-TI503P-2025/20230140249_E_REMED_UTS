// src/components/BorrowForm.js - VERSION IMPROVED & FULL SCREEN
import { borrowAPI, bookAPI, auth } from '../utils/api.js';

export default function BorrowForm({ bookId = null }) {
  const container = document.createElement('div');
  container.className = 'container-fluid px-0';
  container.setAttribute('data-component', 'borrow-form');
  container.setAttribute('data-book-id', bookId || 'null');
  
  container.innerHTML = `
    <!-- Header Section -->
    <div class="bg-gradient-success text-white py-5 shadow-sm">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <nav aria-label="breadcrumb" class="mb-3">
              <ol class="breadcrumb bg-transparent p-0">
                <li class="breadcrumb-item">
                  <a href="#books" class="text-white-50 text-decoration-none">
                    <i class="bi bi-bookshelf me-1"></i>Books
                  </a>
                </li>
                <li class="breadcrumb-item text-white" aria-current="page">
                  Borrow Book
                </li>
              </ol>
            </nav>
            <h1 class="display-4 fw-bold mb-3">
              <i class="bi bi-bag-check me-3"></i>Borrow a Book
            </h1>
            <p class="lead mb-0 opacity-75">
              Track your borrowing with geolocation for better library management
            </p>
          </div>
          <div class="col-lg-4 text-lg-end mt-4 mt-lg-0">
            <a href="#books" class="btn btn-outline-light btn-lg px-4">
              <i class="bi bi-arrow-left me-2"></i>Back to Books
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="container py-5">
      ${!auth.isUser() ? `
        <!-- Not Logged In as User -->
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="card border-0 shadow-lg">
              <div class="card-body text-center p-5">
                <div class="mb-4">
                  <i class="bi bi-exclamation-triangle text-warning" style="font-size: 4rem;"></i>
                </div>
                <h2 class="mb-3">User Access Required</h2>
                <p class="text-muted mb-4 lead">
                  Please select "User" role to borrow books from the library system.
                </p>
                <div class="d-flex flex-column flex-md-row justify-content-center gap-3">
                  <a href="#select-role" class="btn btn-warning btn-lg px-5" id="switch-to-user-btn">
                    <i class="bi bi-person-badge me-2"></i>Switch to User Role
                  </a>
                  <a href="#books" class="btn btn-outline-secondary btn-lg px-5" id="browse-books-btn">
                    <i class="bi bi-book me-2"></i>Browse Books
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ` : !auth.currentUserId ? `
        <!-- User Role but No User ID -->
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="card border-0 shadow-lg">
              <div class="card-body text-center p-5">
                <div class="mb-4">
                  <i class="bi bi-person-plus text-warning" style="font-size: 4rem;"></i>
                </div>
                <h2 class="mb-3">User ID Required</h2>
                <p class="text-muted mb-4 lead">
                  Please set your User ID before borrowing books from the library.
                </p>
                <div class="d-flex justify-content-center">
                  <a href="#select-role" class="btn btn-warning btn-lg px-5" id="set-user-id-btn">
                    <i class="bi bi-person-plus me-2"></i>Set User ID
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ` : `
        <!-- Borrow Form Content -->
        <div class="row g-5">
          <!-- Left Column - Form -->
          <div class="col-lg-8">
            <div class="card border-0 shadow-lg">
              <div class="card-body p-5">
                ${bookId ? `
                  <!-- Pre-selected Book Banner -->
                  <div class="alert alert-info border-0 bg-info bg-opacity-10 mb-5">
                    <div class="d-flex align-items-center">
                      <div class="flex-shrink-0">
                        <i class="bi bi-info-circle fs-3 text-info"></i>
                      </div>
                      <div class="flex-grow-1 ms-3">
                        <h5 class="alert-heading mb-1">Pre-selected Book</h5>
                        <p class="mb-0">You are borrowing Book ID: <strong class="fs-5">#${bookId}</strong></p>
                        <small class="text-muted">You can still change the Book ID if needed</small>
                      </div>
                    </div>
                  </div>
                ` : ''}
                
                <form id="borrow-form" class="needs-validation" novalidate>
                  <!-- Book ID Section -->
                  <div class="mb-5">
                    <div class="d-flex align-items-center mb-4">
                      <div class="bg-light rounded-circle p-3 me-3">
                        <i class="bi bi-book text-primary fs-3"></i>
                      </div>
                      <div>
                        <h4 class="mb-1">Book Selection</h4>
                        <p class="text-muted mb-0">Enter the ID of the book you want to borrow</p>
                      </div>
                    </div>
                    <div class="form-floating">
                      <input type="number" 
                             class="form-control form-control-lg" 
                             id="book-id" 
                             required
                             min="1"
                             ${bookId ? `value="${bookId}"` : ''}
                             placeholder="Enter book ID"
                             oninput="this.value = this.value.replace(/[^0-9]/g, '')">
                      <label for="book-id">
                        <i class="bi bi-123 me-2"></i>Book ID *
                      </label>
                      <div class="invalid-feedback mt-2">
                        <i class="bi bi-exclamation-circle me-1"></i>
                        Please enter a valid book ID
                      </div>
                    </div>
                    ${!bookId ? `
                      <small class="text-muted mt-2 d-block">
                        <i class="bi bi-info-circle me-1"></i>
                        Find the Book ID from the books list or book details page
                      </small>
                    ` : ''}
                    
                    <!-- Book Info Preview -->
                    <div class="mt-4" id="book-preview" style="display: none;">
                      <div class="card border-primary">
                        <div class="card-body">
                          <div class="d-flex align-items-center">
                            <div class="flex-shrink-0">
                              <i class="bi bi-book text-primary fs-2"></i>
                            </div>
                            <div class="flex-grow-1 ms-3">
                              <h6 class="mb-1" id="preview-title">Book Title</h6>
                              <p class="text-muted mb-1" id="preview-author">Author Name</p>
                              <div class="d-flex align-items-center">
                                <span class="badge bg-success me-2" id="preview-stock">0 copies</span>
                                <small class="text-muted" id="preview-status">Checking availability...</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Location Section -->
                  <div class="mb-5">
                    <div class="d-flex align-items-center mb-4">
                      <div class="bg-light rounded-circle p-3 me-3">
                        <i class="bi bi-geo-alt text-primary fs-3"></i>
                      </div>
                      <div>
                        <h4 class="mb-1">Borrowing Location</h4>
                        <p class="text-muted mb-0">We track where books are borrowed for better management</p>
                      </div>
                    </div>
                    
                    <div class="row g-4">
                      <div class="col-md-6">
                        <div class="form-floating">
                          <input type="number" 
                                 step="any"
                                 class="form-control form-control-lg" 
                                 id="latitude" 
                                 required
                                 placeholder="-6.2088"
                                 min="-90"
                                 max="90">
                          <label for="latitude">
                            <i class="bi bi-globe me-2"></i>Latitude *
                          </label>
                          <div class="invalid-feedback mt-2">
                            <i class="bi bi-exclamation-circle me-1"></i>
                            Valid latitude required (-90 to 90)
                          </div>
                        </div>
                        <small class="text-muted mt-2 d-block">
                          <i class="bi bi-geo me-1"></i>
                          Example: -6.2088 (Jakarta)
                        </small>
                      </div>
                      
                      <div class="col-md-6">
                        <div class="form-floating">
                          <input type="number" 
                                 step="any"
                                 class="form-control form-control-lg" 
                                 id="longitude" 
                                 required
                                 placeholder="106.8456"
                                 min="-180"
                                 max="180">
                          <label for="longitude">
                            <i class="bi bi-globe me-2"></i>Longitude *
                          </label>
                          <div class="invalid-feedback mt-2">
                            <i class="bi bi-exclamation-circle me-1"></i>
                            Valid longitude required (-180 to 180)
                          </div>
                        </div>
                        <small class="text-muted mt-2 d-block">
                          <i class="bi bi-geo me-1"></i>
                          Example: 106.8456 (Jakarta)
                        </small>
                      </div>
                    </div>
                    
                    <!-- Location Buttons -->
                    <div class="row mt-4">
                      <div class="col-md-6 mb-3">
                        <button type="button" 
                                class="btn btn-outline-primary w-100 py-3" 
                                id="get-location-btn">
                          <i class="bi bi-geo-fill me-2"></i>
                          <div class="d-flex flex-column align-items-start">
                            <span class="fw-bold">Use My Location</span>
                            <small class="opacity-75">Auto-detect current position</small>
                          </div>
                        </button>
                      </div>
                      <div class="col-md-6 mb-3">
                        <button type="button" 
                                class="btn btn-outline-secondary w-100 py-3" 
                                id="demo-location-btn">
                          <i class="bi bi-geo me-2"></i>
                          <div class="d-flex flex-column align-items-start">
                            <span class="fw-bold">Use Demo Location</span>
                            <small class="opacity-75">Jakarta coordinates</small>
                          </div>
                        </button>
                      </div>
                    </div>
                    
                    <!-- Location Info -->
                    <div class="alert alert-info border-0 bg-info bg-opacity-10 mt-4">
                      <div class="d-flex">
                        <i class="bi bi-info-circle fs-4 me-3"></i>
                        <div>
                          <h6 class="alert-heading mb-2">Why location tracking?</h6>
                          <p class="mb-0 small">
                            Location data helps us optimize book distribution and understand borrowing patterns.
                            Your location is only used for library management purposes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- User Info Section -->
                  <div class="mb-5">
                    <div class="d-flex align-items-center mb-4">
                      <div class="bg-light rounded-circle p-3 me-3">
                        <i class="bi bi-person-circle text-primary fs-3"></i>
                      </div>
                      <div>
                        <h4 class="mb-1">Your Information</h4>
                        <p class="text-muted mb-0">Logged in user details</p>
                      </div>
                    </div>
                    
                    <div class="row g-4">
                      <div class="col-md-6">
                        <div class="card border-success h-100">
                          <div class="card-body">
                            <div class="d-flex align-items-center">
                              <div class="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                                <i class="bi bi-person-badge text-success"></i>
                              </div>
                              <div>
                                <small class="text-muted">User ID</small>
                                <div class="h4 fw-bold mb-0">${auth.currentUserId}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div class="col-md-6">
                        <div class="card border-success h-100">
                          <div class="card-body">
                            <div class="d-flex align-items-center">
                              <div class="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                                <i class="bi bi-shield-check text-success"></i>
                              </div>
                              <div>
                                <small class="text-muted">Role</small>
                                <div>
                                  <span class="badge bg-success fs-6 py-2 px-3">Library User</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Terms and Conditions -->
                  <div class="mb-5">
                    <div class="d-flex align-items-center mb-4">
                      <div class="bg-light rounded-circle p-3 me-3">
                        <i class="bi bi-journal-check text-primary fs-3"></i>
                      </div>
                      <div>
                        <h4 class="mb-1">Terms & Conditions</h4>
                        <p class="text-muted mb-0">Please read and agree to continue</p>
                      </div>
                    </div>
                    
                    <div class="card border-0 bg-light">
                      <div class="card-body">
                        <div class="form-check mb-4">
                          <input class="form-check-input" 
                                 type="checkbox" 
                                 id="confirm-check" 
                                 required
                                 style="width: 1.2rem; height: 1.2rem;">
                          <label class="form-check-label fw-bold ms-2" for="confirm-check">
                            I agree to the library borrowing terms and conditions
                          </label>
                          <div class="invalid-feedback mt-2">
                            <i class="bi bi-exclamation-circle me-1"></i>
                            You must agree to the terms before borrowing
                          </div>
                        </div>
                        
                        <div class="p-4 rounded bg-white">
                          <h6 class="mb-3">
                            <i class="bi bi-list-check me-2"></i>Borrowing Terms:
                          </h6>
                          <ul class="list-unstyled mb-0">
                            <li class="mb-3">
                              <div class="d-flex">
                                <i class="bi bi-calendar-check text-success me-2 mt-1"></i>
                                <div>
                                  <span class="fw-bold">Borrowing Period:</span>
                                  <span class="text-muted"> Books must be returned within 14 days</span>
                                </div>
                              </div>
                            </li>
                            <li class="mb-3">
                              <div class="d-flex">
                                <i class="bi bi-cash-coin text-warning me-2 mt-1"></i>
                                <div>
                                  <span class="fw-bold">Late Fees:</span>
                                  <span class="text-muted"> A late fee of $1 per day applies after due date</span>
                                </div>
                              </div>
                            </li>
                            <li class="mb-3">
                              <div class="d-flex">
                                <i class="bi bi-shield-exclamation text-danger me-2 mt-1"></i>
                                <div>
                                  <span class="fw-bold">Responsibility:</span>
                                  <span class="text-muted"> You are responsible for any damage to the book</span>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div class="d-flex">
                                <i class="bi bi-geo-alt text-info me-2 mt-1"></i>
                                <div>
                                  <span class="fw-bold">Location Tracking:</span>
                                  <span class="text-muted"> Location data is recorded for tracking purposes</span>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Action Buttons -->
                  <div class="border-top pt-5">
                    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
                      <div class="mb-4 mb-md-0">
                        <a href="#books" class="btn btn-outline-secondary btn-lg px-4" id="back-to-books-btn">
                          <i class="bi bi-arrow-left me-2"></i>Cancel
                        </a>
                      </div>
                      
                      <div class="d-flex flex-column flex-md-row gap-3">
                        <button type="reset" class="btn btn-outline-danger btn-lg px-4" id="clear-form-btn">
                          <i class="bi bi-x-circle me-2"></i>Clear Form
                        </button>
                        <button type="submit" class="btn btn-success btn-lg px-5" id="submit-borrow-btn">
                          <i class="bi bi-check-circle me-2"></i>Borrow Book
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          <!-- Right Column - Help & Info -->
          <div class="col-lg-4">
            <!-- Process Steps -->
            <div class="card border-0 shadow-sm mb-4">
              <div class="card-header bg-transparent border-0 py-4">
                <h4 class="mb-0">
                  <i class="bi bi-list-ol text-success me-2"></i>
                  Borrowing Process
                </h4>
              </div>
              <div class="card-body">
                <div class="timeline">
                  <div class="timeline-item mb-4">
                    <div class="timeline-marker bg-success"></div>
                    <div class="timeline-content">
                      <h6 class="mb-1">Select Book</h6>
                      <p class="small text-muted mb-0">Enter the Book ID you want to borrow</p>
                    </div>
                  </div>
                  <div class="timeline-item mb-4">
                    <div class="timeline-marker bg-success"></div>
                    <div class="timeline-content">
                      <h6 class="mb-1">Set Location</h6>
                      <p class="small text-muted mb-0">Provide your current location or use demo</p>
                    </div>
                  </div>
                  <div class="timeline-item mb-4">
                    <div class="timeline-marker bg-success"></div>
                    <div class="timeline-content">
                      <h6 class="mb-1">Agree to Terms</h6>
                      <p class="small text-muted mb-0">Read and accept borrowing conditions</p>
                    </div>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-marker bg-light"></div>
                    <div class="timeline-content">
                      <h6 class="mb-1">Complete Borrowing</h6>
                      <p class="small text-muted mb-0">Submit and receive confirmation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Quick Tips -->
            <div class="card border-0 shadow-sm mb-4">
              <div class="card-header bg-transparent border-0 py-4">
                <h4 class="mb-0">
                  <i class="bi bi-lightbulb text-success me-2"></i>
                  Quick Tips
                </h4>
              </div>
              <div class="card-body">
                <ul class="list-unstyled mb-0">
                  <li class="mb-3">
                    <div class="d-flex">
                      <i class="bi bi-check-circle text-success me-2 mt-1"></i>
                      <span>Make sure the book is available before borrowing</span>
                    </div>
                  </li>
                  <li class="mb-3">
                    <div class="d-flex">
                      <i class="bi bi-check-circle text-success me-2 mt-1"></i>
                      <span>Use accurate location for better tracking</span>
                    </div>
                  </li>
                  <li class="mb-3">
                    <div class="d-flex">
                      <i class="bi bi-check-circle text-success me-2 mt-1"></i>
                      <span>Remember your return date (14 days)</span>
                    </div>
                  </li>
                  <li>
                    <div class="d-flex">
                      <i class="bi bi-check-circle text-success me-2 mt-1"></i>
                      <span>Keep the book in good condition</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <!-- Contact Help -->
            <div class="card border-0 shadow-sm">
              <div class="card-header bg-transparent border-0 py-4">
                <h4 class="mb-0">
                  <i class="bi bi-question-circle text-success me-2"></i>
                  Need Help?
                </h4>
              </div>
              <div class="card-body">
                <p class="small text-muted mb-3">
                  If you encounter any issues while borrowing a book, please contact library support.
                </p>
                <div class="d-grid gap-2">
                  <a href="#books" class="btn btn-outline-success">
                    <i class="bi bi-book me-2"></i>Browse Books
                  </a>
                  <button class="btn btn-outline-info" id="show-sample-data">
                    <i class="bi bi-magic me-2"></i>Fill Sample Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `}
    </div>
  `;
  
  // Add custom CSS
  const style = document.createElement('style');
  style.textContent = `
    .bg-gradient-success {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    }
    
    .form-control-lg {
      padding: 1rem 1.25rem;
      font-size: 1.1rem;
    }
    
    .form-floating > label {
      padding-left: 3rem;
    }
    
    .timeline {
      position: relative;
      padding-left: 2rem;
    }
    
    .timeline::before {
      content: '';
      position: absolute;
      left: 0.75rem;
      top: 0;
      bottom: 0;
      width: 2px;
      background: #e5e7eb;
    }
    
    .timeline-item {
      position: relative;
    }
    
    .timeline-marker {
      position: absolute;
      left: -2rem;
      top: 0.25rem;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      border: 3px solid white;
    }
    
    .timeline-content {
      padding-left: 0.5rem;
    }
    
    .hover-lift {
      transition: all 0.3s ease;
    }
    
    .hover-lift:hover {
      transform: translateY(-2px);
    }
    
    @media (max-width: 768px) {
      .display-4 {
        font-size: 2.5rem;
      }
    }
  `;
  container.appendChild(style);
  
  // Add event listeners
  setTimeout(() => {
    // Helper untuk safe navigation
    const safeNavigate = (hash) => {
      console.log('BorrowForm: Navigating to', hash);
      window.location.hash = hash;
      return false;
    };
    
    // Navigation buttons
    ['switch-to-user-btn', 'browse-books-btn', 'set-user-id-btn', 'back-to-books-btn'].forEach(id => {
      const btn = container.querySelector(`#${id}`);
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          safeNavigate(id.includes('books') ? 'books' : 'select-role');
        });
      }
    });
    
    // Jika user sudah login
    if (auth.isUser() && auth.currentUserId) {
      // Book ID change listener for preview
      const bookIdInput = container.querySelector('#book-id');
      if (bookIdInput) {
        bookIdInput.addEventListener('blur', debounce(async () => {
          const bookId = bookIdInput.value.trim();
          if (bookId && /^\d+$/.test(bookId)) {
            await showBookPreview(parseInt(bookId));
          }
        }, 500));
        
        bookIdInput.addEventListener('input', () => {
          const preview = container.querySelector('#book-preview');
          if (preview) preview.style.display = 'none';
        });
      }
      
      // Get location button
      const getLocationBtn = container.querySelector('#get-location-btn');
      if (getLocationBtn) {
        getLocationBtn.addEventListener('click', () => {
          if (navigator.geolocation) {
            getLocationBtn.innerHTML = `
              <span class="spinner-border spinner-border-sm me-2"></span>
              <div class="d-flex flex-column align-items-start">
                <span class="fw-bold">Detecting...</span>
                <small class="opacity-75">Getting your location</small>
              </div>
            `;
            getLocationBtn.disabled = true;
            
            navigator.geolocation.getCurrentPosition(
              (position) => {
                document.getElementById('latitude').value = position.coords.latitude.toFixed(6);
                document.getElementById('longitude').value = position.coords.longitude.toFixed(6);
                
                getLocationBtn.innerHTML = `
                  <i class="bi bi-check-circle me-2"></i>
                  <div class="d-flex flex-column align-items-start">
                    <span class="fw-bold">Location Set</span>
                    <small class="opacity-75">Successfully detected</small>
                  </div>
                `;
                
                setTimeout(() => {
                  getLocationBtn.innerHTML = `
                    <i class="bi bi-geo-fill me-2"></i>
                    <div class="d-flex flex-column align-items-start">
                      <span class="fw-bold">Use My Location</span>
                      <small class="opacity-75">Auto-detect current position</small>
                    </div>
                  `;
                  getLocationBtn.disabled = false;
                }, 2000);
              },
              (error) => {
                let errorMessage = 'Unable to get location';
                switch(error.code) {
                  case error.PERMISSION_DENIED:
                    errorMessage = 'Location access denied. Please enable location services.';
                    break;
                  case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Location information unavailable.';
                    break;
                  case error.TIMEOUT:
                    errorMessage = 'Location request timed out.';
                    break;
                }
                
                showToast(`❌ ${errorMessage}`, 'warning');
                document.getElementById('latitude').value = -6.2088;
                document.getElementById('longitude').value = 106.8456;
                
                getLocationBtn.innerHTML = `
                  <i class="bi bi-geo-fill me-2"></i>
                  <div class="d-flex flex-column align-items-start">
                    <span class="fw-bold">Use My Location</span>
                    <small class="opacity-75">Auto-detect current position</small>
                  </div>
                `;
                getLocationBtn.disabled = false;
              },
              { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
          } else {
            showToast('❌ Geolocation not supported by your browser', 'warning');
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
          
          // Visual feedback
          demoLocationBtn.innerHTML = `
            <i class="bi bi-check-circle me-2"></i>
            <div class="d-flex flex-column align-items-start">
              <span class="fw-bold">Demo Set</span>
              <small class="opacity-75">Jakarta coordinates loaded</small>
            </div>
          `;
          
          setTimeout(() => {
            demoLocationBtn.innerHTML = `
              <i class="bi bi-geo me-2"></i>
              <div class="d-flex flex-column align-items-start">
                <span class="fw-bold">Use Demo Location</span>
                <small class="opacity-75">Jakarta coordinates</small>
              </div>
            `;
          }, 1500);
        });
      }
      
      // Sample data button
      const sampleDataBtn = container.querySelector('#show-sample-data');
      if (sampleDataBtn) {
        sampleDataBtn.addEventListener('click', () => {
          if (!bookId) {
            document.getElementById('book-id').value = '1';
            showBookPreview(1);
          }
          document.getElementById('latitude').value = -6.2088;
          document.getElementById('longitude').value = 106.8456;
          document.getElementById('confirm-check').checked = true;
          
          showToast('✅ Sample data loaded successfully!', 'success');
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
            
            // Scroll to first invalid field
            const invalidField = form.querySelector(':invalid');
            if (invalidField) {
              invalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
              invalidField.focus();
            }
            
            return;
          }
          
          const borrowData = {
            bookId: parseInt(document.getElementById('book-id').value),
            latitude: parseFloat(document.getElementById('latitude').value),
            longitude: parseFloat(document.getElementById('longitude').value)
          };
          
          try {
            const submitBtn = container.querySelector('#submit-borrow-btn');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
              <span class="spinner-border spinner-border-sm me-2"></span>
              Processing Borrowing Request...
            `;
            
            // Check book stock first
            const bookResponse = await bookAPI.getById(borrowData.bookId);
            const book = bookResponse.data.data;
            
            if (book.stock <= 0) {
              throw new Error(`"${book.title}" is currently out of stock. Please check back later.`);
            }
            
            // Process borrow
            const response = await borrowAPI.borrow(borrowData);
            const result = response.data;
            
            // Show success message
            const successHTML = `
              <div class="text-center py-4">
                <div class="mb-4">
                  <i class="bi bi-check-circle text-success" style="font-size: 4rem;"></i>
                </div>
                <h3 class="text-success mb-3">Book Borrowed Successfully!</h3>
                <div class="card border-success mb-4">
                  <div class="card-body">
                    <h5 class="card-title mb-3">"${book.title}"</h5>
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <small class="text-muted">Author</small>
                        <div class="fw-bold">${book.author}</div>
                      </div>
                      <div class="col-md-6 mb-3">
                        <small class="text-muted">Remaining Stock</small>
                        <div class="fw-bold">${result.data.remainingStock} copies</div>
                      </div>
                      <div class="col-12">
                        <small class="text-muted">Borrowed Location</small>
                        <div class="fw-bold">
                          ${borrowData.latitude.toFixed(6)}, ${borrowData.longitude.toFixed(6)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p class="text-muted mb-4">
                  <i class="bi bi-info-circle me-2"></i>
                  Remember to return the book within 14 days to avoid late fees.
                </p>
                <div class="d-flex justify-content-center gap-3">
                  <button class="btn btn-success btn-lg px-4" id="continue-btn">
                    <i class="bi bi-check-circle me-2"></i>Continue
                  </button>
                  <button class="btn btn-outline-secondary btn-lg px-4" id="borrow-another-btn">
                    <i class="bi bi-plus-circle me-2"></i>Borrow Another
                  </button>
                </div>
              </div>
            `;
            
            // Replace form with success message
            form.parentElement.innerHTML = successHTML;
            
            // Add success event listeners
            setTimeout(() => {
              const continueBtn = container.querySelector('#continue-btn');
              const borrowAnotherBtn = container.querySelector('#borrow-another-btn');
              
              if (continueBtn) {
                continueBtn.addEventListener('click', () => {
                  safeNavigate('books');
                  window.dispatchEvent(new CustomEvent('booksUpdated'));
                });
              }
              
              if (borrowAnotherBtn) {
                borrowAnotherBtn.addEventListener('click', () => {
                  safeNavigate('books');
                  window.dispatchEvent(new CustomEvent('booksUpdated'));
                });
              }
              
              // Auto-redirect after 10 seconds
              setTimeout(() => {
                if (container.querySelector('#continue-btn')) {
                  safeNavigate('books');
                  window.dispatchEvent(new CustomEvent('booksUpdated'));
                }
              }, 10000);
              
            }, 100);
            
          } catch (error) {
            console.error('Borrow error:', error);
            
            let errorMessage = error.response?.data?.error || error.message;
            if (errorMessage.includes('out of stock')) {
              errorMessage = `❌ ${errorMessage}. Please choose another book.`;
            } else {
              errorMessage = `❌ Failed to borrow book: ${errorMessage}`;
            }
            
            showToast(errorMessage, 'danger');
            
            const submitBtn = container.querySelector('#submit-borrow-btn');
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Borrow Book';
            }
          }
        });
      }
      
      // Clear form button
      const clearBtn = container.querySelector('#clear-form-btn');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          if (form) {
            form.reset();
            form.classList.remove('was-validated');
            const preview = container.querySelector('#book-preview');
            if (preview) preview.style.display = 'none';
            
            showToast('✅ Form cleared successfully!', 'info');
          }
        });
      }
    }
    
    // Utility functions
    function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
    
    async function showBookPreview(bookId) {
      const preview = container.querySelector('#book-preview');
      if (!preview) return;
      
      try {
        preview.innerHTML = `
          <div class="card border-primary">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0">
                  <i class="bi bi-hourglass-split text-warning fs-2"></i>
                </div>
                <div class="flex-grow-1 ms-3">
                  <h6 class="mb-1">Loading book info...</h6>
                  <p class="text-muted mb-1">Please wait</p>
                </div>
              </div>
            </div>
          </div>
        `;
        preview.style.display = 'block';
        
        const response = await bookAPI.getById(bookId);
        const book = response.data.data;
        
        preview.innerHTML = `
          <div class="card ${book.stock > 0 ? 'border-success' : 'border-danger'}">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0">
                  <i class="bi bi-book ${book.stock > 0 ? 'text-success' : 'text-danger'} fs-2"></i>
                </div>
                <div class="flex-grow-1 ms-3">
                  <h6 class="mb-1" title="${book.title}">${book.title.length > 40 ? book.title.substring(0, 40) + '...' : book.title}</h6>
                  <p class="text-muted mb-2">${book.author}</p>
                  <div class="d-flex align-items-center">
                    <span class="badge ${book.stock > 0 ? 'bg-success' : 'bg-danger'} me-2">
                      ${book.stock} ${book.stock === 1 ? 'copy' : 'copies'}
                    </span>
                    <small class="${book.stock > 0 ? 'text-success' : 'text-danger'}">
                      <i class="bi ${book.stock > 0 ? 'bi-check-circle' : 'bi-x-circle'} me-1"></i>
                      ${book.stock > 0 ? 'Available' : 'Out of stock'}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        
      } catch (error) {
        preview.innerHTML = `
          <div class="card border-warning">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0">
                  <i class="bi bi-exclamation-triangle text-warning fs-2"></i>
                </div>
                <div class="flex-grow-1 ms-3">
                  <h6 class="mb-1">Book not found</h6>
                  <p class="text-muted mb-1">Invalid Book ID or book doesn't exist</p>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    }
    
    function showToast(message, type = 'info') {
      const toast = document.createElement('div');
      toast.className = `toast align-items-center text-bg-${type} border-0 position-fixed`;
      toast.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
      `;
      
      toast.innerHTML = `
        <div class="d-flex">
          <div class="toast-body d-flex align-items-center">
            ${type === 'success' ? '✅' : type === 'danger' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️'}
            <span class="ms-2">${message}</span>
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      `;
      
      document.body.appendChild(toast);
      const bsToast = new bootstrap.Toast(toast, { autohide: true, delay: 5000 });
      bsToast.show();
      
      toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
      });
    }
    
  }, 0);
  
  return container;
}