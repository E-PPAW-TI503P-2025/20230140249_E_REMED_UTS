// src/components/BookForm.js - VERSION DIPERBAIKI
import { bookAPI, auth } from '../utils/api.js';

export default function BookForm({ bookId = null, mode = 'add' }) {
  const container = document.createElement('div');
  container.className = 'container mt-4';
  container.setAttribute('data-component', 'book-form');
  container.setAttribute('data-mode', mode);
  container.setAttribute('data-book-id', bookId || 'null');
  
  const isEdit = mode === 'edit';
  
  container.innerHTML = `
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card shadow">
          <div class="card-header ${isEdit ? 'bg-warning' : 'bg-primary'} text-white">
            <h4 class="mb-0">
              <i class="bi ${isEdit ? 'bi-pencil-square' : 'bi-plus-circle'} me-2"></i>
              ${isEdit ? 'Edit Book' : 'Add New Book'}
            </h4>
          </div>
          <div class="card-body">
            <form id="book-form">
              ${isEdit && bookId ? `
                <div class="mb-3">
                  <label class="form-label">Book ID</label>
                  <input type="text" class="form-control" value="${bookId}" readonly>
                  <small class="text-muted">Book ID cannot be changed</small>
                </div>
              ` : ''}
              
              <div class="mb-3">
                <label for="title" class="form-label">
                  <i class="bi bi-bookmark me-1"></i>Title *
                </label>
                <input type="text" 
                       class="form-control" 
                       id="title" 
                       required
                       placeholder="Enter book title">
                <div class="invalid-feedback">Please enter a title</div>
              </div>
              
              <div class="mb-3">
                <label for="author" class="form-label">
                  <i class="bi bi-person me-1"></i>Author *
                </label>
                <input type="text" 
                       class="form-control" 
                       id="author" 
                       required
                       placeholder="Enter author name">
                <div class="invalid-feedback">Please enter an author</div>
              </div>
              
              <div class="mb-3">
                <label for="stock" class="form-label">
                  <i class="bi bi-box-seam me-1"></i>Stock
                </label>
                <input type="number" 
                       class="form-control" 
                       id="stock" 
                       min="0"
                       value="1"
                       placeholder="Enter stock quantity">
                <small class="text-muted">Set initial stock quantity</small>
              </div>
              
              <div class="d-flex justify-content-between">
                <a href="#books" class="btn btn-outline-secondary" id="back-to-books-btn">
                  <i class="bi bi-arrow-left me-1"></i>Back
                </a>
                
                <div>
                  <button type="reset" class="btn btn-outline-danger me-2" id="reset-form-btn">
                    <i class="bi bi-x-circle me-1"></i>Reset
                  </button>
                  <button type="submit" class="btn ${isEdit ? 'btn-warning' : 'btn-primary'}" id="submit-book-btn">
                    <i class="bi ${isEdit ? 'bi-check-circle' : 'bi-save'} me-1"></i>
                    ${isEdit ? 'Update Book' : 'Save Book'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Load book data if editing
  if (isEdit && bookId) {
    setTimeout(async () => {
      try {
        const response = await bookAPI.getById(bookId);
        const book = response.data.data;
        
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('stock').value = book.stock;
      } catch (error) {
        alert('Failed to load book data');
        window.location.hash = 'books';
      }
    }, 0);
  }
  
  // Form submission
  setTimeout(() => {
    const form = container.querySelector('#book-form');
    const submitBtn = container.querySelector('#submit-book-btn');
    const backBtn = container.querySelector('#back-to-books-btn');
    const resetBtn = container.querySelector('#reset-form-btn');
    
    // Safe navigation untuk back button
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.hash = 'books';
      });
    }
    
    // Reset button
    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        form.reset();
      });
    }
    
    // Form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }
      
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const stock = parseInt(document.getElementById('stock').value) || 0;
      
      const bookData = { title, author, stock };
      
      try {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span class="spinner-border spinner-border-sm me-1"></span>
          ${isEdit ? 'Updating...' : 'Saving...'}
        `;
        
        if (isEdit && bookId) {
          await bookAPI.update(bookId, bookData);
          alert('Book updated successfully!');
        } else {
          await bookAPI.create(bookData);
          alert('Book added successfully!');
        }
        
        window.location.hash = 'books';
        window.dispatchEvent(new CustomEvent('booksUpdated'));
        
      } catch (error) {
        const errorMsg = error.response?.data?.error || error.message;
        alert(`Failed to ${isEdit ? 'update' : 'add'} book: ${errorMsg}`);
        
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <i class="bi ${isEdit ? 'bi-check-circle' : 'bi-save'} me-1"></i>
          ${isEdit ? 'Update Book' : 'Save Book'}
        `;
      }
    });
  }, 0);
  
  return container;
}