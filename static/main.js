// === Scroll Spy: Highlight current section in nav ===
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
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

// === Floating Shapes Animation ===
const shapes = document.querySelectorAll('.floating-shapes span');
shapes.forEach(shape => {
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    let dx = (Math.random() - 0.5) * 0.5;
    let dy = (Math.random() - 0.5) * 0.5;

    function animate() {
        x += dx;
        y += dy;

        if (x < 0 || x > window.innerWidth) dx = -dx;
        if (y < 0 || y > window.innerHeight) dy = -dy;

        shape.style.transform = `translate(${x}px, ${y}px)`;
        requestAnimationFrame(animate);
    }
    animate();
});

// === Skill Charts Animation ===
const circles = document.querySelectorAll('.circle');
circles.forEach(circle => {
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const percent = circle.dataset.percent;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    function setProgress(percent) {
        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }

    setTimeout(() => setProgress(percent), 500); // animate on load
});

// === Smooth Scroll for Sidebar Links ===
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// === Project Card Hover Effect ===
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('.overlay').style.opacity = 1;
    });
    card.addEventListener('mouseleave', () => {
        card.querySelector('.overlay').style.opacity = 0;
    });
});
