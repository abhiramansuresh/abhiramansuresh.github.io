document.addEventListener('DOMContentLoaded', function () {
    const STORAGE_KEY = 'portfolio_sound_muted';
    const toggleButton = document.getElementById('audio-toggle');
    const soundMap = {
        click: 'assets/click.mp3',
        clap: 'assets/clap.mp3',
        open: 'assets/click.mp3',
        close: 'assets/click.mp3',
        nav: 'assets/click.mp3'
    };

    const audioCache = {};
    let muted = localStorage.getItem(STORAGE_KEY) === 'true';

    function getBaseAudio(src) {
        if (!audioCache[src]) {
            const audio = new Audio(src);
            audio.preload = 'auto';
            audioCache[src] = audio;
        }
        return audioCache[src];
    }

    function updateToggleUI() {
        if (!toggleButton) return;
        const iconClass = muted ? 'fa-volume-mute' : 'fa-volume-up';
        toggleButton.innerHTML = `<i class="fas ${iconClass}" aria-hidden="true"></i>`;
        toggleButton.setAttribute('aria-pressed', String(muted));
        toggleButton.setAttribute('aria-label', muted ? 'Unmute sound' : 'Mute sound');
        toggleButton.setAttribute('title', muted ? 'Sound off' : 'Sound on');
    }

    function setMuted(nextMuted) {
        muted = Boolean(nextMuted);
        localStorage.setItem(STORAGE_KEY, String(muted));
        updateToggleUI();
    }

    function toggleMuted() {
        setMuted(!muted);
    }

    function play(name, options) {
        if (muted) return;

        const settings = options || {};
        const src = soundMap[name] || name;
        if (!src) return;

        const baseAudio = getBaseAudio(src);
        const instance = baseAudio.cloneNode();
        instance.volume = Math.max(0, Math.min(1, settings.volume ?? 0.35));
        instance.playbackRate = settings.playbackRate ?? 1;
        instance.currentTime = settings.currentTime ?? 0;
        instance.play().catch(() => {
            // Ignore playback errors from autoplay/user-gesture policies.
        });
    }

    window.PortfolioAudio = {
        play: play,
        isMuted: function () { return muted; },
        setMuted: setMuted,
        toggleMuted: toggleMuted
    };

    if (toggleButton) {
        toggleButton.addEventListener('click', function () {
            const wasMuted = muted;
            toggleMuted();
            if (wasMuted && !muted) {
                play('nav', { volume: 0.2, playbackRate: 1.1 });
            }
        });
    }

    updateToggleUI();
});
