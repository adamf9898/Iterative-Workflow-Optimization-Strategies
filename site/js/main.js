/**
 * 9898-MTG League - Main JavaScript
 * Handles mobile navigation and table sorting
 */

// ============================================
// Mobile Navigation Toggle
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
});

// ============================================
// Table Sorting Functionality
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const standingsTable = document.getElementById('standingsTable');
    
    if (!standingsTable) return;
    
    const headers = standingsTable.querySelectorAll('th.sortable');
    let currentSort = { column: 'points', direction: 'desc' };
    
    headers.forEach(header => {
        header.addEventListener('click', function() {
            const sortBy = this.getAttribute('data-sort');
            
            // Determine sort direction
            let direction = 'asc';
            if (currentSort.column === sortBy) {
                direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
            }
            
            // Update current sort
            currentSort = { column: sortBy, direction: direction };
            
            // Update header styling
            headers.forEach(h => {
                h.classList.remove('active', 'asc', 'desc');
                const arrow = h.querySelector('.sort-arrow');
                if (arrow) arrow.textContent = '↕';
            });
            
            this.classList.add('active', direction);
            const arrow = this.querySelector('.sort-arrow');
            if (arrow) {
                arrow.textContent = direction === 'asc' ? '↑' : '↓';
            }
            
            // Sort the table
            sortTable(standingsTable, sortBy, direction);
        });
    });
    
    /**
     * Sort table rows based on column and direction
     */
    function sortTable(table, column, direction) {
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        rows.sort((a, b) => {
            let aValue, bValue;
            
            switch(column) {
                case 'rank':
                    aValue = getRankValue(a.cells[0]);
                    bValue = getRankValue(b.cells[0]);
                    break;
                    
                case 'player':
                    aValue = a.cells[1].textContent.trim();
                    bValue = b.cells[1].textContent.trim();
                    return direction === 'asc' 
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);
                    
                case 'wins':
                    aValue = parseInt(a.cells[2].textContent);
                    bValue = parseInt(b.cells[2].textContent);
                    break;
                    
                case 'losses':
                    aValue = parseInt(a.cells[3].textContent);
                    bValue = parseInt(b.cells[3].textContent);
                    break;
                    
                case 'draws':
                    aValue = parseInt(a.cells[4].textContent);
                    bValue = parseInt(b.cells[4].textContent);
                    break;
                    
                case 'points':
                    aValue = parseInt(a.cells[5].textContent);
                    bValue = parseInt(b.cells[5].textContent);
                    break;
                    
                case 'winrate':
                    aValue = parseFloat(a.cells[6].textContent);
                    bValue = parseFloat(b.cells[6].textContent);
                    break;
                    
                default:
                    return 0;
            }
            
            if (direction === 'asc') {
                return aValue - bValue;
            } else {
                return bValue - aValue;
            }
        });
        
        // Update rank badges after sorting (except when sorting by rank)
        if (column !== 'rank') {
            rows.forEach((row, index) => {
                const rankCell = row.cells[0];
                const rankBadge = rankCell.querySelector('.rank-badge');
                
                if (rankBadge) {
                    // Remove all rank classes
                    rankBadge.classList.remove('gold', 'silver', 'bronze');
                    
                    // Update rank number and styling based on new position
                    if (index === 0) {
                        rankBadge.textContent = '1';
                        rankBadge.classList.add('gold');
                    } else if (index === 1) {
                        rankBadge.textContent = '2';
                        rankBadge.classList.add('silver');
                    } else if (index === 2) {
                        rankBadge.textContent = '3';
                        rankBadge.classList.add('bronze');
                    } else {
                        rankBadge.textContent = (index + 1).toString();
                    }
                }
            });
        }
        
        // Re-append rows in sorted order
        rows.forEach(row => tbody.appendChild(row));
    }
    
    /**
     * Get numeric rank value from rank cell
     */
    function getRankValue(cell) {
        const badge = cell.querySelector('.rank-badge');
        if (badge) {
            const text = badge.textContent.trim();
            return parseInt(text) || 0;
        }
        return parseInt(cell.textContent) || 0;
    }
});

// ============================================
// Smooth Scrolling for Anchor Links
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal anchors
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ============================================
// Add fade-in animation to cards on scroll
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards
    const cards = document.querySelectorAll('.card, .player-card, .leader-card, .event-item');
    cards.forEach(card => {
        observer.observe(card);
    });
});

// ============================================
// Highlight current page in navigation
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});
