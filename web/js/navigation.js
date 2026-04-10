/**
 * Navigation JavaScript
 * Handles mobile navigation and menu interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
});

/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        // Toggle mobile menu
        navToggle.addEventListener('click', function() {
            toggleMobileMenu();
        });
        
        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    closeMobileMenu();
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', debounce(handleResize, 250));
    }
    
    // Initialize scroll-based header behavior
    initializeScrollHeader();
}

/**
 * Toggle mobile navigation menu
 */
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    if (navMenu && navToggle) {
        const isActive = navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        if (isActive) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? 'hidden' : '';
    }
}

/**
 * Close mobile navigation menu
 */
function closeMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        // Reset hamburger icon
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        
        // Re-enable body scroll
        document.body.style.overflow = '';
    }
}

/**
 * Handle window resize events
 */
function handleResize() {
    // Close mobile menu if window is resized to desktop size
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
}

/**
 * Initialize scroll-based header behavior
 */
function initializeScrollHeader() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    let isHeaderHidden = false;
    
    if (!header) return;
    
    window.addEventListener('scroll', debounce(function() {
        const currentScroll = window.pageYOffset;
        
        // Hide header when scrolling down, show when scrolling up
        if (currentScroll > lastScroll && currentScroll > 100 && !isHeaderHidden) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
            isHeaderHidden = true;
        } else if (currentScroll < lastScroll && isHeaderHidden) {
            // Scrolling up
            header.style.transform = 'translateY(0)';
            isHeaderHidden = false;
        }
        
        // Add shadow to header when scrolled
        if (currentScroll > 10) {
            header.style.boxShadow = 'var(--shadow-md)';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
        }
        
        lastScroll = currentScroll;
    }, 10));
    
    // Ensure smooth transition
    header.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
}

/**
 * Debounce utility function
 */
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

/**
 * Highlight current page in navigation
 */
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
}

// Initialize on load
highlightCurrentPage();
