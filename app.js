// ============================================================
//  SQL.learn — app.js
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
  { emoji: '⚡', title: 'Ready to level up your SQL?', sub: 'Each lesson takes under 5 minutes. You got this.' },
  { emoji: '🚀', title: "Let's keep the momentum going!", sub: 'One lesson at a time builds real expertise.' },
  { emoji: '🎯', title: 'Focus in. Progress awaits.', sub: 'SQL is a superpower — you\'re building it right now.' },
  { emoji: '💡', title: 'Curiosity → Skill → Confidence', sub: 'Every query you write makes the next one easier.' },
  { emoji: '🔥', title: 'Your streak is alive. Keep it burning.', sub: 'Consistency beats intensity. Show up today.' },
];

// ---- ROUTING ----
function showPage(id) {
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
  document.getElementById('sidebar-progress-bar').style.width = pct + '%';
  document.getElementById('sidebar-progress-text').textContent = `${done} / ${total}`;
  document.getElementById('streak-count').textContent = state.streak;

  // Update motivational banner
  const msg = done === 0
    ? MOTIVATIONAL[0]
    : done >= total
    ? { emoji: '🏆', title: 'All lessons complete! You\'re a SQL pro.', sub: 'Try the Challenges to push your skills further.' }
    : MOTIVATIONAL[Math.min(Math.floor((done / total) * 4) + 1, MOTIVATIONAL.length - 1)];
  
  const banner = document.getElementById('motivational-banner');
  if (banner) {
    document.getElementById('banner-title').textContent = msg.title;
    document.getElementById('banner-sub').textContent = msg.sub;
    banner.querySelector('.banner-emoji').textContent = msg.emoji;
  }
}

// ============================================================
//  LESSONS PAGE
// ============================================================
function renderLessons() {
  const tabs = ['basics', 'filtering', 'joins', 'aggregates'];
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
    const sumMatch = selectPart.match(/SUM\((\w+)\)(?:\s+AS\s+(\w+))?/i);
    if (avgMatch || (countMatch && selectPart.match(/COUNT/i)) || sumMatch) {
      const out = {};
      if (avgMatch) { const vals = rows.map(r => r[avgMatch[1]]).filter(v => v != null); out[avgMatch[2] || 'avg'] = vals.length ? +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : null; }
      if (countMatch) out[countMatch[2] || countMatch[1] || 'count'] = rows.length;
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
        if (asMatch) {
          const raw = asMatch[1].trim().split('.').pop();
          out[asMatch[2]] = r[raw] !== undefined ? r[raw] : null;
        } else {
          const col = def.split('.').pop();
          if (r[col] !== undefined) out[col] = r[col];
          else if (r[def] !== undefined) out[def] = r[def];
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
document.querySelector('.nav-item[data-page="progress"]').addEventListener('click', renderProgressPage);

// ============================================================
//  INIT
// ============================================================
renderLessons();
renderCheatsheet();
renderQuizHome();
renderQuickQueries();
renderChallenges();
updateProgress();
showPage('lessons');