// src/components/BookList.js - VERSION DIPERBAIKI
import { bookAPI, auth } from '../utils/api.js';

export default async function BookList() {
  const container = document.createElement('div');
  container.className = 'container mt-4';
  container.setAttribute('data-component', 'book-list');
  
  try {
    // Show loading
    container.innerHTML = `
      <div class="text-center py-5">
        <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3">Loading books...</p>
      </div>
    `;
    
    // Fetch books
    const response = await bookAPI.getAll();
    const books = response.data.data || [];
    
    // Render books
    container.innerHTML = `
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div class="mb-3 mb-md-0">
          <h2 class="mb-1">
            <i class="bi bi-book me-2"></i>Available Books
          </h2>
          <p class="text-muted mb-0">Browse and manage library collection</p>
        </div>
        
        <div class="d-flex align-items-center gap-2">
          <span class="badge bg-primary fs-6 p-2">
            <i class="bi bi-book me-1"></i>${books.length} ${books.length === 1 ? 'book' : 'books'}
          </span>
          
          ${auth.isAdmin() ? `
            <a href="#add-book" class="btn btn-primary" id="add-book-btn">
              <i class="bi bi-plus-circle me-1"></i>Add New Book
            </a>
          ` : ''}
          
          <button class="btn btn-outline-secondary" id="refresh-btn">
            <i class="bi bi-arrow-clockwise"></i>
          </button>
        </div>
      </div>
      
      ${books.length > 0 ? `
        <!-- Stats Summary -->
        <div class="row mb-4">
          <div class="col-md-3 col-6 mb-3">
            <div class="card border-0 bg-light">
              <div class="card-body text-center py-3">
                <h3 class="text-primary mb-1">${books.length}</h3>
                <small class="text-muted">Total Books</small>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-6 mb-3">
            <div class="card border-0 bg-light">
              <div class="card-body text-center py-3">
                <h3 class="text-success mb-1">${books.filter(b => b.stock > 0).length}</h3>
                <small class="text-muted">Available</small>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-6 mb-3">
            <div class="card border-0 bg-light">
              <div class="card-body text-center py-3">
                <h3 class="text-danger mb-1">${books.filter(b => b.stock === 0).length}</h3>
                <small class="text-muted">Out of Stock</small>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-6 mb-3">
            <div class="card border-0 bg-light">
              <div class="card-body text-center py-3">
                <h3 class="text-warning mb-1">${books.reduce((sum, book) => sum + book.stock, 0)}</h3>
                <small class="text-muted">Total Copies</small>
              </div>
            </div>
          </div>
        </div>
        
        <div class="row" id="books-container">
          ${books.map(book => `
            <div class="col-md-6 col-lg-4 mb-4" data-book-id="${book.id}">
              <div class="card h-100 shadow-sm">
                <div class="card-body d-flex flex-column">
                  <div class="mb-3">
                    <div class="d-flex justify-content-between align-items-start">
                      <div class="flex-grow-1">
                        <h5 class="card-title mb-1 text-truncate" title="${book.title}">
                          ${book.title}
                        </h5>
                        <h6 class="card-subtitle text-muted mb-2">
                          <i class="bi bi-person me-1"></i>${book.author}
                        </h6>
                      </div>
                      <div class="flex-shrink-0 ms-2">
                        <span class="badge ${book.stock > 0 ? 'bg-success' : 'bg-danger'}">
                          ${book.stock}
                        </span>
                      </div>
                    </div>
                    
                    <div class="mt-2">
                      <small class="text-muted">
                        <i class="bi bi-tag me-1"></i>ID: ${book.id}
                      </small>
                    </div>
                    
                    <div class="mt-3">
                      <span class="badge ${book.stock > 0 ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger'} p-2 w-100">
                        <i class="bi ${book.stock > 0 ? 'bi-check-circle' : 'bi-x-circle'} me-1"></i>
                        ${book.stock > 0 ? `${book.stock} copy${book.stock !== 1 ? 'ies' : ''} available` : 'Out of stock'}
                      </span>
                    </div>
                  </div>
                  
                  <div class="mt-auto pt-3 border-top">
                    <div class="d-flex justify-content-between">
                      <button class="btn btn-outline-primary btn-sm view-details-btn" 
                              data-book-id="${book.id}"
                              data-action="view-details"
                              title="View details">
                        <i class="bi bi-eye me-1"></i>Details
                      </button>
                      
                      ${auth.isAdmin() ? `
                        <div class="btn-group" role="group">
                          <button class="btn btn-outline-warning btn-sm edit-btn" 
                                  data-book-id="${book.id}"
                                  data-action="edit-book"
                                  title="Edit book">
                            <i class="bi bi-pencil"></i>
                          </button>
                          <button class="btn btn-outline-danger btn-sm delete-btn" 
                                  data-book-id="${book.id}"
                                  data-action="delete-book"
                                  title="Delete book">
                            <i class="bi bi-trash"></i>
                          </button>
                        </div>
                      ` : ''}
                      
                      ${auth.isUser() && book.stock > 0 ? `
                        <button class="btn btn-success btn-sm borrow-btn" 
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
            <i class="bi bi-book text-muted" style="font-size: 4rem;"></i>
          </div>
          <h4 class="text-muted mb-3">No Books Available</h4>
          <p class="text-muted mb-4">The library is currently empty. Add some books to get started.</p>
          ${auth.isAdmin() ? `
            <a href="#add-book" class="btn btn-primary btn-lg" id="add-first-book-btn">
              <i class="bi bi-plus-circle me-2"></i>Add Your First Book
            </a>
          ` : ''}
        </div>
      `}
    `;
    
    // EVENT DELEGATION - SOLUSI TERBAIK
    setTimeout(() => {
      // Add safe click handler untuk semua buttons
      const addSafeButtonClick = (selector, handler) => {
        container.addEventListener('click', (e) => {
          const button = e.target.closest(selector);
          if (!button) return;
          
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          
          console.log(`Button clicked: ${selector}, data:`, button.dataset);
          handler(button, e);
        });
      };
      
      // Handle view details
      addSafeButtonClick('.view-details-btn', (button) => {
        const bookId = button.dataset.bookId;
        console.log('View details for book:', bookId);
        window.location.hash = `book-details/${bookId}`;
      });
      
      // Handle edit book (admin only)
      if (auth.isAdmin()) {
        addSafeButtonClick('.edit-btn', (button) => {
          const bookId = button.dataset.bookId;
          console.log('EDIT BOOK clicked, ID:', bookId);
          window.location.hash = `edit-book/${bookId}`;
        });
        
        // Handle delete book
        addSafeButtonClick('.delete-btn', async (button) => {
          const bookCard = button.closest('[data-book-id]');
          const bookId = bookCard.dataset.bookId;
          const bookTitle = bookCard.querySelector('.card-title').textContent.trim();
          
          if (confirm(`Delete "${bookTitle}"? This action cannot be undone.`)) {
            try {
              await bookAPI.delete(bookId);
              alert('Book deleted successfully!');
              window.dispatchEvent(new CustomEvent('booksUpdated'));
            } catch (error) {
              alert('Failed to delete book: ' + (error.response?.data?.error || error.message));
            }
          }
        });
      }
      
      // Handle borrow book (user only)
      if (auth.isUser()) {
        addSafeButtonClick('.borrow-btn', (button) => {
          const bookId = button.dataset.bookId;
          console.log('BORROW BOOK clicked, ID:', bookId);
          window.location.hash = `borrow/${bookId}`;
        });
      }
      
      // Refresh button
      const refreshBtn = container.querySelector('#refresh-btn');
      if (refreshBtn) {
        refreshBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          refreshBtn.innerHTML = `<span class="spinner-border spinner-border-sm"></span>`;
          refreshBtn.disabled = true;
          
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('booksUpdated'));
          }, 500);
        });
      }
      
      // Add book button (in header)
      const addBookBtn = container.querySelector('#add-book-btn');
      if (addBookBtn) {
        addBookBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Add book button clicked');
          window.location.hash = 'add-book';
        });
      }
      
      // Add first book button (in empty state)
      const addFirstBookBtn = container.querySelector('#add-first-book-btn');
      if (addFirstBookBtn) {
        addFirstBookBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Add first book button clicked');
          window.location.hash = 'add-book';
        });
      }
      
    }, 0);
    
  } catch (error) {
    console.error('Error loading books:', error);
    container.innerHTML = `
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <div class="card border-danger">
            <div class="card-body text-center py-5">
              <div class="mb-4">
                <i class="bi bi-exclamation-triangle text-danger" style="font-size: 3rem;"></i>
              </div>
              <h4 class="text-danger mb-3">Failed to Load Books</h4>
              <p class="text-muted mb-4">
                ${error.message || 'Unable to connect to the server. Please check your connection.'}
              </p>
              
              <div class="d-flex justify-content-center gap-3">
                <button class="btn btn-outline-primary" id="retry-btn">
                  <i class="bi bi-arrow-clockwise me-1"></i>Try Again
                </button>
                <a href="#home" class="btn btn-secondary" id="go-home-btn">
                  <i class="bi bi-house me-1"></i>Go Home
                </a>
              </div>
            </div>
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
          retryBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span>Retrying...`;
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