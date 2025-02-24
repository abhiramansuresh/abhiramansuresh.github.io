// Content data stored directly in JavaScript
const siteData = {
    "index": {
        "title": "Welcome",
        "content": `
            <div class="project-section">
                <h1>Hey There 👋</h1>
                <p class="project-description">
                    I’m Abhi, just a guy happily co-existing in a world where Mario and the Doom Slayer run wild.  
                    Whether I’m smashing keyboards, sketching ideas, or forging game worlds, I’m all in. 
                    I believe games, when designed right, can hit deep and stay with you long after the credits roll—and that’s exactly what I love creating.
                </p>
            </div>
        `
    },
    "atlas-keeper": {
        "title": "Atlas Keeper",
        "content": `
            <div class="project-section">
                <h1>Atlas Keeper</h1>
                <div class="video-container">
                    <iframe width="100%" height="315" src="https://www.youtube.com/embed/U_m0j8dUG7M?si=ShoAlzTT0HjeAARt" title="Atlas Keeper Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                <div class="platform-icons">
                    <i class="fab fa-windows"></i>
                    <i class="fab fa-apple"></i>
                </div>
                <p class="project-description">
                    Atlas Keeper is an exciting game project that showcases innovative gameplay mechanics.
                </p>
                <div class="responsibilities">
                    <h2>Key Features</h2>
                    <ul>
                        <li><i class="fas fa-check"></i>Feature 1</li>
                        <li><i class="fas fa-check"></i>Feature 2</li>
                        <li><i class="fas fa-check"></i>Feature 3</li>
                    </ul>
                </div>
                <div class="experience">
                    <h2>Development Journey</h2>
                    <p>Share your experience and challenges during the development of Atlas Keeper here.</p>
                </div>
            </div>
        `
    },
    "atlas-mission": {
        "title": "Atlas Mission",
        "content": `
            <div class="project-section">
                <h1>Atlas Mission</h1>
                <div class="video-container">
                    <iframe width="100%" height="315" src="https://www.youtube.com/embed/0u-aXlx_tqc?si=dGH9bjunhf-47zjs" title="Atlas Mission Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                <div class="platform-icons">
                    <i class="fab fa-windows"></i>
                </div>
                <p class="project-description">
                    Atlas Mission is an engaging game that takes players on an epic adventure.
                </p>
                <div class="responsibilities">
                    <h2>Key Features</h2>
                    <ul>
                        <li><i class="fas fa-check"></i>Feature 1</li>
                        <li><i class="fas fa-check"></i>Feature 2</li>
                        <li><i class="fas fa-check"></i>Feature 3</li>
                    </ul>
                </div>
                <div class="experience">
                    <h2>Development Journey</h2>
                    <p>Share your experience and challenges during the development of Atlas Mission here.</p>
                </div>
            </div>
        `
    },
    "duo-jump": {
        "title": "Duo Jump",
        "content": `
            <div class="project-section">
                <h1>Duo Jump</h1>
                <div class="video-container">
                    <img src="assets/duoJumpThumbnail.jpg" alt="Duo Jump">
                </div>
                <div class="platform-icons">
                    <i class="fab fa-android"></i>
                    <i class="fab fa-apple"></i>
                </div>
                <p class="project-description">
                    Duo Jump is an exciting mobile game that challenges players' reflexes and coordination.
                </p>
                <div class="responsibilities">
                    <h2>Key Features</h2>
                    <ul>
                        <li><i class="fas fa-check"></i>Feature 1</li>
                        <li><i class="fas fa-check"></i>Feature 2</li>
                        <li><i class="fas fa-check"></i>Feature 3</li>
                    </ul>
                </div>
                <div class="experience">
                    <h2>Development Journey</h2>
                    <p>Share your experience and challenges during the development of Duo Jump here.</p>
                </div>
            </div>
        `
    },
    "baldy": {
        "title": "Baldy",
        "content": `
            <div class="project-section">
                <h1>Baldy</h1>
                <div class="video-container">
                    <img src="assets/baldyThumbnail.jpg" alt="Baldy">
                </div>
                <div class="platform-icons">
                    <i class="fab fa-windows"></i>
                </div>
                <p class="project-description">
                    Baldy is a unique game experience with innovative mechanics and engaging gameplay.
                </p>
                <div class="responsibilities">
                    <h2>Key Features</h2>
                    <ul>
                        <li><i class="fas fa-check"></i>Feature 1</li>
                        <li><i class="fas fa-check"></i>Feature 2</li>
                        <li><i class="fas fa-check"></i>Feature 3</li>
                    </ul>
                </div>
                <div class="experience">
                    <h2>Development Journey</h2>
                    <p>Share your experience and challenges during the development of Baldy here.</p>
                </div>
            </div>
        `
    },
};

// Function to load all content
function loadAllContent() {
    let allContent = '';
    for (const [key, data] of Object.entries(siteData)) {
        // Remove the nested project-section div since we're already creating a section
        const cleanContent = data.content.replace(/<div class="project-section">|<\/div>$/g, '');
        allContent += `<section id="${key}" class="project-section">${cleanContent}</section>`;
    }
    return allContent;
}

// Function to update active navigation state
function updateNavigation(page) {
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to current page nav item
    const activeNav = document.querySelector(`a[href="${page}.html"]`);
    if (activeNav) {
        activeNav.classList.add('active');
    }
}

// Set up Intersection Observer for section tracking
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.project-section');
    const navItems = document.querySelectorAll('.nav-item');

    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px',
        threshold: 0.6
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
                const sectionId = entry.target.id;
                // Remove active class from all nav items
                navItems.forEach(item => item.classList.remove('active'));
                
                // Add active class to corresponding nav item
                const activeNav = document.querySelector(`a[href="${sectionId}.html"]`);
                if (activeNav) {
                    activeNav.classList.add('active');
                }

                // Update URL without page reload
                history.pushState({ page: sectionId }, '', `${sectionId}`);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
});

// Function to handle navigation
function navigate(page) {
    const mainContent = document.querySelector('.main-content');
    const targetSection = document.getElementById(page);
    if (targetSection) {
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to current page nav item
        const activeNav = document.querySelector(`a[href="${page}.html"]`);
        if (activeNav) {
            activeNav.classList.add('active');
        }

        // Ensure smooth scrolling and proper positioning
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Update URL without page reload
        history.pushState({ page }, '', `${page}`);
        
        // Force a recalculation of intersection observer
        setTimeout(() => {
            window.dispatchEvent(new Event('scroll'));
        }, 100);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Get current page from URL
    let currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    if (currentPage === '') currentPage = 'index';

    // Handle navigation clicks
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', (e) => {
            if (!link.hasAttribute('target')) {
                e.preventDefault();
                const page = link.getAttribute('href').replace('.html', '');
                navigate(page);
            }
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.page) {
            navigate(event.state.page);
        }
    });

    // Load all content initially
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = loadAllContent();
    navigate(currentPage || 'index');
});

// Handle mobile menu
document.querySelector('.menu-button').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.overlay').classList.toggle('active');
});

document.querySelector('.overlay').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.remove('active');
    document.querySelector('.overlay').classList.remove('active');
});