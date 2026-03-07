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

let health = 100;
const healthDecreaseAmount = 2; // Amount to decrease health by on each click

function updateHealthBar() {
    const progressBar = document.querySelector('.progress');
    progressBar.style.width = `${health}%`;
    if (health <= 0) {
        // Optionally, add a visual indication for game over or reset
        console.log('Health depleted! Resetting...');
        resetHealth();
    }
}

function resetHealth() {
    health = 100;
    updateHealthBar();
}

// Function to handle click animation
function handleClickAnimation(event) {
    const bottomSquare = document.querySelector('.square-bottom');
    const topSquare = document.querySelector('.square-top');
    // Initial scale down
    bottomSquare.style.transform = `rotate(${getRandomRotation()}deg) scale(0.95)`;
    topSquare.style.transform = `rotate(${getRandomRotation()}deg) scale(0.95)`;
    
    // Decrease health and update bar
    health -= healthDecreaseAmount;
    if (health < 0) health = 0; // Prevent negative health
    updateHealthBar();

    
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
        handleClickAnimation(e); // Pass the event object
    });
    
    // Reset rotation on mouse leave and touch end
    profileSquares.addEventListener('mouseleave', () => {
        const bottomSquare = document.querySelector('.square-bottom');
        const topSquare = document.querySelector('.square-top');
        
        bottomSquare.style.transform = 'rotate(-15deg)';
        topSquare.style.transform = 'rotate(0deg)';
    });

    // Initialize health bar on load
    updateHealthBar();
});



