// Quiz Data
const questions = [
    {
        question: "If you could get one of these right now, what would it be?",
        answers: [
            { text: "A week off to catch up on everything you have to do and relax", type: "builder" },
            { text: "Coffee chat with the CEO of your dream company", type: "networker" },
            { text: "Instant 4.0 GPA", type: "academic" },
            { text: "Tickets to a big concert", type: "social" },
            { text: "All you can eat dinner with friends", type: "connector" }
        ]
    },

    {
        question: "In a group project, what role do you naturally end up in?",
        answers: [
            { text: "The one who will do their part the night before", type: "builder" },
            { text: "The one who can kill the presentation even if they don't know what's going on", type: "networker" },
            { text: "The one doing most of the actual work", type: "academic" },
            { text: "The one making it fun and keeping energy up", type: "social" },
            { text: "The one checking in and making sure everyone's on task", type: "connector" }
        ]
    },
    {
        question: "Which message would you be most excited to receive?",
        answers: [
            { text: "I got this idea for a project, want to hear?", type: "builder" },
            { text: "It was great to meet you! Are you looking for an internship?", type: "networker" },
            { text: "THE FINAL GOT CANCELED", type: "academic" },
            { text: "Seaside?", type: "social" },
            { text: "Hey it's been a while, want to catch up soon?", type: "connector" }
        ]
    },
    {
        question: "When people come to you for help, it's usually for…",
        answers: [
            { text: "Figuring something out or making sense of a problem", type: "builder" },
            { text: "Advice on jobs, clubs, or opportunities", type: "networker" },
            { text: "Questions about the homework or upcoming midterm", type: "academic" },
            { text: "Planning what to do this weekend", type: "social" },
            { text: "Talking things out or needing support", type: "connector" }
        ]
    },
    {
        question: "What do you value most in a community?",
        answers: [
            { text: "Learning new skills and creating cool things", type: "builder" },
            { text: "Access to opportunities and growth", type: "networker" },
            { text: "Academic resources and being around people with similar goals", type: "academic" },
            { text: "Fun memories and big shared experiences", type: "social" },
            { text: "Close-knit community and shared culture", type: "connector" }
        ]
    }
];
// Archetype data moved to results.html for dynamic loading

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
const TRACKING_CONFIG = {
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScGSM_W8Q05jaC7Cw7ss9R0I-2QT2FuqRLz0K4QLagi03NUbw/formResponse',
    archetypeEntry: 'entry.1977860921',
    timestampEntry: 'entry.863719100_sentinel'  // Including the _sentinel part
};

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
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');

// Utility function to shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}



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
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    
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
    }, 300);
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

// Interactive Effects & Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add click animation to all buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
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
