// ============================================================
//  Skill Issue — SQL & database practice
// ============================================================

// ---- STATE ----
const state = {
  completedLessons: JSON.parse(localStorage.getItem('completedLessons') || '[]'),
  quizScores: JSON.parse(localStorage.getItem('quizScores') || '{}'),
  streak: parseInt(localStorage.getItem('streak') || '1'),
};

function saveState() {
  localStorage.setItem('completedLessons', JSON.stringify(state.completedLessons));
  localStorage.setItem('quizScores', JSON.stringify(state.quizScores));
  localStorage.setItem('streak', state.streak);
}

// ---- MOTIVATIONAL MESSAGES ----
const MOTIVATIONAL = [
  { emoji: '⚡', title: 'Ready to level up your SQL?', sub: 'Each database lesson takes under 5 minutes. You got this.' },
  { emoji: '🚀', title: "Let's keep the momentum going!", sub: 'One query at a time builds real database fluency.' },
  { emoji: '🎯', title: 'Focus in. Progress awaits.', sub: 'SQL gets clearer when you practice against real tables.' },
  { emoji: '💡', title: 'Curiosity → Query → Confidence', sub: 'Every result set you inspect makes the next query easier.' },
  { emoji: '🔥', title: 'Your SQL streak is alive. Keep it burning.', sub: 'Consistency beats intensity. Show up for one database task today.' },
];

// ---- ROUTING ----
function showPage(id) {
  if (id === 'progress') renderProgressPage();
  if (id === 'home') renderHome();
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id)?.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.page === id);
  });
  // Close mobile sidebar
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('open');
}

// ---- SIDEBAR NAV ----
document.querySelectorAll('.nav-item[data-page]').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    showPage(item.dataset.page);
  });
});

// ---- MOBILE HAMBURGER ----
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('open');
});
document.getElementById('sidebar-overlay').addEventListener('click', () => {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('open');
});

// ---- PROGRESS BAR ----
function updateProgress() {
  const total = LESSONS.length;
  const done = state.completedLessons.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  
  const progressBar = document.getElementById('sidebar-progress-bar');
  const progressText = document.getElementById('sidebar-progress-text');
  const streakCount = document.getElementById('streak-count');
  
  if (progressBar) progressBar.style.width = pct + '%';
  if (progressText) progressText.textContent = `${done} / ${total}`;
  if (streakCount) streakCount.textContent = state.streak;

  // Update motivational banner
  const msg = done === 0
    ? MOTIVATIONAL[0]
    : done >= total
    ? { emoji: '🏆', title: 'All lessons complete! Your SQL foundation is strong.', sub: 'Try the database challenges to push your skills further.' }
    : MOTIVATIONAL[Math.min(Math.floor((done / total) * 4) + 1, MOTIVATIONAL.length - 1)];
  
  const banner = document.getElementById('motivational-banner');
  if (banner) {
    document.getElementById('banner-title').textContent = msg.title;
    document.getElementById('banner-sub').textContent = msg.sub;
    banner.querySelector('.banner-emoji').textContent = msg.emoji;
  }

  renderHome();
}

// ============================================================
//  HOME PAGE
// ============================================================
function getNextLesson() {
  return LESSONS.find(lesson => !state.completedLessons.includes(lesson.id)) || LESSONS[0];
}

function renderHome() {
  const metrics = document.getElementById('home-metrics');
  if (!metrics) return;

  const total = LESSONS.length;
  const done = state.completedLessons.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const quizCount = Object.keys(state.quizScores).length;
  const nextLesson = getNextLesson();

  metrics.innerHTML = `
    <div class="home-metric">
      <div class="home-metric-value">${pct}%</div>
      <div class="home-metric-label">SQL database path</div>
    </div>
    <div class="home-metric">
      <div class="home-metric-value">${done}/${total}</div>
      <div class="home-metric-label">Lessons completed</div>
    </div>
    <div class="home-metric">
      <div class="home-metric-value">${quizCount}</div>
      <div class="home-metric-label">Quizzes taken</div>
    </div>`;

  const nextTitle = document.getElementById('next-step-title');
  const nextCopy = document.getElementById('next-step-copy');
  if (!nextTitle || !nextCopy) return;

  if (done >= total) {
    nextTitle.textContent = 'You finished the SQL database lessons';
    nextCopy.textContent = 'Keep the skill warm with quizzes, challenges, and sandbox database practice.';
  } else {
    nextTitle.textContent = `Next lesson: ${nextLesson.title}`;
    nextCopy.textContent = nextLesson.desc;
  }
}

function continueSqlCourse() {
  showPage('lessons');
}

function studyNextLesson() {
  const nextLesson = getNextLesson();
  if (nextLesson) openLesson(nextLesson.id);
}

document.getElementById('home-start-btn')?.addEventListener('click', continueSqlCourse);
document.getElementById('course-sql-btn')?.addEventListener('click', continueSqlCourse);
document.getElementById('next-step-btn')?.addEventListener('click', studyNextLesson);
document.getElementById('home-progress-btn')?.addEventListener('click', () => {
  renderProgressPage();
  showPage('progress');
});

// ============================================================
//  LESSONS PAGE
// ============================================================
function renderLessons() {
  const tabs = ['basics', 'filtering', 'joins', 'aggregates', 'advanced'];
  tabs.forEach(tab => {
    const grid = document.getElementById('grid-' + tab);
    if (!grid) return;
    grid.innerHTML = '';
    LESSONS.filter(l => l.tab === tab).forEach(lesson => {
      const done = state.completedLessons.includes(lesson.id);
      const card = document.createElement('div');
      card.className = 'lesson-card' + (done ? ' completed' : '');
      card.innerHTML = `
        <div class="lesson-card-icon">${lesson.icon}</div>
        <div class="lesson-card-title">${lesson.title}</div>
        <div class="lesson-card-desc">${lesson.desc}</div>
        <div class="lesson-card-footer">
          <span class="badge badge-${lesson.difficulty}">${lesson.difficulty}</span>
          ${done ? '<span class="badge badge-done">✓ done</span>' : ''}
          <span class="lesson-card-time">~3 min</span>
        </div>`;
      card.addEventListener('click', () => openLesson(lesson.id));
      grid.appendChild(card);
    });
  });
}

// ---- LESSON TABS ----
document.querySelectorAll('.ltab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.lesson-tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab)?.classList.add('active');
  });
});

