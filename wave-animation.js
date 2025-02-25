let isAnimating = false;

document.addEventListener('DOMContentLoaded', () => {
    const waveEmoji = document.querySelector('.wave-emoji');
    if (waveEmoji) {
        waveEmoji.style.animation = 'continuousWave 1s ease-in-out infinite';
    }
});

function playGreeting() {
    if (isAnimating) return;
    isAnimating = true;

    const waveEmoji = document.querySelector('.wave-emoji');
    const clapSound = new Audio('assets/clap.mp3');

    // Play the clap sound
    clapSound.play();

    // Temporarily disable the idle animation
    waveEmoji.style.animation = 'none';

    // Initial scale down and rotate
    waveEmoji.style.display = 'inline-block';
    waveEmoji.style.transform = 'rotate(-20deg) scale(0.8)';

    // Animation sequence
    setTimeout(() => {
        // Scale up and rotate right
        waveEmoji.style.transform = 'rotate(20deg) scale(1.2)';
        setTimeout(() => {
            // Scale normal and rotate left
            waveEmoji.style.transform = 'rotate(-10deg) scale(1)';
            setTimeout(() => {
                // Return to original state
                waveEmoji.style.transform = 'rotate(0deg) scale(1)';
                isAnimating = false;

                // Re-enable the idle animation
                waveEmoji.style.animation = 'continuousWave 1s ease-in-out infinite';
            }, 150);
        }, 150);
    }, 150);
}

// Add styles for the wave emoji
const style = document.createElement('style');
style.textContent = `
    .wave-emoji {
        display: inline-block;
        cursor: pointer;
        transition: transform 0.15s ease-in-out; // Ensure transition is applied
        animation: continuousWave 1s ease-in-out infinite;
    }

    .wave-emoji:hover {
        transform: scale(1.1);
    }

    @keyframes continuousWave {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(-5deg); }
        75% { transform: rotate(5deg); }
        100% { transform: rotate(0deg); }
    }
`;
document.head.appendChild(style);