// Fade-in sections on scroll
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

// Animate skill circles
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    const circle = card.querySelector('.circle');
    const percentage = card.dataset.skill;
    setTimeout(() => {
        circle.style.strokeDasharray = `${percentage}, 100`;
    }, 500);
});

// Sidebar active link on scroll
const navLinks = document.querySelectorAll('.sidebar a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if(window.scrollY >= sectionTop){
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === '#' + current){
            link.classList.add('active');
        }
    });
});
