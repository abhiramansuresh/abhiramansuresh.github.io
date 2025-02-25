// Function to generate a random rotation value between -30 and 30 degrees
function getRandomRotation() {
    return Math.random() * 60 - 30;
}

// Function to update square rotations
function updateSquareRotations() {
    const bottomSquare = document.querySelector('.square-bottom');
    const topSquare = document.querySelector('.square-top');
    
    bottomSquare.style.transform = `rotate(${getRandomRotation()}deg)`;
    topSquare.style.transform = `rotate(${getRandomRotation()}deg)`;
}

// Function to create and animate floating score
function createFloatingScore(x, y) {
    const score = document.createElement('div');
    score.textContent = '+1';
    score.style.position = 'fixed';
    // Add random horizontal offset (-20 to +20 pixels)
    const randomX = x + (Math.random() * 40 - 20);
    score.style.left = `${randomX}px`;
    score.style.top = `${y - 40}px`;
    score.style.color = '#ff1f71';
    score.style.fontSize = '2.5rem';
    score.style.fontWeight = 'bold';
    score.style.pointerEvents = 'none';
    score.style.transition = 'all 1s ease-out';
    score.style.opacity = '1';
    score.style.zIndex = '9999';
    score.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
    
    document.body.appendChild(score);
    
    // Random angle for movement (-30 to +30 degrees)
    const randomAngle = (Math.random() * 60 - 30) * (Math.PI / 180);
    const moveDistance = 80;
    const moveX = Math.sin(randomAngle) * moveDistance;
    const moveY = -Math.cos(randomAngle) * moveDistance;
    
    // Trigger animation with random direction
    requestAnimationFrame(() => {
        score.style.transform = `translate(${moveX}px, ${moveY}px)`;
        score.style.opacity = '0';
    });
    
    setTimeout(() => {
        document.body.removeChild(score);
    }, 1000);
}

// Function to handle click animation
function handleClickAnimation(event) {
    const bottomSquare = document.querySelector('.square-bottom');
    const topSquare = document.querySelector('.square-top');
    const clickSound = new Audio('assets/click.mp3');

    clickSound.play();
    
    // Initial scale down
    bottomSquare.style.transform = `rotate(${getRandomRotation()}deg) scale(0.95)`;
    topSquare.style.transform = `rotate(${getRandomRotation()}deg) scale(0.95)`;
    
    // Create floating score at click position
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + (rect.width / 2) - 15;
    const y = rect.top + (rect.height / 2);
    createFloatingScore(x, y);
    
    // Scale up with overshoot after 150ms
    setTimeout(() => {
        bottomSquare.style.transform = 'rotate(-15deg) scale(1.05)';
        topSquare.style.transform = 'rotate(0deg) scale(1.05)';
        
        // Return to original scale after overshoot
        setTimeout(() => {
            bottomSquare.style.transform = 'rotate(-15deg) scale(1)';
            topSquare.style.transform = 'rotate(0deg) scale(1)';
        }, 100);
    }, 150);
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const profileSquares = document.querySelector('.profile-squares');
    
    // Add hover event listeners
    profileSquares.addEventListener('mouseenter', updateSquareRotations);
    
    // Add click and touch event listeners
    profileSquares.addEventListener('click', handleClickAnimation);
    profileSquares.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent default touch behavior
        handleClickAnimation();
    });
    
    // Reset rotation on mouse leave and touch end
    profileSquares.addEventListener('mouseleave', () => {
        const bottomSquare = document.querySelector('.square-bottom');
        const topSquare = document.querySelector('.square-top');
        
        bottomSquare.style.transform = 'rotate(-15deg)';
        topSquare.style.transform = 'rotate(0deg)';
    });
});
