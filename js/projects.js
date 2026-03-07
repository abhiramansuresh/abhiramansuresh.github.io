
const projectsData = [
    {
        id: 2,
        title: "Atlas Keeper",
        summary: "AI-assisted learning adventure designed to make educational play feel magical and responsive.",
        cardSummary: "Interactive kids learning game shaped around AI-assisted play and delightful progression.",
        thumbnail: "assets/project-thumbs/atlaskeeper-thumb.jpg",
        logo: "assets/project-thumbs/atlaskeeper-icon.jpg",
        category: "Game",
        platform: "iOS / Android",
        featured: true,
        roles: ["Team Lead", "Lead Game Designer"],
        overview: "Atlas Keeper is an experiment in combining playful world-building, learning design, and AI-supported interactions into a mobile-first game for kids.",
        context: "The project started as a ground-up exploration into how intelligent systems could support learning without making the experience feel overly instructional or rigid.",
        contributions: [
            "Designed the core game loop, player progression, and experience flow.",
            "Defined the AI system behavior for character dialogue and interaction beats.",
            "Led a five-person cross-functional team across design, engineering, art, and QA.",
            "Worked with stakeholders to shape scope, direction, and delivery decisions."
        ],
        outcome: "The result was a more playful learning experience that felt character-led, interactive, and cohesive across design, AI behavior, and team execution.",
        gallery: [
            { src: "assets/project-gallery/atlaskeeper-1.png", caption: "A first look at the world and interaction tone." },
            { src: "assets/project-gallery/atlaskeeper-3.png", caption: "Core gameplay views built to keep learning light and exploratory." },
            "assets/project-gallery/atlaskeeper-4.png",
            "assets/project-gallery/atlaskeeper-5.png",
            "assets/project-gallery/atlaskeeper-6.png",
            "assets/project-gallery/atlaskeeper-7.png",
            "assets/project-gallery/atlaskeeper-8.png"
        ],
        videoUrl: "https://youtu.be/U_m0j8dUG7M?si=3Mls99gCGnhjj6Um",
        appStoreUrl: "https://apps.apple.com/in/app/atlaskeeper-kids-learning-game/id6444937235",
        googlePlayUrl: "https://play.google.com/store/apps/details?id=com.learningyogi.MagicBookMVP&pcampaignid=web_share"
    },
    {
        id: 1,
        title: "PDA Pro",
        summary: "Support-focused mobile product designed around clearer routines, calmer interactions, and AI-informed systems thinking.",
        cardSummary: "A mobile app experience shaped around accessible UX, AI systems thinking, and everyday usability.",
        thumbnail: "assets/project-thumbs/pdapro-thumb.jpg",
        logo: "assets/project-thumbs/pdapro.jpg",
        category: "App",
        platform: "iOS / Android",
        featured: true,
        roles: ["Senior UX / AI Designer", "AI System Designer", "React Native Developer"],
        overview: "PDA Pro is a mobile product focused on building a more supportive, structured, and usable experience for parents and caregivers.",
        context: "The challenge was to make a content-heavy product feel calmer, easier to navigate, and better aligned with the needs of people using it in real day-to-day scenarios.",
        contributions: [
            "Designed the user experience across key product flows and content structures.",
            "Helped shape AI-related system behavior and prompting logic where intelligence could improve usability.",
            "Worked directly in React Native to close the gap between design intent and shipped experience."
        ],
        outcome: "The product direction prioritized clarity, trust, and usability while creating room for more intelligent and supportive experiences over time.",
        gallery: [],
        videoUrl: "https://youtube.com/shorts/nJXYRFSMVoo?si=EAdpjtU21oJNYI6u",
        appStoreUrl: "https://apps.apple.com/in/app/pda-pro-for-demand-avoidance/id6743385207",
        googlePlayUrl: "https://play.google.com/store/apps/details?id=com.learningyogi.pdapro&pcampaignid=web_share"
    },
    {
        id: 6,
        title: "BrainMo",
        summary: "An AI-forward product concept exploring how interaction design can make cognitive support feel engaging and approachable.",
        cardSummary: "AI-flavored product work exploring smarter interaction patterns and supportive experience design.",
        thumbnail: "assets/project-thumbs/pdapro-thumb.jpg",
        logo: "assets/project-thumbs/brainmo-icon.jpg",
        category: "App",
        platform: "Mobile",
        featured: true,
        roles: ["Senior UX / AI Designer", "AI Prototyper"],
        overview: "BrainMo explores how AI-informed interaction design can support thinking, structure, and engagement in a product experience.",
        context: "This work focused on translating abstract AI potential into concrete product behavior that users could actually understand and benefit from.",
        contributions: [
            "Explored UX patterns for AI-assisted interactions and product guidance.",
            "Worked through system behavior, flow design, and product framing for a more approachable experience.",
            "Used prototyping to quickly test how intelligence could feel useful instead of intrusive."
        ],
        outcome: "The concept helped clarify how AI systems could be shaped into friendlier, more assistive product interactions without losing usability.",
        gallery: [],
        videoUrl: "https://youtube.com/shorts/nJXYRFSMVoo?si=EAdpjtU21oJNYI6u"
    },
    {
        id: 3,
        title: "Atlas Mission",
        summary: "A learning-focused mobile game that packaged educational content into a more directed mission-based format.",
        cardSummary: "Mission-driven educational game experience designed for mobile learning and progression.",
        thumbnail: "assets/project-thumbs/atlasmission-thumb.jpg",
        logo: "assets/project-thumbs/atlasmission-icon.jpg",
        category: "Game",
        platform: "iOS / Android",
        roles: ["Game Designer"],
        overview: "Atlas Mission translated educational goals into a more structured, mission-led mobile game format.",
        context: "The focus was to present learning content in a way that felt directed and rewarding rather than static or repetitive.",
        contributions: [
            "Helped shape the interaction flow and mission-based game structure.",
            "Worked on the overall player experience and pacing of the product."
        ],
        outcome: "The experience moved learning content into a clearer gameplay loop with stronger progression and better motivational framing.",
        gallery: [],
        videoUrl: "https://www.youtube.com/watch?v=0u-aXlx_tqc",
        appStoreUrl: "https://apps.apple.com/in/app/atlasmission-1-kids-learning/id1161093896",
        googlePlayUrl: "https://play.google.com/store/apps/details?id=com.LearningYogi.Atlasmission&pcampaignid=web_share"
    },
    {
        id: 4,
        title: "Duo Jump",
        summary: "A mobile platformer built around the challenge of controlling two characters at once.",
        cardSummary: "Fast, playful mobile platformer built on dual-character coordination.",
        thumbnail: "assets/project-thumbs/duojump-thumb.jpg",
        logo: "assets/project-thumbs/duojump-icon.png",
        category: "Game",
        platform: "Android",
        roles: ["Game Designer", "Developer"],
        overview: "Duo Jump is a mobile platformer centered on simultaneous control, timing, and playful challenge.",
        context: "The idea was to create something mechanically simple to understand, but satisfyingly tricky to master.",
        contributions: [
            "Designed the core interaction mechanic and gameplay feel.",
            "Helped shape the challenge curve and player readability."
        ],
        outcome: "The final experience leaned into quick replayability and a clear central mechanic that immediately defined the game.",
        gallery: [],
        videoUrl: "https://youtube.com/shorts/n1STBVmzgOk?si=vYvuOYrNxBLqUBGr",
        googlePlayUrl: "https://play.google.com/store/apps/details?id=com.pandascreation.duojump&pcampaignid=web_share"
    },
    {
        id: 5,
        title: "Baldy",
        summary: "A quirky indie game project built around character, traversal, and playful experimentation.",
        cardSummary: "Character-led indie game prototype with a playful tone and compact adventure feel.",
        thumbnail: "assets/project-thumbs/baldy-thumb.jpg",
        logo: "assets/project-thumbs/baldy-icon.jpg",
        category: "Game",
        platform: "PC",
        roles: ["Game Designer", "Developer"],
        overview: "Baldy is a smaller game project that leans into personality, movement, and tone.",
        context: "It was an opportunity to explore a more playful character-driven concept without overcomplicating the experience.",
        contributions: [
            "Worked on concept direction, mechanics, and overall play feel.",
            "Shaped the game's tone through interaction and presentation choices."
        ],
        outcome: "The project landed as a concise, memorable prototype with a clear sense of personality.",
        gallery: [],
        videoUrl: "https://youtu.be/nSUuGixCRCQ?si=U4lfaV6u3lM7KVpx",
        itchioUrl: "https://pandasaan.itch.io/baldy"
    },
    {
        id: 7,
        title: "Squares",
        summary: "A compact prototype built to explore interaction patterns through simple rules and strong visual response.",
        cardSummary: "Quick interaction prototype focused on systems, feedback, and playful constraint.",
        thumbnail: "assets/project-thumbs/squares-icon.jpg",
        logo: "assets/project-thumbs/squares-icon.jpg",
        category: "Prototype",
        platform: "PC Prototype",
        roles: ["Designer", "Prototype Developer"],
        overview: "Squares is a smaller prototype centered on simple interaction rules and responsive play.",
        context: "It was built as a fast exploration of how much engagement could come from minimal systems and clear feedback.",
        contributions: [
            "Designed the interaction structure and prototype behavior.",
            "Explored visual feedback and feel through quick iteration."
        ],
        outcome: "The project became a lightweight experiment in clarity, responsiveness, and playful system design.",
        gallery: [],
        itchioUrl: "https://pandasaan.itch.io/squares"
    },
    {
        id: 8,
        title: "Grainy",
        summary: "A prototype focused on texture, atmosphere, and a small but distinct interaction idea.",
        cardSummary: "Experimental prototype exploring mood, texture, and a focused interactive hook.",
        thumbnail: "assets/project-thumbs/grainy-icon.jpg",
        logo: "assets/project-thumbs/grainy-icon.jpg",
        category: "Prototype",
        platform: "PC Prototype",
        roles: ["Designer", "Prototype Developer"],
        overview: "Grainy is an experimental prototype built around a specific visual and interaction mood.",
        context: "The project was an excuse to explore tone-first prototyping while still grounding the experience in interaction.",
        contributions: [
            "Explored the experience direction through rapid prototyping.",
            "Focused on the visual feel and player response loop."
        ],
        outcome: "It served as a concise experiment in atmosphere-led interactive design.",
        gallery: [],
        itchioUrl: "https://pandasaan.itch.io/grainy"
    },
    {
        id: 9,
        title: "The Crossover",
        summary: "A VR-flavored prototype exploring movement, presence, and playful interaction in a more physical space.",
        cardSummary: "Prototype exploring immersive interaction and movement in a VR-oriented format.",
        thumbnail: "assets/project-thumbs/crossover-thumb.jpg",
        logo: "assets/project-thumbs/crossover-thumb.jpg",
        category: "Prototype",
        platform: "VR Prototype",
        roles: ["Designer", "Prototype Developer"],
        overview: "The Crossover experiments with more embodied interaction and player presence.",
        context: "It was built to test how movement and perspective could shape the feel of play in a VR-inspired format.",
        contributions: [
            "Designed the core interaction loop and prototype feel.",
            "Explored how physicality changed pacing and engagement."
        ],
        outcome: "The prototype clarified which interaction ideas felt most natural and exciting in a more immersive setup.",
        gallery: [],
        itchioUrl: "https://pandasaan.itch.io/the-crossover-virtual-reality-game",
        videoUrl: "https://youtu.be/r_zFsgJGq20?si=bo05elt1KqDDluae"
    },
    {
        id: 10,
        title: "Combat a Mort",
        summary: "A combat-focused prototype exploring pacing, responsiveness, and mechanical clarity.",
        cardSummary: "Combat prototype built around responsiveness, tension, and readable moment-to-moment play.",
        thumbnail: "assets/project-thumbs/combat-thumb.jpg",
        logo: "assets/project-thumbs/combat-thumb.jpg",
        category: "Prototype",
        platform: "PC Prototype",
        roles: ["Designer", "Prototype Developer"],
        overview: "Combat a Mort is a smaller prototype focused on combat feel and core loop clarity.",
        context: "The goal was to test how quickly a combat idea could become readable, satisfying, and worth iterating on.",
        contributions: [
            "Designed the combat loop and encounter feel.",
            "Iterated on pacing, feedback, and overall responsiveness."
        ],
        outcome: "The prototype worked as a focused sandbox for testing combat interaction and feel.",
        gallery: [],
        itchioUrl: "https://pandasaan.itch.io/combat-a-mort",
        videoUrl: "https://www.youtube.com/watch?v=4DFo81-5m4Y"
    }
];

