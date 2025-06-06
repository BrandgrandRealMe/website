document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.querySelector('.generate-button');
    const colorSwatch = document.getElementById('color-swatch');
    const colorCode = document.getElementById('color-code');

    function getRandomHexColor() {
        // Generate a random number between 0 and 16777215 (FFFFFF in decimal)
        const randomColor = Math.floor(Math.random() * 16777215);
        // Convert to hexadecimal string and pad with leading zeros if necessary
        const hexColor = `#${randomColor.toString(16).padStart(6, '0').toUpperCase()}`;
        return hexColor;
    }

    function updateColorDisplay() {
        const newColor = getRandomHexColor();
        colorSwatch.style.backgroundColor = newColor;
        colorCode.textContent = newColor;
    }

    // Initial color generation when the page loads
    updateColorDisplay();

    // Add event listener to the button
    generateButton.addEventListener('click', updateColorDisplay);
});