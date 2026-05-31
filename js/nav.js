// Handle mobile menu
document.querySelector('.menu-button').addEventListener('click', function () {
    if (window.PortfolioAudio) window.PortfolioAudio.play('open', { volume: 0.2, playbackRate: 1.1 });
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.overlay').classList.toggle('active');
});

document.querySelector('.overlay').addEventListener('click', function () {
    if (window.PortfolioAudio) window.PortfolioAudio.play('close', { volume: 0.2, playbackRate: 0.9 });
    document.querySelector('.sidebar').classList.remove('active');
    document.querySelector('.overlay').classList.remove('active');
});

// Handle smooth scrolling for anchor links - MODIFIED
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // If it's the about link, projects.js will handle it via state
        if (this.getAttribute('id') === 'about-link') return;

        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#index') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const section = document.querySelector(targetId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
        // Update active state
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        this.classList.add('active');
    });
});

// Update active section on scroll - MODIFIED to exclude dynamically loaded content
const sections = document.querySelectorAll('section:not(#main-content-area)'); // Exclude the dynamic content area
const navItems = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    // If project detail is open, don't update active state based on scroll
    if (document.getElementById('main-content-area').style.display === 'block') return;

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        // Only update active state for internal links and not the about link
        if (item.getAttribute('href').startsWith('#') && item.getAttribute('id') !== 'about-link') {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        }
    });
});
