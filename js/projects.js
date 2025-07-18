// Project data - Add new projects here
const projectsData = [
    {
        id: 1,
        title: "PDA Pro",
        excerpt: "A comprehensive platform for online education with interactive lessons and assessments.",
        thumbnail: "assets/project-thumbs/pdapro-thumb.jpg",
        logo: "assets/project-thumbs/pdapro.jpg",
        category: "app" 
    },
    {
        id: 2,
        title: "Atlas Keeper",
        excerpt: "Real-time analytics dashboard for tracking sales, inventory, and customer behavior.",
        thumbnail: "assets/project-thumbs/atlaskeeper-thumb.jpg",
        logo: "assets/project-thumbs/atlaskeeper-icon.jpg",
        category: "game"
    },
    {
        id: 3,
        title: "Atlas Mission",
        excerpt: "Secure and intuitive banking application with biometric authentication and transaction tracking.",
        thumbnail: "assets/project-thumbs/atlasmission-thumb.jpg",
        logo: "assets/project-thumbs/atlasmission-icon.jpg",
        category: "game"
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
        category: "prototype"
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

// Initialize projects when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load games
    loadGames();
    
    // Load apps
    loadApps();
    
    // Load prototypes
    loadPrototypes();
    
    // Add click event listeners to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-id');
            // You can implement project detail view here
            console.log(`Project clicked: ${projectId}`);
        });
    });
});