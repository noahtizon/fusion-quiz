// Data and utilities will be loaded via script tags

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

// Google Forms tracking configuration (will be set after data loads)
let TRACKING_CONFIG;

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

        // Try submission methods in order of reliability
        const methods = [
            () => navigator.sendBeacon?.(TRACKING_CONFIG.formUrl, fd),
            () => fetch(TRACKING_CONFIG.formUrl, { method: "POST", mode: "no-cors", body: fd, keepalive: true }),
            () => new Promise((resolve, reject) => {
                const usp = new URLSearchParams();
                for (const [k, v] of fd.entries()) usp.append(k, v);
                const xhr = new XMLHttpRequest();
                xhr.open("POST", TRACKING_CONFIG.formUrl, true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.onload = () => (xhr.status === 200 || xhr.status === 0) ? resolve() : reject();
                xhr.onerror = reject;
                xhr.send(usp.toString());
            }),
            () => {
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
            }
        ];

        for (const method of methods) {
            try {
                await method();
                return;
            } catch {}
        }
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
    progressFill.style.width = calculateProgress(currentQuestion, questions.length) + '%';
    progressText.textContent = formatProgressText(currentQuestion, questions.length);
    
    // Show/hide back button
    document.getElementById('back-btn').style.display = currentQuestion > 0 ? 'block' : 'none';
    
    // Clear and populate answers
    answersContainer.innerHTML = '';
    (question.shuffledAnswers || question.answers).forEach(answer => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer.text;
        button.onclick = (e) => selectAnswer(answer.type, e);
        button.style.animation = 'fadeIn 0.3s ease-in-out both';
        answersContainer.appendChild(button);
    });
}

function selectAnswer(type, e) {
    userAnswers[currentQuestion] = type;
    
    // Recalculate scores
    scores = { builder: 0, networker: 0, academic: 0, social: 0, connector: 0 };
    userAnswers.forEach(answer => answer && scores[answer]++);
    
    // Selection animation
    const btn = e.currentTarget;
    btn.style.background = 'linear-gradient(135deg, #FFD700, #FFC107)';
    btn.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        currentQuestion++;
        currentQuestion < questions.length ? showQuestion() : showResults();
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
    
    // Check if all categories have 1 point (1-1-1-1-1 tie scenario)
    const allCategoriesHaveOne = Object.values(scores).every(score => score === 1);
    
    if (allCategoriesHaveOne) {
        resultType = userAnswers[userAnswers.length - 1];
    } else {
        const maxScore = Math.max(...Object.values(scores));
        const highestScorers = Object.keys(scores).filter(type => scores[type] === maxScore);
        
        if (highestScorers.length === 1) {
            resultType = highestScorers[0];
        } else {
            // Find most recent answer from tied categories
            for (let i = userAnswers.length - 1; i >= 0; i--) {
                if (highestScorers.includes(userAnswers[i])) {
                    resultType = userAnswers[i];
                    break;
                }
            }
        }
    }
    
    // Submit result to Google Form and wait for it to complete
    try {
        await submitToGoogleForm(resultType);
    } catch (_) {}
    
    // Redirect to the specific archetype page
    window.location.href = `/${resultType}`;
}

function retakeQuiz() {
    window.location.href = '/';
}

// Initialize after data loads
TRACKING_CONFIG = CONFIG.googleForms;

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

