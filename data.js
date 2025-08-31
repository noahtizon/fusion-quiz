// Quiz Questions Data
export const questions = [
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

// Archetype Data
export const archetypes = {
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
        programs: ["Professional Workshops", "Alumni Networking", "Career Development Sessions", "Industry Meetups", "Leadership Training"]
    },
    academic: {
        title: "The Academic Weapon",
        subtitle: "You set the curve and help others hit it too.",
        icon: "📚",
        description: "You're locked in. Whether it's your calendar, your color-coded notes, or your ability to juggle multiple deadlines, you know how to manage your time and stay ahead. You don't just care about doing well, you take pride in being prepared, staying consistent, and showing others what's possible with the right mindset. People turn to you for help not just because you're smart, but because you're reliable, encouraging, and genuinely want others to succeed too. You make your success look effortless and you quietly inspire others to do the same.",
        programs: ["Study Hours", "Academic Workshops", "Outreach Opportunities", "Mentorship Program", "Finals Study Groups"]
    },
    social: {
        title: "The Social Butterfly",
        subtitle: "You live for big energy, new people, and spontaneous plans.",
        icon: "🎉",
        description: "You're the one who keeps things moving and makes sure everyone's having a good time. Whether it's a last-minute hangout, a big group event, or just bumping into someone on campus, you've got a way of making things feel lively. You're energized by meeting new people, great at pulling others in, and always down to make something happen. You're the one who turns \"we should hang out sometime\" into actual plans. For you, college isn't just about the classes, it's about who you meet and the memories you make along the way.",
        programs: ["FU-Fridays", "Social Retreats", "FU-Fit/Intramurals", "Community Events", "Game Nights"]
    },
    connector: {
        title: "The Connector",
        subtitle: "You make people feel seen, supported, and at home.",
        icon: "❤️",
        description: "You're the one people turn to, not because you're the loudest, but because you're genuine, grounded, and you care. You notice the small things. You check in when someone goes quiet. You're the one who makes sure everyone feels included, whether it's in a group chat, a hangout, or a space that reflects your shared culture and values. You believe community isn't something you join, it's something you create. You thrive in the deep conversations, the quiet support, and creating a sense of belonging. You don't just connect people. You remind them they're not alone.",
        programs: ["FUSION Families", "Mentorship Program", "Cultural Workshops", "Alyansa Programs", "Community Building Events"]
    }
};

// Configuration
export const CONFIG = {
    googleForms: {
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScGSM_W8Q05jaC7Cw7ss9R0I-2QT2FuqRLz0K4QLagi03NUbw/formResponse',
        archetypeEntry: 'entry.1977860921',
        timestampEntry: 'entry.863719100_sentinel'
    },
    quiz: {
        totalQuestions: 5,
        animationDelay: 300,
        buttonAnimationDuration: 150
    }
};
