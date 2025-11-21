window.addEventListener('DOMContentLoaded', () => {
    // Animate image
    document.querySelector('.animate-img').style.opacity = 1;
    // Animate Title
    setTimeout(() => {
        document.querySelector('.animate-title').style.opacity = 1;
        document.querySelector('.animate-title').style.transform = "translateY(0)";
    }, 300);
    // Animate Description
    setTimeout(() => {
        document.querySelector('.form-desc').style.opacity = 1;
    }, 600);
    // Animate Info Cards
    document.querySelectorAll('.c-card').forEach((card, idx) => {
        setTimeout(() => {
            card.style.opacity = 1;
            card.style.transform = "translateY(0)";
        }, 950 + idx * 180);
    });
    // Animate Form
    setTimeout(() => {
        document.querySelector('.student-form').style.opacity = 1;
    }, 1300);

    // Handle Form Submit Animation
    const form = document.getElementById('studentForm');
    const success = document.getElementById('formSuccess');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        success.style.opacity = 1;
        setTimeout(() => {
            success.style.opacity = 0;
            form.reset();
        }, 2600);
    });
    
});
