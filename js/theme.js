document.addEventListener('DOMContentLoaded', function() {
    const accentColors = ['#ffd454', '#49e5d5', '#ff8b8b', '#8fe388'];
    const accentColorsHover = ['#ffe079', '#74f7e8', '#ffabab', '#adf0aa'];
    
    const randomIndex = Math.floor(Math.random() * accentColors.length);
    
    document.documentElement.style.setProperty('--accent-color', accentColors[randomIndex]);
    document.documentElement.style.setProperty('--accent-color-hover', accentColorsHover[randomIndex]);
});
