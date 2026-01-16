// Portfolio Clicker & Gamification Logic
document.addEventListener('DOMContentLoaded', () => {
    // 1. State Management
    let state = {
        xp: parseInt(localStorage.getItem('portfolio_xp')) || 0,
        level: parseInt(localStorage.getItem('portfolio_level')) || 1,
        clicks: parseInt(localStorage.getItem('portfolio_clicks')) || 0
    };

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
            }

            // Update State
            state.clicks++;
            addXP(XP_PER_CLICK);

            saveState();
            updateStatsUI();
        });
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
    }

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
