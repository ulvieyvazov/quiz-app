const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 4000;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'dev-admin-token';
const JWT_SECRET = process.env.JWT_SECRET || 'dev-jwt-secret';

app.use(cors());
app.use(express.json());

// Initialize SQLite
const db = new Database('quiz.db');
db.pragma('journal_mode = WAL');
db.exec(`
CREATE TABLE IF NOT EXISTS questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  options_json TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'Easy'
);
CREATE TABLE IF NOT EXISTS scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  category TEXT,
  difficulty TEXT,
  penalties INTEGER DEFAULT 0,
  user_id INTEGER,
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);
`);

const seedIfEmpty = () => {
  const count = db.prepare('SELECT COUNT(1) as c FROM questions').get().c;
  if (count > 0) return;
  const insert = db.prepare('INSERT INTO questions (question, answer, options_json, category, difficulty) VALUES (?, ?, ?, ?, ?)');
  const seed = QUESTIONS_SEED;
  const tx = db.transaction((rows) => {
    for (const q of rows) {
      insert.run(q.question, q.answer, JSON.stringify(q.options), q.category, q.difficulty || 'Easy');
    }
  });
  tx(seed);
};

const QUESTIONS_SEED = [
  {
    question: "Xarici yaddaş qurğularını müəyyən edin:",
    options: [
      "A) 2, 3, 6",
      "B) 1, 4, 5",
      "C) 1, 5, 6",
      "D) 1, 3, 5",
      "E) 2, 4, 6"
    ],
    answer: "B) 1, 4, 5",
    category: "Hardware"
  },
  {
    question: "Hansı fikir doğru deyil (MS Word 2019)?",
    options: [
      "A) Seçilmiş mətndən başqa bütün mətni çapa vermək olar",
      "B) CTRL+End kursoru sənədin sonuna aparır",
      "C) Görünüş rejimləri View tabından dəyişdirilir",
      "D) Səhifəyə nömrə Insert tabından qoyulur",
      "E) Fraqmentləri Ctrl ilə seçmək olar"
    ],
    answer: "A) Seçilmiş mətndən başqa bütün mətni çapa vermək olar",
    category: "Word"
  },
  {
    question: "B2:E9 diapazonunda neçə sütun var (MS Excel 2019)?",
    options: ["A) 12", "B) 8", "C) 3", "D) 32", "E) 4"],
    answer: "E) 4",
    category: "Excel"
  },
  {
    question: "USB nədir?",
    options: [
      "A) Yaddaş qurğusudur",
      "B) Universal portdur",
      "C) Paralel portdur",
      "D) Universal proqramdır",
      "E) Videoadapterdir"
    ],
    answer: "B) Universal portdur",
    category: "Hardware"
  },
  {
    question: "CTRL+ENTER düymələr kombinasiyası basıldıqda nə baş verir (MS Word 2019)?",
    options: [
      "A) Mətn yeni səhifədən başlanır",
      "B) Mətn yeni bölmədən başlanır",
      "C) Mətn yeni abzasdan başlanır",
      "D) Mətn yeni sətirdən başlanır",
      "E) Bütöv mətn seçilir"
    ],
    answer: "A) Mətn yeni səhifədən başlanır",
    category: "Word"
  },
  {
    question: "Utilitlərin yerinə yetirdikləri funksiyalara aiddir:",
    options: [
      "A) 3, 4, 6",
      "B) 1, 4, 5",
      "C) 2, 4, 6",
      "D) 2, 3, 6",
      "E) 1, 2, 5"
    ],
    answer: "D) 2, 3, 6",
    category: "General IT"
  },
  {
    question: "Vektarizator proqramı hansıdır?",
    options: [
      "A) Corel Draw",
      "B) Adobe Illustrator",
      "C) Adobe Stream Line",
      "D) Adobe Photoshop",
      "E) Corel Photo-Paint"
    ],
    answer: "C) Adobe Stream Line",
    category: "Graphics"
  },
  {
    question: "Müxtəlif topologiyalı, eyni protokollu şəbəkələri birləşdirən aparat proqram təminatlı qurğu hansıdır?",
    options: [
      "A) Connector (Birləşdirici)",
      "B) Modem",
      "C) Router (Marşrutlaşdırıcı)",
      "D) Transiver",
      "E) Bridge (Körpü)"
    ],
    answer: "C) Router (Marşrutlaşdırıcı)",
    category: "Networking"
  },
  {
    question: "Verilənlər bazasında verilmiş şərtlər əsasında verilənlərin seçimini həyata keçirməyə imkan verən obyekt necə adlanır (MS Access 2019)?",
    options: ["A) Cədvəl", "B) Forma", "C) Makros", "D) Hesabat", "E) Sorğu"],
    answer: "E) Sorğu",
    category: "Access"
  },
  {
    question: "MS Access 2019 proqramı verilənlər bazasının hansı modelinə uyğundur?",
    options: [
      "A) Relyasiya",
      "B) Obyektyönlü",
      "C) Şəbəkə",
      "D) İyerarxik",
      "E) Semantik"
    ],
    answer: "A) Relyasiya",
    category: "Access"
  },
  {
    question: "File Explorer proqram pəncərəsinin sol kənarındakı ağacvari strukturda göstərilən qovluqların yaranması üçün əməliyyatların ardıcıllığını müəyyən edin (Windows 10).",
    options: [
      "A) 5, 4, 3, 7, 2, 6, 1",
      "B) 4, 1, 2, 6, 5, 3, 7",
      "C) 4, 5, 3, 1, 2, 6, 7",
      "D) 5, 4, 1, 2, 6, 7, 3",
      "E) 3, 4, 2, 7, 5, 1, 6"
    ],
    answer: "B) 4, 1, 2, 6, 5, 3, 7",
    category: "Windows"
  },
  {
    question: "Slayda hansı obyekti əlavə etdikdə Ribbon interfeysində Format alət tabı yaranır (MS PowerPoint 2019)?",
    options: [
      "A) WordArt",
      "B) Table",
      "C) Equation",
      "D) SmartArt",
      "E) Picture"
    ],
    answer: "E) Picture",
    category: "PowerPoint"
  },
  {
    question: "Aşağıdakılardan hansı arxiv faylıdır?",
    options: [
      "A) Ölçüsü azaldılmış və məzmunu dəyişdirilmiş fayllar",
      "B) Məzmunu xüsusi alqoritmlərlə dəyişdirilmiş icra olunan sistem faylları",
      "C) Sıxılmış və sonradan istifadə üçün saxlanılan fayllar",
      "D) Ölçüsü artırılmış və icazəsiz girişdən qorunan fayllar",
      "E) Uzun müddət istifadə olunmayan fayllar"
    ],
    answer: "C) Sıxılmış və sonradan istifadə üçün saxlanılan fayllar",
    category: "General IT"
  },
  {
    question: "Slayd obyektlərinə verilmiş animasiya effektlərinin Start formalarına hansılar aid deyil (MS PowerPoint 2019)?",
    options: [
      "A) 3, 4, 6",
      "B) 1, 4, 6",
      "C) 1, 2, 5",
      "D) 2, 5, 6",
      "E) 2, 3, 5"
    ],
    answer: "B) 1, 4, 6",
    category: "PowerPoint"
  },
  {
    question: "MS Word proqramında mətn cədvələ çevrildikdə alınan cədvəlin 2-ci sütunu hansı olar? (Ayırıcı simvol ;)",
    options: [
      "A) Malın adı, Yanvar, Fevral, Mart",
      "B) Malın adı, Yanvar, Stul, 3",
      "C) Malın adı, Fevral, Mart",
      "D) Malın adı, Stul, Mart",
      "E) Ay, Yanvar, Fevral, 3"
    ],
    answer: "A) Malın adı, Yanvar, Fevral, Mart",
    category: "Word"
  }
];

