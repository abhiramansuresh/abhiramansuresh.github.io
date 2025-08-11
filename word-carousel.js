document.addEventListener('DOMContentLoaded', function() {
    // Words to display in the carousel
    const words = ['Games 🎲', 'Apps 📱', 'AI Systems 🤖'];
    const carouselElement = document.getElementById('word-carousel');
    let currentIndex = 0;
    let isAnimating = false;
    
    // Animation settings
    const animationDuration = 1200; // Animation duration in milliseconds
    const delayBetweenWords = 200; // Additional delay between words (in milliseconds)
    
    // Function to update the word with animation
    function updateWord() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Create a new span for the incoming word
        const newWord = document.createElement('span');
        newWord.textContent = words[currentIndex];
        newWord.style.position = 'absolute';
        newWord.style.animation = `slide-up ${animationDuration/1000}s forwards`;
        newWord.style.width = '100%';
        
        // Clear and append the new word
        carouselElement.innerHTML = '';
        carouselElement.appendChild(newWord);
        
        // Update index for next word
        currentIndex = (currentIndex + 1) % words.length;
        
        // Reset animation flag when animation completes
        setTimeout(() => {
            isAnimating = false;
            
            // Schedule the next word change after delay (if any)
            if (delayBetweenWords > 0) {
                window.carouselTimeout = setTimeout(() => {
                    updateWord();
                }, delayBetweenWords);
            } else {
                // No delay, update immediately
                updateWord();
            }
        }, animationDuration); // Use the animation duration variable
    }
    
    // Start the carousel
    updateWord();
    
});