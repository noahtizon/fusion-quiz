// Utility Functions

/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param {Array} array - The array to shuffle
 * @returns {Array} - A new shuffled array
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Adds click animation to a button
 * @param {HTMLElement} button - The button element
 * @param {number} duration - Animation duration in ms
 */
function addButtonAnimation(button, duration = 150) {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, duration);
    });
}

/**
 * Safely gets an element by ID with error handling
 * @param {string} id - Element ID
 * @returns {HTMLElement|null} - The element or null if not found
 */
function getElement(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`Element with ID '${id}' not found`);
    }
    return element;
}

/**
 * Calculates quiz progress percentage
 * @param {number} current - Current question number (0-based)
 * @param {number} total - Total questions
 * @returns {number} - Progress percentage (0-100)
 */
function calculateProgress(current, total) {
    return ((current + 1) / total) * 100;
}

/**
 * Formats progress text
 * @param {number} current - Current question number (0-based)
 * @param {number} total - Total questions
 * @returns {string} - Formatted progress text
 */
function formatProgressText(current, total) {
    return `Question ${current + 1} of ${total}`;
}
