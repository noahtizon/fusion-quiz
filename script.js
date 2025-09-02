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

// Submit result to Google Form with mobile-optimized fallbacks
async function submitToGoogleForm(resultType) {
    try {
        const fd = new FormData();
        
        // Submit final archetype result
        fd.append(TRACKING_CONFIG.archetypeEntry, resultType);
        fd.append(TRACKING_CONFIG.timestampEntry, new Date().toISOString());
        
        // Submit individual question answers
        userAnswers.forEach((answer, index) => {
            const questionKey = `question${index + 1}Entry`;
            if (TRACKING_CONFIG[questionKey]) {
                fd.append(TRACKING_CONFIG[questionKey], answer);
            }
        });

        // 0) Best-effort first: sendBeacon (survives page unload)
        try {
            const ok = navigator.sendBeacon?.(TRACKING_CONFIG.formUrl, fd);
            if (ok) {
                console.log('✅ Result submitted via sendBeacon');
                return;
            }
        } catch {}

        // 1) fetch fallback (keepalive helps during unload on some browsers)
        try {
        await fetch(TRACKING_CONFIG.formUrl, {
            method: "POST",
                mode: "no-cors",
                body: fd,
                keepalive: true
            });
            console.log('✅ Result submitted via fetch (keepalive)');
            return;
        } catch {}

        // 2) XHR fallback (URL-encode explicitly for Safari)
        try {
            const usp = new URLSearchParams();
            for (const [k, v] of fd.entries()) usp.append(k, v);
            
            await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open("POST", TRACKING_CONFIG.formUrl, true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.onload = () => (xhr.status === 200 || xhr.status === 0) ? resolve() : reject();
                xhr.onerror = reject;
                xhr.send(usp.toString());
            });
            console.log('✅ Result submitted via XMLHttpRequest');
            return;
        } catch {}

        // 3) iframe fallback (fixed for iOS)
        try {
            const iframe = document.createElement("iframe");
            iframe.name = "gf-hidden";
            iframe.style.display = "none";
            document.body.appendChild(iframe);

            const form = document.createElement("form");
            form.method = "POST";
            form.action = TRACKING_CONFIG.formUrl;
            form.target = "gf-hidden";
            
            for (const [k, v] of fd.entries()) {
                const input = document.createElement("input");
                input.type = "hidden";
                input.name = k;
                input.value = v;
                form.appendChild(input);
            }
            
            document.body.appendChild(form);
            form.submit();
            form.remove();
            setTimeout(() => iframe.remove(), 1500);
            
            console.log('✅ Result submitted via iframe fallback');
        } catch {}

        console.log('⚠️ All submission methods attempted');
    } catch (e) {
        console.warn("❌ Form submission failed:", e);
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
        button.onclick = (e) => selectAnswer(answer.type, e);
        
        // Add button immediately without delay
        answersContainer.appendChild(button);
        button.style.animation = `fadeIn 0.3s ease-in-out both`;
    });
}

function selectAnswer(type, e) {
    // Store the answer
    userAnswers[currentQuestion] = type;
    
    // Update scores (recalculate from all stored answers)
    scores = { builder: 0, networker: 0, academic: 0, social: 0, connector: 0 };
    userAnswers.forEach(answer => {
        if (answer) scores[answer]++;
    });
    
    // Add selection animation
    const selectedBtn = e.currentTarget;
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

async function showResults() {
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
    
    // Submit result to Google Form and wait for it to complete
    try {
        await submitToGoogleForm(resultType);
    } catch (_) {}
    
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
