// Portfolio Clicker & Gamification Logic
document.addEventListener('DOMContentLoaded', () => {
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

    let sessionNav = new Set();
    let clickTimes = [];
    let isOverheated = false;
    let heat = 0;

    const MAX_HEAT = 25;
    const XP_PER_CLICK = 5;
    const PROFILE_CLICK_BONUS = 5;
    const ACHIEVEMENT_XP_BONUS = 250;
    const meaningfulTargets = 'a, button, .project-card, .media-item, .profile-squares, .contact-icon, .store-button, .audio-toggle, .menu-button';
    const getXPForLevel = (lvl) => (lvl * (lvl + 1) / 2) * 100;

    const prevThreshold = state.level > 1 ? getXPForLevel(state.level - 1) : 0;
    if (state.xp < prevThreshold) {
        state.xp += prevThreshold;
        localStorage.setItem('portfolio_xp', state.xp);
    }

    const profileSquares = document.querySelector('.profile-squares');
    const progressBar = document.querySelector('.progress');
    const profileContainer = document.querySelector('.profile');
    const statsHUD = document.createElement('div');
    statsHUD.className = 'stats-hud ambient';
    statsHUD.innerHTML = `
        <div class="hud-item">
            <span class="hud-label">Clicks</span>
            <span class="hud-value" id="hud-clicks">${state.clicks}</span>
        </div>
        <div class="hud-item">
            <span class="hud-label">XP</span>
            <span class="hud-value" id="hud-xp">${state.xp}</span>
        </div>
    `;

    const hudMount = document.createElement('div');
    hudMount.className = 'sidebar-hud-mount';

    const audioToggle = document.getElementById('audio-toggle');

    const clickDisplays = [statsHUD.querySelector('#hud-clicks')];
    const xpDisplays = [statsHUD.querySelector('#hud-xp')];

    const lvlLabelBottom = document.createElement('div');
    lvlLabelBottom.className = 'lvl-label-bottom';
    updateLvlLabel();

    const progressBarContainer = document.querySelector('.progress-bar');
    if (progressBarContainer) {
        progressBarContainer.appendChild(lvlLabelBottom);
        progressBarContainer.insertAdjacentElement('afterend', hudMount);
    } else if (profileContainer) {
        profileContainer.appendChild(lvlLabelBottom);
        profileContainer.appendChild(hudMount);
    }

    hudMount.appendChild(statsHUD);

    updateProgressBar();
    updateStatsUI();

    if (profileSquares) {
        profileSquares.addEventListener('pointerdown', () => {
            if (window.PortfolioAudio) {
                window.PortfolioAudio.play('click', {
                    volume: 0.48,
                    playbackRate: 0.92 + Math.random() * 0.14
                });
            }
        });

        profileSquares.addEventListener('click', (e) => {
            profileSquares.classList.add('clicking');
            setTimeout(() => profileSquares.classList.remove('clicking'), 100);

            const profileRect = profileSquares.getBoundingClientRect();
            createFloatingXP(
                profileRect.left + (profileRect.width / 2),
                profileRect.top - 8,
                XP_PER_CLICK + PROFILE_CLICK_BONUS,
                'floating-xp floating-xp-profile'
            );

            if (document.body.classList.contains('dev-mode')) {
                createPunchEmoji(e.clientX, e.clientY);
                state.faceClicks++;
                checkAchievements('FACE_CLICK');
            }

            if (document.body.classList.contains('dev-mode') && !isOverheated) {
                const now = Date.now();
                clickTimes.push(now);
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

            registerMeaningfulClick(PROFILE_CLICK_BONUS, false);

            if (Math.random() < 0.06) {
                triggerJackpot(e.clientX, e.clientY);
            }
        });
    }

    function isMeaningfulClickTarget(target) {
        return Boolean(target.closest(meaningfulTargets));
    }

    function registerMeaningfulClick(extraXP = 0, showBurst = false, point = null) {
        state.clicks++;
        checkAchievements('CLICK');
        addXP(XP_PER_CLICK + extraXP);

        if (showBurst && point) {
            createFloatingXP(point.x, point.y, XP_PER_CLICK + extraXP);
        }

        if (statsHUD.classList.contains('ambient')) {
            statsHUD.classList.remove('ambient');
            setTimeout(() => statsHUD.classList.add('ambient'), 2200);
        }

        saveState();
        updateStatsUI();
    }
    document.addEventListener('click', (e) => {
        const interactiveTarget = e.target.closest(meaningfulTargets);
        if (!interactiveTarget) return;

        if (interactiveTarget.closest('.profile-squares')) {
            return;
        }

        registerMeaningfulClick(0, false, { x: e.clientX, y: e.clientY });


        const link = e.target.closest('a');
        if (!link) return;

        if (link.classList.contains('nav-item')) {
            const href = link.getAttribute('href') || '';
            const section = href.replace('#', '');
            if (['games', 'apps', 'prototypes', 'about'].includes(section)) {
                checkAchievements('NAV', section);
            }
        }

        if (link.closest('.contact-section') || link.classList.contains('store-button') || link.closest('.about-actions-row')) {
            checkAchievements('SOCIAL');
        }
    });

    function triggerJackpot(x, y) {
        addXP(50);

        const flash = document.createElement('div');
        flash.className = 'jackpot-flash';
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 550);

        const winText = document.createElement('div');
        winText.className = 'floating-xp floating-xp-jackpot';
        winText.textContent = '+50 XP! BIG WIN';
        winText.style.left = `${x}px`;
        winText.style.top = `${y}px`;
        document.body.appendChild(winText);
        setTimeout(() => winText.remove(), 2100);

        saveState();
        updateStatsUI();
    }

    function triggerOverheat() {
        if (isOverheated || !profileSquares) return;
        isOverheated = true;
        heat = 0;
        profileSquares.classList.remove('meltdown');
        profileSquares.classList.add('overheated');

        addXP(100);
        state.meltdowns++;
        checkAchievements('MELTDOWN');

        const smoke = document.createElement('div');
        smoke.className = 'overheat-smoke';
        smoke.textContent = '\u2739';
        smoke.style.left = '50%';
        smoke.style.top = '50%';
        profileSquares.appendChild(smoke);

        setTimeout(() => {
            smoke.remove();
            profileSquares.classList.remove('overheated');
            isOverheated = false;
        }, 3000);
    }

    function createPunchEmoji(x, y) {
        const punch = document.createElement('div');
        punch.className = 'floating-punch';
        punch.textContent = '\u2737';
        punch.style.left = `${x}px`;
        punch.style.top = `${y}px`;

        const randomRot = (Math.floor(Math.random() * 80) - 40) + 90;
        punch.style.setProperty('--punch-angle', `${randomRot}deg`);
        const randomFlip = Math.random() > 0.5 ? 1 : -1;
        punch.style.setProperty('--punch-scale-x', randomFlip);

        document.body.appendChild(punch);
        setTimeout(() => punch.remove(), 800);
    }

    function addXP(amount) {
        state.xp += amount;

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

    function createFloatingXP(x, y, amount, className = 'floating-xp') {
        const xpText = document.createElement('div');
        xpText.className = className;
        xpText.textContent = `+${amount} XP`;
        xpText.style.left = `${x}px`;
        xpText.style.top = `${y}px`;
        document.body.appendChild(xpText);
        setTimeout(() => xpText.remove(), className.includes('floating-xp-profile') ? 2100 : 1700);
    }

    function triggerLevelUpEffect() {
        lvlLabelBottom.classList.add('level-up');
        setTimeout(() => lvlLabelBottom.classList.remove('level-up'), 500);
        checkAchievements('LEVEL_UP', state.level);
    }

    const ACHIEVEMENTS = {
        FIRST_BLOOD: { id: 'FIRST_BLOOD', title: 'First Blood', icon: '\u2728' },
        MELTDOWN: { id: 'MELTDOWN', title: 'Nuclear', icon: '\u2605' },
        SPEED_READER: { id: 'SPEED_READER', title: 'Speed Reader', icon: '\u26A1' },
        STALKER: { id: 'STALKER', title: 'The Stalker', icon: '\u25C8' },
        THE_SOCIALITE: { id: 'THE_SOCIALITE', title: 'The Socialite', icon: '\u25C7' },
        DEEP_DIVER: { id: 'DEEP_DIVER', title: 'Deep Diver', icon: '\u25B3' },
        MASTER_SPARRER: { id: 'MASTER_SPARRER', title: 'Master Sparrer', icon: '\u25A0' },
        THE_NAVIGATOR: { id: 'THE_NAVIGATOR', title: 'The Navigator', icon: '\u25CE' },
        PERSISTENT: { id: 'PERSISTENT', title: 'Persistent', icon: '\u25CF' },
        COLLECTOR: { id: 'COLLECTOR', title: 'Collector', icon: '\u25A1' }
    };

    function unlockAchievement(id) {
        if (state.achievements.includes(id)) return;
        state.achievements.push(id);
        addXP(ACHIEVEMENT_XP_BONUS);
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
            }, 2600);
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
    }

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

    let aboutTimer = null;
    window.addEventListener('hashchange', () => {
        if (window.location.hash === '#about') {
            aboutTimer = setTimeout(() => {
                unlockAchievement('STALKER');
            }, 120000);
        } else if (aboutTimer) {
            clearTimeout(aboutTimer);
        }
    });

    if (window.location.hash === '#about') {
        aboutTimer = setTimeout(() => unlockAchievement('STALKER'), 120000);
        checkAchievements('NAV', 'about');
    }

    window.addEventListener('scroll', () => {
        const projectDetail = document.getElementById('project-detail');
        if (projectDetail) {
            const scrollBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 50;
            if (scrollBottom) {
                unlockAchievement('DEEP_DIVER');
            }
        }
    });

    window.trackGalleryView = (projectId) => {
        if (!state.viewedGalleries.includes(projectId)) {
            state.viewedGalleries.push(projectId);
            if (state.viewedGalleries.length >= 2) unlockAchievement('COLLECTOR');
            saveState();
        }
    };

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
            alert('Face revealed. Now you get to punch me.');
        }
    }
});












