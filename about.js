// Animations for reveal
window.addEventListener('DOMContentLoaded', () => {
    // Animate title & tagline
    document.querySelector('.animate-title').style.opacity = 1;
    document.querySelector('.animate-title').style.transform = "translateY(0)";
    setTimeout(() => {
        document.querySelector('.tagline').style.opacity = 1;
    }, 400);

    // Animate main text
    setTimeout(() => {
        document.querySelector('.about-para').style.opacity = 1;
    }, 600);

    // Animate list
    document.querySelectorAll('.about-list li').forEach((el, idx) => {
        setTimeout(() => {
            el.style.opacity = 1;
        }, 800 + idx * 110);
    });

    // Animate images
    document.querySelectorAll('.about-img').forEach((img, idx) => {
        setTimeout(() => {
            img.style.opacity = 1;
            img.style.transform = "scale(1) translateY(0)";
        }, 950 + idx * 180);
    });

    // Metrics counters
    document.querySelectorAll('.metric').forEach((box, idx) => {
        setTimeout(() => {
            box.style.opacity = 1;
            box.style.transform = "scale(1) translateY(0)";
            let numEl = box.querySelector('.metric-num');
            if (numEl) counterAnimate(numEl);
        }, 1200 + idx * 220);
    });

    // Highlight blocks
    setTimeout(() => {
        document.querySelectorAll('.highlight-section > div').forEach(el => {
            el.classList.add('fade-reveal');
            el.style.opacity = 1;
        });
    }, 1800);

    // Team & testimonials
    setTimeout(() => {
        document.querySelector('.team-spotlight').style.opacity = 1;
        document.querySelector('.testimonials').style.opacity = 1;
    }, 2200);

    // Animate HR
    setTimeout(() => {
        document.querySelector('.fancy-hr').style.maxWidth = "89%";
    }, 1500);

    // Testimonials slider
    let idx = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    setInterval(() => {
        testimonials.forEach((t, i) => t.classList.toggle('active', i === idx));
        idx = (idx + 1) % testimonials.length;
    }, 4300);
});

// Numeric counter function
function counterAnimate(el) {
    let target = +el.getAttribute("data-val");
    let curr = 0;
    let inc = Math.ceil(target / 70);
    let interval = setInterval(() => {
        curr += inc;
        if (curr >= target) {
            curr = target;
            clearInterval(interval);
        }
        el.textContent = curr;
    }, 30);
}
