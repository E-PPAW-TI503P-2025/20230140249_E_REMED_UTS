// src/components/BookForm.js - VERSION IMPROVED & FULL SCREEN
import { bookAPI, auth } from '../utils/api.js';

export default function BookForm({ bookId = null, mode = 'add' }) {
  const container = document.createElement('div');
  container.className = 'container-fluid px-0';
  container.setAttribute('data-component', 'book-form');
  container.setAttribute('data-mode', mode);
  container.setAttribute('data-book-id', bookId || 'null');
  
  const isEdit = mode === 'edit';
  const formTitle = isEdit ? 'Edit Book' : 'Add New Book';
  const formDescription = isEdit 
    ? 'Update book information and stock' 
    : 'Add a new book to the library collection';
  
  container.innerHTML = `
    <!-- Header Section -->
    <div class="bg-gradient-${isEdit ? 'warning' : 'primary'} text-white py-5 shadow-sm">
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
                  ${formTitle}
                </li>
              </ol>
            </nav>
            <h1 class="display-4 fw-bold mb-3">
              <i class="bi ${isEdit ? 'bi-pencil-square' : 'bi-plus-circle'} me-3"></i>
              ${formTitle}
            </h1>
            <p class="lead mb-0 opacity-75">${formDescription}</p>
          </div>
          <div class="col-lg-4 text-lg-end mt-4 mt-lg-0">
            <a href="#books" class="btn btn-outline-light btn-lg px-4">
              <i class="bi bi-arrow-left me-2"></i>Back to Books
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Main Form Content -->
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-xl-10">
          <div class="row g-5">
            <!-- Left Column - Form -->
            <div class="col-lg-8">
              <div class="card border-0 shadow-lg">
                <div class="card-body p-5">
                  <form id="book-form" class="needs-validation" novalidate>
                    <!-- Book ID (Edit Mode Only) -->
                    ${isEdit && bookId ? `
                      <div class="mb-5">
                        <div class="d-flex align-items-center mb-3">
                          <div class="bg-light rounded-circle p-3 me-3">
                            <i class="bi bi-123 text-primary fs-4"></i>
                          </div>
                          <div>
                            <h5 class="mb-1">Book Identification</h5>
                            <p class="text-muted mb-0">This ID is unique and cannot be changed</p>
                          </div>
                        </div>
                        <div class="form-floating">
                          <input type="text" 
                                 class="form-control form-control-lg" 
                                 id="book-id-display" 
                                 value="${bookId}" 
                                 readonly
                                 style="background-color: #f8f9fa; cursor: not-allowed;">
                          <label for="book-id-display">Book ID</label>
                        </div>
                      </div>
                    ` : ''}
                    
                    <!-- Title Field -->
                    <div class="mb-5">
                      <div class="d-flex align-items-center mb-3">
                        <div class="bg-light rounded-circle p-3 me-3">
                          <i class="bi bi-bookmark text-primary fs-4"></i>
                        </div>
                        <div>
                          <h5 class="mb-1">Book Title</h5>
                          <p class="text-muted mb-0">Enter the complete title of the book</p>
                        </div>
                      </div>
                      <div class="form-floating">
                        <input type="text" 
                               class="form-control form-control-lg" 
                               id="title" 
                               required
                               placeholder="Enter book title"
                               autofocus>
                        <label for="title">
                          <i class="bi bi-type me-1"></i>Book Title *
                        </label>
                        <div class="invalid-feedback mt-2">
                          <i class="bi bi-exclamation-circle me-1"></i>
                          Please enter a book title
                        </div>
                      </div>
                      <small class="text-muted mt-2 d-block">
                        <i class="bi bi-info-circle me-1"></i>
                        Be specific and include subtitles if applicable
                      </small>
                    </div>
                    
                    <!-- Author Field -->
                    <div class="mb-5">
                      <div class="d-flex align-items-center mb-3">
                        <div class="bg-light rounded-circle p-3 me-3">
                          <i class="bi bi-person text-primary fs-4"></i>
                        </div>
                        <div>
                          <h5 class="mb-1">Author Information</h5>
                          <p class="text-muted mb-0">Full name of the author or authors</p>
                        </div>
                      </div>
                      <div class="form-floating">
                        <input type="text" 
                               class="form-control form-control-lg" 
                               id="author" 
                               required
                               placeholder="Enter author name">
                        <label for="author">
                          <i class="bi bi-person-badge me-1"></i>Author Name *
                        </label>
                        <div class="invalid-feedback mt-2">
                          <i class="bi bi-exclamation-circle me-1"></i>
                          Please enter an author name
                        </div>
                      </div>
                      <small class="text-muted mt-2 d-block">
                        <i class="bi bi-info-circle me-1"></i>
                        For multiple authors, separate with commas
                      </small>
                    </div>
                    
                    <!-- Stock Field -->
                    <div class="mb-5">
                      <div class="d-flex align-items-center mb-3">
                        <div class="bg-light rounded-circle p-3 me-3">
                          <i class="bi bi-box-seam text-primary fs-4"></i>
                        </div>
                        <div>
                          <h5 class="mb-1">Stock Management</h5>
                          <p class="text-muted mb-0">Set initial quantity of available copies</p>
                        </div>
                      </div>
                      <div class="row g-3 align-items-center">
                        <div class="col-md-8">
                          <div class="form-floating">
                            <input type="number" 
                                   class="form-control form-control-lg" 
                                   id="stock" 
                                   min="0"
                                   value="${isEdit ? '' : '1'}"
                                   placeholder="Enter stock quantity"
                                   step="1">
                            <label for="stock">
                              <i class="bi bi-123 me-1"></i>Available Copies
                            </label>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <div class="input-group input-group-lg">
                            <button type="button" class="btn btn-outline-secondary" id="decrease-stock">
                              <i class="bi bi-dash-lg"></i>
                            </button>
                            <button type="button" class="btn btn-outline-secondary" id="increase-stock">
                              <i class="bi bi-plus-lg"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="mt-3">
                        <div class="alert ${isEdit ? 'alert-warning' : 'alert-info'} border-0 bg-${isEdit ? 'warning' : 'info'}-bg-opacity-10">
                          <div class="d-flex align-items-center">
                            <i class="bi ${isEdit ? 'bi-exclamation-triangle' : 'bi-lightbulb'} fs-5 me-3"></i>
                            <div>
                              <small class="fw-bold">${isEdit ? 'Update with care' : 'Starting Stock'}:</small>
                              <small class="d-block">
                                ${isEdit 
                                  ? 'Changing stock affects current availability' 
                                  : 'Set to 1 if you only have one copy of this book'}
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="border-top pt-5 mt-5">
                      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center">
                        <div class="mb-4 mb-md-0">
                          <a href="#books" class="btn btn-outline-secondary btn-lg px-4" id="cancel-btn">
                            <i class="bi bi-x-circle me-2"></i>Cancel
                          </a>
                        </div>
                        
                        <div class="d-flex flex-column flex-md-row gap-3">
                          <button type="reset" class="btn btn-outline-danger btn-lg px-4" id="reset-form-btn">
                            <i class="bi bi-arrow-clockwise me-2"></i>Reset Form
                          </button>
                          <button type="submit" class="btn btn-${isEdit ? 'warning' : 'primary'} btn-lg px-5" id="submit-book-btn">
                            <i class="bi ${isEdit ? 'bi-check-circle' : 'bi-save'} me-2"></i>
                            ${isEdit ? 'Update Book' : 'Save Book'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            
            <!-- Right Column - Help & Guidelines -->
            <div class="col-lg-4">
              <!-- Status Card -->
              <div class="card border-0 shadow-sm mb-4">
                <div class="card-header bg-transparent border-0 py-4">
                  <h4 class="mb-0">
                    <i class="bi bi-clipboard-check text-${isEdit ? 'warning' : 'primary'} me-2"></i>
                    ${isEdit ? 'Edit Mode' : 'New Book'}
                  </h4>
                </div>
                <div class="card-body">
                  <div class="alert ${isEdit ? 'alert-warning' : 'alert-success'} border-0">
                    <div class="d-flex">
                      <i class="bi ${isEdit ? 'bi-pencil-square' : 'bi-plus-circle'} fs-4 me-3"></i>
                      <div>
                        <h6 class="alert-heading mb-2">${isEdit ? 'Editing Existing Book' : 'Creating New Book'}</h6>
                        <p class="mb-0 small">
                          ${isEdit 
                            ? 'You are modifying an existing book record. Changes will be saved immediately.' 
                            : 'You are adding a new book to the library database.'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="mt-4">
                    <h6 class="text-muted mb-3">
                      <i class="bi bi-list-check me-2"></i>Guidelines
                    </h6>
                    <ul class="list-unstyled mb-0">
                      <li class="mb-3">
                        <div class="d-flex">
                          <i class="bi bi-check-circle text-success me-2 mt-1"></i>
                          <span>Fields marked with * are required</span>
                        </div>
                      </li>
                      <li class="mb-3">
                        <div class="d-flex">
                          <i class="bi bi-check-circle text-success me-2 mt-1"></i>
                          <span>Stock must be 0 or greater</span>
                        </div>
                      </li>
                      <li class="mb-3">
                        <div class="d-flex">
                          <i class="bi bi-check-circle text-success me-2 mt-1"></i>
                          <span>Title should be complete and accurate</span>
                        </div>
                      </li>
                      <li>
                        <div class="d-flex">
                          <i class="bi bi-check-circle text-success me-2 mt-1"></i>
                          <span>Author name should match the book cover</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <!-- Quick Actions -->
              <div class="card border-0 shadow-sm">
                <div class="card-header bg-transparent border-0 py-4">
                  <h4 class="mb-0">
                    <i class="bi bi-lightning text-${isEdit ? 'warning' : 'primary'} me-2"></i>
                    Quick Actions
                  </h4>
                </div>
                <div class="card-body">
                  <div class="d-grid gap-2">
                    <a href="#books" class="btn btn-outline-secondary">
                      <i class="bi bi-eye me-2"></i>View All Books
                    </a>
                    ${isEdit ? `
                      <button class="btn btn-outline-info" id="load-current-data">
                        <i class="bi bi-arrow-clockwise me-2"></i>Reload Current Data
                      </button>
                    ` : `
                      <button type="button" class="btn btn-outline-info" id="fill-sample-data">
                        <i class="bi bi-magic me-2"></i>Fill Sample Data
                      </button>
                    `}
                  </div>
                  
                  ${!isEdit ? `
                    <div class="mt-4">
                      <h6 class="text-muted mb-3">Sample Book Ideas</h6>
                      <div class="list-group list-group-flush">
                        <a href="#" class="list-group-item list-group-item-action border-0 py-2 sample-title">
                          <small>To Kill a Mockingbird by Harper Lee</small>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action border-0 py-2 sample-title">
                          <small>1984 by George Orwell</small>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action border-0 py-2 sample-title">
                          <small>The Great Gatsby by F. Scott Fitzgerald</small>
                        </a>
                      </div>
                    </div>
                  ` : ''}
                </div>
              </div>
              
              <!-- Current User Info -->
              <div class="card border-0 shadow-sm mt-4">
                <div class="card-body">
                  <h6 class="text-muted mb-3">
                    <i class="bi bi-person-circle me-2"></i>Logged in as
                  </h6>
                  <div class="d-flex align-items-center">
                    <div class="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                      <i class="bi bi-shield-check text-primary"></i>
                    </div>
                    <div>
                      <div class="fw-bold">${auth.currentRole || 'No Role'}</div>
                      <small class="text-muted">${auth.isAdmin() ? 'Full Access' : 'Limited Access'}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add CSS for gradient backgrounds
  const style = document.createElement('style');
  style.textContent = `
    .bg-gradient-primary {
      background: linear-gradient(135deg, #4f6df5 0%, #3b82f6 100%);
    }
    
    .bg-gradient-warning {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    }
    
    .form-control-lg {
      padding: 1rem 1.25rem;
      font-size: 1.1rem;
    }
    
    .form-floating > label {
      padding-left: 3rem;
    }
    
    .form-floating > .form-control ~ label::after {
      background-color: transparent !important;
    }
    
    .input-group-lg .btn {
      padding: 1rem 1.5rem;
    }
    
    @media (max-width: 768px) {
      .display-4 {
        font-size: 2.5rem;
      }
    }
  `;
  container.appendChild(style);
  
  // Load book data if editing
  if (isEdit && bookId) {
    setTimeout(async () => {
      try {
        const response = await bookAPI.getById(bookId);
        const book = response.data.data;
        
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('stock').value = book.stock;
        
        // Set floating label active state
        if (book.title) document.getElementById('title').focus();
      } catch (error) {
        alert('Failed to load book data');
        window.location.hash = 'books';
      }
    }, 0);
  }
  
  // Form functionality
  setTimeout(() => {
    const form = container.querySelector('#book-form');
    const titleInput = container.querySelector('#title');
    const authorInput = container.querySelector('#author');
    const stockInput = container.querySelector('#stock');
    const submitBtn = container.querySelector('#submit-book-btn');
    const cancelBtn = container.querySelector('#cancel-btn');
    const resetBtn = container.querySelector('#reset-form-btn');
    const decreaseBtn = container.querySelector('#decrease-stock');
    const increaseBtn = container.querySelector('#increase-stock');
    
    // Stock controls
    if (decreaseBtn && increaseBtn && stockInput) {
      decreaseBtn.addEventListener('click', () => {
        let current = parseInt(stockInput.value) || 0;
        if (current > 0) {
          stockInput.value = current - 1;
        }
      });
      
      increaseBtn.addEventListener('click', () => {
        let current = parseInt(stockInput.value) || 0;
        stockInput.value = current + 1;
      });
    }
    
    // Sample data for new book
    if (!isEdit) {
      const fillSampleBtn = container.querySelector('#fill-sample-data');
      if (fillSampleBtn) {
        fillSampleBtn.addEventListener('click', () => {
          titleInput.value = 'The Silent Patient';
          authorInput.value = 'Alex Michaelides';
          stockInput.value = 5;
          titleInput.focus();
        });
      }
      
      // Sample title clicks
      container.querySelectorAll('.sample-title').forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const text = e.target.textContent || e.target.querySelector('small').textContent;
          const [title, author] = text.split(' by ');
          if (title && author) {
            titleInput.value = title.trim();
            authorInput.value = author.trim();
            stockInput.value = 3;
          }
        });
      });
    } else {
      // Reload current data button for edit mode
      const reloadBtn = container.querySelector('#load-current-data');
      if (reloadBtn) {
        reloadBtn.addEventListener('click', async () => {
          try {
            const response = await bookAPI.getById(bookId);
            const book = response.data.data;
            
            titleInput.value = book.title;
            authorInput.value = book.author;
            stockInput.value = book.stock;
            
            alert('Current data reloaded!');
          } catch (error) {
            alert('Failed to reload data');
          }
        });
      }
    }
    
    // Cancel button
    if (cancelBtn) {
      cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (confirm('Are you sure? Any unsaved changes will be lost.')) {
          window.location.hash = 'books';
        }
      });
    }
    
    // Reset button
    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (confirm('Reset all fields to default values?')) {
          form.reset();
          form.classList.remove('was-validated');
          if (!isEdit) {
            stockInput.value = 1;
          }
        }
      });
    }
    
    // Form submission
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
      
      const title = titleInput.value.trim();
      const author = authorInput.value.trim();
      const stock = parseInt(stockInput.value) || 0;
      
      if (!title || !author) {
        alert('Please fill in all required fields');
        return;
      }
      
      const bookData = { title, author, stock };
      
      try {
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span class="spinner-border spinner-border-sm me-2"></span>
          ${isEdit ? 'Updating...' : 'Saving...'}
        `;
        
        if (isEdit && bookId) {
          await bookAPI.update(bookId, bookData);
          
          // Show success animation
          submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Updated!';
          setTimeout(() => {
            alert('✅ Book updated successfully!');
            window.location.hash = 'books';
            window.dispatchEvent(new CustomEvent('booksUpdated'));
          }, 500);
        } else {
          await bookAPI.create(bookData);
          
          // Show success animation
          submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Saved!';
          setTimeout(() => {
            alert('✅ Book added successfully!');
            window.location.hash = 'books';
            window.dispatchEvent(new CustomEvent('booksUpdated'));
          }, 500);
        }
        
      } catch (error) {
        const errorMsg = error.response?.data?.error || error.message;
        
        // Show error alert with better formatting
        const errorAlert = document.createElement('div');
        errorAlert.className = 'alert alert-danger alert-dismissible fade show position-fixed';
        errorAlert.style.cssText = `
          top: 20px;
          right: 20px;
          z-index: 9999;
          max-width: 400px;
        `;
        errorAlert.innerHTML = `
          <div class="d-flex">
            <i class="bi bi-exclamation-triangle fs-4 me-3"></i>
            <div>
              <h6 class="alert-heading mb-2">Failed to ${isEdit ? 'update' : 'save'} book</h6>
              <p class="mb-0 small">${errorMsg}</p>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
          </div>
        `;
        document.body.appendChild(errorAlert);
        
        setTimeout(() => {
          if (errorAlert.parentNode) {
            errorAlert.classList.remove('show');
            setTimeout(() => errorAlert.parentNode.removeChild(errorAlert), 300);
          }
        }, 5000);
        
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
    
    // Auto-focus title field
    if (titleInput && !isEdit) {
      setTimeout(() => titleInput.focus(), 100);
    }
    
  }, 0);
  
  return container;
}