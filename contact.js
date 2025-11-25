// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formGroups = document.querySelectorAll('.form-group');
    
    // Initialize form interactions
    initFormInteractions();
    
    // Form submission handler
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
});

function initFormInteractions() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    
    formInputs.forEach(input => {
        // Check initial values
        if (input.value) {
            input.parentElement.classList.add('filled');
        }
        
        // Focus events
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value) {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });
        
        // Input validation
        input.addEventListener('input', function() {
            validateField(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const parent = field.parentElement;
    
    parent.classList.remove('valid', 'error');
    
    if (!value) return;
    
    let isValid = true;
    
    switch (field.type) {
        case 'email':
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            break;
        case 'tel':
            isValid = /^[\d\s\-\+\(\)]{10,}$/.test(value);
            break;
        case 'text':
            isValid = value.length >= 2;
            break;
    }
    
    if (field.tagName === 'TEXTAREA') {
        isValid = value.length >= 10;
    }
    
    if (field.tagName === 'SELECT') {
        isValid = value !== '';
    }
    
    if (isValid) {
        parent.classList.add('valid');
    } else {
        parent.classList.add('error');
    }
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success state
        submitBtn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
        submitBtn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
        
        // Reset form after delay
        setTimeout(() => {
            e.target.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            submitBtn.disabled = false;
            
            // Reset form states
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('filled', 'valid');
            });
            
            // Show success message
            showNotification('Message sent successfully! We will get back to you soon.', 'success');
        }, 2000);
    }, 2000);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 15px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for form states
const style = document.createElement('style');
style.textContent = `
    .form-group.valid input,
    .form-group.valid textarea,
    .form-group.valid select {
        border-color: #2ecc71;
    }
    
    .form-group.error input,
    .form-group.error textarea,
    .form-group.error select {
        border-color: #e74c3c;
    }
    
    .notification button {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
    }
`;
document.head.appendChild(style);






// Animation on scroll for term items
document.addEventListener('DOMContentLoaded', function() {
    // Animate term items when they come into view
    const animateOnScroll = function() {
        const termItems = document.querySelectorAll('.term-item');
        
        termItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const itemVisible = 150;
            
            if (itemTop < window.innerHeight - itemVisible) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Form submission handling
    const acceptanceForm = document.querySelector('.acceptance-form');
    
    if (acceptanceForm) {
        acceptanceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const representative = document.getElementById('representative').value;
            const company = document.getElementById('company').value;
            const designation = document.getElementById('designation').value;
            
            // Validate form
            if (!representative || !company || !designation) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Terms & Conditions accepted successfully!', 'success');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Reset form
                acceptanceForm.reset();
            }, 2000);
        });
    }
    
    // CTA button functionality
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Scroll to acceptance form
            document.querySelector('.acceptance-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Notification function
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles for notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: slideInRight 0.5s ease, slideOutRight 0.5s ease 3s forwards;
            max-width: 400px;
        `;
        
        // Add keyframes for animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Remove notification after animation
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3500);
    }
    
    // Add hover effects to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Add intersection observer for better performance
    if ('IntersectionObserver' in window) {
        const termObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        document.querySelectorAll('.term-item').forEach(item => {
            termObserver.observe(item);
        });
    }
});