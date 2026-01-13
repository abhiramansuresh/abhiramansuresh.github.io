// Project data - Add new projects here
const projectsData = [
    {
        id: 1,
        title: "PDA Pro",
        excerpt: "A comprehensive platform for online education with interactive lessons and assessments.",
        thumbnail: "assets/project-thumbs/pdapro-thumb.jpg",
        logo: "assets/project-thumbs/pdapro.jpg",
        category: "App",
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
        videoUrl: "https://youtube.com/shorts/nJXYRFSMVoo?si=EAdpjtU21oJNYI6u", // Optional YouTube embed URL
        appStoreUrl: "https://apps.apple.com/in/app/pda-pro-for-demand-avoidance/id6743385207",     // URL for App Store button
        googlePlayUrl: "https://play.google.com/store/apps/details?id=com.learningyogi.pdapro&pcampaignid=web_share",   // URL for Google Play button
    },
    {
        id: 2,
        title: "Atlas Keeper",
        excerpt: "Real-time analytics dashboard for tracking sales, inventory, and customer behavior.",
        thumbnail: "assets/project-thumbs/atlaskeeper-thumb.jpg",
        logo: "assets/project-thumbs/atlaskeeper-icon.jpg",
        category: "Game",
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
        videoUrl: "https://youtu.be/U_m0j8dUG7M?si=3Mls99gCGnhjj6Um", // Optional YouTube embed URL
        appStoreUrl: "https://apps.apple.com/in/app/atlaskeeper-kids-learning-game/id6444937235",     // URL for App Store button
        googlePlayUrl: "https://play.google.com/store/apps/details?id=com.learningyogi.MagicBookMVP&pcampaignid=web_share"   // URL for Google Play button
    },
    {
        id: 3,
        title: "Atlas Mission",
        excerpt: "Secure and intuitive banking application with biometric authentication and transaction tracking.",
        thumbnail: "assets/project-thumbs/atlasmission-thumb.jpg",
        logo: "assets/project-thumbs/atlasmission-icon.jpg",
        category: "Game",
        videoUrl: "https://www.youtube.com/watch?v=0u-aXlx_tqc", // Optional YouTube embed URL
        appStoreUrl: "https://apps.apple.com/in/app/atlasmission-1-kids-learning/id1161093896",     // URL for App Store button
        googlePlayUrl: "https://play.google.com/store/apps/details?id=com.LearningYogi.Atlasmission&pcampaignid=web_share"   // URL for Google Play button
    },
    {
        id: 4,
        title: "Duo Jump",
        excerpt: "A fun platformer game where you control two characters simultaneously.",
        thumbnail: "assets/project-thumbs/duojump-thumb.jpg",
        logo: "assets/project-thumbs/duojump-icon.png",
        category: "Game",
        videoUrl: "https://youtube.com/shorts/n1STBVmzgOk?si=vYvuOYrNxBLqUBGr", // Optional YouTube embed URL
        googlePlayUrl: "https://play.google.com/store/apps/details?id=com.pandascreation.duojump&pcampaignid=web_share"   // URL for Google Play button
    },
    {
        id: 5,
        title: "Baldy",
        excerpt: "An adventure game featuring a bald protagonist navigating through challenging environments.",
        thumbnail: "assets/project-thumbs/baldy-thumb.jpg",
        logo: "assets/project-thumbs/baldy-icon.jpg",
        category: "Game",
        videoUrl: "https://youtu.be/nSUuGixCRCQ?si=U4lfaV6u3lM7KVpx",
        itchioUrl: "https://pandasaan.itch.io/baldy"
    },

    // Prototypes
    {
        id: 6,
        title: "Squares",
        excerpt: "IoT interface for managing connected home devices with voice commands and automation.",
        thumbnail: "assets/project-thumbs/squares-icon.jpg",
        logo: "assets/project-thumbs/squares-icon.jpg",
        category: "Prototype",
        itchioUrl: "https://pandasaan.itch.io/squares"
    },
    {
        id: 7,
        title: "Grainy",
        excerpt: "Health monitoring application with workout plans, nutrition tracking, and progress visualization.",
        thumbnail: "assets/project-thumbs/grainy-icon.jpg",
        logo: "assets/project-thumbs/grainy-icon.jpg",
        category: "Prototype",
        itchioUrl: "https://pandasaan.itch.io/grainy"
    },
    {
        id: 8,
        title: "The Crossover",
        excerpt: "Health monitoring application with workout plans, nutrition tracking, and progress visualization.",
        thumbnail: "assets/project-thumbs/crossover-thumb.jpg",
        logo: "assets/project-thumbs/crossover-thumb.jpg",
        category: "Prototype",
        itchioUrl: "https://pandasaan.itch.io/the-crossover-virtual-reality-game",
        videoUrl: "https://youtu.be/r_zFsgJGq20?si=bo05elt1KqDDluae"
    },
    {
        id: 9,
        title: "Combat a Mort",
        excerpt: "Health monitoring application with workout plans, nutrition tracking, and progress visualization.",
        thumbnail: "assets/project-thumbs/combat-thumb.jpg",
        logo: "assets/project-thumbs/combat-thumb.jpg",
        category: "Prototype",
        itchioUrl: "https://pandasaan.itch.io/combat-a-mort",
        videoUrl: "https://www.youtube.com/watch?v=4DFo81-5m4Y"
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
    const filteredProjects = projectsData.filter(project => project.category === 'Prototype');

    container.innerHTML = '';

    filteredProjects.forEach(project => {
        container.innerHTML += createProjectCard(project);
    });
}

// Function to load games
function loadGames() {
    const container = document.getElementById('games-container');
    const filteredProjects = projectsData.filter(project => project.category === 'Game');

    container.innerHTML = '';

    filteredProjects.forEach(project => {
        container.innerHTML += createProjectCard(project);
    });
}

// Function to load apps
function loadApps() {
    const container = document.getElementById('apps-container');
    const filteredProjects = projectsData.filter(project => project.category === 'App');

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
    if (project.category === 'Game') {
        returnSection = '#games';
    } else if (project.category === 'App') {
        returnSection = '#apps';
    } else if (project.category === 'Prototype') {
        returnSection = '#prototypes';
    }

    // Create the project detail HTML
    // Create the project detail HTML with new 2-column layout
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
        
        <div class="project-detail-content">
            <!-- Left Column: Text & Links -->
            <div class="project-text-column">
                <div class="project-description">
                    ${project.description || ''}
                </div>

                ${(project.appStoreUrl || project.googlePlayUrl || project.itchioUrl) ? `
                <div class="project-links">
                    ${project.appStoreUrl ? `
                    <a href="${project.appStoreUrl}" target="_blank" class="store-button">
                        <img src="assets/links/app-store.svg" alt="Download on App Store">
                    </a>
                    ` : ''}
                    
                    ${project.googlePlayUrl ? `
                    <a href="${project.googlePlayUrl}" target="_blank" class="store-button">
                        <img src="assets/links/google-store.svg" alt="Get it on Google Play">
                    </a>
                    ` : ''}

                    ${project.itchioUrl ? `
                    <a href="${project.itchioUrl}" target="_blank" class="store-button">
                        <img src="assets/links/itchio-store.svg" alt="Get it on Itch.io">
                    </a>
                    ` : ''}
                </div>
                ` : ''}
            </div>

            <!-- Right Column: Media Gallery (Video + Images) -->
            <div class="project-media-column">
                ${/* Video Section */ ''}
                ${project.videoUrl ? `
                <div class="media-item" onclick="openLightbox('video', '${getYouTubeEmbedUrl(project.videoUrl)}')">
                    <iframe width="560" height="315" src="${getYouTubeEmbedUrl(project.videoUrl)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                ` : ''}

                ${/* Gallery Images */ ''}
                ${project.gallery && project.gallery.length > 0 ?
            project.gallery.map(img => `
                    <div class="media-item" onclick="openLightbox('image', '${img}')">
                        <img src="${img}" alt="${project.title} screenshot">
                    </div>
                    `).join('')
            : ''}
            </div>
        </div>
        
        <!-- Back button removed as requested -->
    </section>
    `;

    return detailHtml;
}

// Lightbox/Modal Functions
function createLightbox() {
    if (document.querySelector('.lightbox-modal')) return;

    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-modal';
    lightbox.innerHTML = `
        <div class="lightbox-close" onclick="closeLightbox()">&times;</div>
        <div class="lightbox-content" id="lightbox-content-container">
            <!-- Content injected here -->
        </div>
    `;

    // Close on clicking outside content
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.body.appendChild(lightbox);
}

function openLightbox(type, source) {
    const lightbox = document.querySelector('.lightbox-modal');
    if (!lightbox) return;

    const container = document.getElementById('lightbox-content-container');
    container.innerHTML = '';

    if (type === 'image') {
        const img = document.createElement('img');
        img.src = source;
        container.appendChild(img);
    } else if (type === 'video') {
        const iframe = document.createElement('iframe');
        iframe.src = source; // Source should already be an embed URL
        iframe.frameBorder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        container.appendChild(iframe);
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox-modal');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.getElementById('lightbox-content-container').innerHTML = ''; // Clear content to stop video
        document.body.style.overflow = ''; // Restore scrolling
    }
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
    // Create lightbox modal
    createLightbox();

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

            // Set active state on sidebar based on project category
            const project = projectsData.find(p => p.id == projectId);
            if (project) {
                let targetHref = '';
                if (project.category === 'Game') targetHref = '#games';
                else if (project.category === 'App') targetHref = '#apps';
                else if (project.category === 'Prototype') targetHref = '#prototypes';

                if (targetHref) {
                    document.querySelectorAll('.nav-item').forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === targetHref) {
                            item.classList.add('active');
                        }
                    });
                }
            }

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
});