// ---- OPEN LESSON ----
let currentLessonId = null;
function openLesson(id) {
  const lesson = LESSONS.find(l => l.id === id);
  if (!lesson) return;
  currentLessonId = id;

  document.getElementById('lesson-body').innerHTML = lesson.content;

  // Quick check
  const qcEl = document.getElementById('lesson-quick-check');
  if (lesson.practice) {
    const p = lesson.practice;
    qcEl.innerHTML = `
      <div class="qc-label">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        Quick Check
      </div>
      <div class="qc-question">${p.q}</div>
      <div class="qc-options">
        ${p.options.map((opt, i) => `<div class="qc-option" data-i="${i}">${opt}</div>`).join('')}
      </div>
      <div class="qc-explain" id="qc-explain" style="display:none"></div>`;
    qcEl.querySelectorAll('.qc-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const chosen = parseInt(opt.dataset.i);
        qcEl.querySelectorAll('.qc-option').forEach(o => {
          const idx = parseInt(o.dataset.i);
          o.style.pointerEvents = 'none';
          if (idx === p.answer) o.classList.add('correct');
          else if (idx === chosen && chosen !== p.answer) o.classList.add('wrong');
        });
        const exp = document.getElementById('qc-explain');
        exp.style.display = 'block';
        exp.innerHTML = `<strong>${chosen === p.answer ? '✓ Correct!' : '✗ Not quite.'}</strong> ${p.explain}`;
      });
    });
  } else {
    qcEl.innerHTML = '';
  }

  // Nav buttons
  const navEl = document.getElementById('lesson-nav-btns');
  const idx = LESSONS.findIndex(l => l.id === id);
  navEl.innerHTML = '';
  if (idx > 0) {
    const prev = document.createElement('button');
    prev.className = 'btn btn-ghost';
    prev.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg> Previous`;
    prev.addEventListener('click', () => openLesson(LESSONS[idx - 1].id));
    navEl.appendChild(prev);
  }
  if (idx < LESSONS.length - 1) {
    const next = document.createElement('button');
    next.className = 'btn btn-primary';
    next.innerHTML = `Next <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`;
    next.addEventListener('click', () => openLesson(LESSONS[idx + 1].id));
    navEl.appendChild(next);
  }

  // Mark complete button
  const markBtn = document.getElementById('mark-complete-btn');
  const isDone = state.completedLessons.includes(id);
  markBtn.innerHTML = isDone
    ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Completed`
    : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Mark complete`;
  markBtn.className = isDone ? 'btn btn-success' : 'btn btn-success';

  showPage('lesson-detail');
}

document.getElementById('lesson-back').addEventListener('click', () => showPage('lessons'));

document.getElementById('mark-complete-btn').addEventListener('click', () => {
  if (currentLessonId === null) return;
  if (!state.completedLessons.includes(currentLessonId)) {
    state.completedLessons.push(currentLessonId);
    saveState();
    renderLessons();
    updateProgress();
    openLesson(currentLessonId); // refresh button state
    // Small celebration
    confettiPop();
  }
});

document.getElementById('go-practice-btn').addEventListener('click', () => showPage('sandbox'));

// ---- CONFETTI ----
function confettiPop() {
  const colors = ['#7c6af7', '#a78bfa', '#34d899', '#f5c542', '#f26b6b'];
  for (let i = 0; i < 28; i++) {
    const el = document.createElement('div');
    el.style.cssText = `
      position:fixed; pointer-events:none; z-index:9999;
      width:${4+Math.random()*6}px; height:${4+Math.random()*6}px;
      border-radius:${Math.random()>0.5?'50%':'2px'};
      background:${colors[Math.floor(Math.random()*colors.length)]};
      left:${20+Math.random()*60}vw; top:40vh;
      transition: transform 1.2s cubic-bezier(.4,0,.2,1), opacity 1.2s ease;
      opacity:1;
    `;
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.transform = `translate(${(Math.random()-0.5)*300}px, ${-150-Math.random()*200}px) rotate(${Math.random()*720}deg)`;
      el.style.opacity = '0';
    });
    setTimeout(() => el.remove(), 1400);
  }
}

// ============================================================
//  CHEAT SHEET
// ============================================================
function renderCheatsheet() {
  const grid = document.getElementById('cheatsheet-grid');
  CHEATSHEET.forEach(section => {
    const card = document.createElement('div');
    card.className = 'cs-card';
    card.innerHTML = `
      <div class="cs-card-header">${section.category}</div>
      ${section.rows.map(r => `
        <div class="cs-row">
          <div class="cs-kw">${r.kw}</div>
          <div class="cs-desc">${r.desc}</div>
        </div>`).join('')}`;
    grid.appendChild(card);
  });
}

// ============================================================
//  QUIZZES
// ============================================================
function renderQuizHome() {
  const grid = document.getElementById('quiz-home-grid');
  QUIZZES.forEach(quiz => {
    const score = state.quizScores[quiz.id];
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.innerHTML = `
      <div class="quiz-card-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      </div>
      <div class="quiz-card-title">${quiz.title}</div>
      <div class="quiz-card-desc">${quiz.desc}</div>
      <div class="quiz-card-footer">
        <span class="badge badge-${quiz.difficulty}">${quiz.difficulty}</span>
        ${score !== undefined ? `<span class="quiz-card-score">${score}/${quiz.questions.length}</span>` : ''}
      </div>`;
    card.addEventListener('click', () => startQuiz(quiz.id));
    grid.appendChild(card);
  });
}

let activeQuiz = null, quizQ = 0, quizScore = 0;

function startQuiz(id) {
  activeQuiz = QUIZZES.find(q => q.id === id);
  if (!activeQuiz) return;
  quizQ = 0; quizScore = 0;
  document.getElementById('quiz-result-area').style.display = 'none';
  document.getElementById('quiz-question-area').style.display = 'block';
  showPage('quiz-active');
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const q = activeQuiz.questions[quizQ];
  const total = activeQuiz.questions.length;
  document.getElementById('quiz-progress-label').textContent = `${quizQ + 1} / ${total}`;
  document.getElementById('quiz-progress-fill').style.width = ((quizQ + 1) / total * 100) + '%';

  const letters = ['A', 'B', 'C', 'D'];
  const area = document.getElementById('quiz-question-area');
  area.innerHTML = `
    <div class="quiz-question-card">
      <div class="quiz-q-num">Question ${quizQ + 1} of ${total}</div>
      <div class="quiz-q-text">${q.q}</div>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `
          <div class="quiz-option" data-i="${i}">
            <span class="quiz-option-letter">${letters[i]}</span>
            ${opt}
          </div>`).join('')}
      </div>
      <div class="quiz-explain" id="quiz-explain"></div>
    </div>`;

  area.querySelectorAll('.quiz-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const chosen = parseInt(opt.dataset.i);
      const correct = q.answer;
      area.querySelectorAll('.quiz-option').forEach(o => {
        o.classList.add('disabled');
        const idx = parseInt(o.dataset.i);
        if (idx === correct) o.classList.add('correct');
        else if (idx === chosen && chosen !== correct) o.classList.add('wrong');
      });
      if (chosen === correct) quizScore++;
      const exp = document.getElementById('quiz-explain');
      exp.style.display = 'block';
      exp.innerHTML = `<strong>${chosen === correct ? '✓ Correct!' : '✗ Not quite.'}</strong> ${q.explain}`;

      // Add next/finish button
      const nextBtn = document.createElement('button');
      nextBtn.className = 'btn btn-primary quiz-next-btn';
      const isLast = quizQ === activeQuiz.questions.length - 1;
      nextBtn.textContent = isLast ? 'See results →' : 'Next question →';
      nextBtn.addEventListener('click', () => {
        if (isLast) finishQuiz();
        else { quizQ++; renderQuizQuestion(); }
      });
      area.querySelector('.quiz-question-card').appendChild(nextBtn);
    });
  });
}

function finishQuiz() {
  state.quizScores[activeQuiz.id] = quizScore;
  saveState();
  const total = activeQuiz.questions.length;
  const pct = quizScore / total;
  document.getElementById('quiz-question-area').style.display = 'none';
  const resultArea = document.getElementById('quiz-result-area');
  resultArea.style.display = 'flex';
  resultArea.style.justifyContent = 'center';
  document.getElementById('result-score-display').textContent = `${quizScore}/${total}`;
  document.getElementById('result-label-display').textContent =
    pct === 1 ? '🏆 Perfect score! Legendary.' :
    pct >= 0.8 ? '🔥 Great work — keep it up!' :
    pct >= 0.6 ? '💪 Good effort — try again to master it.' :
    '📚 Review the lessons and try again.';
  if (pct === 1) confettiPop();
}

document.getElementById('quiz-back-btn').addEventListener('click', () => showPage('quiz'));
document.getElementById('result-back-btn').addEventListener('click', () => showPage('quiz'));
document.getElementById('result-retry-btn').addEventListener('click', () => startQuiz(activeQuiz.id));

// ============================================================
//  SANDBOX
// ============================================================
function runQuery(sql) {
  try {
    const result = executeSQLQuery(sql, DB);
    renderOutput(result);
  } catch (e) {
    document.getElementById('output-panel').innerHTML = `<div class="output-error">⚠ ${e.message}</div>`;
  }
}

function renderOutput({ rows, time }) {
  const panel = document.getElementById('output-panel');
  if (!rows.length) {
    panel.innerHTML = `<div class="output-success"><div class="output-meta">0 rows returned · ${time}ms</div><div style="color:var(--text-faint);font-size:13px">No results matched your query.</div></div>`;
    return;
  }
  const cols = Object.keys(rows[0]);
  panel.innerHTML = `
    <div class="output-success">
      <div class="output-meta">${rows.length} row${rows.length !== 1 ? 's' : ''} returned · ${time}ms</div>
      <table class="result-table">
        <thead><tr>${cols.map(c => `<th>${c}</th>`).join('')}</tr></thead>
        <tbody>${rows.map(r => `<tr>${cols.map(c => `<td>${r[c] == null ? '<span class="null-val">NULL</span>' : r[c]}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>
    </div>`;
}

document.getElementById('run-btn').addEventListener('click', () => {
  runQuery(document.getElementById('sql-editor').value);
});
document.getElementById('sql-editor').addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') runQuery(document.getElementById('sql-editor').value);
});

function renderQuickQueries() {
  const container = document.getElementById('quick-queries');
  SANDBOX_QUERIES.forEach(q => {
    const btn = document.createElement('button');
    btn.className = 'quick-query-btn';
    btn.textContent = q.label;
    btn.addEventListener('click', () => {
      document.getElementById('sql-editor').value = q.sql;
      runQuery(q.sql);
    });
    container.appendChild(btn);
  });
}

// ============================================================
//  SQL ENGINE
// ============================================================
function executeSQLQuery(sql, db) {
  const start = performance.now();
  const s = sql.trim().replace(/;$/, '').trim();
  const rows = parseAndRun(s, db);
  const time = Math.round(performance.now() - start);
  return { rows, time };
}

function parseAndRun(sql, db) {
  const upper = sql.toUpperCase();
  if (!upper.startsWith('SELECT')) throw new Error("Only SELECT statements are supported in the sandbox.");

  // Parse SELECT ... FROM ... WHERE ... ORDER BY ... LIMIT ... OFFSET
  const fromMatch = sql.match(/\bFROM\s+(\w+)(?:\s+(?:AS\s+)?(\w+))?/i);
  if (!fromMatch) throw new Error("Missing FROM clause.");
  const tableName = fromMatch[1].toLowerCase();
  const tableAlias = fromMatch[2] || tableName;

  if (!db[tableName]) throw new Error(`Table "${tableName}" does not exist.`);
  let rows = db[tableName].map(r => ({ ...r }));

  // JOINs
  const joinRegex = /\b(INNER JOIN|LEFT JOIN|RIGHT JOIN|JOIN)\s+(\w+)(?:\s+(?:AS\s+)?(\w+))?\s+ON\s+([\w.]+)\s*=\s*([\w.]+)/gi;
  let joinMatch;
  while ((joinMatch = joinRegex.exec(sql)) !== null) {
    const joinType = joinMatch[1].toUpperCase();
    const joinTable = joinMatch[2].toLowerCase();
    const joinAlias = joinMatch[3] || joinTable;
    if (!db[joinTable]) throw new Error(`Table "${joinTable}" does not exist.`);
    const joinRows = db[joinTable].map(r => ({ ...r }));
    const leftCol = joinMatch[4].split('.').pop();
    const rightCol = joinMatch[5].split('.').pop();
    const result = [];
    if (joinType === 'LEFT JOIN') {
      rows.forEach(lr => {
        const matches = joinRows.filter(rr => lr[leftCol] == rr[rightCol]);
        if (matches.length) matches.forEach(rr => result.push({ ...lr, ...rr }));
        else result.push({ ...lr, ...Object.fromEntries(Object.keys(joinRows[0] || {}).map(k => [k, null])) });
      });
    } else {
      rows.forEach(lr => {
        const matches = joinRows.filter(rr => lr[leftCol] == rr[rightCol]);
        matches.forEach(rr => result.push({ ...lr, ...rr }));
      });
    }
    rows = result;
  }

  // WHERE
  const whereMatch = sql.match(/\bWHERE\b(.*?)(?:\bGROUP BY\b|\bORDER BY\b|\bLIMIT\b|$)/is);
  if (whereMatch) {
    const cond = whereMatch[1].trim();
    rows = rows.filter(r => evalWhere(cond, r));
  }

  // GROUP BY + aggregates
  const groupMatch = sql.match(/\bGROUP BY\b(.*?)(?:\bHAVING\b|\bORDER BY\b|\bLIMIT\b|$)/is);
  if (groupMatch) {
    const groupCols = groupMatch[1].trim().split(',').map(c => c.trim().split('.').pop());
    const groups = {};
    rows.forEach(r => {
      const key = groupCols.map(c => r[c]).join('|');
      if (!groups[key]) groups[key] = { _rows: [], ...Object.fromEntries(groupCols.map(c => [c, r[c]])) };
      groups[key]._rows.push(r);
    });
    // Parse SELECT for aggregates
    const selectPart = sql.match(/^SELECT(.*?)FROM/is)[1];
    rows = Object.values(groups).map(g => {
      const out = {};
      groupCols.forEach(c => out[c] = g[c]);
      // Count
      const countMatch = selectPart.match(/COUNT\(\*\)(?:\s+AS\s+(\w+))?/i);
      if (countMatch) out[countMatch[1] || 'count'] = g._rows.length;
      const countDistinctMatch = selectPart.match(/COUNT\(DISTINCT\s+(\w+)\)(?:\s+AS\s+(\w+))?/i);
      if (countDistinctMatch) {
        const col = countDistinctMatch[1];
        const alias = countDistinctMatch[2] || 'count';
        out[alias] = new Set(g._rows.map(r => r[col]).filter(v => v != null)).size;
      }
      const sumMatch = selectPart.match(/SUM\((\w+)\)(?:\s+AS\s+(\w+))?/i);
      if (sumMatch) out[sumMatch[2] || 'sum'] = g._rows.reduce((a, r) => a + (r[sumMatch[1]] || 0), 0);
      const avgMatch = selectPart.match(/AVG\((\w+)\)(?:\s+AS\s+(\w+))?/i);
      if (avgMatch) { const vals = g._rows.map(r => r[avgMatch[1]]).filter(v => v != null); out[avgMatch[2] || 'avg'] = vals.length ? +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : null; }
      const maxMatch = selectPart.match(/MAX\((\w+)\)(?:\s+AS\s+(\w+))?/i);
      if (maxMatch) out[maxMatch[2] || 'max'] = Math.max(...g._rows.map(r => r[maxMatch[1]]));
      const minMatch = selectPart.match(/MIN\((\w+)\)(?:\s+AS\s+(\w+))?/i);
      if (minMatch) out[minMatch[2] || 'min'] = Math.min(...g._rows.map(r => r[minMatch[1]]));
      return out;
    });
  } else {
    // Standalone aggregates (no GROUP BY)
    const selectPart = sql.match(/^SELECT(.*?)FROM/is)[1];
    const avgMatch = selectPart.match(/AVG\((\w+)\)(?:\s+AS\s+(\w+))?/i);
    const countMatch = selectPart.match(/COUNT\(\*\)(?:\s+AS\s+(\w+))?/i) || selectPart.match(/COUNT\((\w+)\)(?:\s+AS\s+(\w+))?/i);
    const countDistinctMatch = selectPart.match(/COUNT\(DISTINCT\s+(\w+)\)(?:\s+AS\s+(\w+))?/i);
    const sumMatch = selectPart.match(/SUM\((\w+)\)(?:\s+AS\s+(\w+))?/i);
    if (avgMatch || (countMatch && selectPart.match(/COUNT/i)) || countDistinctMatch || sumMatch) {
      const out = {};
      if (avgMatch) { const vals = rows.map(r => r[avgMatch[1]]).filter(v => v != null); out[avgMatch[2] || 'avg'] = vals.length ? +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : null; }
      if (countMatch) out[countMatch[2] || countMatch[1] || 'count'] = rows.length;
      if (countDistinctMatch) out[countDistinctMatch[2] || 'count'] = new Set(rows.map(r => r[countDistinctMatch[1]]).filter(v => v != null)).size;
      if (sumMatch) out[sumMatch[2] || 'sum'] = rows.reduce((a, r) => a + (r[sumMatch[1]] || 0), 0);
      rows = [out];
    }
  }

  // SELECT columns
  const selectPart = sql.match(/^SELECT(.*?)FROM/is)[1].trim();
  if (selectPart !== '*') {
    const colDefs = selectPart.split(',').map(c => c.trim());
    rows = rows.map(r => {
      const out = {};
      colDefs.forEach(def => {
        if (/COUNT|SUM|AVG|MAX|MIN/i.test(def)) return; // already handled
        const asMatch = def.match(/(.+?)\s+AS\s+(\w+)/i);
        const expr = asMatch ? asMatch[1].trim() : def.trim();
        const alias = asMatch ? asMatch[2] : expr.split('.').pop();
        try {
          const normalized = expr.replace(/([A-Za-z_][A-Za-z0-9_]*)/g, (match) => r[match] !== undefined ? `r["${match}"]` : match);
          out[alias] = Function('r', '"use strict"; return (' + normalized + ')')(r);
        } catch {
          const col = expr.split('.').pop();
          if (r[col] !== undefined) out[alias] = r[col];
          else if (r[expr] !== undefined) out[alias] = r[expr];
          else out[alias] = null;
        }
      });
      // Keep aggregate keys
      Object.keys(r).forEach(k => { if (!(k in out) && /count|sum|avg|max|min/i.test(k)) out[k] = r[k]; });
      return out;
    });
  }

  // DISTINCT
  if (/\bSELECT\s+DISTINCT\b/i.test(sql)) {
    const seen = new Set();
    rows = rows.filter(r => { const k = JSON.stringify(r); if (seen.has(k)) return false; seen.add(k); return true; });
  }

  // ORDER BY
  const orderMatch = sql.match(/\bORDER BY\b(.*?)(?:\bLIMIT\b|$)/is);
  if (orderMatch) {
    const parts = orderMatch[1].trim().split(',').map(p => {
      const m = p.trim().match(/^([\w.]+)\s*(ASC|DESC)?$/i);
      return m ? { col: m[1].split('.').pop(), dir: (m[2] || 'ASC').toUpperCase() } : null;
    }).filter(Boolean);
    rows.sort((a, b) => {
      for (const { col, dir } of parts) {
        const av = a[col], bv = b[col];
        if (av == null && bv == null) continue;
        if (av == null) return dir === 'ASC' ? 1 : -1;
        if (bv == null) return dir === 'ASC' ? -1 : 1;
        if (av < bv) return dir === 'ASC' ? -1 : 1;
        if (av > bv) return dir === 'ASC' ? 1 : -1;
      }
      return 0;
    });
  }

  // LIMIT / OFFSET
  const limitMatch = sql.match(/\bLIMIT\s+(\d+)/i);
  const offsetMatch = sql.match(/\bOFFSET\s+(\d+)/i);
  const offset = offsetMatch ? parseInt(offsetMatch[1]) : 0;
  if (limitMatch) rows = rows.slice(offset, offset + parseInt(limitMatch[1]));

  return rows;
}

function evalWhere(cond, row) {
  // Handle IS NULL / IS NOT NULL
  let c = cond.replace(/(\w+)\s+IS\s+NOT\s+NULL/gi, (_, col) => `row["${col}"] != null`);
  c = c.replace(/(\w+)\s+IS\s+NULL/gi, (_, col) => `row["${col}"] == null`);
  // Handle LIKE
  c = c.replace(/(\w+)\s+LIKE\s+'([^']+)'/gi, (_, col, pattern) => {
    const rx = pattern.replace(/%/g, '.*').replace(/_/g, '.');
    return `new RegExp("^${rx}$", "i").test(String(row["${col}"] ?? ""))`;
  });
  // Handle BETWEEN
  c = c.replace(/(\w+)\s+BETWEEN\s+([^\s]+)\s+AND\s+([^\s,)]+)/gi, (_, col, lo, hi) => `(row["${col}"] >= ${lo} && row["${col}"] <= ${hi})`);
  // Handle modulo checks like owner_id % 2 = 0
  c = c.replace(/(\w+)\s*%\s*(\d+\.\d+|\d+)\s*=\s*(\d+\.\d+|\d+)/gi, (_, col, mod, val) => `(row["${col}"] % ${mod} == ${val})`);
  // Handle IN
  c = c.replace(/(\w+)\s+IN\s*\(([^)]+)\)/gi, (_, col, vals) => `[${vals}].includes(row["${col}"])`);
  // Handle col = 'str' and col = number
  c = c.replace(/(\w+)\s*<>\s*'([^']*)'/g, `row["$1"] != "$2"`);
  c = c.replace(/(\w+)\s*=\s*'([^']*)'/g, `row["$1"] == "$2"`);
  c = c.replace(/(\w+)\s*([<>!=]+)\s*(\d+\.?\d*)/g, `row["$1"] $2 $3`);
  c = c.replace(/\bAND\b/gi, '&&').replace(/\bOR\b/gi, '||').replace(/\bNOT\b/gi, '!');
  try { return Function('row', `"use strict"; return (${c})`)(row); }
  catch { return false; }
}

// ============================================================
//  CHALLENGES
// ============================================================
function renderChallenges() {
  const list = document.getElementById('challenges-list');
  CHALLENGES.forEach(ch => {
    const item = document.createElement('div');
    item.className = 'challenge-item';
    item.dataset.id = ch.id;
    item.innerHTML = `
      <div class="challenge-item-title">${ch.title}</div>
      <div class="challenge-item-meta"><span class="badge badge-${ch.difficulty}">${ch.difficulty}</span></div>`;
    item.addEventListener('click', () => openChallenge(ch.id));
    list.appendChild(item);
  });
}

function openChallenge(id) {
  const ch = CHALLENGES.find(c => c.id === id);
  if (!ch) return;
  document.querySelectorAll('.challenge-item').forEach(el => {
    el.classList.toggle('active', parseInt(el.dataset.id) === id);
  });
  const detail = document.getElementById('challenge-detail');
  detail.innerHTML = `
    <div class="challenge-content">
      <div><span class="badge badge-${ch.difficulty}">${ch.difficulty}</span></div>
      <div class="challenge-title">${ch.title}</div>
      <div class="challenge-desc">${ch.desc}</div>
      ${ch.hint ? `<div class="challenge-hint">💡 Hint: ${ch.hint}</div>` : ''}
      <div class="challenge-editor-wrap">
        <div class="challenge-editor-header">
          <span>SQL Editor</span>
          <button class="btn btn-primary btn-run" id="ch-run">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Run
          </button>
        </div>
        <textarea class="challenge-editor" id="ch-editor" spellcheck="false" placeholder="Write your SQL here..."></textarea>
      </div>
      <div id="ch-result" class="challenge-result info" style="display:none"></div>
    </div>`;
  document.getElementById('ch-run').addEventListener('click', () => {
    const sql = document.getElementById('ch-editor').value.trim();
    const res = document.getElementById('ch-result');
    if (!sql) { res.style.display='block'; res.className='challenge-result info'; res.textContent='Write a query first.'; return; }
    try {
      const { rows } = executeSQLQuery(sql, DB);
      const pass = ch.check(rows);
      res.style.display = 'block';
      res.className = 'challenge-result ' + (pass ? 'pass' : 'fail');
      res.textContent = pass ? '✓ Correct! Great work.' : `✗ Not quite. Got ${rows.length} row(s) — check your logic.`;
      if (pass) confettiPop();
    } catch(e) {
      res.style.display = 'block';
      res.className = 'challenge-result fail';
      res.textContent = '⚠ ' + e.message;
    }
  });
}

// ============================================================
//  EXAMS
// ============================================================
const PET_CLINIC_SCHEMA_SQL = `CREATE TABLE Owners (
    owner_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE Pets (
    pet_id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    species VARCHAR(30) NOT NULL,
    breed VARCHAR(50),
    birth_date DATE,
    allergies_or_notes TEXT,
    FOREIGN KEY (owner_id) REFERENCES Owners(owner_id) ON DELETE CASCADE
);

CREATE TABLE Staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE Services (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(100) NOT NULL,
    category ENUM('Medical', 'Beauty', 'Wellness', 'Recreation') NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    duration_minutes INT NOT NULL
);

CREATE TABLE Appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    pet_id INT NOT NULL,
    staff_id INT NOT NULL,
    service_id INT NOT NULL,
    appointment_timestamp DATETIME NOT NULL,
    status ENUM('Scheduled', 'Completed', 'Canceled', 'No-Show') DEFAULT 'Scheduled',
    total_cost DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (pet_id) REFERENCES Pets(pet_id) ON DELETE CASCADE,
    FOREIGN KEY (staff_id) REFERENCES Staff(staff_id),
    FOREIGN KEY (service_id) REFERENCES Services(service_id)
);

CREATE TABLE Medical_Details (
    medical_id INT AUTO_INCREMENT PRIMARY KEY,
    appointment_id INT UNIQUE NOT NULL,
    weight_kg DECIMAL(5, 2),
    temperature_c DECIMAL(4, 1),
    symptoms_reported TEXT,
    diagnosis TEXT,
    treatment_plan TEXT,
    follow_up_required BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (appointment_id) REFERENCES Appointments(appointment_id) ON DELETE CASCADE
);

CREATE TABLE Beauty_Details (
    beauty_id INT AUTO_INCREMENT PRIMARY KEY,
    appointment_id INT UNIQUE NOT NULL,
    haircut_style VARCHAR(100),
    shampoo_type VARCHAR(50),
    nail_trimming BOOLEAN DEFAULT TRUE,
    ear_cleaning BOOLEAN DEFAULT TRUE,
    grooming_notes TEXT,
    FOREIGN KEY (appointment_id) REFERENCES Appointments(appointment_id) ON DELETE CASCADE
);`;

function renderExamHome() {
  const grid = document.getElementById('exams-home-grid');
  if (!grid) return;
  grid.innerHTML = '';
  EXAMS.forEach(exam => {
    const questionCount = exam.sections.reduce((sum, section) => sum + section.questions.length, 0);
    const card = document.createElement('div');
    card.className = 'lesson-card';
    card.innerHTML = `
      <div class="lesson-card-icon">${exam.icon}</div>
      <div class="lesson-card-title">${exam.title}</div>
      <div class="lesson-card-desc">${exam.desc}</div>
      <div class="lesson-card-footer">
        <span class="badge badge-${exam.difficulty}">${exam.difficulty}</span>
        <span class="lesson-card-time">${questionCount} questions</span>
      </div>`;
    card.addEventListener('click', () => startExam(exam.id));
    grid.appendChild(card);
  });
}

let activeExam = null, examQ = 0, examAnswers = {}, examResults = {};

function startExam(id) {
  activeExam = EXAMS.find(e => e.id === id);
  if (!activeExam) return;
  examQ = 0;
  examAnswers = {};
  examResults = {};
  document.getElementById('exam-result-area').style.display = 'none';
  document.getElementById('exam-content-area').style.display = 'flex';
  showPage('exam-active');
  renderExamQuestion();
}

function getExamQuestionCount() {
  return activeExam.sections.reduce((sum, s) => sum + s.questions.length, 0);
}

function getExamQuestionByIndex(idx) {
  let count = 0;
  for (let s of activeExam.sections) {
    if (idx < count + s.questions.length) {
      return { section: s, question: s.questions[idx - count], sectionIndex: activeExam.sections.indexOf(s) };
    }
    count += s.questions.length;
  }
  return null;
}

function renderExamQuestion() {
  const qData = getExamQuestionByIndex(examQ);
  if (!qData) {
    finishExam();
    return;
  }

  const total = getExamQuestionCount();
  const pct = ((examQ + 1) / total) * 100;
  document.getElementById('exam-progress-label').textContent = `Question ${examQ + 1} / ${total}`;
  document.getElementById('exam-progress-fill').style.width = pct + '%';

  document.getElementById('exam-problem-title').textContent = activeExam.title;
  document.getElementById('exam-section-badge').textContent = activeExam.difficulty;
  document.getElementById('exam-section-badge').className = 'badge-chip badge-' + activeExam.difficulty;
  document.getElementById('exam-section-title').textContent = qData.section.title;
  document.getElementById('exam-question-number').textContent = `Question ${qData.question.num}`;
  document.getElementById('exam-scenario').textContent = qData.question.scenario;
  document.getElementById('exam-answer-hint').textContent = qData.section.instructions;

  const inputArea = document.getElementById('exam-answer-input');
  const hasStarterContent = activeExam.id === 1 && examQ === 0 && !examAnswers[examQ];
  inputArea.value = examAnswers[examQ] ?? (hasStarterContent ? PET_CLINIC_SCHEMA_SQL : '');
  updateExamEditorView();

  const fb = document.getElementById('exam-feedback');
  if (fb) { fb.style.display = 'none'; fb.textContent = ''; }

  const prevBtn = document.getElementById('exam-prev-btn');
  if (prevBtn) prevBtn.disabled = examQ === 0;

  const nextBtn = document.getElementById('exam-next-btn');
  if (nextBtn) nextBtn.textContent = (examQ === total - 1) ? 'Finish Exam' : 'Next Question';

  renderExamRightPanel(qData, null, null, false);

  inputArea.focus();
}

function nextExamQuestion() {
  examAnswers[examQ] = document.getElementById('exam-answer-input').value;
  examQ++;
  renderExamQuestion();
}

function prevExamQuestion() {
  examAnswers[examQ] = document.getElementById('exam-answer-input').value;
  if (examQ > 0) {
    examQ--;
    renderExamQuestion();
  }
}

// ------------------------------------------------------------
//  Compiler-style editor: syntax highlighting, line-number
//  gutter, and a live cursor/character status bar.
// ------------------------------------------------------------
const SQL_KEYWORDS = ['SELECT','FROM','WHERE','INSERT','INTO','VALUES','UPDATE','SET','DELETE','CREATE','TABLE',
  'ALTER','ADD','COLUMN','DROP','RENAME','TO','MODIFY','PRIMARY','KEY','DEFAULT','NOT','NULL','AND','OR',
  'ORDER','BY','GROUP','HAVING','LIMIT','OFFSET','AS','JOIN','INNER','LEFT','RIGHT','OUTER','ON','DISTINCT',
  'COUNT','SUM','AVG','MAX','MIN','BETWEEN','LIKE','IN','IS','ASC','DESC','VARCHAR','INT','INTEGER','BOOLEAN',
  'BOOL','DATE','DATETIME','TIMESTAMP','DECIMAL','FLOAT','DOUBLE','TEXT','CHAR','TRUE','FALSE','CURRENT_DATE',
  'CURRENT_TIMESTAMP','NOW','CURDATE','AUTO_INCREMENT','UNIQUE','FOREIGN','REFERENCES','CASCADE','IF','EXISTS'];

function examHighlightSQL(code) {
  const pattern = /('(?:[^'\\]|\\.)*')|(--[^\n]*)|(\b\d+\.?\d*\b)|(\b[A-Za-z_][A-Za-z0-9_]*\b)/g;
  let result = '', lastIndex = 0, m;
  while ((m = pattern.exec(code))) {
    result += escapeHtml(code.slice(lastIndex, m.index));
    if (m[1]) result += `<span class="tok-str">${escapeHtml(m[1])}</span>`;
    else if (m[2]) result += `<span class="tok-com">${escapeHtml(m[2])}</span>`;
    else if (m[3]) result += `<span class="tok-num">${escapeHtml(m[3])}</span>`;
    else if (m[4]) {
      const word = m[4];
      result += SQL_KEYWORDS.includes(word.toUpperCase())
        ? `<span class="tok-kw">${escapeHtml(word)}</span>`
        : escapeHtml(word);
    }
    lastIndex = pattern.lastIndex;
  }
  result += escapeHtml(code.slice(lastIndex));
  return result;
}

function updateExamEditorView() {
  const ta = document.getElementById('exam-answer-input');
  const hl = document.getElementById('exam-code-highlight');
  const gutter = document.getElementById('exam-code-gutter');
  const charCount = document.getElementById('exam-editor-charcount');
  if (!ta) return;
  const code = ta.value;

  if (hl) hl.innerHTML = `<code>${examHighlightSQL(code)}\n</code>`;

  if (gutter) {
    const lineCount = code.split('\n').length;
    let g = '';
    for (let i = 1; i <= lineCount; i++) g += i + (i < lineCount ? '\n' : '');
    gutter.textContent = g;
  }

  if (charCount) charCount.textContent = `${code.length} char${code.length === 1 ? '' : 's'}`;

  updateExamCursorPos();
}

function updateExamCursorPos() {
  const ta = document.getElementById('exam-answer-input');
  const posEl = document.getElementById('exam-editor-cursor-pos');
  if (!ta || !posEl) return;
  const value = ta.value;
  const caret = ta.selectionStart;
  const upToCaret = value.slice(0, caret);
  const lines = upToCaret.split('\n');
  const line = lines.length;
  const col = lines[lines.length - 1].length + 1;
  posEl.textContent = `Ln ${line}, Col ${col}`;
}

function initExamEditor() {
  const ta = document.getElementById('exam-answer-input');
  const hl = document.getElementById('exam-code-highlight');
  const gutter = document.getElementById('exam-code-gutter');
  if (!ta) return;

  ta.addEventListener('input', updateExamEditorView);
  ta.addEventListener('click', updateExamCursorPos);
  ta.addEventListener('keyup', updateExamCursorPos);

  ta.addEventListener('scroll', () => {
    if (hl) { hl.scrollTop = ta.scrollTop; hl.scrollLeft = ta.scrollLeft; }
    if (gutter) gutter.scrollTop = ta.scrollTop;
  });

  ta.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = ta.selectionStart, end = ta.selectionEnd;
      ta.value = ta.value.slice(0, start) + '  ' + ta.value.slice(end);
      ta.selectionStart = ta.selectionEnd = start + 2;
      updateExamEditorView();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      checkExamAnswer();
    }
  });
}
initExamEditor();

// ------------------------------------------------------------
//  Per-question exam SQL engine — runs INSERT/UPDATE/DELETE/
//  CREATE/ALTER/DROP/SELECT against an isolated per-question
//  seed table so "Your Output" vs "Expected Output" can show
//  real columns & rows, not just raw SQL text.
// ------------------------------------------------------------
const EXAM_NOW = '2026-06-20T09:00:00.000Z';
const EXAM_TODAY = '2026-06-20';

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function examCloneRows(rows) {
  return (rows || []).map(r => ({ ...r }));
}

function evalExpression(expr, row) {
  const normalized = String(expr).trim().replace(/([A-Za-z_][A-Za-z0-9_]*)/g, (match) => {
    if (row[match] !== undefined) return `row["${match}"]`;
    return match;
  });
  return Function('row', `"use strict"; return (${normalized})`)(row);
}

function examSplitTopLevel(str, sep) {
  const parts = [];
  let depth = 0, inQuote = null, cur = '';
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (inQuote) {
      cur += ch;
      if (ch === inQuote) inQuote = null;
      continue;
    }
    if (ch === "'" || ch === '"') { inQuote = ch; cur += ch; continue; }
    if (ch === '(') { depth++; cur += ch; continue; }
    if (ch === ')') { depth--; cur += ch; continue; }
    if (ch === sep && depth === 0) { parts.push(cur); cur = ''; continue; }
    cur += ch;
  }
  parts.push(cur);
  return parts.map(p => p.trim()).filter(p => p !== '');
}

function examParseValue(raw) {
  const v = raw.trim().replace(/;$/, '');
  if (/^'.*'$/.test(v) || /^".*"$/.test(v)) return v.slice(1, -1);
  if (/^(NOW\(\)|CURRENT_TIMESTAMP)$/i.test(v)) return EXAM_NOW;
  if (/^(CURDATE\(\)|CURRENT_DATE)$/i.test(v)) return EXAM_TODAY;
  if (/^TRUE$/i.test(v)) return true;
  if (/^FALSE$/i.test(v)) return false;
  if (/^NULL$/i.test(v)) return null;
  if (/^-?\d+(\.\d+)?$/.test(v)) return parseFloat(v);
  return v;
}

function examParseWhere(whereStr, row) {
  if (!whereStr || !whereStr.trim()) return true;
  const conditions = whereStr.split(/\bAND\b/i);
  return conditions.every(cond => {
    const m = cond.match(/([\w.]+)\s*(>=|<=|!=|<>|=|>|<)\s*(.+)/);
    if (!m) return true;
    const col = m[1].split('.').pop().trim();
    const op = m[2];
    const val = examParseValue(m[3].trim());
    const cell = row[col];
    if (op === '=') return String(cell) == String(val);
    if (op === '!=' || op === '<>') return String(cell) != String(val);
    if (op === '>') return cell > val;
    if (op === '<') return cell < val;
    if (op === '>=') return cell >= val;
    if (op === '<=') return cell <= val;
    return true;
  });
}

function examParseSet(setStr) {
  return examSplitTopLevel(setStr, ',').map(a => {
    const opMatch = a.match(/^(\w+)\s*(\+=|-=|\*=|\/=|=)/);
    const op = opMatch ? opMatch[2] : '=';
    const col = opMatch ? opMatch[1].trim() : a.slice(0, a.indexOf('=')).trim();
    const rhs = opMatch ? a.slice(opMatch[0].length).trim() : a.slice(a.indexOf('=') + 1).trim();
    return { col, op, rhs };
  });
}

function examApplySet(row, assigns) {
  assigns.forEach(({ col, op, rhs }) => {
    const exprMatch = rhs.match(/^([\w.]+)\s*([*+\-/])\s*(-?\d+(?:\.\d+)?)$/);
    if (exprMatch) {
      const refCol = exprMatch[1].split('.').pop();
      const mathOp = exprMatch[2];
      const num = parseFloat(exprMatch[3]);
      const base = parseFloat(row[refCol]) || 0;
      let result = mathOp === '*' ? base * num : mathOp === '+' ? base + num : mathOp === '-' ? base - num : base / num;
      row[col] = Math.round(result * 100) / 100;
    } else {
      const currentValue = row[col];
      if (op === '+=' ) row[col] = (parseFloat(currentValue) || 0) + (parseFloat(examParseValue(rhs)) || 0);
      else if (op === '-=') row[col] = (parseFloat(currentValue) || 0) - (parseFloat(examParseValue(rhs)) || 0);
      else if (op === '*=') row[col] = (parseFloat(currentValue) || 0) * (parseFloat(examParseValue(rhs)) || 0);
      else if (op === '/=') row[col] = (parseFloat(currentValue) || 0) / (parseFloat(examParseValue(rhs)) || 0);
      else row[col] = examParseValue(rhs);
    }
  });
  return row;
}

function examGetTableName(sql, kw) {
  const m = sql.match(new RegExp(kw + '\\s+(?:TABLE\\s+)?(?:IF\\s+EXISTS\\s+)?(\\w+)', 'i'));
  return m ? m[1] : null;
}

function examGetSelectColumns(sql, seed) {
  const m = sql.match(/^SELECT\s+(.*?)\s+FROM/is);
  const selectPart = m ? m[1].trim() : '*';
  if (selectPart === '*') return seed ? seed.columns : [];
  if (/COUNT|SUM|AVG|MAX|MIN/i.test(selectPart)) return null;
  return selectPart.split(',').map(c => {
    const asMatch = c.trim().match(/AS\s+(\w+)/i);
    return asMatch ? asMatch[1] : c.trim().split('.').pop();
  });
}

function examRunStatement(sql, seed) {
  const clean = (sql || '').trim().replace(/;\s*$/, '');
  if (!clean) throw new Error('Write a SQL statement first.');
  const upper = clean.toUpperCase();

  if (upper.startsWith('CREATE TABLE')) {
    const m = clean.match(/CREATE TABLE\s+(\w+)\s*\(([\s\S]*)\)/i);
    if (!m) throw new Error('Could not parse CREATE TABLE statement.');
    const columns = examSplitTopLevel(m[2], ',').map(c => {
      const parts = c.trim().split(/\s+/);
      return { name: parts.shift(), type: parts.join(' ') };
    });
    return { kind: 'schema', table: m[1], columns };
  }

  if (upper.startsWith('ALTER TABLE')) {
    if (!seed) throw new Error('No base table available for this question.');
    let rows = examCloneRows(seed.rows);
    let columns = [...seed.columns];
    let m;
    if ((m = clean.match(/RENAME\s+COLUMN\s+(\w+)\s+TO\s+(\w+)/i))) {
      const [, oldC, newC] = m;
      columns = columns.map(c => c === oldC ? newC : c);
      rows = rows.map(r => {
        const nr = {};
        Object.keys(r).forEach(k => { nr[k === oldC ? newC : k] = r[k]; });
        return nr;
      });
    } else if ((m = clean.match(/ADD\s+COLUMN\s+(\w+)\s+[\w()]+(?:\s+DEFAULT\s+(.+))?/i))) {
      const [, col, defaultRaw] = m;
      const defaultVal = defaultRaw !== undefined ? examParseValue(defaultRaw) : null;
      columns = [...columns, col];
      rows = rows.map(r => ({ ...r, [col]: defaultVal }));
    } else if ((m = clean.match(/DROP\s+COLUMN\s+(\w+)/i))) {
      const col = m[1];
      columns = columns.filter(c => c !== col);
      rows = rows.map(r => { const nr = { ...r }; delete nr[col]; return nr; });
    } else if (/MODIFY\s+COLUMN\s+(\w+)/i.test(clean)) {
      // type-only change — values stay the same
    } else {
      throw new Error('Unrecognized ALTER TABLE operation.');
    }
    return { kind: 'table', table: seed.table, columns, rows };
  }

  if (upper.startsWith('DROP TABLE')) {
    return { kind: 'dropped', table: examGetTableName(clean, 'DROP') };
  }

  if (upper.startsWith('INSERT INTO')) {
    if (!seed) throw new Error('No base table available for this question.');
    const m = clean.match(/INSERT INTO\s+(\w+)\s*\(([^)]*)\)\s*VALUES\s*\(([\s\S]*)\)/i);
    if (!m) throw new Error('Could not parse INSERT statement.');
    const cols = examSplitTopLevel(m[2], ',');
    const vals = examSplitTopLevel(m[3], ',').map(examParseValue);
    const rows = examCloneRows(seed.rows);
    const newRow = {};
    seed.columns.forEach(c => newRow[c] = null);
    cols.forEach((c, i) => { newRow[c] = vals[i]; });
    rows.push(newRow);
    return { kind: 'table', table: seed.table, columns: seed.columns, rows };
  }

  if (upper.startsWith('UPDATE')) {
    if (!seed) throw new Error('No base table available for this question.');
    const m = clean.match(/UPDATE\s+(\w+)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?$/i);
    if (!m) throw new Error('Could not parse UPDATE statement.');
    const assigns = examParseSet(m[2]);
    const whereStr = m[3];
    const rows = examCloneRows(seed.rows).map(r => examParseWhere(whereStr, r) ? examApplySet({ ...r }, assigns) : r);
    return { kind: 'table', table: seed.table, columns: seed.columns, rows };
  }

  if (upper.startsWith('DELETE FROM')) {
    if (!seed) throw new Error('No base table available for this question.');
    const m = clean.match(/DELETE FROM\s+(\w+)(?:\s+WHERE\s+([\s\S]+))?$/i);
    if (!m) throw new Error('Could not parse DELETE statement.');
    const whereStr = m[2];
    const rows = examCloneRows(seed.rows).filter(r => !examParseWhere(whereStr, r));
    return { kind: 'table', table: seed.table, columns: seed.columns, rows };
  }

  if (upper.startsWith('SELECT')) {
    const seedDb = {};
    if (seed) seedDb[seed.table] = examCloneRows(seed.rows);
    const rows = parseAndRun(clean, seedDb);
    const columns = rows.length ? Object.keys(rows[0]) : (examGetSelectColumns(clean, seed) || []);
    return { kind: 'table', table: seed ? seed.table : null, columns, rows };
  }

  throw new Error('Unsupported SQL statement type.');
}

function examCompareResults(expected, user) {
  if (!expected || !user) return false;
  if (expected.kind !== user.kind) return false;
  if (expected.kind === 'dropped') {
    return (expected.table || '').toLowerCase() === (user.table || '').toLowerCase();
  }
  if (expected.kind === 'schema') {
    const norm = cols => (cols || []).map(c => `${(c.name || '').toLowerCase()}|${(c.type || '').toUpperCase().replace(/\s+/g, ' ').trim()}`).join(',');
    return norm(expected.columns) === norm(user.columns);
  }
  const ecols = (expected.columns || []).join('|').toLowerCase();
  const ucols = (user.columns || []).join('|').toLowerCase();
  if (ecols !== ucols) return false;
  return JSON.stringify(expected.rows) === JSON.stringify(user.rows);
}

function formatCellValue(v) {
  if (v === null || v === undefined) return '<span class="null-val">NULL</span>';
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  return escapeHtml(String(v));
}

function renderTableSnapshotHtml(columns, rows) {
  if (!columns || !columns.length) return '<div class="placeholder">No columns to display.</div>';
  let html = `<div class="result-table-wrap"><table class="result-table"><thead><tr>${columns.map(c => `<th>${escapeHtml(c)}</th>`).join('')}</tr></thead><tbody>`;
  if (!rows || !rows.length) {
    html += `<tr><td colspan="${columns.length}" class="placeholder-cell">0 rows</td></tr>`;
  } else {
    html += rows.map(r => `<tr>${columns.map(c => `<td>${formatCellValue(r[c])}</td>`).join('')}</tr>`).join('');
  }
  html += '</tbody></table></div>';
  return html;
}

function examRenderResult(result) {
  if (!result) return '<div class="placeholder">No output yet.</div>';
  if (result.kind === 'schema') {
    if (!result.columns.length) return '<div class="placeholder">No columns defined.</div>';
    return `<div class="result-table-wrap"><table class="result-table"><thead><tr>${result.columns.map(c => `<th>${escapeHtml(c.name)}</th>`).join('')}</tr></thead><tbody><tr>${result.columns.map(c => `<td class="type-cell">${escapeHtml(c.type || '')}</td>`).join('')}</tr></tbody></table></div>`;
  }
  if (result.kind === 'dropped') {
    return `<div class="dropped-note">Table <code>${escapeHtml(result.table || '')}</code> dropped — no columns or rows remain.</div>`;
  }
  return renderTableSnapshotHtml(result.columns, result.rows);
}

function getExamSeedForQuestion(qData) {
  if (!qData || !activeExam) return null;
  const byExamKey = EXAM_SEEDS[`${activeExam.id}:${qData.question.num}`];
  if (byExamKey) return byExamKey;
  return EXAM_SEEDS[qData.question.num] || null;
}

function renderExamRightPanel(qData, userResult, userError, checked) {
  const list = document.getElementById('exam-testcases-list');
  if (!list) return;
  const seed = getExamSeedForQuestion(qData);

  let expectedResult = null, expectedFailed = false;
  try { expectedResult = examRunStatement(qData.question.answer, seed); }
  catch (e) { expectedFailed = true; }

  const yourHtml = userError
    ? `<div class="exam-output-error">⚠ ${escapeHtml(userError)}</div>`
    : userResult
      ? examRenderResult(userResult)
      : `<div class="placeholder">Click "Check Answer" to run your query.</div>`;

  const expectedHtml = expectedFailed
    ? `<div class="placeholder">Expected output unavailable for this question.</div>`
    : examRenderResult(expectedResult);

  let status = '';
  if (checked) {
    status = (!userError && !expectedFailed && examCompareResults(expectedResult, userResult)) ? 'pass' : 'fail';
  }

  list.innerHTML = `
    <div class="exam-testcase-card ${status}">
      ${status ? `<div class="testcase-title-row"><span class="testcase-status-icon">${status === 'pass' ? '✓' : '✗'}</span><span class="testcase-title">${status === 'pass' ? 'Passed' : 'Failed'}</span></div>` : ''}
      <div class="exam-testcase-block">
        <div class="testcase-block-item">
          <div class="testcase-label">Your output</div>
          ${yourHtml}
        </div>
        <div class="testcase-block-item">
          <div class="testcase-label">Expected output</div>
          ${expectedHtml}
        </div>
      </div>
    </div>`;
}

function checkExamAnswer() {
  const qData = getExamQuestionByIndex(examQ);
  if (!qData) return;
  const userSql = (document.getElementById('exam-answer-input').value || '').trim();
  examAnswers[examQ] = userSql;
  const fb = document.getElementById('exam-feedback');
  if (fb) { fb.style.display = 'none'; fb.textContent = ''; }

  if (!userSql) {
    if (fb) { fb.style.display = 'block'; fb.textContent = 'Write an answer before checking.'; }
    return;
  }

  const checkBtn = document.getElementById('exam-check-btn');
  if (checkBtn) { checkBtn.disabled = true; checkBtn.textContent = 'Running...'; }

  setTimeout(() => {
    const seed = getExamSeedForQuestion(qData);
    let userResult = null, userError = null;
    try { userResult = examRunStatement(userSql, seed); }
    catch (e) { userError = e.message; }

    renderExamRightPanel(qData, userResult, userError, true);

    let pass = false;
    if (!userError) {
      try {
        const expectedResult = examRunStatement(qData.question.answer, seed);
        pass = examCompareResults(expectedResult, userResult);
      } catch (e) { /* leave pass = false */ }
    }

    examResults[examQ] = pass;

    if (fb) {
      fb.style.display = 'block';
      fb.textContent = userError ? ('⚠ ' + userError) : (pass ? '✓ Correct — output matches expected.' : '✗ Output does not match expected.');
    }
    if (checkBtn) { checkBtn.disabled = false; checkBtn.textContent = 'Check Answer'; }
    if (pass) confettiPop();
  }, 350);
}

function finishExam() {
  document.getElementById('exam-content-area').style.display = 'none';
  const resultArea = document.getElementById('exam-result-area');
  resultArea.style.display = 'flex';
  resultArea.style.justifyContent = 'center';

  const total = getExamQuestionCount();
  const correct = Object.values(examResults).filter(Boolean).length;
  const pct = total ? Math.round((correct / total) * 100) : 0;

  const ring = document.getElementById('exam-score-ring');
  if (ring) {
    ring.style.setProperty('--pct', pct);
    ring.classList.remove('tier-high', 'tier-mid', 'tier-low');
    ring.classList.add(pct >= 80 ? 'tier-high' : pct >= 50 ? 'tier-mid' : 'tier-low');
  }
  const pctEl = document.getElementById('exam-score-pct');
  if (pctEl) pctEl.textContent = pct + '%';
  const fractionEl = document.getElementById('exam-score-fraction');
  if (fractionEl) fractionEl.textContent = `${correct} / ${total} correct`;

  const titleEl = document.getElementById('exam-result-title');
  if (titleEl) titleEl.textContent = pct >= 80 ? 'Great job!' : pct >= 50 ? 'Exam Complete!' : 'Exam Complete';

  const msg = pct >= 80
    ? "Excellent work — you've got a strong handle on this material."
    : pct >= 50
      ? 'Solid effort. Review the questions you missed and try again.'
      : "Keep practicing — review the explanations and retake the exam when you're ready.";
  document.getElementById('exam-result-message').textContent = msg;

  if (pct >= 50) confettiPop();
}

document.getElementById('exam-back-btn')?.addEventListener('click', () => showPage('exams'));
document.getElementById('exam-result-back-btn')?.addEventListener('click', () => showPage('exams'));
document.getElementById('exam-result-retry-btn')?.addEventListener('click', () => startExam(activeExam.id));
document.getElementById('exam-check-btn')?.addEventListener('click', checkExamAnswer);
document.getElementById('exam-prev-btn')?.addEventListener('click', prevExamQuestion);
document.getElementById('exam-next-btn')?.addEventListener('click', nextExamQuestion);

// ============================================================
//  PROGRESS PAGE
// ============================================================
function renderProgressPage() {
  const stats = document.getElementById('progress-stats');
  const done = state.completedLessons.length;
  const total = LESSONS.length;
  const quizCount = Object.keys(state.quizScores).length;
  const avgScore = quizCount > 0 ? Math.round(Object.values(state.quizScores).reduce((a, b) => a + b, 0) / quizCount * 20) : 0;

  stats.innerHTML = `
    <div class="stat-card"><div class="stat-num">${done}</div><div class="stat-label">Lessons completed</div></div>
    <div class="stat-card"><div class="stat-num">${total - done}</div><div class="stat-label">Lessons remaining</div></div>
    <div class="stat-card"><div class="stat-num">${quizCount}</div><div class="stat-label">Quizzes taken</div></div>
    <div class="stat-card"><div class="stat-num">${avgScore}%</div><div class="stat-label">Avg quiz score</div></div>`;

  const lessonGrid = document.getElementById('progress-lessons');
  lessonGrid.innerHTML = '';
  LESSONS.forEach(l => {
    const isDone = state.completedLessons.includes(l.id);
    const item = document.createElement('div');
    item.className = 'progress-lesson-item' + (isDone ? ' done' : '');
    item.innerHTML = `
      <span class="${isDone ? 'check' : 'empty'}">
        ${isDone ? '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>' : '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/></svg>'}
      </span>
      <span class="progress-lesson-name">${l.title}</span>`;
    lessonGrid.appendChild(item);
  });

  const quizList = document.getElementById('progress-quizzes');
  quizList.innerHTML = '';
  if (Object.keys(state.quizScores).length === 0) {
    quizList.innerHTML = '<div class="empty-state">No quizzes taken yet — head to Quizzes to get started!</div>';
  } else {
    QUIZZES.forEach(q => {
      if (state.quizScores[q.id] === undefined) return;
      const score = state.quizScores[q.id];
      const total = q.questions.length;
      const pct = score / total;
      const cls = pct === 1 ? 'good' : pct >= 0.6 ? 'ok' : 'bad';
      const row = document.createElement('div');
      row.className = 'pq-row';
      row.innerHTML = `<span class="pq-title">${q.title}</span><span class="pq-score ${cls}">${score}/${total}</span>`;
      quizList.appendChild(row);
    });
  }
}

// Update progress page when navigating to it
const progressNavItem = document.querySelector('.nav-item[data-page="progress"]');
if (progressNavItem) {
  progressNavItem.addEventListener('click', renderProgressPage);
}

// ============================================================
//  INIT
// ============================================================
renderLessons();
renderCheatsheet();
renderQuizHome();
renderExamHome();
renderQuickQueries();
renderChallenges();
updateProgress();
showPage('home');