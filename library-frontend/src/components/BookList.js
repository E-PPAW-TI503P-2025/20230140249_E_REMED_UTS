// src/components/BookList.js - VERSION IMPROVED & FULL SCREEN
import { bookAPI, auth } from '../utils/api.js';

export default async function BookList() {
  const container = document.createElement('div');
  container.className = 'container-fluid px-0';
  container.setAttribute('data-component', 'book-list');
  
  try {
    // Show loading with better design
    container.innerHTML = `
      <div class="d-flex justify-content-center align-items-center" style="min-height: 70vh">
        <div class="text-center">
          <div class="spinner-border text-primary" style="width: 4rem; height: 4rem;" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <h4 class="mt-4 text-muted">Loading library collection...</h4>
          <p class="text-muted small mt-2">Fetching books from the database</p>
        </div>
      </div>
    `;
    
    // Fetch books
    const response = await bookAPI.getAll();
    const books = response.data.data || [];
    
    // Calculate statistics
    const totalBooks = books.length;
    const availableBooks = books.filter(b => b.stock > 0).length;
    const outOfStockBooks = books.filter(b => b.stock === 0).length;
    const totalCopies = books.reduce((sum, book) => sum + book.stock, 0);
    
    // Render books with modern full-screen layout
    container.innerHTML = `
      <!-- Header Section -->
      <div class="bg-gradient-primary text-white py-5 shadow-sm">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-8">
              <h1 class="display-4 fw-bold mb-3">
                <i class="bi bi-bookshelf me-3"></i>Library Collection
              </h1>
              <p class="lead mb-0 opacity-75">
                Browse, manage, and borrow books from our digital library
              </p>
            </div>
            <div class="col-lg-4 text-lg-end mt-4 mt-lg-0">
              <div class="d-flex flex-column flex-md-row gap-3 justify-content-lg-end">
                ${auth.isAdmin() ? `
                  <a href="#add-book" class="btn btn-light btn-lg px-4" id="add-book-btn">
                    <i class="bi bi-plus-circle me-2"></i>Add Book
                  </a>
                ` : ''}
                <button class="btn btn-outline-light btn-lg px-4" id="refresh-btn">
                  <i class="bi bi-arrow-clockwise me-2"></i>Refresh
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Statistics Dashboard -->
      <div class="container py-4">
        <div class="row g-4">
          <div class="col-md-6 col-lg-3">
            <div class="card border-0 shadow-sm h-100 hover-lift">
              <div class="card-body text-center p-4">
                <div class="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3">
                  <i class="bi bi-book text-primary fs-2"></i>
                </div>
                <h2 class="display-5 fw-bold text-primary mb-2">${totalBooks}</h2>
                <h6 class="text-muted mb-0">Total Books</h6>
                <small class="text-muted d-block mt-2">
                  <i class="bi bi-info-circle me-1"></i>
                  Unique titles in library
                </small>
              </div>
            </div>
          </div>
          
          <div class="col-md-6 col-lg-3">
            <div class="card border-0 shadow-sm h-100 hover-lift">
              <div class="card-body text-center p-4">
                <div class="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3">
                  <i class="bi bi-check-circle text-success fs-2"></i>
                </div>
                <h2 class="display-5 fw-bold text-success mb-2">${availableBooks}</h2>
                <h6 class="text-muted mb-0">Available</h6>
                <small class="text-muted d-block mt-2">
                  <i class="bi bi-check2-circle me-1"></i>
                  Ready to borrow
                </small>
              </div>
            </div>
          </div>
          
          <div class="col-md-6 col-lg-3">
            <div class="card border-0 shadow-sm h-100 hover-lift">
              <div class="card-body text-center p-4">
                <div class="bg-danger bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3">
                  <i class="bi bi-x-circle text-danger fs-2"></i>
                </div>
                <h2 class="display-5 fw-bold text-danger mb-2">${outOfStockBooks}</h2>
                <h6 class="text-muted mb-0">Out of Stock</h6>
                <small class="text-muted d-block mt-2">
                  <i class="bi bi-exclamation-triangle me-1"></i>
                  Need restocking
                </small>
              </div>
            </div>
          </div>
          
          <div class="col-md-6 col-lg-3">
            <div class="card border-0 shadow-sm h-100 hover-lift">
              <div class="card-body text-center p-4">
                <div class="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3">
                  <i class="bi bi-stack text-warning fs-2"></i>
                </div>
                <h2 class="display-5 fw-bold text-warning mb-2">${totalCopies}</h2>
                <h6 class="text-muted mb-0">Total Copies</h6>
                <small class="text-muted d-block mt-2">
                  <i class="bi bi-collection me-1"></i>
                  Physical copies available
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Main Content Area -->
      <div class="container-fluid px-lg-5 pb-5">
        <div class="px-lg-5">
          <!-- Toolbar -->
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
            <div class="mb-3 mb-md-0">
              <h3 class="fw-bold mb-2">
                <i class="bi bi-grid-3x3-gap text-primary me-2"></i>
                Book Collection
              </h3>
              <p class="text-muted mb-0">
                Showing ${books.length} book${books.length !== 1 ? 's' : ''}
                ${auth.isUser() && books.some(b => b.stock > 0) ? '• Ready to borrow' : ''}
                ${auth.isAdmin() ? '• Full management access' : ''}
              </p>
            </div>
            
            <div class="d-flex align-items-center gap-2">
              <div class="input-group" style="max-width: 300px;">
                <span class="input-group-text bg-light border-end-0">
                  <i class="bi bi-search text-muted"></i>
                </span>
                <input type="text" 
                       class="form-control border-start-0" 
                       id="search-input" 
                       placeholder="Search books...">
                <button class="btn btn-outline-secondary" type="button" id="clear-search">
                  <i class="bi bi-x"></i>
                </button>
              </div>
              
              <div class="dropdown">
                <button class="btn btn-outline-primary dropdown-toggle" type="button" id="filterDropdown" data-bs-toggle="dropdown">
                  <i class="bi bi-filter me-2"></i>Filter
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#" data-filter="all">All Books</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="#" data-filter="available">Available Only</a></li>
                  <li><a class="dropdown-item" href="#" data-filter="out-of-stock">Out of Stock</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="#" data-filter="sort-title">Sort by Title</a></li>
                  <li><a class="dropdown-item" href="#" data-filter="sort-author">Sort by Author</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <!-- Books Grid -->
          ${books.length > 0 ? `
            <div class="row g-4" id="books-container">
              ${books.map(book => `
                <div class="col-12 col-md-6 col-xl-4" data-book-id="${book.id}" data-book-title="${book.title.toLowerCase()}" data-book-author="${book.author.toLowerCase()}" data-book-stock="${book.stock}">
                  <div class="card h-100 border-0 shadow-sm hover-lift transition-all">
                    <div class="card-body p-4 d-flex flex-column">
                      <!-- Book Header -->
                      <div class="d-flex justify-content-between align-items-start mb-3">
                        <div class="flex-grow-1 me-3">
                          <h5 class="card-title fw-bold mb-2 line-clamp-2" title="${book.title}">
                            ${book.title}
                          </h5>
                          <div class="d-flex align-items-center text-muted mb-3">
                            <i class="bi bi-person me-2"></i>
                            <span class="text-truncate">${book.author}</span>
                          </div>
                        </div>
                        <div class="flex-shrink-0">
                          <span class="badge ${book.stock > 0 ? 'bg-success' : 'bg-danger'} fs-6 px-3 py-2">
                            ${book.stock} ${book.stock === 1 ? 'copy' : 'copies'}
                          </span>
                        </div>
                      </div>
                      
                      <!-- Book ID -->
                      <div class="mb-4">
                        <div class="d-flex align-items-center text-muted">
                          <i class="bi bi-tag me-2"></i>
                          <small>ID: ${book.id}</small>
                        </div>
                      </div>
                      
                      <!-- Status Indicator -->
                      <div class="mb-4">
                        <div class="alert ${book.stock > 0 ? 'alert-success' : 'alert-danger'} border-0 py-2 mb-0">
                          <div class="d-flex align-items-center">
                            <i class="bi ${book.stock > 0 ? 'bi-check-circle-fill' : 'bi-x-circle-fill'} me-2"></i>
                            <div>
                              <small class="fw-bold">${book.stock > 0 ? 'Available for Borrowing' : 'Currently Unavailable'}</small>
                              ${book.stock > 0 ? `
                                <small class="d-block text-success-emphasis">Ready to borrow now</small>
                              ` : `
                                <small class="d-block text-danger-emphasis">Check back later</small>
                              `}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <!-- Action Buttons -->
                      <div class="mt-auto pt-3 border-top">
                        <div class="d-flex justify-content-between">
                          <button class="btn btn-outline-primary px-3 view-details-btn" 
                                  data-book-id="${book.id}"
                                  data-action="view-details"
                                  title="View full details">
                            <i class="bi bi-eye me-1"></i>Details
                          </button>
                          
                          ${auth.isAdmin() ? `
                            <div class="btn-group" role="group">
                              <button class="btn btn-outline-warning px-3 edit-btn" 
                                      data-book-id="${book.id}"
                                      data-action="edit-book"
                                      title="Edit book details">
                                <i class="bi bi-pencil"></i>
                              </button>
                              <button class="btn btn-outline-danger px-3 delete-btn" 
                                      data-book-id="${book.id}"
                                      data-action="delete-book"
                                      title="Remove book from library">
                                <i class="bi bi-trash"></i>
                              </button>
                            </div>
                          ` : ''}
                          
                          ${auth.isUser() && book.stock > 0 ? `
                            <button class="btn btn-success px-4 borrow-btn" 
                                    data-book-id="${book.id}"
                                    data-action="borrow-book"
                                    title="Borrow this book">
                              <i class="bi bi-bag-plus me-1"></i>Borrow
                            </button>
                          ` : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <!-- Empty State -->
            <div class="text-center py-5 my-5">
              <div class="mb-4">
                <div class="bg-light rounded-circle d-inline-flex align-items-center justify-content-center p-5">
                  <i class="bi bi-book text-muted" style="font-size: 4rem;"></i>
                </div>
              </div>
              <h3 class="text-muted mb-3">No Books in Library</h3>
              <p class="text-muted mb-4 lead">The library collection is empty. Start by adding your first book.</p>
              ${auth.isAdmin() ? `
                <a href="#add-book" class="btn btn-primary btn-lg px-5" id="add-first-book-btn">
                  <i class="bi bi-plus-circle me-2"></i>Add First Book
                </a>
              ` : `
                <div class="alert alert-info">
                  <i class="bi bi-info-circle me-2"></i>
                  Only administrators can add books to the library.
                </div>
              `}
            </div>
          `}
        </div>
      </div>
    `;
    
    // Add custom CSS for this component
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
      
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      .transition-all {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      @media (max-width: 768px) {
        .display-4 {
          font-size: 2.5rem;
        }
      }
    `;
    container.appendChild(style);
    
    // Event Delegation with enhanced features
    setTimeout(() => {
      // Search functionality
      const searchInput = container.querySelector('#search-input');
      const clearSearchBtn = container.querySelector('#clear-search');
      
      if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
          const searchTerm = e.target.value.toLowerCase().trim();
          filterBooks(searchTerm);
        }, 300));
      }
      
      if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
          searchInput.value = '';
          filterBooks('');
          searchInput.focus();
        });
      }
      
      // Filter functionality
      container.querySelectorAll('[data-filter]').forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const filter = e.target.dataset.filter;
          applyFilter(filter);
        });
      });
      
      // Event delegation for all book actions
      container.addEventListener('click', (e) => {
        const button = e.target.closest('[data-action]');
        if (!button) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const action = button.dataset.action;
        const bookId = button.dataset.bookId;
        const bookCard = button.closest('[data-book-id]');
        
        console.log(`Action: ${action}, Book ID: ${bookId}`);
        
        switch (action) {
          case 'view-details':
            window.location.hash = `book-details/${bookId}`;
            break;
            
          case 'edit-book':
            if (auth.isAdmin()) {
              window.location.hash = `edit-book/${bookId}`;
            }
            break;
            
          case 'delete-book':
            if (auth.isAdmin()) {
              deleteBook(bookId, bookCard);
            }
            break;
            
          case 'borrow-book':
            if (auth.isUser()) {
              window.location.hash = `borrow/${bookId}`;
            }
            break;
        }
      });
      
      // Refresh button
      const refreshBtn = container.querySelector('#refresh-btn');
      if (refreshBtn) {
        refreshBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          const originalHTML = refreshBtn.innerHTML;
          refreshBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Refreshing`;
          refreshBtn.disabled = true;
          
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('booksUpdated'));
            refreshBtn.innerHTML = originalHTML;
            refreshBtn.disabled = false;
          }, 1000);
        });
      }
      
      // Add book buttons
      ['#add-book-btn', '#add-first-book-btn'].forEach(selector => {
        const btn = container.querySelector(selector);
        if (btn) {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (auth.isAdmin()) {
              window.location.hash = 'add-book';
            } else {
              alert('Only administrators can add books.');
            }
          });
        }
      });
      
      // Helper functions
      function filterBooks(searchTerm) {
        const bookCards = container.querySelectorAll('[data-book-id]');
        let visibleCount = 0;
        
        bookCards.forEach(card => {
          const title = card.dataset.bookTitle;
          const author = card.dataset.bookAuthor;
          
          if (!searchTerm || title.includes(searchTerm) || author.includes(searchTerm)) {
            card.style.display = '';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });
        
        // Update counter
        const counter = container.querySelector('.text-muted.mb-0');
        if (counter) {
          counter.textContent = `Showing ${visibleCount} book${visibleCount !== 1 ? 's' : ''}${searchTerm ? ' (filtered)' : ''}`;
        }
      }
      
      function applyFilter(filter) {
        const bookCards = container.querySelectorAll('[data-book-id]');
        let visibleCount = 0;
        
        bookCards.forEach(card => {
          const stock = parseInt(card.dataset.bookStock);
          let show = true;
          
          switch (filter) {
            case 'available':
              show = stock > 0;
              break;
            case 'out-of-stock':
              show = stock === 0;
              break;
            case 'sort-title':
              // Simple client-side sort by title
              const cardsArray = Array.from(bookCards);
              cardsArray.sort((a, b) => {
                return a.dataset.bookTitle.localeCompare(b.dataset.bookTitle);
              });
              cardsArray.forEach((card, index) => {
                card.style.order = index;
              });
              return;
            case 'sort-author':
              // Simple client-side sort by author
              const cardsArray2 = Array.from(bookCards);
              cardsArray2.sort((a, b) => {
                return a.dataset.bookAuthor.localeCompare(b.dataset.bookAuthor);
              });
              cardsArray2.forEach((card, index) => {
                card.style.order = index;
              });
              return;
          }
          
          if (show) {
            card.style.display = '';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });
        
        // Update counter
        const counter = container.querySelector('.text-muted.mb-0');
        if (counter) {
          const filterText = filter === 'all' ? '' : ` (${filter.replace('-', ' ')})`;
          counter.textContent = `Showing ${visibleCount} book${visibleCount !== 1 ? 's' : ''}${filterText}`;
        }
      }
      
      async function deleteBook(bookId, bookCard) {
        const bookTitle = bookCard.querySelector('.card-title').textContent.trim();
        
        // Confirmation modal style
        const confirmed = await showConfirmationModal(
          'Delete Book',
          `Are you sure you want to delete "<strong>${bookTitle}</strong>"?`,
          'This action cannot be undone. All borrowing records for this book will be removed.',
          'Delete',
          'Cancel'
        );
        
        if (confirmed) {
          try {
            // Show deleting state
            const deleteBtn = bookCard.querySelector('.delete-btn');
            const originalHTML = deleteBtn.innerHTML;
            deleteBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
            deleteBtn.disabled = true;
            
            await bookAPI.delete(bookId);
            
            // Show success message
            showToast('✅ Book deleted successfully!', 'success');
            
            // Refresh the book list after a short delay
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('booksUpdated'));
            }, 1000);
            
          } catch (error) {
            showToast(`❌ Failed to delete book: ${error.response?.data?.error || error.message}`, 'danger');
            const deleteBtn = bookCard.querySelector('.delete-btn');
            deleteBtn.innerHTML = originalHTML;
            deleteBtn.disabled = false;
          }
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
      
      function showConfirmationModal(title, message, subtitle, confirmText, cancelText) {
        return new Promise((resolve) => {
          const modalHTML = `
            <div class="modal fade" id="confirmationModal" tabindex="-1">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header border-0">
                    <h5 class="modal-title text-danger">
                      <i class="bi bi-exclamation-triangle me-2"></i>${title}
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                  </div>
                  <div class="modal-body py-4">
                    <div class="text-center mb-3">
                      <i class="bi bi-trash text-danger" style="font-size: 3rem;"></i>
                    </div>
                    <h6 class="text-center mb-3">${message}</h6>
                    <p class="text-muted text-center small mb-0">${subtitle}</p>
                  </div>
                  <div class="modal-footer border-0 justify-content-center">
                    <button type="button" class="btn btn-outline-secondary" id="cancelBtn" data-bs-dismiss="modal">
                      <i class="bi bi-x-circle me-2"></i>${cancelText}
                    </button>
                    <button type="button" class="btn btn-danger" id="confirmBtn">
                      <i class="bi bi-trash me-2"></i>${confirmText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
          
          const modalContainer = document.createElement('div');
          modalContainer.innerHTML = modalHTML;
          document.body.appendChild(modalContainer);
          
          const modal = new bootstrap.Modal(modalContainer.querySelector('#confirmationModal'));
          modal.show();
          
          modalContainer.querySelector('#confirmBtn').addEventListener('click', () => {
            modal.hide();
            setTimeout(() => {
              modalContainer.remove();
            }, 300);
            resolve(true);
          });
          
          modalContainer.querySelector('#cancelBtn').addEventListener('click', () => {
            modal.hide();
            setTimeout(() => {
              modalContainer.remove();
            }, 300);
            resolve(false);
          });
          
          modalContainer.querySelector('#confirmationModal').addEventListener('hidden.bs.modal', () => {
            setTimeout(() => {
              modalContainer.remove();
            }, 300);
            resolve(false);
          });
        });
      }
      
      function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-bg-${type} border-0 position-fixed`;
        toast.style.cssText = `
          top: 20px;
          right: 20px;
          z-index: 9999;
        `;
        
        toast.innerHTML = `
          <div class="d-flex">
            <div class="toast-body">
              ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
          </div>
        `;
        
        document.body.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast, { autohide: true, delay: 3000 });
        bsToast.show();
        
        toast.addEventListener('hidden.bs.toast', () => {
          toast.remove();
        });
      }
      
    }, 0);
    
  } catch (error) {
    console.error('Error loading books:', error);
    container.innerHTML = `
      <div class="d-flex justify-content-center align-items-center" style="min-height: 70vh">
        <div class="text-center">
          <div class="mb-4">
            <i class="bi bi-exclamation-triangle text-danger display-1"></i>
          </div>
          <h2 class="text-danger mb-4">Failed to Load Books</h2>
          <p class="text-muted mb-4 lead">
            ${error.message || 'Unable to connect to the server. Please check your connection.'}
          </p>
          <div class="d-flex justify-content-center gap-3">
            <button class="btn btn-primary btn-lg px-4" id="retry-btn">
              <i class="bi bi-arrow-clockwise me-2"></i>Try Again
            </button>
            <a href="#home" class="btn btn-outline-secondary btn-lg px-4" id="go-home-btn">
              <i class="bi bi-house me-2"></i>Go Home
            </a>
          </div>
        </div>
      </div>
    `;
    
    // Add retry functionality
    setTimeout(() => {
      const retryBtn = container.querySelector('#retry-btn');
      const goHomeBtn = container.querySelector('#go-home-btn');
      
      if (retryBtn) {
        retryBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          retryBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Retrying...`;
          retryBtn.disabled = true;
          
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('booksUpdated'));
          }, 1000);
        });
      }
      
      if (goHomeBtn) {
        goHomeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.location.hash = 'home';
        });
      }
    }, 0);
  }
  
  return container;
}