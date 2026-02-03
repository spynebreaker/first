// Better Gut Daily - Landing Page Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.email-input');
            const email = emailInput.value.trim();

            if (email && isValidEmail(email)) {
                // Show success message
                showNotification('Thanks for subscribing! Check your inbox.', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = this.value.trim();
                if (query) {
                    showNotification('Search coming soon! Query: ' + query, 'info');
                }
            }
        });
    }

    // Video card click handling
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        const playButton = card.querySelector('.play-button');
        const thumbnail = card.querySelector('.video-thumbnail');

        if (playButton && thumbnail) {
            const handlePlay = function(e) {
                e.preventDefault();
                showNotification('Video player coming soon!', 'info');
            };

            playButton.addEventListener('click', handlePlay);
            thumbnail.addEventListener('click', handlePlay);
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.video-card, .education-content, .newsletter-content').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Testimonial review toggle
    const toggleReviewBtn = document.getElementById('toggleReview');
    const fullReview = document.getElementById('fullReview');

    if (toggleReviewBtn && fullReview) {
        toggleReviewBtn.addEventListener('click', function() {
            const isExpanded = fullReview.classList.contains('expanded');

            if (isExpanded) {
                fullReview.classList.remove('expanded');
                toggleReviewBtn.classList.remove('active');
                toggleReviewBtn.querySelector('span').textContent = 'Read Full Review';
            } else {
                fullReview.classList.add('expanded');
                toggleReviewBtn.classList.add('active');
                toggleReviewBtn.querySelector('span').textContent = 'Hide Full Review';
            }
        });
    }
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Add styles dynamically if not present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                background: white;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                display: flex;
                align-items: center;
                gap: 1rem;
                z-index: 1000;
                animation: slideIn 0.3s ease-out;
                max-width: 400px;
            }
            .notification-success { border-left: 4px solid #4CAF50; }
            .notification-error { border-left: 4px solid #f44336; }
            .notification-info { border-left: 4px solid #2B5BA9; }
            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #999;
                padding: 0;
                line-height: 1;
            }
            .notification-close:hover { color: #333; }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .animate-on-scroll {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            .animate-on-scroll.visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(styles);
    }

    // Add to DOM
    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}
