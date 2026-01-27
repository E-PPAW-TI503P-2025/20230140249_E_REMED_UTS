// src/components/Navbar.js
import { auth } from '../utils/api.js';

export default function Navbar() {
  const navbar = document.createElement('nav');
  navbar.className = 'navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow';
  
  // Get current hash for active state
  const currentHash = window.location.hash.replace('#', '').split('/')[0];
  const isActive = (page) => currentHash === page || (!currentHash && page === 'home');
  
  navbar.innerHTML = `
    <div class="container-fluid px-3 px-lg-4">
      <!-- Brand/Logo -->
      <a class="navbar-brand d-flex align-items-center" href="#home" id="brand-link">
        <i class="bi bi-book-half me-2 fs-4"></i>
        <span class="fw-bold">Library System</span>
      </a>
      
      <!-- Mobile Toggle Button -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" 
              aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <!-- Navbar Content -->
      <div class="collapse navbar-collapse" id="navbarContent">
        <!-- Left Navigation -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link ${isActive('home') ? 'active' : ''}" 
               href="#home" 
               id="home-link">
              <i class="bi bi-house-door me-1"></i>Home
              ${isActive('home') ? '<span class="visually-hidden">(current)</span>' : ''}
            </a>
          </li>
          
          <li class="nav-item">
            <a class="nav-link ${isActive('books') ? 'active' : ''}" 
               href="#books" 
               id="books-link">
              <i class="bi bi-book me-1"></i>Books
              ${isActive('books') ? '<span class="visually-hidden">(current)</span>' : ''}
            </a>
          </li>
          
          ${auth.isAdmin() ? `
            <li class="nav-item">
              <a class="nav-link ${isActive('add-book') ? 'active' : ''}" 
                 href="#add-book" 
                 id="add-book-link">
                <i class="bi bi-plus-circle me-1"></i>Add Book
                ${isActive('add-book') ? '<span class="visually-hidden">(current)</span>' : ''}
              </a>
            </li>
          ` : ''}
          
          ${auth.isUser() ? `
            <li class="nav-item">
              <a class="nav-link ${isActive('borrow') ? 'active' : ''}" 
                 href="#borrow" 
                 id="borrow-link">
                <i class="bi bi-basket me-1"></i>Borrow
                ${isActive('borrow') ? '<span class="visually-hidden">(current)</span>' : ''}
              </a>
            </li>
          ` : ''}
        </ul>
        
        <!-- Right Section: User Info & Actions -->
        <div class="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-3">
          <!-- User Info -->
          <div class="text-white">
            ${auth.isLoggedIn() ? `
              <div class="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-2">
                <span class="badge ${auth.isAdmin() ? 'bg-warning' : 'bg-success'} d-flex align-items-center">
                  <i class="bi ${auth.isAdmin() ? 'bi-shield-check' : 'bi-person-check'} me-1"></i>
                  ${auth.currentRole.toUpperCase()}
                </span>
                
                ${auth.currentUserId ? `
                  <div class="d-flex align-items-center">
                    <i class="bi bi-person-badge me-1 opacity-75"></i>
                    <small>ID: ${auth.currentUserId}</small>
                  </div>
                ` : ''}
              </div>
            ` : `
              <div class="d-flex align-items-center">
                <i class="bi bi-exclamation-triangle me-1 text-warning"></i>
                <small class="text-warning">Please select role</small>
              </div>
            `}
          </div>
          
          <!-- Divider -->
          <div class="vr d-none d-lg-block text-white opacity-50" style="height: 24px;"></div>
          
          <!-- Action Buttons -->
          <div class="d-flex gap-2">
            ${auth.isLoggedIn() ? `
              <button class="btn btn-outline-light btn-sm" id="logout-btn">
                <i class="bi bi-box-arrow-right me-1"></i>Logout
              </button>
            ` : `
              <button class="btn btn-outline-light btn-sm" id="select-role-btn">
                <i class="bi bi-person-badge me-1"></i>Select Role
              </button>
            `}
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add event listeners with proper prevention
  setTimeout(() => {
    // Helper function to prevent all event issues
    const safeNavigate = (hash) => {
      console.log('Navbar: Navigating to', hash);
      window.location.hash = hash;
      return false;
    };
    
    // Helper to add click handler with prevention
    const addSafeClick = (element, handler) => {
      if (!element) return;
      
      element.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        handler(e);
      });
      
      // Also prevent context menu
      element.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    };
    
    // Brand/Home link
    addSafeClick(navbar.querySelector('#brand-link'), () => {
      safeNavigate('home');
    });
    
    // Navigation links
    addSafeClick(navbar.querySelector('#home-link'), () => {
      safeNavigate('home');
    });
    
    addSafeClick(navbar.querySelector('#books-link'), () => {
      safeNavigate('books');
    });
    
    if (auth.isAdmin()) {
      addSafeClick(navbar.querySelector('#add-book-link'), () => {
        safeNavigate('add-book');
      });
    }
    
    if (auth.isUser()) {
      addSafeClick(navbar.querySelector('#borrow-link'), () => {
        safeNavigate('borrow');
      });
    }
    
    // Logout button
    const logoutBtn = navbar.querySelector('#logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (confirm('Are you sure you want to logout?')) {
          auth.clear();
          // Navigate to role selection first
          window.location.hash = 'select-role';
          // Then trigger auth change after a short delay
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('authChanged'));
          }, 100);
        }
      });
    }
    
    // Select Role button
    const selectRoleBtn = navbar.querySelector('#select-role-btn');
    if (selectRoleBtn) {
      selectRoleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        safeNavigate('select-role');
      });
    }
    
    // Prevent Bootstrap collapse from interfering
    const navLinks = navbar.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        // Close mobile menu when link is clicked
        const navbarCollapse = navbar.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const toggleBtn = navbar.querySelector('.navbar-toggler');
          if (toggleBtn) toggleBtn.click();
        }
      }, { once: true });
    });
    
    // Add global click handler for debugging
    navbar.addEventListener('click', (e) => {
      console.log('Navbar click event:', {
        target: e.target.tagName,
        id: e.target.id || e.target.parentElement?.id,
        className: e.target.className,
        href: e.target.href
      });
    }, true); // Use capture phase
    
  }, 0);
  
  return navbar;
}

// Export a function to update active state
export function updateNavbarActiveState() {
  const currentHash = window.location.hash.replace('#', '').split('/')[0];
  const navItems = document.querySelectorAll('.nav-link');
  
  navItems.forEach(item => {
    const page = item.getAttribute('href')?.replace('#', '');
    if (page === currentHash || (!currentHash && page === 'home')) {
      item.classList.add('active');
      item.setAttribute('aria-current', 'page');
    } else {
      item.classList.remove('active');
      item.removeAttribute('aria-current');
    }
  });
}