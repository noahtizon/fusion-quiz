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
            { text: "The one checking in on people and making everyone's on task", type: "connector" }
        ]
    },

    {
        question: "Which message would you be most excited to receive?",
        answers: [
            { text: "I got this idea for a project, want to hear?", type: "builder" },
            { text: "My cousin's company just opened internships, are you interested?", type: "networker" },
            { text: "THE FINAL GOT CANCELED", type: "academic" },
            { text: "Seaside?", type: "social" },
            { text: "Hey! Just wanted to check in on how you were doing?", type: "connector" }
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
            { text: "Getting to create and learn new skills", type: "builder" },
            { text: "Opportunities and growth", type: "networker" },
            { text: "Academic resources and being around people with similar goals", type: "academic" },
            { text: "Fun memories and big shared experiences", type: "social" },
            { text: "Close-knit community and shared culture", type: "connector" }
        ]
    }
];
// Archetype Data
const archetypes = {
    builder: {
        title: "The Builder",
        subtitle: "You learn by doing. You're all about projects, problem-solving, and building things from the ground up.",
        icon: "🔧",
        description: "You're the hands-on problem solver who thrives on creating, building, and making ideas come to life. Whether it's coding a new app, designing a system, or working with your hands, you find fulfillment in the process of creation. You learn best through experimentation and aren't afraid to get your hands dirty. Your practical approach to challenges makes you invaluable in any team, and you're always looking for the next project to tackle.",
        programs: ["FUSION Engineering Project", "FUSION ICS Project", "Technical Workshops", "Build Meetings", "FUSIONCon"]
    },
    networker: {
        title: "The Networker",
        subtitle: "You're the LinkedIn warrior, chasing opportunities, career growth, and making connections wherever you go. Probably has 500+ connections.",
        icon: "🤝",
        description: "You understand that success is built on relationships and opportunities. You're always thinking about the next connection, the next opportunity, or how to level up your career game. You see the value in every conversation and have a natural ability to build bridges between people and ideas. Your strategic mindset and people skills make you a natural leader and connector in any professional setting.",
        programs: ["Professional Workshops", "Alumni Networking", "Career Development Sessions", "Industry Meetups", "Leadership Training"]
    },
    academic: {
        title: "The Academic Weapon",
        subtitle: "You're locked in. You're focused on school, mastering your craft, and staying ahead academically.",
        icon: "📚",
        description: "You're the definition of academic excellence and intellectual curiosity. Your dedication to learning and mastering your craft sets you apart. You thrive in structured learning environments and are always seeking to deepen your knowledge. Whether it's late-night study sessions or diving deep into complex topics, you approach education with passion and discipline. Your commitment to excellence inspires others around you.",
        programs: ["Study Hours", "Academic Workshops", "Outreach Opportunities", "Mentorship Program", "Finals Study Groups"]
    },
    social: {
        title: "The Social Butterfly",
        subtitle: "Big group energy is your thing. You thrive on big social events, and any chance to meet new people and make memories.",
        icon: "🎉",
        description: "You're the life of the party and the glue that brings people together. Your energy is infectious, and you have a natural talent for creating fun, memorable experiences for everyone around you. You thrive in group settings and are always up for the next adventure or social gathering. Your enthusiasm and ability to make others feel included creates lasting bonds and unforgettable moments.",
        programs: ["FU-Fridays", "Social Retreats", "FU-Fit/Intramurals", "Community Events", "Game Nights"]
    },
    connector: {
        title: "The Connector",
        subtitle: "You're the heart of the community, fostering close relationships while celebrating cultural pride and shared identity.",
        icon: "❤️",
        description: "You're the emotional backbone of your community, creating deep, meaningful connections and fostering a sense of belonging for everyone. You understand the importance of cultural identity and work to ensure everyone feels seen, heard, and valued. Your empathy and genuine care for others creates safe spaces where authentic relationships can flourish.",
        programs: ["FUSION Families", "Mentorship Program", "Cultural Workshops", "Alyansa Programs", "Community Building Events"]
    }
};

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
const resultsScreen = document.getElementById('results-screen');
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
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
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
    
    const result = archetypes[resultType];
    
    // Submit result to Google Form
    submitToGoogleForm(resultType);
    
    // Update result display
    document.getElementById('result-icon').textContent = result.icon;
    document.getElementById('result-title').textContent = result.title;
    document.getElementById('result-subtitle').textContent = result.subtitle;
    document.getElementById('result-description-text').textContent = result.description;
    
    // Add programs
    const programsList = document.getElementById('programs-list');
    programsList.innerHTML = '';
    result.programs.forEach(program => {
        const tag = document.createElement('span');
        tag.className = 'program-tag';
        tag.textContent = program;
        programsList.appendChild(tag);
    });
    
    // Store result for sharing
    window.lastResult = result;
}

function shareResult() {
    if (navigator.share && window.lastResult) {
        navigator.share({
            title: 'My FUSION Personality Quiz Result',
            text: `I'm ${window.lastResult.title}!`,
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback: copy to clipboard
        const shareText = `I just took the FUSION Personality Quiz and I'm "${window.lastResult.title}!" \nTake the quiz: ${window.location.href}`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Result copied to clipboard! Share it with your friends!');
            }).catch(() => {
                fallbackCopyToClipboard(shareText);
            });
        } else {
            fallbackCopyToClipboard(shareText);
        }
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        alert('Result copied to clipboard! Share it with your friends!');
    } catch (err) {
        alert('Unable to copy to clipboard. Please manually copy your result to share!');
    }
    
    document.body.removeChild(textArea);
}

function retakeQuiz() {
    resultsScreen.classList.remove('active');
    startScreen.classList.add('active');
    
    // Reset quiz state
    currentQuestion = 0;
    userAnswers = [];
    scores = { builder: 0, networker: 0, academic: 0, social: 0, connector: 0 };
    progressFill.style.width = '0%';
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
