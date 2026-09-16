const questions = [
  {
    eyebrow: "START HERE",
    question: "What are you looking for at UCI?",
    answers: [
      { text: "Build cool things", icon: "🔧", weights: { builder: 3, academic: 1 }, lesson: { kicker: "MAKE SOMETHING REAL", title: "FUSION Projects", body: "Join a year-long technical project team, build something real, and showcase your work at FUSIONCon." } },
      { text: "Career opportunities", icon: "💼", weights: { networker: 3, academic: 1 }, lesson: { kicker: "LEVEL UP", title: "Professional Development", body: "Meet industry professionals and alumni through networking events, workshops, and career programming." } },
      { text: "Academic support", icon: "📚", weights: { academic: 3, connector: 1 }, lesson: { kicker: "LOCK IN TOGETHER", title: "Academic Programs", body: "Find study spaces, academic resources, workshops, and other students taking the same classes." } },
      { text: "People to have fun with", icon: "🎉", weights: { social: 3, connector: 1 }, lesson: { kicker: "THERE'S ALWAYS SOMETHING", title: "Socials", body: "From FU-Fridays to retreats and other events, there are plenty of ways to meet people and make memories outside class." } },
      { text: "A community I belong to", icon: "❤️", weights: { connector: 3, social: 1 }, lesson: { kicker: "FIND YOUR PEOPLE", title: "FUSION Fams", body: "Join a smaller community within FUSION and build closer friendships throughout the year." } }
    ]
  },
  {
    eyebrow: "PICK A SIDE QUEST",
    question: "What sounds most like your kind of thing?",
    answers: [
      { text: "Make something worth remembering", icon: "📸", weights: { builder: 2, connector: 1, social: 1 }, lesson: { kicker: "CAPTURE THE YEAR", title: "FUSIONBook", body: "Help capture the people, memories, and moments that make up FUSION and turn them into our annual yearbook." } },
      { text: "Explore culture & community", icon: "🌏", weights: { connector: 3, academic: 1 }, lesson: { kicker: "MORE THAN STEM", title: "Cultural Programming", body: "Connect with Filipinx culture and identity through workshops, discussions, events, and community experiences." } },
      { text: "Get a team together and compete", icon: "🏐", weights: { social: 3, builder: 1 }, lesson: { kicker: "GET IN THE GAME", title: "FU-Fit & Intramurals", body: "Play alongside other FUSION members through IM teams, sports, and active events throughout the year." } },
      { text: "Meet people outside my usual circle", icon: "🤝", weights: { networker: 2, connector: 2 }, lesson: { kicker: "THE BIGGER COMMUNITY", title: "Alyansa", body: "Connect with the wider Filipinx community at UCI through collaborations with our fellow Alyansa organizations." } },
      { text: "Find my people", icon: "🛋️", weights: { connector: 3, social: 1 }, lesson: { kicker: "YOUR PEOPLE WITHIN FUSION", title: "FUSION Mentorship", body: "Join a mentorship line with people who share similar interests, goals, and experiences." } }
    ]
  },
  {
    eyebrow: "YOUR NEXT MOVE",
    question: "You've been in FUSION for a bit. How would you want to get involved?",
    answers: [
      { text: "Lead a team and build something", icon: "🛠️", weights: { builder: 3, networker: 1 }, lesson: { kicker: "TAKE THE LEAD", title: "Project Leadership", body: "Become a project lead and guide a team through designing and building a year-long technical project." } },
      { text: "Get experience behind the scenes", icon: "🌱", weights: { networker: 3, builder: 1 }, lesson: { kicker: "SEE HOW IT RUNS", title: "FUSION Internship", body: "Apply to our internship program to work alongside board and learn how different parts of FUSION operate." } },
      { text: "Help someone else grow", icon: "🫶", weights: { connector: 3, academic: 1 }, lesson: { kicker: "PASS IT FORWARD", title: "Mentorship", body: "Get involved in mentorship and support other members through their college experience." } },
      { text: "Help build a community", icon: "🏠", weights: { connector: 2, social: 2 }, lesson: { kicker: "MAKE FUSION FEEL SMALLER", title: "FUSION Fams", body: "Take on a role within your Fam and help create a close-knit community within FUSION." } },
      { text: "Create what people see", icon: "🎨", weights: { builder: 2, social: 1, networker: 1 }, lesson: { kicker: "SHAPE THE FUSION LOOK", title: "Publicity & Media", body: "Join a committee and contribute through design, content, photography, video, social media, and more." } }
    ]
  }
];

const archetypes = {
  builder: { title: "The Builder", subtitle: "You turn ideas into things people can actually see, use, and rally around.", icon: "🔧", description: "You light up when there is something to make, improve, or figure out. FUSION gives you room to build with other people, whether that means joining a project team, creating for the org, or eventually leading something yourself.", programs: ["FUSION Projects", "FUSIONCon", "Project Leadership"] },
  networker: { title: "The Networker", subtitle: "You're curious about what's next and you're not afraid to go find it.", icon: "🤝", description: "You gravitate toward opportunities, new people, and experiences that move you forward. FUSION can be a launchpad for meeting alumni and industry professionals, growing your skills, and taking on roles with real responsibility.", programs: ["Professional Development", "Alumni & Industry", "FUSION Internship"] },
  academic: { title: "The Academic Weapon", subtitle: "You like having a plan, good people around you, and somewhere to lock in.", icon: "📚", description: "You value growth, structure, and people who help each other succeed. FUSION is a place to find classmates, study alongside friends, share resources, and make the academic side of UCI feel a little less solo.", programs: ["Academic Programs", "Study Hours", "Mentorship"] },
  social: { title: "The Social Butterfly", subtitle: "You bring the energy and make college feel like college.", icon: "🎉", description: "You are here for the people and the memories as much as anything else. FUSION has plenty of ways to turn familiar faces into actual friends, from weekly socials and sports to the bigger moments throughout the year.", programs: ["FU-Fridays", "FU-Fit & Intramurals", "FUSION Fams"] },
  connector: { title: "The Connector", subtitle: "You care about finding your people and making sure others find theirs too.", icon: "❤️", description: "Community matters to you. You notice the people around you and value spaces where everyone can feel included. FUSION gives you smaller communities, mentorship, cultural programming, and plenty of ways to help create that feeling for someone else.", programs: ["FUSION Fams", "FUSION Mentorship", "Cultural Programming"] }
};

const CONFIG = {
  googleForms: {
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScGSM_W8Q05jaC7Cw7ss9R0I-2QT2FuqRLz0K4QLagi03NUbw/formResponse',
    archetypeEntry: 'entry.1977860921',
    question1Entry: 'entry.1746241827',
    question2Entry: 'entry.494545951',
    question3Entry: 'entry.1056565161'
  },
  quiz: { totalQuestions: 3, lessonDuration: 2100, revealDuration: 850 }
};