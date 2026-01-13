// Project data - Add new projects here
const projectsData = [
    {
        id: 1,
        title: "PDA Pro",
        excerpt: "A comprehensive platform for online education with interactive lessons and assessments.",
        thumbnail: "assets/project-thumbs/pdapro-thumb.jpg",
        logo: "assets/project-thumbs/pdapro.jpg",
        category: "app",
        description: `<p>PDA Pro is a comprehensive platform for online education that I developed to provide interactive lessons and assessments.</p>
        <p>The platform features:</p>
        <ul>
            <li>Interactive lesson modules</li>
            <li>Real-time assessment tools</li>
            <li>Progress tracking dashboard</li>
            <li>Collaborative learning spaces</li>
        </ul>
        <p>This project was built using React for the frontend and Node.js for the backend, with MongoDB as the database.</p>`,
        gallery: [
            "assets/project-gallery/pdapro-1.jpg",
            "assets/project-gallery/pdapro-2.jpg"
        ],
        videoUrl: "https://youtube.com/shorts/nJXYRFSMVoo?si=EAdpjtU21oJNYI6u" // Optional YouTube embed URL
    },
    {
        id: 2,
        title: "Atlas Keeper",
        excerpt: "Real-time analytics dashboard for tracking sales, inventory, and customer behavior.",
        thumbnail: "assets/project-thumbs/atlaskeeper-thumb.jpg",
        logo: "assets/project-thumbs/atlaskeeper-icon.jpg",
        category: "game",
        description: `<p>Atlas Keeper is a real-time analytics dashboard that I developed for tracking game metrics and player behavior.</p>
        <p>Key features include:</p>
        <ul>
            <li>Real-time player statistics</li>
            <li>In-game economy monitoring</li>
            <li>Player retention analysis</li>
            <li>Customizable reporting tools</li>
        </ul>`,
        gallery: [
            "assets/project-gallery/atlaskeeper-1.jpg",
            "assets/project-gallery/atlaskeeper-2.jpg"
        ],
        videoUrl: "https://youtu.be/U_m0j8dUG7M?si=3Mls99gCGnhjj6Um" // Optional YouTube embed URL
    },
    {
        id: 3,
        title: "Atlas Mission",
        excerpt: "Secure and intuitive banking application with biometric authentication and transaction tracking.",
        thumbnail: "assets/project-thumbs/atlasmission-thumb.jpg",
        logo: "assets/project-thumbs/atlasmission-icon.jpg",
        category: "game",
        videoUrl: "https://www.youtube.com/watch?v=0u-aXlx_tqc" // Optional YouTube embed URL
    },
    {
        id: 4,
        title: "Duo Jump",
        excerpt: "A fun platformer game where you control two characters simultaneously.",
        thumbnail: "assets/project-thumbs/duojump-thumb.jpg",
        logo: "assets/project-thumbs/duojump-icon.png",
        category: "game"
    },
    {
        id: 5,
        title: "Baldy",
        excerpt: "An adventure game featuring a bald protagonist navigating through challenging environments.",
        thumbnail: "assets/project-thumbs/baldy-thumb.jpg",
        logo: "assets/project-thumbs/baldy-icon.jpg",
        category: "game"
    },

    // Prototypes
    {
        id: 6,
        title: "Duo Jump",
        excerpt: "IoT interface for managing connected home devices with voice commands and automation.",
        thumbnail: "assets/project-thumbs/duojump-thumb.jpg",
        logo: "assets/project-thumbs/duojump-icon.png",
        category: "prototype",
        embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/U_m0j8dUG7M?si=mIbd1L5jJcWbssxW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
    },
    {
        id: 7,
        title: "Baldy",
        excerpt: "Health monitoring application with workout plans, nutrition tracking, and progress visualization.",
        thumbnail: "assets/project-thumbs/baldy-thumb.jpg",
        logo: "assets/project-thumbs/baldy-icon.jpg",
        category: "prototype"
    },

];

// Function to create project cards
function createProjectCard(project) {
    return `
        <div class="project-card" data-id="${project.id}">
            <div class="project-thumbnail">
                <img src="${project.thumbnail}" alt="${project.title}" onerror="this.src='assets/project-thumbs/AtlasMission.jpg'">
            </div>
            <div class="project-info">
                <div class="project-logo">
                    <img src="${project.logo}" alt="${project.title} Logo" onerror="this.src='assets/project-thumbs/AtlasKeeper.jpg'">
                </div>
                <div class="project-text">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-excerpt">${project.excerpt}</p>
                </div>
            </div>
        </div>
    `;
}

