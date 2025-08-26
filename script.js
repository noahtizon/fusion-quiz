// Quiz Data
const questions = [
    {
        question: "If you could get one of these right now, what would it be?",
        answers: [
            { text: "A new tool or gadget you've been eyeing", type: "builder" },
            { text: "A coffee chat with a CEO", type: "networker" },
            { text: "A 4.0 GPA", type: "academic" },
            { text: "Tickets to a big concert", type: "social" },
            { text: "A giant family-style dinner with friends", type: "connector" }
        ]
    },
    {
        question: "How would you actually spend an extra $1000?",
        answers: [
            { text: "Finally upgrade your setup - laptop, monitor, or parts", type: "builder" },
            { text: "Travel to a new city for a trip", type: "networker" },
            { text: "Knock out tuition/books so you can stress less later", type: "academic" },
            { text: "Split it with friends for a weekend trip", type: "social" },
            { text: "Treat your friends or family to something nice", type: "connector" }
        ]
    },
    {
        question: "In a group project, what role do you naturally end up in?",
        answers: [
            { text: "The one doing all the actual work", type: "builder" },
            { text: "The one keeping everyone connected and on task", type: "networker" },
            { text: "The one doing the detailed research or writing", type: "academic" },
            { text: "The one making it fun and keeping energy up", type: "social" },
            { text: "The one checking in on people and making sure no one feels left out", type: "connector" }
        ]
    },
    {
        question: "It's Friday night — what sounds best?",
        answers: [
            { text: "Messing with a side project or hobby", type: "builder" },
            { text: "Going to a free dinner for a company event", type: "networker" },
            { text: "Study group at a cafe with snacks", type: "academic" },
            { text: "Attending an IM game then going to Seaside", type: "social" },
            { text: "Dinner and games with your closest friends", type: "connector" }
        ]
    },
    {
        question: "What kind of event would you not want to miss at FUSION?",
        answers: [
            { text: "Build nights or FUSIONCon", type: "builder" },
            { text: "Networking nights with alumni or recruiters", type: "networker" },
            { text: "Late night study sessions during finals week", type: "academic" },
            { text: "Social retreats or FU-Fridays", type: "social" },
            { text: "Fam or mentorship reveal", type: "connector" }
        ]
    },
    {
        question: "When people come to you for help, it's usually for…",
        answers: [
            { text: "Fixing or figuring out some technical thing", type: "builder" },
            { text: "Advice on jobs, clubs, or opportunities", type: "networker" },
            { text: "Study help or academic tips", type: "academic" },
            { text: "Planning what to do this weekend", type: "social" },
            { text: "Talking things out or needing support", type: "connector" }
        ]
    },
    {
        question: "What do you value most in a community?",
        answers: [
            { text: "Getting to create and learn new skills", type: "builder" },
            { text: "Opportunities and growth", type: "networker" },
            { text: "Academic focus and resources", type: "academic" },
            { text: "Fun memories and big shared experiences", type: "social" },
            { text: "Belonging and shared culture", type: "connector" }
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
        programs: ["Study Hours", "Academic Workshops", "Outreach Opportunities", "Mentorship", "Finals Study Groups"]
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
    timestampEntry: 'entry.863719100'
};

// Submit result to Google Form
async function submitToGoogleForm(resultType) {
    try {
        // Method 1: Try with URL parameters (often works better)
        const params = new URLSearchParams();
        params.append(TRACKING_CONFIG.archetypeEntry, resultType);
        params.append(TRACKING_CONFIG.timestampEntry, new Date().toISOString());
        
        const submitUrl = TRACKING_CONFIG.formUrl + '?' + params.toString();
        
        await fetch(submitUrl, {
            method: 'POST',
            mode: 'no-cors'
        });
        
        console.log('✅ Result submitted to Google Form');
    } catch (error) {
        console.warn('❌ Method 1 failed, trying method 2:', error);
        
        // Method 2: Fallback with FormData
        try {
            const formData = new FormData();
            formData.append(TRACKING_CONFIG.archetypeEntry, resultType);
            formData.append(TRACKING_CONFIG.timestampEntry, new Date().toISOString());
            
            await fetch(TRACKING_CONFIG.formUrl, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            });
            
            console.log('✅ Result submitted to Google Form (method 2)');
        } catch (error2) {
            console.warn('❌ Both methods failed:', error2);
            
            // Method 3: Simple GET request (last resort)
            try {
                const params = new URLSearchParams();
                params.append(TRACKING_CONFIG.archetypeEntry, resultType);
                params.append(TRACKING_CONFIG.timestampEntry, new Date().toISOString());
                
                const getUrl = TRACKING_CONFIG.formUrl + '?' + params.toString();
                
                await fetch(getUrl, {
                    method: 'GET',
                    mode: 'no-cors'
                });
                
                console.log('✅ Result submitted to Google Form (method 3)');
            } catch (error3) {
                console.warn('❌ All methods failed. Check form configuration.');
            }
        }
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
        
        // Add slight delay for animation
        setTimeout(() => {
            answersContainer.appendChild(button);
            button.style.animation = `fadeIn 0.5s ease-in-out ${index * 0.1}s both`;
        }, index * 100);
    });
}

function selectAnswer(type) {
    scores[type]++;
    
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

function showResults() {
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    // Calculate result
    const resultType = Object.keys(scores).reduce((a, b) => 
        scores[a] > scores[b] ? a : b
    );
    
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
            text: `I'm ${window.lastResult.title}! ${window.lastResult.subtitle}`,
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback: copy to clipboard
        const shareText = `I just took the FUSION Personality Quiz and got ${window.lastResult.title}! ${window.lastResult.subtitle}\n\nTake the quiz: ${window.location.href}`;
        
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
    scores = { builder: 0, networker: 0, academic: 0, social: 0, connector: 0 };
    progressFill.style.width = '0%';
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add click sound effect (optional)
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add keyboard navigation
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
    
    // Add some fun animations to the logo
    const logo = document.querySelector('.fusion-logo');
    if (logo) {
        logo.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'rotate 2s linear infinite';
            }, 100);
        });
    }
});
