let currentQuestion = 0;
let userAnswers = [];
let lessonTimeout = null;
let scores = { builder: 0, networker: 0, academic: 0, social: 0, connector: 0 };

const screens = {
  start: document.getElementById('start-screen'),
  quiz: document.getElementById('quiz-screen'),
  lesson: document.getElementById('lesson-screen'),
  reveal: document.getElementById('reveal-screen')
};

function showScreen(name) {
  Object.values(screens).forEach(screen => screen.classList.remove('active'));
  screens[name].classList.add('active');
}

function startQuiz() {
  currentQuestion = 0;
  userAnswers = [];
  scores = { builder: 0, networker: 0, academic: 0, social: 0, connector: 0 };
  showScreen('quiz');
  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentQuestion];
  document.getElementById('question-eyebrow').textContent = q.eyebrow;
  document.getElementById('question-text').textContent = q.question;
  document.getElementById('progress-text').textContent = `${currentQuestion + 1} / ${questions.length}`;
  document.getElementById('progress-fill').style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  document.getElementById('back-btn').style.visibility = currentQuestion === 0 ? 'hidden' : 'visible';

  const container = document.getElementById('answers-container');
  container.innerHTML = '';
  q.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'answer-btn';
    button.innerHTML = `<span class="answer-index">0${index + 1}</span><span class="answer-icon">${answer.icon}</span><span class="answer-copy">${answer.text}</span>`;
    button.addEventListener('click', () => selectAnswer(answer));
    container.appendChild(button);
  });
}

function recalculateScores() {
  scores = { builder: 0, networker: 0, academic: 0, social: 0, connector: 0 };
  userAnswers.forEach(answer => {
    if (!answer) return;
    Object.entries(answer.weights).forEach(([type, value]) => scores[type] += value);
  });
}

function selectAnswer(answer) {
  userAnswers[currentQuestion] = answer;
  recalculateScores();
  showLesson(answer);
}

function showLesson(answer) {
  const lesson = answer.lesson;
  document.getElementById('lesson-icon').textContent = answer.icon;
  document.getElementById('lesson-kicker').textContent = lesson.kicker;
  document.getElementById('lesson-title').textContent = lesson.title;
  document.getElementById('lesson-body').textContent = lesson.body;
  const photo = document.getElementById('lesson-photo');
  photo.src = programPhotos[lesson.title] || '';
  photo.alt = `${lesson.title} at FUSION`;
  const timer = document.getElementById('lesson-timer');
  timer.style.animation = 'none';
  void timer.offsetWidth;
  timer.style.animation = `lessonProgress ${CONFIG.quiz.lessonDuration}ms linear forwards`;
  showScreen('lesson');
  clearTimeout(lessonTimeout);
  lessonTimeout = setTimeout(advanceAfterLesson, CONFIG.quiz.lessonDuration);
}

function advanceAfterLesson() {
  clearTimeout(lessonTimeout);
  if (currentQuestion < questions.length - 1) {
    currentQuestion += 1;
    showScreen('quiz');
    renderQuestion();
  } else {
    showReveal();
  }
}

function goBack() {
  if (currentQuestion === 0) return;
  currentQuestion -= 1;
  userAnswers = userAnswers.slice(0, currentQuestion + 1);
  recalculateScores();
  showScreen('quiz');
  renderQuestion();
}

function getResult() {
  const max = Math.max(...Object.values(scores));
  const tied = Object.keys(scores).filter(type => scores[type] === max);
  if (tied.length === 1) return tied[0];
  for (let i = userAnswers.length - 1; i >= 0; i--) {
    const ranked = Object.entries(userAnswers[i].weights).sort((a, b) => b[1] - a[1]);
    const match = ranked.find(([type]) => tied.includes(type));
    if (match) return match[0];
  }
  return tied[0];
}

function showReveal() {
  showScreen('reveal');
  const result = getResult();
  submitToGoogleForm(result);
  setTimeout(() => { window.location.href = `/${result}`; }, CONFIG.quiz.revealDuration);
}

async function submitToGoogleForm(resultType) {
  try {
    const fd = new FormData();
    fd.append(CONFIG.googleForms.archetypeEntry, resultType);
    userAnswers.forEach((answer, index) => {
      const key = CONFIG.googleForms[`question${index + 1}Entry`];
      if (key) fd.append(key, answer.text);
    });
    if (navigator.sendBeacon && navigator.sendBeacon(CONFIG.googleForms.formUrl, fd)) return;
    await fetch(CONFIG.googleForms.formUrl, { method: 'POST', mode: 'no-cors', body: fd, keepalive: true });
  } catch (error) {
    console.warn('Quiz analytics submission skipped.', error);
  }
}

document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('back-btn').addEventListener('click', goBack);
document.getElementById('skip-lesson').addEventListener('click', advanceAfterLesson);