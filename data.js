const PHOTO_BASE = '/assets/photos/quizpics/';
const programPhotos = {
  'FUSION Projects': PHOTO_BASE + '1projects.webp',
  'Professional Development': PHOTO_BASE + 'prodev panel.webp',
  'Academic Programs': PHOTO_BASE + 'fusionconpresenty.webp',
  'Socials': PHOTO_BASE + 'karaoke social.webp',
  'FUSION Fams': PHOTO_BASE + 'fusion fam.webp',
  'FUSIONBook': PHOTO_BASE + 'pubsmedia workshop.webp',
  'Cultural Programming': PHOTO_BASE + 'tagalog word.webp',
  'FU-Fit & Intramurals': PHOTO_BASE + 'fusion fit.webp',
  'Alyansa': PHOTO_BASE + 'alyansapicnic.webp',
  'FUSION Mentorship': PHOTO_BASE + 'mentorship.webp',
  'Project Leadership': PHOTO_BASE + 'fusionconpresenty.webp',
  'FUSION Internship': PHOTO_BASE + 'intern class 1.webp',
  'Mentorship': PHOTO_BASE + 'mentorship.webp',
  'Publicity & Media': PHOTO_BASE + 'pubsmedia workshop.webp',
  'FUSIONCon': PHOTO_BASE + 'fusioncon.webp',
  'Alumni & Industry': PHOTO_BASE + 'fusioncon hosts.webp',
  'Study Hours': PHOTO_BASE + 'fusionconpresenty.webp',
  'FU-Fridays': PHOTO_BASE + 'karaoke social.webp'
};

const questions = [
  {
    eyebrow: "START HERE",
    question: "What are you looking for at UCI?",
    answers: [
      { text: "Build cool things", icon: "🔧", weights: { builder: 3, academic: 1 }, lesson: { kicker: "BUILD WITH A TEAM", title: "FUSION Projects", body: "Join a year-long technical project team and showcase your work at FUSIONCon." } },
      { text: "Career opportunities", icon: "💼", weights: { networker: 3, academic: 1 }, lesson: { kicker: "PROFESSIONAL DEVELOPMENT", title: "Professional Development", body: "Meet industry professionals and alumni through networking events, workshops, and career programming." } },
      { text: "Academic support", icon: "📚", weights: { academic: 5, connector: 1 }, lesson: { kicker: "ACADEMIC SUPPORT", title: "Academic Programs", body: "Find study spaces, academic resources, workshops, and other students taking the same classes." } },
      { text: "People to have fun with", icon: "🎉", weights: { social: 3, connector: 1 }, lesson: { kicker: "SOCIALS", title: "Socials", body: "From FU-Fridays to retreats and other events, there are plenty of ways to meet people outside class." } },
      { text: "A community I belong to", icon: "❤️", weights: { connector: 3, social: 1 }, lesson: { kicker: "FUSION FAMS", title: "FUSION Fams", body: "Join a smaller community within FUSION and build closer friendships throughout the year." } }
    ]
  },
  {
    eyebrow: "EXPLORE FUSION",
    question: "What sounds most like your kind of thing?",
    answers: [
      { text: "Make something worth remembering", icon: "📸", weights: { builder: 2, connector: 1, social: 1 }, lesson: { kicker: "FUSIONBOOK", title: "FUSIONBook", body: "Help capture the people, memories, and moments that make up FUSION and turn them into our annual yearbook." } },
      { text: "Explore culture & community", icon: "🌏", weights: { connector: 3, academic: 1 }, lesson: { kicker: "CULTURAL PROGRAMMING", title: "Cultural Programming", body: "Connect with Filipinx culture and identity through workshops, discussions, events, and community experiences." } },
      { text: "Get a team together and compete", icon: "🏐", weights: { social: 3, builder: 1 }, lesson: { kicker: "FU-FIT & INTRAMURALS", title: "FU-Fit & Intramurals", body: "Play alongside other FUSION members through IM teams, sports, and active events throughout the year." } },
      { text: "Meet people outside my usual circle", icon: "🤝", weights: { networker: 2, connector: 2 }, lesson: { kicker: "ALYANSA", title: "Alyansa", body: "Connect with the wider Filipinx community at UCI through collaborations with our fellow Alyansa organizations." } },
      { text: "Find my people", icon: "🛋️", weights: { connector: 3, social: 1 }, lesson: { kicker: "MENTORSHIP", title: "FUSION Mentorship", body: "Join a mentorship line with people who share similar interests, goals, and experiences." } }
    ]
  },
  {
    eyebrow: "GET INVOLVED",
    question: "You've been in FUSION for a bit. How would you want to get involved?",
    answers: [
      { text: "Lead a team and build something", icon: "🛠️", weights: { builder: 3, networker: 1 }, lesson: { kicker: "PROJECT LEADERSHIP", title: "Project Leadership", body: "Become a project lead and guide a team through designing and building a year-long technical project." } },
      { text: "Get experience behind the scenes", icon: "🌱", weights: { networker: 3, builder: 1 }, lesson: { kicker: "FUSION INTERNSHIP", title: "FUSION Internship", body: "Apply to our internship program to work alongside board and learn how different parts of FUSION operate." } },
      { text: "Help someone else grow", icon: "🫶", weights: { connector: 3, academic: 1 }, lesson: { kicker: "MENTORSHIP", title: "Mentorship", body: "Get involved in mentorship and support other members through their college experience." } },
      { text: "Help build a community", icon: "🏠", weights: { connector: 2, social: 2 }, lesson: { kicker: "FUSION FAMS", title: "FUSION Fams", body: "Take on a role within your Fam and help create a close-knit community within FUSION." } },
      { text: "Create what people see", icon: "🎨", weights: { builder: 2, social: 1, networker: 1 }, lesson: { kicker: "PUBLICITY & MEDIA", title: "Publicity & Media", body: "Join a committee and contribute through design, content, photography, video, social media, and more." } }
    ]
  }
];