function getProjectsByCategory(category) {
    return projectsData.filter(project => project.category === category);
}

function getFeaturedProjects() {
    return projectsData.filter(project => project.featured);
}

function createMetaChips(project) {
    return `
        <div class="project-meta-chips">
            <span class="project-meta-chip">${project.category}</span>
            <span class="project-meta-chip">${project.platform}</span>
        </div>
    `;
}

function createRoleChips(project, featured = false) {
    const visibleRoles = featured ? project.roles.slice(0, 1) : project.roles;
    return `
        <div class="project-role-chips">
            ${visibleRoles.map(role => `<span class="project-role-chip">${role}</span>`).join('')}
        </div>
    `;
}

function createProjectCard(project, featured = false) {
    return `
        <article class="project-card ${featured ? 'project-card-featured' : ''}" data-id="${project.id}" role="button" tabindex="0" aria-label="Open project ${project.title}">
            <div class="project-thumbnail">
                <img src="${project.thumbnail}" alt="${project.title}" onerror="this.src='assets/project-thumbs/atlasmission-thumb.jpg'">
            </div>
            <div class="project-info">
                <div class="project-card-head">
                    <div class="project-logo">
                        <img src="${project.logo}" alt="${project.title} logo" onerror="this.src='assets/project-thumbs/atlaskeeper-icon.jpg'">
                    </div>
                    <div class="project-card-head-copy">
                        <h3 class="project-title">${project.title}</h3>
                        ${createRoleChips(project, featured)}
                    </div>
                </div>
                <div class="project-text">
                    ${featured ? '' : `<p class="project-summary">${project.cardSummary}</p>`}
                </div>
            </div>
        </article>
    `;
}

