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
        
        // Mobile-friendly submission with multiple fallback methods
        let submitted = false;
        
        // Method 1: Try fetch with no-cors
        try {
            await fetch(TRACKING_CONFIG.formUrl, {
                method: "POST",
                mode: "no-cors",
                body: formData,
            });
            submitted = true;
            console.log('✅ Result submitted via fetch (no-cors)');
        } catch (fetchError) {
            console.warn('Fetch failed, trying alternative method:', fetchError);
        }
        
        // Method 2: Try XMLHttpRequest (more reliable on mobile)
        if (!submitted) {
            try {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', TRACKING_CONFIG.formUrl, true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                
                // Convert FormData to URL-encoded string for better mobile compatibility
                const urlEncodedData = new URLSearchParams(formData).toString();
                
                xhr.onload = function() {
                    if (xhr.status === 200 || xhr.status === 0) {
                        console.log('✅ Result submitted via XMLHttpRequest');
                    } else {
                        console.warn('XMLHttpRequest failed with status:', xhr.status);
                    }
                };
                
                xhr.onerror = function() {
                    console.warn('XMLHttpRequest error');
                };
                
                xhr.send(urlEncodedData);
                submitted = true;
            } catch (xhrError) {
                console.warn('XMLHttpRequest failed:', xhrError);
            }
        }
        
        // Method 3: Try iframe submission as last resort
        if (!submitted) {
            try {
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                document.body.appendChild(iframe);
                
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = TRACKING_CONFIG.formUrl;
                form.target = iframe.name;
                
                // Add all form data
                for (let [key, value] of formData.entries()) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = value;
                    form.appendChild(input);
                }
                
                iframe.appendChild(form);
                form.submit();
                
                // Clean up after submission
                setTimeout(() => {
                    document.body.removeChild(iframe);
                }, 1000);
                
                console.log('✅ Result submitted via iframe fallback');
            } catch (iframeError) {
                console.warn('Iframe submission failed:', iframeError);
            }
        }
        
        if (!submitted) {
            console.warn('❌ All submission methods failed');
        }
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
                // Multiple highest scores (tie) - find most recent answer from tied categories
                let mostRecentTiedAnswer = null;
                
                // Go through answers from most recent to oldest
                for (let i = userAnswers.length - 1; i >= 0; i--) {
                    if (highestScorers.includes(userAnswers[i])) {
                        mostRecentTiedAnswer = userAnswers[i];
                        break;
                    }
                }
                
                resultType = mostRecentTiedAnswer;
                console.log('Tie detected between:', highestScorers, 'using most recent tied answer as tie-breaker:', resultType);
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