seedIfEmpty();

const getCategories = () => {
  const rows = db.prepare('SELECT DISTINCT category FROM questions ORDER BY category ASC').all();
  return rows.map(r => r.category);
};

const getDifficulties = () => {
  const rows = db.prepare('SELECT DISTINCT difficulty FROM questions ORDER BY difficulty ASC').all();
  return rows.map(r => r.difficulty);
};

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/api/categories', (req, res) => {
  res.json({ categories: getCategories() });
});

app.get('/api/difficulties', (req, res) => {
  res.json({ difficulties: getDifficulties() });
});

app.get('/api/questions', (req, res) => {
  const { category, difficulty, count, shuffle } = req.query;
  const clauses = [];
  const params = [];
  if (category) { clauses.push('category = ?'); params.push(category); }
  if (difficulty) { clauses.push('difficulty = ?'); params.push(difficulty); }
  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const rows = db.prepare(`SELECT id, question, answer, options_json as optionsJson, category, difficulty FROM questions ${where} ORDER BY id ASC`).all(params);
  let list = rows.map(r => ({ id: r.id, question: r.question, answer: r.answer, options: JSON.parse(r.optionsJson), category: r.category, difficulty: r.difficulty }));
  if (shuffle === 'true') {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
  }
  if (count && Number(count) > 0) {
    list = list.slice(0, Number(count));
  }
  res.json({ questions: list });
});