function renderProjects(containerId, projects, featured = false) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = projects.map(project => createProjectCard(project, featured)).join('');
}

let currentMediaItems = [];
let currentMediaIndex = 0;
let currProjectId = null;

function playUiSound(name, options = {}) {
    if (window.PortfolioAudio) {
        window.PortfolioAudio.play(name, options);
    }
}

function createDetailSection(title, content, listItems) {
    if (!content && (!listItems || listItems.length === 0)) return '';

    return `
        <section class="detail-block">
            <h2 class="detail-block-title">${title}</h2>
            ${content ? `<p>${content}</p>` : ''}
            ${listItems && listItems.length ? `
                <ul>
                    ${listItems.map(item => `<li>${item}</li>`).join('')}
                </ul>
            ` : ''}
        </section>
    `;
}

function loadProjectDetails(projectId) {
    currProjectId = projectId;
    const project = projectsData.find(p => p.id == projectId);

    if (!project) {
        console.error(`Project with ID ${projectId} not found`);
        return '';
    }

    currentMediaItems = [];
    if (project.videoUrl) {
        currentMediaItems.push({ type: 'video', source: getYouTubeEmbedUrl(project.videoUrl), caption: null });
    }

    if (project.gallery && project.gallery.length > 0) {
        project.gallery.forEach(item => {
            if (typeof item === 'string') {
                currentMediaItems.push({ type: 'image', source: item, caption: null });
            } else {
                currentMediaItems.push({ type: 'image', source: item.src, caption: item.caption });
            }
        });
    }

    const hasManyImages = project.gallery && project.gallery.length > 2;
    const gridClass = hasManyImages ? 'use-grid' : '';
    return `
    <section id="project-detail" class="main-content-section">
        <div class="project-header">
            <div class="project-logo-large">
                <img src="${project.logo}" alt="${project.title} logo">
            </div>
            <div class="project-title-container">
                <h1>${project.title}</h1>
                ${createMetaChips(project)}
                <p class="project-hero-summary">${project.summary}</p>
            </div>
        </div>

        <div class="project-detail-content">
            <div class="project-text-column">
                <div class="role-tags-container">
                    <div class="role-label">My Role</div>
                    <div class="role-tags">
                        ${project.roles.map(role => `<span class="role-tag">${role}</span>`).join('')}
                    </div>
                </div>

                <div class="project-description">
                    ${createDetailSection('Overview', project.overview)}
                    ${createDetailSection('Context', project.context)}
                    ${createDetailSection('What I Did', '', project.contributions)}
                    ${createDetailSection('Outcome', project.outcome)}
                </div>

                ${(project.appStoreUrl || project.googlePlayUrl || project.itchioUrl) ? `
                <div class="project-links">
                    ${project.appStoreUrl ? `
                    <a href="${project.appStoreUrl}" target="_blank" class="store-badge-link" aria-label="Download on the App Store">
                        <img src="assets/links/app-store.svg" alt="Download on the App Store" class="store-badge">
                    </a>
                    ` : ''}
                    ${project.googlePlayUrl ? `
                    <a href="${project.googlePlayUrl}" target="_blank" class="store-badge-link" aria-label="Get it on Google Play">
                        <img src="assets/links/google-store.svg" alt="Get it on Google Play" class="store-badge">
                    </a>
                    ` : ''}
                    ${project.itchioUrl ? `
                    <a href="${project.itchioUrl}" target="_blank" class="store-button store-button-itchio" aria-label="Get it on Itch.io">
                        <i class="fab fa-itch-io" aria-hidden="true"></i>
                        <span class="store-button-text">
                            <span class="store-button-kicker">Play on</span>
                            <span class="store-button-name">Itch.io</span>
                        </span>
                    </a>
                    ` : ''}
                </div>
                ` : ''}
            </div>

            <div class="project-media-column ${gridClass}">
                ${project.videoUrl ? `
                <div class="media-item video-item" role="button" tabindex="0" aria-label="Open video in lightbox" onclick="openLightbox(0)" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openLightbox(0);}">
                    <iframe width="560" height="315" src="${getYouTubeEmbedUrl(project.videoUrl)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                ` : ''}

                ${project.gallery && project.gallery.length > 0 ? project.gallery.map((item, index) => {
                    const globalIndex = project.videoUrl ? index + 1 : index;
                    const imgSrc = typeof item === 'string' ? item : item.src;

                    return `
                    <div class="media-item" role="button" tabindex="0" aria-label="Open image in lightbox" onclick="openLightbox(${globalIndex})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openLightbox(${globalIndex});}">
                        <img src="${imgSrc}" alt="${project.title} screenshot">
                    </div>
                    `;
                }).join('') : '<div class="media-empty-state">More visuals and process notes can be added here as the project case study evolves.</div>'}
            </div>
        </div>
    </section>
    `;
}

function createLightbox() {
    if (document.querySelector('.lightbox-modal')) return;

    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-modal';
    lightbox.innerHTML = `
        <button type="button" class="lightbox-close" aria-label="Close lightbox" onclick="closeLightbox()">&times;</button>
        <button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous media" onclick="navigateLightbox(-1)"><i class="fas fa-arrow-left" aria-hidden="true"></i></button>
        <button type="button" class="lightbox-nav lightbox-next" aria-label="Next media" onclick="navigateLightbox(1)"><i class="fas fa-arrow-right" aria-hidden="true"></i></button>
        <div class="lightbox-content" id="lightbox-content-container"></div>
    `;

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (!document.querySelector('.lightbox-modal.active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    document.body.appendChild(lightbox);
}

function openLightbox(index) {
    if (window.trackGalleryView) window.trackGalleryView(currProjectId);
    const lightbox = document.querySelector('.lightbox-modal');
    if (!lightbox) return;

    playUiSound('open', { volume: 0.25, playbackRate: 1.05 });
    currentMediaIndex = index;
    updateLightboxContent();

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function updateLightboxContent() {
    const container = document.getElementById('lightbox-content-container');
    container.innerHTML = '';

    const item = currentMediaItems[currentMediaIndex];
    if (!item) return;

    if (item.type === 'image') {
        const img = document.createElement('img');
        img.src = item.source;
        container.appendChild(img);

        if (item.caption) {
            const captionDiv = document.createElement('div');
            captionDiv.className = 'lightbox-caption';
            captionDiv.innerHTML = item.caption;
            container.appendChild(captionDiv);
        }
    } else if (item.type === 'video') {
        const iframe = document.createElement('iframe');
        iframe.src = item.source;
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        container.appendChild(iframe);
    }

    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    if (currentMediaItems.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    }
}

function navigateLightbox(direction) {
    playUiSound('nav', { volume: 0.2, playbackRate: direction > 0 ? 1.08 : 0.98 });
    currentMediaIndex += direction;

    if (currentMediaIndex < 0) {
        currentMediaIndex = currentMediaItems.length - 1;
    } else if (currentMediaIndex >= currentMediaItems.length) {
        currentMediaIndex = 0;
    }

    updateLightboxContent();
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox-modal');
    if (lightbox) {
        playUiSound('close', { volume: 0.22, playbackRate: 0.9 });
        document.getElementById('lightbox-content-container').innerHTML = '';
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function getYouTubeEmbedUrl(url) {
    if (!url) return '';
    if (url.includes('youtube.com/embed/')) return url;

    const pattern = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(pattern);

    if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}?rel=0`;
    }

    console.warn('Could not parse YouTube URL:', url);
    return url;
}
function attachProjectCardEvents() {
    document.querySelectorAll('.project-card').forEach(card => {
        const openProject = function (e) {
            e.preventDefault();
            const projectId = card.getAttribute('data-id');
            playUiSound('open', { volume: 0.26, playbackRate: 1.08 });
            history.pushState({ view: 'project', projectId: projectId }, '', `#project-${projectId}`);
            renderProjectView(projectId);
        };

        card.addEventListener('click', openProject);
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                openProject(e);
            }
        });
    });
}

