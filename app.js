// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initCounters();
    initMobileMenu();
    initSmoothScrolling();
    initInteractiveEffects();
    initDownloadButton();
});

// Download/Print functionality
function initDownloadButton() {
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handlePrint();
        });
    }
}

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    
    // Handle navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(19, 52, 59, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(19, 52, 59, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Highlight active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navMenu) return;

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Animate hamburger lines
        const spans = navToggle.querySelectorAll('span');
        if (navToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 60;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Check on scroll
    window.addEventListener('scroll', checkFade);
    
    // Check on load
    checkFade();
    
    // Add staggered animation delay for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Add staggered animation delay for skill bars
    const skillItems = document.querySelectorAll('.cert-item');
    skillItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    let countersActivated = false;
    
    function animateCounters() {
        if (countersActivated) return;
        
        const counterSection = document.querySelector('.summary-stats');
        if (!counterSection) return;
        
        const rect = counterSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            countersActivated = true;
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            });
        }
    }
    
    // Also animate achievement counters
    const achievementCounters = document.querySelectorAll('.achievement-number[data-target]');
    let achievementCountersActivated = false;
    
    function animateAchievementCounters() {
        if (achievementCountersActivated) return;
        
        const achievementSection = document.querySelector('.achievements-grid');
        if (!achievementSection) return;
        
        const rect = achievementSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            achievementCountersActivated = true;
            
            achievementCounters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 80;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                // Add delay for staggered effect
                const delay = Array.from(achievementCounters).indexOf(counter) * 200;
                setTimeout(updateCounter, delay);
            });
        }
    }
    
    window.addEventListener('scroll', () => {
        animateCounters();
        animateAchievementCounters();
    });
    
    // Check on load
    animateCounters();
    animateAchievementCounters();
}

// Add interactive hover effects and expandable content
function initInteractiveEffects() {
    // Timeline item expand/collapse functionality
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        const content = item.querySelector('.timeline-content');
        const achievements = item.querySelector('.timeline-achievements');
        const header = item.querySelector('.timeline-header');
        
        if (content && achievements && header) {
            // Add click indicator
            header.style.cursor = 'pointer';
            header.style.position = 'relative';
            
            // Add expand indicator
            const expandIcon = document.createElement('span');
            expandIcon.innerHTML = '▼';
            expandIcon.style.position = 'absolute';
            expandIcon.style.right = '10px';
            expandIcon.style.top = '10px';
            expandIcon.style.transition = 'transform 0.3s ease';
            expandIcon.style.fontSize = '12px';
            expandIcon.style.color = 'var(--color-primary)';
            header.appendChild(expandIcon);
            
            // Initially collapse achievements
            achievements.style.maxHeight = '0';
            achievements.style.overflow = 'hidden';
            achievements.style.transition = 'max-height 0.4s ease, opacity 0.4s ease';
            achievements.style.opacity = '0';
            
            let isExpanded = false;
            
            header.addEventListener('click', function() {
                if (!isExpanded) {
                    achievements.style.maxHeight = achievements.scrollHeight + 'px';
                    achievements.style.opacity = '1';
                    expandIcon.style.transform = 'rotate(180deg)';
                    isExpanded = true;
                    
                    // Add visual feedback
                    content.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        content.style.transform = 'scale(1)';
                    }, 200);
                } else {
                    achievements.style.maxHeight = '0';
                    achievements.style.opacity = '0';
                    expandIcon.style.transform = 'rotate(0deg)';
                    isExpanded = false;
                }
            });
            
            // Auto-expand first item
            if (index === 0) {
                setTimeout(() => {
                    header.click();
                }, 1000);
            }
        }
    });
    
    // Add hover effects to skill charts
    const chartImages = document.querySelectorAll('.chart-image');
    chartImages.forEach(img => {
        img.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    const profilePhoto = document.querySelector('.photo-placeholder');
    
    if (hero && profilePhoto) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.1;
            
            if (scrolled < hero.offsetHeight) {
                profilePhoto.style.transform = `translate3d(0, ${rate}px, 0) rotateY(${scrolled * 0.1}deg)`;
            }
        });
    }
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.education-card, .achievement-card, .domain-card, .stat-card');
    cards.forEach(card => {
        card.style.transition = 'all 0.3s ease';
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
    });
}