app.get('/api/scores', (req, res) => {
  const { category, difficulty } = req.query;
  const clauses = [];
  const params = [];
  if (category) { clauses.push('category = ?'); params.push(category); }
  if (difficulty) { clauses.push('difficulty = ?'); params.push(difficulty); }
  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const rows = db.prepare(`SELECT name, score, total, category, difficulty, created_at as createdAt FROM scores ${where} ORDER BY score DESC, created_at DESC LIMIT 10`).all(params);
  res.json({ scores: rows });
});

app.post('/api/scores', (req, res) => {
  const { name, score, total, category, difficulty, penalties, token } = req.body || {};
  if (!name || typeof score !== 'number' || typeof total !== 'number') {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  let userId = null;
  try {
    if (token) {
      const payload = jwt.verify(token, JWT_SECRET);
      userId = payload?.uid || null;
    }
  } catch (e) {}
  db.prepare('INSERT INTO scores (name, score, total, category, difficulty, penalties, user_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
    .run(name, score, total, category || 'General', difficulty || null, penalties || 0, userId, new Date().toISOString());
  res.status(201).json({ ok: true });
});

// Auth
app.post('/api/auth/login', (req, res) => {
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: 'Name required' });
  let user = db.prepare('SELECT id, name FROM users WHERE name = ?').get(name);
  if (!user) {
    const info = db.prepare('INSERT INTO users (name) VALUES (?)').run(name);
    user = { id: Number(info.lastInsertRowid), name };
  }
  const token = jwt.sign({ uid: user.id, name: user.name }, JWT_SECRET, { expiresIn: '30d' });
  res.json({ token, user: { id: user.id, name: user.name } });
});

const requireUser = (req, res, next) => {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

app.get('/api/me/scores', requireUser, (req, res) => {
  const uid = req.user.uid;
  const rows = db.prepare('SELECT name, score, total, category, difficulty, penalties, created_at as createdAt FROM scores WHERE user_id = ? ORDER BY created_at DESC LIMIT 50').all(uid);
  res.json({ scores: rows });
});

// Admin endpoints (token protected)
const requireAdmin = (req, res, next) => {
  const token = req.headers['x-admin-token'];
  if (token !== ADMIN_TOKEN) return res.status(401).json({ error: 'Unauthorized' });
  next();
};

app.post('/api/admin/questions', requireAdmin, (req, res) => {
  const { question, answer, options, category, difficulty } = req.body || {};
  if (!question || !answer || !Array.isArray(options) || options.length < 2 || !category) {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  const info = db.prepare('INSERT INTO questions (question, answer, options_json, category, difficulty) VALUES (?, ?, ?, ?, ?)')
    .run(question, answer, JSON.stringify(options), category, difficulty || 'Easy');
  res.status(201).json({ id: info.lastInsertRowid });
});

app.put('/api/admin/questions/:id', requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const { question, answer, options, category, difficulty } = req.body || {};
  const row = db.prepare('SELECT id FROM questions WHERE id = ?').get(id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  db.prepare('UPDATE questions SET question = COALESCE(?, question), answer = COALESCE(?, answer), options_json = COALESCE(?, options_json), category = COALESCE(?, category), difficulty = COALESCE(?, difficulty) WHERE id = ?')
    .run(question || null, answer || null, options ? JSON.stringify(options) : null, category || null, difficulty || null, id);
  res.json({ ok: true });
});

app.delete('/api/admin/questions/:id', requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  db.prepare('DELETE FROM questions WHERE id = ?').run(id);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Quiz backend listening on http://localhost:${PORT}`);
});


