// Intersection Observer for fade-in animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to all service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        observer.observe(card);
    });

    // Add hover effect with slight delay for better UX
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transitionDelay = '0s';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transitionDelay = '0s';
        });
    });
    
    // Add click effects for mobile devices
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('active-click');
            setTimeout(() => {
                this.classList.remove('active-click');
            }, 300);
        });
    });
});

// Additional animation for page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add staggered animation delay for cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
});

// Add parallax effect to background on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const servicesSection = document.querySelector('.services-section');
    if (servicesSection) {
        servicesSection.style.backgroundPosition = `0% ${50 + scrolled * 0.05}%`;
    }
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        if (window.innerWidth < 768) {
            card.style.marginBottom = '20px';
        } else {
            card.style.marginBottom = '';
        }
    });
});