// Handle print functionality
function handlePrint() {
    // Expand all timeline items before printing
    const timelineHeaders = document.querySelectorAll('.timeline-header');
    const expandedStates = [];
    
    // Store current states and expand all
    timelineHeaders.forEach((header, index) => {
        const achievements = header.parentElement.querySelector('.timeline-achievements');
        const isExpanded = achievements && achievements.style.maxHeight !== '0px';
        expandedStates[index] = isExpanded;
        
        if (!isExpanded && achievements) {
            header.click();
        }
    });
    
    // Add print-specific styles
    const printStyles = document.createElement('style');
    printStyles.textContent = `
        @media print {
            * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
            }
            
            .navbar,
            .scroll-indicator,
            .download-btn {
                display: none !important;
            }
            
            .hero { 
                background: linear-gradient(135deg, #134252 0%, #626c71 100%) !important;
                color: white !important;
                min-height: auto !important;
                padding: 40px 20px !important;
            }
            
            .hero-name { 
                background: linear-gradient(135deg, white, #32b8c5) !important;
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
                background-clip: text !important;
            }
            
            .hero-title { 
                color: #32b8c5 !important; 
            }
            
            .contact-item a { 
                color: white !important; 
            }
            
            .section { 
                padding: 30px 0 !important;
                page-break-inside: avoid !important;
            }
            
            .section--bg { 
                background: rgba(59, 130, 246, 0.08) !important;
            }
            
            .timeline::before { 
                background: linear-gradient(to bottom, #218391, #32b8c5) !important;
            }
            
            .timeline-marker { 
                background: #218391 !important; 
                box-shadow: 0 0 0 4px white !important;
                border: 4px solid white !important;
            }
            
            .timeline-item,
            .skills-category,
            .education-card,
            .achievement-card,
            .domain-card {
                page-break-inside: avoid !important;
                margin-bottom: 20px !important;
            }
            
            .timeline-achievements {
                max-height: none !important;
                opacity: 1 !important;
            }
            
            .chart-image {
                max-width: 100% !important;
                height: auto !important;
            }
            
            body {
                font-size: 12px !important;
                line-height: 1.4 !important;
            }
            
            .hero-name {
                font-size: 32px !important;
            }
            
            .hero-title {
                font-size: 18px !important;
            }
            
            .section-title {
                font-size: 24px !important;
            }
        }
    `;
    
    document.head.appendChild(printStyles);
    
    // Wait a moment for styles to apply, then print
    setTimeout(() => {
        window.print();
        
        // Clean up
        setTimeout(() => {
            document.head.removeChild(printStyles);
            
            // Restore original timeline states
            timelineHeaders.forEach((header, index) => {
                const achievements = header.parentElement.querySelector('.timeline-achievements');
                const wasExpanded = expandedStates[index];
                const isCurrentlyExpanded = achievements && achievements.style.maxHeight !== '0px';
                
                if (wasExpanded !== isCurrentlyExpanded && achievements) {
                    header.click();
                }
            });
        }, 1000);
    }, 100);
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Handle escape key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    // Handle Enter/Space on timeline headers
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.classList.contains('timeline-header')) {
            e.preventDefault();
            e.target.click();
        }
    }
});

// Add focus management for accessibility
function initAccessibility() {
    // Add ARIA labels and roles
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.setAttribute('aria-label', 'Download or print resume');
        downloadBtn.setAttribute('role', 'button');
    }
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const text = link.textContent;
        link.setAttribute('aria-label', `Navigate to ${text} section`);
    });
    
    // Make timeline headers focusable and accessible
    const timelineHeaders = document.querySelectorAll('.timeline-header');
    timelineHeaders.forEach(header => {
        header.setAttribute('tabindex', '0');
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('aria-label', 'Click to expand job details');
        
        // Update aria-expanded when clicked
        header.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);

// Performance optimization - throttle scroll events
let ticking = false;

function updateOnScroll() {
    // Scroll-based updates are handled in their respective functions
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.warn('An error occurred:', e.error);
});

// Handle image loading errors
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Failed to load image:', this.src);
            // Could add fallback image here
            this.style.display = 'none';
        });
    });
});

// Initialize everything when page loads
window.addEventListener('load', function() {
    // Trigger initial animations
    const firstFadeElement = document.querySelector('.fade-in');
    if (firstFadeElement) {
        setTimeout(() => {
            firstFadeElement.classList.add('visible');
        }, 100);
    }
    
    console.log('Resume application loaded successfully');
});