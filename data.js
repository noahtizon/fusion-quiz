// Quiz Questions Data
const questions = [
    {
        question: "Choose one of the following:",
        answers: [
            { text: "A $500 gift card to spend on your favorite hobby", type: "builder" },
            { text: "Coffee chat with the CEO of your dream company", type: "networker" },
            { text: "Guaranteed A’s on all your classes this quarter", type: "academic" },
            { text: "Front-row tickets to a big concert", type: "social" },
            { text: "An all you can eat dinner with your closest friends", type: "connector" }
        ]
    },
    {
        question: "Which compliment would make your day?",
        answers: [
            { text: "You're so creative and always working on something cool", type: "builder" },
            { text: "You’ve got big goals, and it shows", type: "networker" },
            { text: "You’re the kind of person people just trust to figure things out", type: "academic" },
            { text: "You double the energy of any group you're in", type: "social" },
            { text: "You're great at looking out for people", type: "connector" }
        ]
    },
    {
        question: "When working in a team, what do you bring to the table?",
        answers: [
            { text: "Coming up with ideas and solving tricky problems", type: "builder" },
            { text: "Taking charge during meetings and making sure everyone’s on the same page", type: "networker" },
            { text: "Making to-do lists and making sure you don’t fall behind", type: "academic" },
            { text: "Keping the energy up and getting the team to bond", type: "social" },
            { text: "Making sure everyone feels included and smoothing over conflicts", type: "connector" }
        ]
    },
    {
        question: "Which message would you be most excited to receive?",
        answers: [
            { text: "[An Instagram Reel about something you’re really into]", type: "builder" },
            { text: "We’ve got an internship opening that sounds like something you’d go for", type: "networker" },
            { text: "THE FINAL GOT CANCELED", type: "academic" },
            { text: "Seaside?", type: "social" },
            { text: "You're not gonna believe what just happened... can I call", type: "connector" }
        ]
    },
    {
        question: "What do you value most in a community?",
        answers: [
            { text: "A community that supports your ideas and helps bring them to life", type: "builder" },
            { text: "Opportunities to grow and people who push you forward", type: "networker" },
            { text: "A supportive structure that helps you grow without burning out", type: "academic" },
            { text: "Exciting events, shared memories, and good vibes", type: "social" },
            { text: "A space where people respect each other and feel welcome", type: "connector" }
        ]
    }
];

// Archetype Data
const archetypes = {
    builder: {
        title: "The Builder",
        subtitle: "You thrive on ideas, independence, and getting things done.",
        icon: "🔧",
        description: "You love a good project, something to build, fix, or figure out. Whether it's a new tool, a cool side idea, or just learning how things work, you're most in your element when you have a challenge in front of you. You enjoy your focus time, value independence, and quietly power through challenges most people wouldn't even start. You don't always need the spotlight, the results speak for themselves. People trust you to get it done, and somehow, you always do. You're a creator, a problem solver, and the type who always has something in the works.",
        programs: ["FUSION Engineering Project", "FUSION ICS Project", "Technical Workshops", "Build Meetings", "FUSIONCon"]
    },
    networker: {
        title: "The Networker",
        subtitle: "You're the LinkedIn warrior, making connections wherever you go.",
        icon: "🤝",
        description: "You've got your eye on the horizon. You've got vision, drive, and maybe a Google Calendar so packed it scares people. You know how to present yourself, how to find the right people, and how to turn a casual conversation into a connection. You carry yourself with confidence, communicate with purpose, and aren't afraid to chase what you want. You're not waiting for opportunities to show up. You're already out there creating them. You probably have 500+ connections already.",
        programs: ["Professional Workshops", "Alumni Networking", "Industry Meetups", "FUSION Internship"]
    },
    academic: {
        title: "The Academic Weapon",
        subtitle: "You set the curve and help others hit it too.",
        icon: "📚",
        description: "You're locked in. Whether it's your calendar, your color-coded notes, or your ability to juggle multiple deadlines, you know how to manage your time and stay ahead. You don't just care about doing well, you take pride in being prepared, staying consistent, and showing others what's possible with the right mindset. People turn to you for help not just because you're smart, but because you're reliable, encouraging, and genuinely want others to succeed too. You make your success look effortless and you quietly inspire others to do the same.",
        programs: ["Study Hours", "Academic Workshops", "Outreach Opportunities", "FUSION Mentorship"]
    },
    social: {
        title: "The Social Butterfly",
        subtitle: "You live for big energy, new people, and spontaneous plans.",
        icon: "🎉",
        description: "You're the one who keeps things moving and makes sure everyone's having a good time. Whether it's a last-minute hangout, a big group event, or just bumping into someone on campus, you've got a way of making things feel lively. You're energized by meeting new people, great at pulling others in, and always down to make something happen. You're the one who turns \"we should hang out sometime\" into actual plans. For you, college isn't just about the classes, it's about who you meet and the memories you make along the way.",
        programs: ["FU-Fridays", "Winter Retreat", "FU-Fit/Intramurals", "Community Events"]
    },
    connector: {
        title: "The Connector",
        subtitle: "You make people feel seen, supported, and at home.",
        icon: "❤️",
        description: "You're the one people turn to, not because you're the loudest, but because you're genuine, grounded, and you care. You notice the small things. You check in when someone goes quiet. You're the one who makes sure everyone feels included, whether it's in a group chat, a hangout, or a space that reflects your shared culture and values. You believe community isn't something you join, it's something you create. You thrive in the deep conversations, the quiet support, and creating a sense of belonging. You don't just connect people. You remind them they're not alone.",
        programs: ["FUSION Families", "FUSION Mentorship", "Cultural Workshops", "Alyansa Collaborations"]
    }
};

// Configuration
const CONFIG = {
    googleForms: {
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScGSM_W8Q05jaC7Cw7ss9R0I-2QT2FuqRLz0K4QLagi03NUbw/formResponse',
        archetypeEntry: 'entry.1977860921',
        // Individual question tracking
        question1Entry: 'entry.1746241827',
        question2Entry: 'entry.494545951',
        question3Entry: 'entry.1056565161',
        question4Entry: 'entry.1904630356',
        question5Entry: 'entry.969806202'
    },
    quiz: {
        totalQuestions: 5,
        animationDelay: 300,
        buttonAnimationDuration: 150
    }
};
