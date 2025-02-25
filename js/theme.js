document.addEventListener('DOMContentLoaded', function() {
    const accentColors = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent-colors')
        .split(',')
        .map(color => color.trim());
    
    const accentColorsHover = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent-colors-hover')
        .split(',')
        .map(color => color.trim());
    
    const randomIndex = Math.floor(Math.random() * accentColors.length);
    
    document.documentElement.style.setProperty('--accent-color', accentColors[randomIndex]);
    document.documentElement.style.setProperty('--accent-color-hover', accentColorsHover[randomIndex]);
});