const VIEW_TRANSITION_MS = 220;

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fadeOutElement(element) {
    if (!element || element.style.display === 'none') return;

    element.classList.remove('view-enter-active');
    element.classList.add('view-exit-active');
    await wait(VIEW_TRANSITION_MS);
    element.classList.remove('view-exit-active');
}

async function fadeOutSections() {
    const visibleSections = Array.from(document.querySelectorAll('.section')).filter(section => section.style.display !== 'none');
    if (visibleSections.length === 0) return;

    visibleSections.forEach(section => {
        section.classList.remove('view-enter-active');
        section.classList.add('view-exit-active');
    });

    await wait(VIEW_TRANSITION_MS);

    visibleSections.forEach(section => {
        section.style.display = 'none';
        section.classList.remove('view-exit-active');
    });
}

function showElementWithFade(element, displayMode = 'block') {
    if (!element) return;

    element.style.display = displayMode;
    element.classList.remove('view-exit-active');
    element.classList.add('view-enter');
    void element.offsetWidth;
    element.classList.add('view-enter-active');
}

function showSectionsWithFade() {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'block';
        section.classList.remove('view-exit-active');
        section.classList.add('view-enter');
        void section.offsetWidth;
        section.classList.add('view-enter-active');
    });
}
document.addEventListener('DOMContentLoaded', function () {
    createLightbox();
    renderProjects('featured-container', getFeaturedProjects(), true);
    renderProjects('games-container', getProjectsByCategory('Game'));
    renderProjects('apps-container', getProjectsByCategory('App'));
    renderProjects('prototypes-container', getProjectsByCategory('Prototype'));
    attachProjectCardEvents();

    window.addEventListener('popstate', async function (event) {
        if (event.state) {
            if (event.state.view === 'project') {
                await renderProjectView(event.state.projectId);
            } else if (event.state.view === 'about') {
                await renderAboutView();
            }
        } else {
            await renderHomeView();
        }
    });

    const initialHash = window.location.hash;
    if (initialHash && initialHash.startsWith('#project-')) {
        renderProjectView(initialHash.replace('#project-', ''));
    } else if (initialHash === '#about') {
        renderAboutView();
    }

    setupSidebarNavigationForProject();
});

