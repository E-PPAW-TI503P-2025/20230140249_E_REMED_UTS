// src/components/BookDetails.js - KOMPONEN BARU
import { bookAPI, auth } from '../utils/api.js';

export default async function BookDetails({ bookId }) {
  const container = document.createElement('div');
  container.className = 'container mt-4';
  container.setAttribute('data-component', 'book-details');
  
  try {
    // Show loading
    container.innerHTML = `
      <div class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3">Loading book details...</p>
      </div>
    `;
    
    // Fetch book details
    const response = await bookAPI.getById(bookId);
    const book = response.data.data;
    
    // Render book details
    container.innerHTML = `
      <div class="card shadow">
        <div class="card-header bg-primary text-white">
          <div class="d-flex justify-content-between align-items-center">
            <h4 class="mb-0">
              <i class="bi bi-book me-2"></i>Book Details
            </h4>
            <a href="#books" class="btn btn-light btn-sm" id="back-btn">
              <i class="bi bi-arrow-left me-1"></i>Back to Books
            </a>
          </div>
        </div>
        
        <div class="card-body">
          <div class="row">
            <!-- Book Info -->
            <div class="col-md-8">
              <h2 class="mb-3">${book.title}</h2>
              <h5 class="text-muted mb-4">
                <i class="bi bi-person me-2"></i>${book.author}
              </h5>
              
              <div class="row mb-4">
                <div class="col-md-4 mb-3">
                  <div class="card border-0 bg-light">
                    <div class="card-body text-center">
                      <div class="text-primary mb-2">
                        <i class="bi bi-123" style="font-size: 1.5rem;"></i>
                      </div>
                      <h5 class="mb-1">${book.id}</h5>
                      <small class="text-muted">Book ID</small>
                    </div>
                  </div>
                </div>
                
                <div class="col-md-4 mb-3">
                  <div class="card border-0 ${book.stock > 0 ? 'bg-success bg-opacity-10' : 'bg-danger bg-opacity-10'}">
                    <div class="card-body text-center">
                      <div class="${book.stock > 0 ? 'text-success' : 'text-danger'} mb-2">
                        <i class="bi bi-box-seam" style="font-size: 1.5rem;"></i>
                      </div>
                      <h5 class="mb-1 ${book.stock > 0 ? 'text-success' : 'text-danger'}">${book.stock}</h5>
                      <small class="text-muted">Available Copies</small>
                    </div>
                  </div>
                </div>
                
                <div class="col-md-4 mb-3">
                  <div class="card border-0 bg-light">
                    <div class="card-body text-center">
                      <div class="text-warning mb-2">
                        <i class="bi bi-calendar" style="font-size: 1.5rem;"></i>
                      </div>
                      <h5 class="mb-1">Just Added</h5>
                      <small class="text-muted">Recently</small>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Status Badge -->
              <div class="mb-4">
                <span class="badge ${book.stock > 0 ? 'bg-success' : 'bg-danger'} p-3 fs-6">
                  <i class="bi ${book.stock > 0 ? 'bi-check-circle' : 'bi-x-circle'} me-2"></i>
                  ${book.stock > 0 ? 'Available for Borrowing' : 'Currently Unavailable'}
                </span>
              </div>
              
              <!-- Actions -->
              <div class="d-flex gap-2 mt-4">
                <a href="#books" class="btn btn-outline-secondary">
                  <i class="bi bi-arrow-left me-1"></i>Back to List
                </a>
                
                ${auth.isAdmin() ? `
                  <a href="#edit-book/${book.id}" class="btn btn-warning">
                    <i class="bi bi-pencil me-1"></i>Edit Book
                  </a>
                  <button class="btn btn-outline-danger" id="delete-btn">
                    <i class="bi bi-trash me-1"></i>Delete
                  </button>
                ` : ''}
                
                ${auth.isUser() && book.stock > 0 ? `
                  <a href="#borrow/${book.id}" class="btn btn-success">
                    <i class="bi bi-bag-plus me-1"></i>Borrow This Book
                  </a>
                ` : ''}
              </div>
            </div>
            
            <!-- Book Image / Icon -->
            <div class="col-md-4 text-center">
              <div class="mb-4">
                <div class="bg-light rounded-circle d-flex align-items-center justify-content-center" 
                     style="width: 200px; height: 200px; margin: 0 auto;">
                  <i class="bi bi-book text-primary" style="font-size: 5rem;"></i>
                </div>
              </div>
              
              <div class="card border-primary">
                <div class="card-header bg-primary bg-opacity-10">
                  <h6 class="mb-0">
                    <i class="bi bi-info-circle me-2"></i>Quick Info
                  </h6>
                </div>
                <div class="card-body">
                  <ul class="list-unstyled mb-0">
                    <li class="mb-2">
                      <i class="bi bi-check-circle text-success me-2"></i>
                      ${book.stock > 0 ? 'Ready to borrow' : 'Out of stock'}
                    </li>
                    <li class="mb-2">
                      <i class="bi bi-clock text-warning me-2"></i>
                      Borrow period: 14 days
                    </li>
                    <li>
                      <i class="bi bi-geo-alt text-info me-2"></i>
                      Location tracking enabled
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add event listeners
    setTimeout(() => {
      // Back button
      const backBtn = container.querySelector('#back-btn');
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
          
          if (confirm(`Delete "${book.title}"? This action cannot be undone.`)) {
            try {
              await bookAPI.delete(book.id);
              alert('Book deleted successfully!');
              window.location.hash = 'books';
              window.dispatchEvent(new CustomEvent('booksUpdated'));
            } catch (error) {
              alert('Failed to delete book: ' + (error.response?.data?.error || error.message));
            }
          }
        });
      }
      
      // All navigation links
      container.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          window.location.hash = link.getAttribute('href').substring(1);
        });
      });
      
    }, 0);
    
  } catch (error) {
    console.error('Error loading book details:', error);
    container.innerHTML = `
      <div class="alert alert-danger">
        <h4><i class="bi bi-exclamation-triangle me-2"></i>Error Loading Book</h4>
        <p>${error.message || 'Book not found or server error'}</p>
        <div class="mt-3">
          <a href="#books" class="btn btn-secondary">Back to Books</a>
        </div>
      </div>
    `;
  }
  
  return container;
}