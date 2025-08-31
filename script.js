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

// Submit result to Google Form with individual question tracking
async function submitToGoogleForm(resultType) {
    try {
        const formData = new FormData();
        
        // Submit final archetype result
        formData.append(TRACKING_CONFIG.archetypeEntry, resultType);
        formData.append(TRACKING_CONFIG.timestampEntry, new Date().toISOString());
        
        // Submit individual question answers
        userAnswers.forEach((answer, index) => {
            const questionKey = `question${index + 1}Entry`;
            if (TRACKING_CONFIG[questionKey]) {
                formData.append(TRACKING_CONFIG[questionKey], answer);
            }
        });
        
        await fetch(TRACKING_CONFIG.formUrl, {
            method: "POST",
            mode: "no-cors", // Must be no-cors
            body: formData,
        });
        
        console.log('✅ Result and individual answers submitted to Google Form');
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
    // Calculate result with enhanced tie-breaker logic
    let resultType;
    
    // Debug logging
    console.log('Final scores:', scores);
    console.log('User answers:', userAnswers);
    
    // Check if all categories have 1 point (1-1-1-1-1 tie scenario)
    const allCategoriesHaveOne = Object.values(scores).every(score => score === 1);
    
    if (allCategoriesHaveOne) {
        // Use the last answer as tie-breaker for 1-1-1-1-1
        resultType = userAnswers[userAnswers.length - 1];
        console.log('1-1-1-1-1 tie detected, using last answer:', resultType);
    } else {
        // Find highest score
        const maxScore = Math.max(...Object.values(scores));
        const highestScorers = Object.keys(scores).filter(type => scores[type] === maxScore);
        
        if (highestScorers.length === 1) {
            // Clear winner
            resultType = highestScorers[0];
            console.log('Clear winner:', resultType, 'with score:', maxScore);
        } else {
            // Multiple highest scores (tie) - use last answer as tie-breaker
            resultType = userAnswers[userAnswers.length - 1];
            console.log('Tie detected between:', highestScorers, 'using last answer as tie-breaker:', resultType);
        }
    }
    
    console.log('Final result:', resultType);
    
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
