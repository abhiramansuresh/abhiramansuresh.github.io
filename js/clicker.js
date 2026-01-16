// Portfolio Clicker & Gamification Logic
document.addEventListener('DOMContentLoaded', () => {
    // 1. State Management
    let state = {
        xp: parseInt(localStorage.getItem('portfolio_xp')) || 0,
        level: parseInt(localStorage.getItem('portfolio_level')) || 1,
        clicks: parseInt(localStorage.getItem('portfolio_clicks')) || 0,
        achievements: JSON.parse(localStorage.getItem('portfolio_achievements')) || [],
        faceClicks: parseInt(localStorage.getItem('portfolio_face_clicks')) || 0,
        meltdowns: parseInt(localStorage.getItem('portfolio_meltdowns')) || 0,
        socialClicks: parseInt(localStorage.getItem('portfolio_social_clicks')) || 0,
        viewedGalleries: JSON.parse(localStorage.getItem('portfolio_galleries')) || []
    };

    // Session-only tracking
    let sessionNav = new Set();

    // Meltdown State
    let clickTimes = [];
    let isOverheated = false;
    let heat = 0;
    const MAX_HEAT = 25;

    const XP_PER_CLICK = 5;
    // Triangular number formula: Level 1 needs 100, Level 2 needs 200 (Total 300), etc.
    const getXPForLevel = (lvl) => (lvl * (lvl + 1) / 2) * 100;

    // Legacy Migration: If user has low XP relative to their level, convert to cumulative
    const prevThreshold = state.level > 1 ? getXPForLevel(state.level - 1) : 0;
    if (state.xp < prevThreshold) {
        state.xp += prevThreshold;
        localStorage.setItem('portfolio_xp', state.xp);
    }

    // 2. UI Elements
    const profileSquares = document.querySelector('.profile-squares');
    const progressBar = document.querySelector('.progress');
    const profileContainer = document.querySelector('.profile');

    // Create HUD Stats Container (Top Right)
    const statsHUD = document.createElement('div');
    statsHUD.className = 'stats-hud inactive'; // Start subtle
    statsHUD.innerHTML = `
        <div class="hud-item">
            <span class="hud-label">CLICKS</span>
            <span class="hud-value" id="hud-clicks">${state.clicks}</span>
        </div>
        <div class="hud-item">
            <span class="hud-label">TOTAL EXP</span>
            <span class="hud-value" id="hud-xp">${state.xp}</span>
        </div>
    `;
    document.body.appendChild(statsHUD);

    // Collect all value display elements
    const clickDisplays = [document.getElementById('hud-clicks')];
    const xpDisplays = [document.getElementById('hud-xp')];

    // Create Level Label
    const lvlLabelBottom = document.createElement('div');
    lvlLabelBottom.className = 'lvl-label-bottom';

    updateLvlLabel();

    // Append label to the progress-bar container for relative positioning
    const progressBarContainer = document.querySelector('.progress-bar');
    if (progressBarContainer) {
        progressBarContainer.appendChild(lvlLabelBottom);
    } else {
        profileContainer.appendChild(lvlLabelBottom);
    }

    // 3. Initialize UI
    updateProgressBar();

    // 4. Click Handler
    if (profileSquares) {
        profileSquares.addEventListener('click', (e) => {
            // Activate scoreboards if they are inactive
            if (statsHUD.classList.contains('inactive')) {
                statsHUD.classList.remove('inactive');
            }

            // Impact Animation
            profileSquares.classList.add('clicking');
            setTimeout(() => profileSquares.classList.remove('clicking'), 100);

            // Floating XP Text
            createFloatingXP(e.clientX, e.clientY);

            // Punch Effect if in Dev Mode
            if (document.body.classList.contains('dev-mode')) {
                createPunchEmoji(e.clientX, e.clientY);
                state.faceClicks++;
                checkAchievements('FACE_CLICK');
            }

            // Meltdown Logic (Dev Mode only)
            if (document.body.classList.contains('dev-mode') && !isOverheated) {
                const now = Date.now();
                clickTimes.push(now);
                // Keep only last 1s of clicks
                clickTimes = clickTimes.filter(t => now - t < 1000);

                if (clickTimes.length >= 8) {
                    heat++;
                    profileSquares.classList.add('meltdown');
                    if (heat >= MAX_HEAT) {
                        triggerOverheat();
                    }
                } else {
                    heat = Math.max(0, heat - 1);
                    profileSquares.classList.remove('meltdown');
                }
            } else {
                profileSquares.classList.remove('meltdown');
            }

            // Update State
            state.clicks++;
            checkAchievements('CLICK');
            addXP(XP_PER_CLICK);

            // Rare Golden Drop (2% chance)
            if (Math.random() < 0.02) {
                spawnGoldenCoin(e.clientX, e.clientY);
            }

            saveState();
            updateStatsUI();
        });
    }

    function spawnGoldenCoin(x, y) {
        const coin = document.createElement('div');
        coin.className = 'golden-coin';
        coin.textContent = '🪙';
        coin.style.left = `${x}px`;
        coin.style.top = `${y}px`;

        coin.onclick = (e) => {
            e.stopPropagation();
            addXP(50);

            // Jackpot Flash
            const flash = document.createElement('div');
            flash.className = 'jackpot-flash';
            document.body.appendChild(flash);
            setTimeout(() => flash.remove(), 500);

            // Floating "BIG WIN" text
            const winText = document.createElement('div');
            winText.className = 'floating-xp';
            winText.textContent = '+50 XP! BIG WIN';
            winText.style.color = '#ffd700';
            winText.style.left = `${e.clientX}px`;
            winText.style.top = `${e.clientY}px`;
            document.body.appendChild(winText);
            setTimeout(() => winText.remove(), 1000);

            coin.remove();
        };

        document.body.appendChild(coin);
        setTimeout(() => {
            if (coin.parentElement) coin.remove();
        }, 3000);
    }

    function triggerOverheat() {
        if (isOverheated) return;
        isOverheated = true;
        heat = 0;
        profileSquares.classList.remove('meltdown');
        profileSquares.classList.add('overheated');

        // Big Bonus
        addXP(100);
        state.meltdowns++;
        checkAchievements('MELTDOWN');

        // Visual Feedback
        const smoke = document.createElement('div');
        smoke.className = 'overheat-smoke';
        smoke.textContent = '💨';
        smoke.style.left = '50%';
        smoke.style.top = '50%';
        profileSquares.appendChild(smoke);

        setTimeout(() => {
            smoke.remove();
            profileSquares.classList.remove('overheated');
            isOverheated = false;
        }, 3000); // 3s cooldown
    }

    function createPunchEmoji(x, y) {
        const punch = document.createElement('div');
        punch.className = 'floating-punch';
        punch.textContent = '🥊';
        punch.style.left = `${x}px`;
        punch.style.top = `${y}px`;

        // Randomize rotation for "emotion" - added +90 to make it vertical/point up
        const randomRot = (Math.floor(Math.random() * 80) - 40) + 90;
        punch.style.setProperty('--punch-angle', `${randomRot}deg`);

        // Randomize horizontal flip to simulate two hands
        const randomFlip = Math.random() > 0.5 ? 1 : -1;
        punch.style.setProperty('--punch-scale-x', randomFlip);

        document.body.appendChild(punch);

        setTimeout(() => punch.remove(), 800);
    }

    function addXP(amount) {
        state.xp += amount;

        // Level Up Check
        // Total cumulative XP needed to complete current level
        let xpThreshold = getXPForLevel(state.level);
        if (state.xp >= xpThreshold) {
            state.level++;
            triggerLevelUpEffect();
        }

        updateProgressBar();
        updateLvlLabel();
        updateStatsUI();
    }

    function updateStatsUI() {
        clickDisplays.forEach(el => { if (el) el.textContent = state.clicks; });
        xpDisplays.forEach(el => { if (el) el.textContent = state.xp; });
    }

    function updateProgressBar() {
        if (progressBar) {
            const nextLvlThreshold = getXPForLevel(state.level);
            const prevLvlThreshold = state.level > 1 ? getXPForLevel(state.level - 1) : 0;

            const xpInCurrentLevel = state.xp - prevLvlThreshold;
            const xpRequiredForLevel = nextLvlThreshold - prevLvlThreshold;

            const percentage = Math.min(100, Math.max(0, (xpInCurrentLevel / xpRequiredForLevel) * 100));
            progressBar.style.width = `${percentage}%`;
        }
    }

    function updateLvlLabel() {
        lvlLabelBottom.textContent = `Level ${state.level}`;
    }

    function saveState() {
        localStorage.setItem('portfolio_xp', state.xp);
        localStorage.setItem('portfolio_level', state.level);
        localStorage.setItem('portfolio_clicks', state.clicks);
        localStorage.setItem('portfolio_achievements', JSON.stringify(state.achievements));
        localStorage.setItem('portfolio_face_clicks', state.faceClicks);
        localStorage.setItem('portfolio_meltdowns', state.meltdowns);
        localStorage.setItem('portfolio_social_clicks', state.socialClicks);
        localStorage.setItem('portfolio_galleries', JSON.stringify(state.viewedGalleries));
    }

    function createFloatingXP(x, y) {
        const xpText = document.createElement('div');
        xpText.className = 'floating-xp';
        xpText.textContent = `+${XP_PER_CLICK} XP`;
        xpText.style.left = `${x}px`;
        xpText.style.top = `${y}px`;
        document.body.appendChild(xpText);

        // Remove after animation
        setTimeout(() => xpText.remove(), 1000);
    }


    function triggerLevelUpEffect() {
        // Simple level up flash or sound could go here
        lvlLabelBottom.classList.add('level-up');
        setTimeout(() => lvlLabelBottom.classList.remove('level-up'), 500);

        console.log(`Level Up! You are now Level ${state.level}`);

        checkAchievements('LEVEL_UP', state.level);
    }

    // 7. Achievement System
    const ACHIEVEMENTS = {
        FIRST_BLOOD: { id: 'FIRST_BLOOD', title: 'First Blood', desc: 'First click on the logo!', icon: '🩸' },
        MELTDOWN: { id: 'MELTDOWN', title: 'Nuclear', desc: 'Triggered a logo meltdown!', icon: '☢️' },
        SPEED_READER: { id: 'SPEED_READER', title: 'Speed Reader', desc: 'Scrolled to the bottom fast!', icon: '⚡' },
        STALKER: { id: 'STALKER', title: 'The Stalker', desc: 'Spent 2 mins on About page.', icon: '🕵️' },
        THE_SOCIALITE: { id: 'THE_SOCIALITE', title: 'The Socialite', desc: 'Connected on 2 socials!', icon: '📱' },
        DEEP_DIVER: { id: 'DEEP_DIVER', title: 'Deep Diver', desc: 'Read a project in full.', icon: '🤿' },
        MASTER_SPARRER: { id: 'MASTER_SPARRER', title: 'Master Sparrer', desc: '100 punches landed!', icon: '🏆' },
        THE_NAVIGATOR: { id: 'THE_NAVIGATOR', title: 'The Navigator', desc: 'Explored all sections.', icon: '🧭' },
        PERSISTENT: { id: 'PERSISTENT', title: 'Persistent', desc: '3 Meltdowns triggered.', icon: '💪' },
        COLLECTOR: { id: 'COLLECTOR', title: 'Collector', desc: 'Viewed 2 project galleries.', icon: '📷' }
    };

    function unlockAchievement(id) {
        if (state.achievements.includes(id)) return;
        state.achievements.push(id);
        saveState();
        showAchievementToast(id);
    }

    function showAchievementToast(id) {
        const ach = ACHIEVEMENTS[id];
        const toast = document.createElement('div');
        toast.className = 'achievement-toast';
        toast.innerHTML = `
            <div class="ach-icon">${ach.icon}</div>
            <div class="ach-text">
                <div class="ach-title">ACHIEVEMENT UNLOCKED</div>
                <div class="ach-name">${ach.title}</div>
            </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 500);
            }, 3000);
        }, 100);
    }

    function checkAchievements(type, value) {
        if (type === 'CLICK' && state.clicks === 1) unlockAchievement('FIRST_BLOOD');
        if (type === 'MELTDOWN') {
            unlockAchievement('MELTDOWN');
            if (state.meltdowns >= 3) unlockAchievement('PERSISTENT');
        }
        if (type === 'FACE_CLICK' && state.faceClicks >= 100) unlockAchievement('MASTER_SPARRER');
        if (type === 'SOCIAL') {
            state.socialClicks++;
            if (state.socialClicks >= 2) unlockAchievement('THE_SOCIALITE');
            saveState();
        }
        if (type === 'NAV') {
            sessionNav.add(value);
            if (sessionNav.size >= 4) unlockAchievement('THE_NAVIGATOR');
        }
        if (type === 'GALLERY') {
            if (!state.viewedGalleries.includes(value)) {
                state.viewedGalleries.push(value);
                if (state.viewedGalleries.length >= 2) unlockAchievement('COLLECTOR');
                saveState();
            }
        }
    }

    // Achievement: Speed Reader
    let scrollStart = Date.now();
    let hasScrolled = false;
    window.addEventListener('scroll', () => {
        if (!hasScrolled) {
            scrollStart = Date.now();
            hasScrolled = true;
        }
        const scrollBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 100;
        if (scrollBottom && (Date.now() - scrollStart < 3000)) {
            unlockAchievement('SPEED_READER');
        }
    });

    // Achievement: Stalker
    let aboutTimer = null;
    window.addEventListener('hashchange', () => {
        if (window.location.hash === '#about') {
            aboutTimer = setTimeout(() => {
                unlockAchievement('STALKER');
            }, 120000); // 2 mins
        } else {
            if (aboutTimer) clearTimeout(aboutTimer);
        }
    });
    // Check initial hash
    if (window.location.hash === '#about') {
        aboutTimer = setTimeout(() => unlockAchievement('STALKER'), 120000);
        checkAchievements('NAV', 'about');
    }

    // Intercept Social & Nav Clicks
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        // Nav Tracking
        if (link.classList.contains('nav-item')) {
            const section = link.getAttribute('href').replace('#', '');
            if (['games', 'apps', 'prototypes', 'about'].includes(section)) {
                checkAchievements('NAV', section);
            }
        }

        // Social Tracking
        if (link.closest('.contact-section') || link.classList.contains('store-button')) {
            checkAchievements('SOCIAL');
        }
    });

    // Deep Diver Tracking
    window.addEventListener('scroll', () => {
        const projectDetail = document.getElementById('project-detail');
        if (projectDetail) {
            const scrollBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 50;
            if (scrollBottom) {
                unlockAchievement('DEEP_DIVER');
            }
        }
    });

    // Exposed trigger for Collector (to be called from lightbox or projects.js)
    window.trackGalleryView = (projectId) => {
        if (!state.viewedGalleries.includes(projectId)) {
            state.viewedGalleries.push(projectId);
            if (state.viewedGalleries.length >= 2) unlockAchievement('COLLECTOR');
            saveState();
        }
    };

    // 5. Secret Code (Up, Up, Down, Down)
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        const isDevMode = document.body.classList.toggle('dev-mode');
        const profileImg = document.querySelector('.profile-image');

        if (profileImg) {
            profileImg.src = isDevMode ? 'assets/abhi.jpeg' : 'assets/profile.jpg';
        }

        if (isDevMode) {
            alert("Face Revealed! Now you get to punch me 🥊🥊");
        }
    }
});
