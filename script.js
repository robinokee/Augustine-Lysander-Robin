// ========================================
// PRE-LOADER FUNCTIONALITY
// ========================================

window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    
    // Minimum display time for preloader (2 seconds)
    const minDisplayTime = 2000;
    
    setTimeout(function() {
        // Fade out preloader
        preloader.classList.add('fade-out');
        
        // Show main content after preloader fades
        setTimeout(function() {
            preloader.style.display = 'none';
            mainContent.classList.add('show');
        }, 600); // Match CSS transition duration
        
    }, minDisplayTime);
});

// ========================================
// DARK MODE FUNCTIONALITY
// ========================================

const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';

// Apply the saved theme on page load
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
}

// Toggle dark mode on button click
themeSwitch.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    
    // Save the theme preference
    let theme = 'light';
    if (body.classList.contains('dark-mode')) {
        theme = 'dark';
    }
    localStorage.setItem('theme', theme);
    
    // Add a little bounce effect
    this.style.transform = 'scale(0.9)';
    setTimeout(() => {
        this.style.transform = '';
    }, 150);
});

// Keyboard accessibility for theme toggle
themeSwitch.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
    }
});

// ========================================
// RIPPLE EFFECT ON CLICK
// ========================================

document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Create ripple element
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        // Calculate position
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        // Set ripple styles
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Add to DOM
        this.appendChild(ripple);
        
        // Remove after animation
        setTimeout(() => {
            ripple.remove();
        }, 700);
    });
});

// ========================================
// SMOOTH SCROLL FOR INTERNAL LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe social links for scroll animations
document.querySelectorAll('.social-link').forEach(link => {
    fadeObserver.observe(link);
});

// ========================================
// DYNAMIC YEAR IN FOOTER
// ========================================

const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer p');
if (footerText) {
    footerText.innerHTML = `&copy; ${currentYear} Augustine Lysander Robin. All Rights Reserved.`;
}

// ========================================
// KEYBOARD NAVIGATION ENHANCEMENT
// ========================================

document.querySelectorAll('.social-link').forEach((link, index) => {
    link.addEventListener('keydown', function(e) {
        const links = document.querySelectorAll('.social-link');
        
        // Arrow Down: Focus next link
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (index + 1) % links.length;
            links[nextIndex].focus();
        }
        
        // Arrow Up: Focus previous link
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = (index - 1 + links.length) % links.length;
            links[prevIndex].focus();
        }
        
        // Enter or Space: Trigger click
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// ========================================
// THEME DETECTION (System Preference)
// ========================================

// Optional: Detect system theme preference if no saved preference
if (!localStorage.getItem('theme')) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Uncomment the line below if you want to respect system preference
        // body.classList.add('dark-mode');
        // localStorage.setItem('theme', 'dark');
    }
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    // Only apply if user hasn't manually set a preference
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    }
});

// ========================================
// CONSOLE MESSAGE (OPTIONAL EASTER EGG)
// ========================================

console.log('%c👋 Hello, Developer!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cLooking to connect? Reach out via the links above!', 'font-size: 14px; color: #764ba2;');
console.log('%c🌙 Try toggling dark mode!', 'font-size: 14px; color: #764ba2;');

// ========================================
// PERFORMANCE: LAZY LOAD IMAGES
// ========================================

if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ========================================
// PRELOADER IMAGE ERROR HANDLING
// ========================================

const preloaderImage = document.querySelector('.preloader-image');
const profileImage = document.querySelector('.profile-image');

// Fallback if image fails to load
if (preloaderImage) {
    preloaderImage.addEventListener('error', function() {
        console.warn('Preloader image failed to load');
        this.style.display = 'none';
        // Optionally add a fallback
        const fallbackText = document.createElement('span');
        fallbackText.textContent = 'R';
        fallbackText.style.fontSize = '80px';
        fallbackText.style.fontWeight = '900';
        fallbackText.style.color = '#fff';
        this.parentElement.appendChild(fallbackText);
    });
}

if (profileImage) {
    profileImage.addEventListener('error', function() {
        console.warn('Profile image failed to load');
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23667eea" width="200" height="200"/%3E%3Ctext fill="%23fff" font-size="100" font-weight="bold" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ER%3C/text%3E%3C/svg%3E';
    });
}

// ========================================
// PREVENT BACKGROUND SCROLL ON MOBILE
// ========================================

// Additional fix for mobile devices
document.body.style.overflowX = 'hidden';
document.documentElement.style.overflowX = 'hidden';