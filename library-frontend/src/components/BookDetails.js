// src/components/BookDetails.js - VERSION IMPROVED & FULL SCREEN
import { bookAPI, auth } from '../utils/api.js';

export default async function BookDetails({ bookId }) {
  const container = document.createElement('div');
  container.className = 'container-fluid px-0';
  container.setAttribute('data-component', 'book-details');
  
  try {
    // Show loading
    container.innerHTML = `
      <div class="d-flex justify-content-center align-items-center" style="height: 80vh">
        <div class="text-center">
          <div class="spinner-border text-primary" style="width: 4rem; height: 4rem;" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <h4 class="mt-4 text-muted">Loading book details...</h4>
        </div>
      </div>
    `;
    
    // Fetch book details
    const response = await bookAPI.getById(bookId);
    const book = response.data.data;
    
    // Render book details dengan layout full screen
    container.innerHTML = `
      <!-- Header Section -->
      <div class="bg-gradient-primary text-white py-4 shadow-sm">
        <div class="container">
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
            <div class="mb-3 mb-md-0">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb bg-transparent p-0 mb-2">
                  <li class="breadcrumb-item">
                    <a href="#books" class="text-white-50 text-decoration-none">
                      <i class="bi bi-bookshelf me-1"></i>Books
                    </a>
                  </li>
                  <li class="breadcrumb-item active text-white" aria-current="page">
                    ${book.title.substring(0, 30)}${book.title.length > 30 ? '...' : ''}
                  </li>
                </ol>
              </nav>
              <h1 class="display-5 fw-bold mb-2">${book.title}</h1>
              <div class="d-flex align-items-center flex-wrap gap-3">
                <div class="d-flex align-items-center">
                  <i class="bi bi-person-circle me-2"></i>
                  <span class="fs-5">${book.author}</span>
                </div>
                <span class="badge ${book.stock > 0 ? 'bg-success' : 'bg-danger'} fs-6 px-3 py-2">
                  <i class="bi ${book.stock > 0 ? 'bi-check-circle' : 'bi-x-circle'} me-1"></i>
                  ${book.stock > 0 ? 'Available' : 'Out of Stock'}
                </span>
              </div>
            </div>
            
            <div class="d-flex gap-2">
              <a href="#books" class="btn btn-outline-light">
                <i class="bi bi-arrow-left me-1"></i>Back
              </a>
              ${auth.isAdmin() ? `
                <a href="#edit-book/${book.id}" class="btn btn-warning">
                  <i class="bi bi-pencil me-1"></i>Edit
                </a>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Main Content -->
      <div class="container-fluid py-5">
        <div class="row g-4">
          <!-- Left Column - Book Info -->
          <div class="col-lg-8">
            <div class="row g-4">
              <!-- Stock & Availability Card -->
              <div class="col-md-6">
                <div class="card border-0 shadow-sm h-100">
                  <div class="card-header bg-transparent border-0 pt-4">
                    <h4 class="mb-0">
                      <i class="bi bi-box-seam text-primary me-2"></i>
                      Availability
                    </h4>
                  </div>
                  <div class="card-body text-center py-4">
                    <div class="display-1 fw-bold ${book.stock > 0 ? 'text-success' : 'text-danger'} mb-3">
                      ${book.stock}
                    </div>
                    <h5 class="mb-3">Copies Available</h5>
                    ${book.stock > 0 ? `
                      <div class="alert alert-success border-0 bg-success bg-opacity-10">
                        <i class="bi bi-check-circle-fill me-2"></i>
                        Ready to borrow immediately
                      </div>
                    ` : `
                      <div class="alert alert-danger border-0 bg-danger bg-opacity-10">
                        <i class="bi bi-exclamation-triangle-fill me-2"></i>
                        Currently unavailable for borrowing
                      </div>
                    `}
                  </div>
                </div>
              </div>
              
              <!-- Book ID & Details Card -->
              <div class="col-md-6">
                <div class="card border-0 shadow-sm h-100">
                  <div class="card-header bg-transparent border-0 pt-4">
                    <h4 class="mb-0">
                      <i class="bi bi-info-circle text-primary me-2"></i>
                      Details
                    </h4>
                  </div>
                  <div class="card-body">
                    <div class="list-group list-group-flush">
                      <div class="list-group-item border-0 px-0 py-3">
                        <div class="d-flex justify-content-between align-items-center">
                          <div class="d-flex align-items-center">
                            <i class="bi bi-123 text-muted me-3" style="font-size: 1.2rem;"></i>
                            <div>
                              <small class="text-muted">Book ID</small>
                              <h6 class="mb-0 fw-bold">#${book.id}</h6>
                            </div>
                          </div>
                          <span class="badge bg-light text-dark">
                            <i class="bi bi-hash me-1"></i>ID
                          </span>
                        </div>
                      </div>
                      
                      <div class="list-group-item border-0 px-0 py-3">
                        <div class="d-flex justify-content-between align-items-center">
                          <div class="d-flex align-items-center">
                            <i class="bi bi-calendar text-muted me-3" style="font-size: 1.2rem;"></i>
                            <div>
                              <small class="text-muted">Added Date</small>
                              <h6 class="mb-0 fw-bold">Recently</h6>
                            </div>
                          </div>
                          <span class="badge bg-light text-dark">
                            <i class="bi bi-clock me-1"></i>New
                          </span>
                        </div>
                      </div>
                      
                      <div class="list-group-item border-0 px-0 py-3">
                        <div class="d-flex justify-content-between align-items-center">
                          <div class="d-flex align-items-center">
                            <i class="bi bi-clock-history text-muted me-3" style="font-size: 1.2rem;"></i>
                            <div>
                              <small class="text-muted">Borrow Period</small>
                              <h6 class="mb-0 fw-bold">14 Days</h6>
                            </div>
                          </div>
                          <span class="badge bg-light text-dark">
                            <i class="bi bi-calendar-check me-1"></i>Standard
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Description Card -->
              <div class="col-12">
                <div class="card border-0 shadow-sm">
                  <div class="card-header bg-transparent border-0 pt-4">
                    <h4 class="mb-0">
                      <i class="bi bi-card-text text-primary me-2"></i>
                      About This Book
                    </h4>
                  </div>
                  <div class="card-body">
                    <div class="row g-4">
                      <div class="col-md-6">
                        <h6 class="text-muted mb-3">
                          <i class="bi bi-bookmark-check me-2"></i>Book Information
                        </h6>
                        <table class="table table-borderless">
                          <tr>
                            <td class="text-muted" style="width: 40%">Title:</td>
                            <td class="fw-bold">${book.title}</td>
                          </tr>
                          <tr>
                            <td class="text-muted">Author:</td>
                            <td class="fw-bold">${book.author}</td>
                          </tr>
                          <tr>
                            <td class="text-muted">Status:</td>
                            <td>
                              <span class="badge ${book.stock > 0 ? 'bg-success' : 'bg-danger'}">
                                ${book.stock > 0 ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <div class="col-md-6">
                        <h6 class="text-muted mb-3">
                          <i class="bi bi-geo-alt me-2"></i>Location Features
                        </h6>
                        <div class="alert alert-info border-0 bg-info bg-opacity-10">
                          <div class="d-flex">
                            <i class="bi bi-geo-fill fs-4 me-3 text-info"></i>
                            <div>
                              <h6 class="alert-heading">Geolocation Tracking</h6>
                              <p class="mb-0 small">This book supports location-based borrowing tracking for better management.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Right Column - Actions & Quick Info -->
          <div class="col-lg-4">
            <!-- Book Cover -->
            <div class="card border-0 shadow-sm mb-4 overflow-hidden">
              <div class="card-body p-0">
                <div class="book-cover-placeholder bg-gradient-primary text-white text-center py-5">
                  <i class="bi bi-book display-1 mb-3"></i>
                  <h4>${book.title.substring(0, 1)}</h4>
                </div>
              </div>
              <div class="card-footer bg-transparent border-0 text-center py-3">
                <small class="text-muted">
                  <i class="bi bi-image me-1"></i>
                  Book cover placeholder
                </small>
              </div>
            </div>
            
            <!-- Quick Actions -->
            <div class="card border-0 shadow-sm mb-4">
              <div class="card-header bg-transparent border-0 pt-4">
                <h4 class="mb-0">
                  <i class="bi bi-lightning-charge text-primary me-2"></i>
                  Quick Actions
                </h4>
              </div>
              <div class="card-body">
                <div class="d-grid gap-3">
                  ${auth.isUser() && book.stock > 0 ? `
                    <a href="#borrow/${book.id}" class="btn btn-success btn-lg py-3">
                      <i class="bi bi-bag-plus me-2"></i>
                      <div class="d-flex flex-column align-items-start">
                        <span class="fw-bold">Borrow This Book</span>
                        <small class="opacity-75">Available now</small>
                      </div>
                    </a>
                  ` : `
                    <button class="btn btn-secondary btn-lg py-3" disabled>
                      <i class="bi bi-bag-x me-2"></i>
                      <div class="d-flex flex-column align-items-start">
                        <span class="fw-bold">Not Available</span>
                        <small class="opacity-75">Out of stock</small>
                      </div>
                    </button>
                  `}
                  
                  <a href="#books" class="btn btn-outline-primary py-3">
                    <i class="bi bi-search me-2"></i>
                    Browse Similar Books
                  </a>
                  
                  ${auth.isAdmin() ? `
                    <div class="btn-group" role="group">
                      <a href="#edit-book/${book.id}" class="btn btn-outline-warning">
                        <i class="bi bi-pencil me-2"></i>Edit
                      </a>
                      <button class="btn btn-outline-danger" id="delete-btn">
                        <i class="bi bi-trash me-2"></i>Delete
                      </button>
                    </div>
                  ` : ''}
                </div>
              </div>
            </div>
            
            <!-- Quick Stats -->
            <div class="card border-0 shadow-sm">
              <div class="card-header bg-transparent border-0 pt-4">
                <h4 class="mb-0">
                  <i class="bi bi-graph-up text-primary me-2"></i>
                  Statistics
                </h4>
              </div>
              <div class="card-body">
                <div class="row g-3">
                  <div class="col-6">
                    <div class="text-center p-3 border rounded">
                      <div class="display-6 fw-bold ${book.stock > 0 ? 'text-success' : 'text-danger'}">
                        ${book.stock}
                      </div>
                      <small class="text-muted">Current Stock</small>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="text-center p-3 border rounded">
                      <div class="display-6 fw-bold text-primary">
                        ${book.stock > 0 ? '✓' : '✗'}
                      </div>
                      <small class="text-muted">Availability</small>
                    </div>
                  </div>
                </div>
                
                <div class="mt-4">
                  <h6 class="text-muted mb-3">Borrowing Conditions</h6>
                  <ul class="list-unstyled mb-0">
                    <li class="mb-2">
                      <i class="bi bi-check-circle text-success me-2"></i>
                      Maximum borrow period: 14 days
                    </li>
                    <li class="mb-2">
                      <i class="bi bi-check-circle text-success me-2"></i>
                      Location tracking enabled
                    </li>
                    <li class="mb-2">
                      <i class="bi bi-check-circle text-success me-2"></i>
                      Auto-return reminders
                    </li>
                    <li>
                      <i class="bi bi-check-circle text-success me-2"></i>
                      Real-time availability
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Bottom Action Bar (Fixed on mobile) -->
      <div class="fixed-bottom d-lg-none bg-white border-top shadow-lg py-3">
        <div class="container">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h6 class="mb-0 fw-bold">${book.title.substring(0, 25)}${book.title.length > 25 ? '...' : ''}</h6>
              <small class="text-muted">${book.author}</small>
            </div>
            <div class="d-flex gap-2">
              <a href="#books" class="btn btn-outline-secondary btn-sm">
                <i class="bi bi-arrow-left"></i>
              </a>
              ${auth.isUser() && book.stock > 0 ? `
                <a href="#borrow/${book.id}" class="btn btn-success btn-sm">
                  <i class="bi bi-bag-plus"></i>
                </a>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add CSS for book cover gradient
    const style = document.createElement('style');
    style.textContent = `
      .bg-gradient-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
      
      .book-cover-placeholder {
        background: linear-gradient(45deg, #4f6df5 0%, #3b82f6 100%);
        min-height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      
      .fixed-bottom {
        z-index: 1030;
      }
      
      @media (max-width: 992px) {
        .display-5 {
          font-size: 2.5rem;
        }
      }
    `;
    container.appendChild(style);
    
    // Add event listeners
    setTimeout(() => {
      // Back button
      const backBtn = container.querySelector('a[href="#books"]');
      if (backBtn) {
        backBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.location.hash = 'books';
        });
      }
      
      // Delete button (admin only)
      const deleteBtn = container.querySelector('#delete-btn');
      if (deleteBtn && auth.isAdmin()) {
        deleteBtn.addEventListener('click', async (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          if (confirm(`Are you sure you want to delete "${book.title}"? This action cannot be undone.`)) {
            try {
              const deleteBtnText = deleteBtn.innerHTML;
              deleteBtn.disabled = true;
              deleteBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Deleting...';
              
              await bookAPI.delete(book.id);
              
              alert('✅ Book deleted successfully!');
              window.location.hash = 'books';
              window.dispatchEvent(new CustomEvent('booksUpdated'));
            } catch (error) {
              alert('❌ Failed to delete book: ' + (error.response?.data?.error || error.message));
              deleteBtn.disabled = false;
              deleteBtn.innerHTML = deleteBtnText;
            }
          }
        });
      }
      
      // All navigation links
      container.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const hash = link.getAttribute('href').substring(1);
          window.location.hash = hash;
        });
      });
      
    }, 0);
    
  } catch (error) {
    console.error('Error loading book details:', error);
    container.innerHTML = `
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6">
            <div class="card border-0 shadow-lg">
              <div class="card-body text-center py-5">
                <div class="mb-4">
                  <i class="bi bi-exclamation-triangle text-danger display-1"></i>
                </div>
                <h2 class="text-danger mb-4">Book Not Found</h2>
                <p class="text-muted mb-4">
                  ${error.message || 'The book you are looking for does not exist or has been removed.'}
                </p>
                <div class="d-flex justify-content-center gap-3">
                  <a href="#books" class="btn btn-primary">
                    <i class="bi bi-arrow-left me-2"></i>Back to Books
                  </a>
                  <a href="#home" class="btn btn-outline-secondary">
                    <i class="bi bi-house me-2"></i>Go Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  return container;
}