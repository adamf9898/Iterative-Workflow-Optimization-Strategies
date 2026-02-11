/**
 * Theme Switcher JavaScript
 * Handles light/dark theme toggle functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
});

/**
 * Initialize theme functionality
 */
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (!themeToggle) return;
    
    // Load saved theme preference or default to light
    const savedTheme = localStorage.getItem('iwos-theme') || 'light';
    setTheme(savedTheme);
    
    // Add click handler for theme toggle
    themeToggle.addEventListener('click', function() {
        toggleTheme();
    });
    
    // Listen for system theme changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', function(e) {
            if (!localStorage.getItem('iwos-theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('iwos-theme', newTheme);
}

/**
 * Set the theme
 * @param {string} theme - 'light' or 'dark'
 */
function setTheme(theme) {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        if (themeIcon) {
            themeIcon.textContent = '☀️';
        }
    } else {
        body.classList.remove('dark-theme');
        if (themeIcon) {
            themeIcon.textContent = '🌙';
        }
    }
    
    // Emit custom event for theme change
    const event = new CustomEvent('themeChanged', { detail: { theme } });
    document.dispatchEvent(event);
}

/**
 * Get current theme
 * @returns {string} 'light' or 'dark'
 */
function getCurrentTheme() {
    return document.body.classList.contains('dark-theme') ? 'dark' : 'light';
}

/**
 * Apply theme transition effect
 */
function applyThemeTransition() {
    const body = document.body;
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    setTimeout(() => {
        body.style.transition = '';
    }, 300);
}

// Listen for theme change events
document.addEventListener('themeChanged', function(e) {
    console.log(`Theme changed to: ${e.detail.theme}`);
    applyThemeTransition();
});

// Export for external use
window.IWOSTheme = {
    getCurrentTheme,
    setTheme,
    toggleTheme
};