// Function to load projects by category
function loadProjects(category) {
    const container = document.getElementById('projects-container');
    const filteredProjects = projectsData.filter(project => project.category === category);

    container.innerHTML = '';

    filteredProjects.forEach(project => {
        container.innerHTML += createProjectCard(project);
    });
}

// Function to load prototypes
function loadPrototypes() {
    const container = document.getElementById('prototypes-container');
    const filteredProjects = projectsData.filter(project => project.category === 'prototype');

    container.innerHTML = '';

    filteredProjects.forEach(project => {
        container.innerHTML += createProjectCard(project);
    });
}

// Function to load games
function loadGames() {
    const container = document.getElementById('games-container');
    const filteredProjects = projectsData.filter(project => project.category === 'game');

    container.innerHTML = '';

    filteredProjects.forEach(project => {
        container.innerHTML += createProjectCard(project);
    });
}

// Function to load apps
function loadApps() {
    const container = document.getElementById('apps-container');
    const filteredProjects = projectsData.filter(project => project.category === 'app');

    container.innerHTML = '';

    filteredProjects.forEach(project => {
        container.innerHTML += createProjectCard(project);
    });
}

// Function to load project details
function loadProjectDetails(projectId) {
    // Find the project by ID
    const project = projectsData.find(p => p.id == projectId);

    if (!project) {
        console.error(`Project with ID ${projectId} not found`);
        return;
    }

    // Determine the section to return to based on project category
    let returnSection = '#';
    if (project.category === 'game') {
        returnSection = '#games';
    } else if (project.category === 'app') {
        returnSection = '#apps';
    } else if (project.category === 'prototype') {
        returnSection = '#prototypes';
    }

    // Create the project detail HTML
    const detailHtml = `
    <section id="project-detail" class="main-content-section">
        <div class="project-header">
            <div class="project-logo-large">
                <img src="${project.logo}" alt="${project.title} Logo">
            </div>
            <div class="project-title-container">
                <h1>${project.title}</h1>
                <p class="highlight-box">${project.category}</p>
            </div>
        </div>
        
        ${project.gallery && project.gallery.length > 0 ? `
        <div class="project-gallery">
            ${project.gallery.map(img => `<img src="${img}" alt="${project.title} screenshot">`).join('')}
        </div>
        ` : ''}
        
        <div class="project-content">
            <div class="project-description">
                ${project.description || ''}
            </div>
            
            ${project.videoUrl ? `
            <div class="video-container">
                <iframe width="560" height="315" src="${getYouTubeEmbedUrl(project.videoUrl)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            ` : ''}
        </div>
        
        <!-- Back button removed as requested -->
    </section>
    `;

    return detailHtml;
}

// Helper function to extract YouTube Embed URL from any YouTube link
function getYouTubeEmbedUrl(url) {
    if (!url) return '';

    // Handle already embedded URLs
    if (url.includes('youtube.com/embed/')) {
        return url;
    }

    // Robust pattern for YouTube URLs (matches standard watch, shorts, share, embed)
    const pattern = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(pattern);

    if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}?rel=0`;
    }

    console.warn('Could not parse YouTube URL:', url);
    return url; // Return original if we can't parse it (failsafe)
}

// Initialize projects when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Load games
    loadGames();

    // Load apps
    loadApps();

    // Load prototypes
    loadPrototypes();

    // Add click event listeners to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function () {
            const projectId = this.getAttribute('data-id');
            const projectHtml = loadProjectDetails(projectId);

            // Hide all sections
            document.querySelectorAll('.section').forEach(section => {
                section.style.display = 'none';
            });

            // Show project details in main-content-area
            const mainContentArea = document.getElementById('main-content-area');
            mainContentArea.innerHTML = projectHtml;
            mainContentArea.style.display = 'block';

            // Back button functionality removed as requested

            // Make sidebar navigation work from project detail pages
            document.querySelectorAll('.nav-item').forEach(navItem => {
                if (navItem.getAttribute('id') !== 'about-link') {
                    const originalClickHandler = navItem.onclick;
                    navItem.onclick = function (e) {
                        e.preventDefault();
                        const targetId = this.getAttribute('href');

                        // Hide main-content-area and show all sections
                        mainContentArea.style.display = 'none';
                        document.querySelectorAll('.section').forEach(section => {
                            section.style.display = 'block';
                        });

                        // Scroll to the appropriate section
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

                        return false;
                    };
                }
            });

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
});