const archetypes = {
  builder: { title: "The Builder", subtitle: "You like making ideas real.", icon: "🔧", description: "You gravitate toward making, improving, and figuring things out. In FUSION, that could mean joining a project team, creating for the org, or eventually leading a project yourself.", programs: ["FUSION Projects", "FUSIONCon", "Project Leadership"] },
  networker: { title: "The Networker", subtitle: "You're always looking for what's next.", icon: "🤝", description: "You gravitate toward new opportunities, people, and experiences. FUSION can connect you with alumni and industry professionals, help you build skills, and give you chances to take on more responsibility.", programs: ["Professional Development", "Alumni & Industry", "FUSION Internship"] },
  academic: { title: "The Academic Weapon", subtitle: "You like having a plan and people to lock in with.", icon: "📚", description: "You value growth, structure, and people who help each other succeed. In FUSION, you can find classmates, study with friends, share resources, and get support through UCI's academic grind.", programs: ["Academic Programs", "Study Hours", "Mentorship"] },
  social: { title: "The Social Butterfly", subtitle: "You're here for the people and the memories.", icon: "🎉", description: "You want college to be more than classes. FUSION gives you plenty of ways to turn familiar faces into friends through weekly socials, sports, retreats, and events throughout the year.", programs: ["FU-Fridays", "FU-Fit & Intramurals", "FUSION Fams"] },
  connector: { title: "The Connector", subtitle: "Community matters to you.", icon: "❤️", description: "You care about finding your people and helping others feel included too. FUSION offers smaller communities, mentorship, cultural programming, and ways to help build that community for someone else.", programs: ["FUSION Fams", "FUSION Mentorship", "Cultural Programming"] }
};

const CONFIG = {
  googleForms: {
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScGSM_W8Q05jaC7Cw7ss9R0I-2QT2FuqRLz0K4QLagi03NUbw/formResponse',
    archetypeEntry: 'entry.1977860921',
    question1Entry: 'entry.1746241827',
    question2Entry: 'entry.494545951',
    question3Entry: 'entry.1056565161'
  },
  quiz: { totalQuestions: 3, lessonDuration: 4000, revealDuration: 850 }
};