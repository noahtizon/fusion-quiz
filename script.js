// Import data and utilities
import { questions, CONFIG } from './data.js';
import { 
    shuffleArray, 
    addButtonAnimation, 
    getElement, 
    calculateProgress, 
    formatProgressText 
} from './utils.js';

// Quiz State
let currentQuestion = 0;
let userAnswers = []; // Track user answers for back functionality
let scores = {
    builder: 0,
    networker: 0,
    academic: 0,
    social: 0,
    connector: 0
};

// Google Forms tracking configuration
const TRACKING_CONFIG = CONFIG.googleForms;

// Submit result to Google Form (using exact same pattern as your working code)
async function submitToGoogleForm(resultType) {
    try {
        const formData = new FormData();
        formData.append(TRACKING_CONFIG.archetypeEntry, resultType);
        formData.append(TRACKING_CONFIG.timestampEntry, new Date().toISOString());
        
        await fetch(TRACKING_CONFIG.formUrl, {
            method: "POST",
            mode: "no-cors", // Must be no-cors
            body: formData,
        });
        
        console.log('✅ Result submitted to Google Form');
    } catch (error) {
        console.warn('❌ Form submission failed:', error);
    }
}

// DOM Elements
const startScreen = getElement('start-screen');
const quizScreen = getElement('quiz-screen');
const progressFill = getElement('progress-fill');
const progressText = getElement('progress-text');
const questionText = getElement('question-text');
const answersContainer = getElement('answers-container');

// Utility functions are now imported from utils.js



// Quiz Functions
function startQuiz() {
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    currentQuestion = 0;
    userAnswers = [];
    scores = { builder: 0, networker: 0, academic: 0, social: 0, connector: 0 };
    
    // Shuffle answers for each question to prevent predictable patterns
    questions.forEach(question => {
        question.shuffledAnswers = shuffleArray(question.answers);
    });
    
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];
    questionText.textContent = question.question;
    
    // Update progress
    const progress = calculateProgress(currentQuestion, questions.length);
    progressFill.style.width = progress + '%';
    progressText.textContent = formatProgressText(currentQuestion, questions.length);
    
    // Show/hide back button
    const backBtn = document.getElementById('back-btn');
    if (currentQuestion > 0) {
        backBtn.style.display = 'block';
    } else {
        backBtn.style.display = 'none';
    }
    
    // Clear previous answers
    answersContainer.innerHTML = '';
    
    // Use shuffled answers to prevent predictable patterns
    const answersToShow = question.shuffledAnswers || question.answers;
    
    // Add answer buttons with randomized order
    answersToShow.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer.text;
        button.onclick = () => selectAnswer(answer.type);
        
        // Add button immediately without delay
        answersContainer.appendChild(button);
        button.style.animation = `fadeIn 0.3s ease-in-out both`;
    });
}

function selectAnswer(type) {
    // Store the answer
    userAnswers[currentQuestion] = type;
    
    // Update scores (recalculate from all stored answers)
    scores = { builder: 0, networker: 0, academic: 0, social: 0, connector: 0 };
    userAnswers.forEach(answer => {
        if (answer) scores[answer]++;
    });
    
    // Add selection animation
    const selectedBtn = event.target;
    selectedBtn.style.background = 'linear-gradient(135deg, #FFD700, #FFC107)';
    selectedBtn.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, CONFIG.quiz.animationDelay);
}

function goBack() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
}

function showResults() {
    // Calculate result with tie-breaker logic
    let resultType;
    
    // Check if all categories have 1 point (tie scenario)
    const allCategoriesHaveOne = Object.values(scores).every(score => score === 1);
    
    if (allCategoriesHaveOne) {
        // Use the last answer as tie-breaker
        resultType = userAnswers[userAnswers.length - 1];
    } else {
        // Normal scoring - find highest score
        resultType = Object.keys(scores).reduce((a, b) => 
            scores[a] > scores[b] ? a : b
        );
    }
    
    // Submit result to Google Form
    submitToGoogleForm(resultType);
    
    // Redirect to the specific archetype page
    window.location.href = `/${resultType}`;
}



function retakeQuiz() {
    // Redirect back to main quiz
    window.location.href = '/';
}

// Make functions globally available for inline onclick handlers
window.startQuiz = startQuiz;
window.goBack = goBack;

// Interactive Effects & Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add click animation to all buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => addButtonAnimation(button, CONFIG.quiz.buttonAnimationDuration));
    
    // Keyboard navigation for quiz answers (1-5 keys)
    document.addEventListener('keydown', function(e) {
        if (quizScreen.classList.contains('active')) {
            const answerButtons = document.querySelectorAll('.answer-btn');
            if (e.key >= '1' && e.key <= '5') {
                const index = parseInt(e.key) - 1;
                if (answerButtons[index]) {
                    answerButtons[index].click();
                }
            }
        }
    });
});