async function renderProjectView(projectId) {
    const projectHtml = loadProjectDetails(projectId);
    if (!projectHtml) return;

    const mainContentArea = document.getElementById('main-content-area');
    await fadeOutElement(mainContentArea);
    await fadeOutSections();

    mainContentArea.innerHTML = projectHtml;
    mainContentArea.className = 'project-view';
    showElementWithFade(mainContentArea);
    mainContentArea.style.display = 'block';

    setupSidebarNavigationForProject();

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

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function renderHomeView() {
    const mainContentArea = document.getElementById('main-content-area');
    await fadeOutElement(mainContentArea);
    mainContentArea.style.display = 'none';
    mainContentArea.className = '';
    showSectionsWithFade();

    const aboutLink = document.getElementById('about-link');
    if (aboutLink) aboutLink.classList.remove('active');
}

async function renderAboutView() {

    const aboutHtml = `
    <section id="about-content" class="main-content-section">
        <div class="project-header">
            <div class="project-title-container">
                <div class="project-meta-chips">
                    <span class="project-meta-chip">About</span>
                    <span class="project-meta-chip">Aaabhi</span>
                </div>
                <h1>Playful by instinct. System-minded by trade.</h1>
                <p class="project-hero-summary">I'm Aaabhi, a Senior Designer working across UX, AI systems, and interactive product design over 6+ years.</p>
            </div>
        </div>

        <div class="about-content-single">
            <div class="about-section bio-section">
                <p>I design experiences across games, apps, and web products, with a particular interest in making intelligent systems feel usable, intentional, and human.</p>
                <p>My work usually sits somewhere between interaction design, AI system thinking, product design, and team leadership. I like turning fuzzy ideas into experiences that feel smart, satisfying, and surprisingly natural to use.</p>
                <p>Whether I'm shaping a game loop, prototyping an AI behavior, or aligning a cross-functional team, I care most about how the final experience feels in a real person's hands.</p>
            </div>

            <div class="about-section">
                <h2 class="about-header-text">What I Bring</h2>
                <div class="about-skills-row">
                    <span class="about-skill-tag">UX Design</span>
                    <span class="about-skill-tag">AI Prototyping</span>
                    <span class="about-skill-tag">AI System Design</span>
                    <span class="about-skill-tag">AI Interaction Design</span>
                    <span class="about-skill-tag">Conversational Design</span>
                    <span class="about-skill-tag">Cross-Functional Leadership</span>
                </div>
            </div>

            <div class="about-section">
                <h2 class="about-header-text">Tools & Platforms</h2>
                <div class="about-skills-row">
                    <span class="about-skill-tag">Unity</span>
                    <span class="about-skill-tag">Godot</span>
                    <span class="about-skill-tag">React Native</span>
                    <span class="about-skill-tag">Games</span>
                    <span class="about-skill-tag">Apps</span>
                    <span class="about-skill-tag">Web</span>
                </div>
            </div>

            <div class="about-actions-row">
                <a href="mailto:abhiraman@live.com" class="email-button-large">Say Hello</a>
                <a href="https://drive.google.com/file/d/1tgLe0LT1sqQTF9GJH9PEyPQDthLGbeiV/view?usp=sharing" target="_blank">
                    <img src="assets/links/ResumeBt.gif" alt="Resume" class="about-link-icon resume-gif">
                </a>
                <a href="https://www.linkedin.com/in/abhiraman/" target="_blank">
                    <img src="assets/links/LinkedInBt.gif" alt="LinkedIn" class="about-link-icon">
                </a>
            </div>
        </div>
    </section>
    `;

    const mainContentArea = document.getElementById('main-content-area');
    await fadeOutElement(mainContentArea);
    await fadeOutSections();

    mainContentArea.innerHTML = aboutHtml;
    mainContentArea.className = 'about-view';
    showElementWithFade(mainContentArea);

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('id') === 'about-link') {
            item.classList.add('active');
        }
    });

    setupSidebarNavigationForProject();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupSidebarNavigationForProject() {
    document.querySelectorAll('.nav-item').forEach(navItem => {
        if (navItem.getAttribute('href').startsWith('#') && navItem.getAttribute('id') !== 'about-link') {
            navItem.onclick = async function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                playUiSound('nav', { volume: 0.2, playbackRate: 1.04 });
                history.pushState(null, '', window.location.pathname);
                await renderHomeView();

                if (targetId === '#index') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    const section = document.querySelector(targetId);
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                    }
                }

                document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
                this.classList.add('active');
                return false;
            };
        } else if (navItem.getAttribute('id') === 'about-link') {
            navItem.onclick = async function (e) {
                e.preventDefault();
                playUiSound('open', { volume: 0.24, playbackRate: 1.08 });
                history.pushState({ view: 'about' }, '', '#about');
                await renderAboutView();
                return false;
            };
        }
    });
}






