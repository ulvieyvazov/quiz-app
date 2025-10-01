import React, { useEffect, useMemo, useState } from "react";

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
    color: "white",
    fontFamily: "system-ui, -apple-system, sans-serif",
    display: "flex",
    flexDirection: "column"
  },
  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 24px",
    background: "rgba(0,0,0,0.3)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(255,255,255,0.15)"
  },
  brand: { fontSize: "1.2rem", fontWeight: 800 },
  navActions: { display: "flex", gap: 12 },
  button: {
    padding: "10px 16px",
    borderRadius: 10,
    border: "none",
    background: "rgba(255,255,255,0.9)",
    cursor: "pointer",
    fontWeight: 600,
    transition: "0.2s"
  },
  buttonPrimary: {
    background: "linear-gradient(135deg, #00f5ff, #7b2ff7)",
    color: "white"
  },
  buttonDanger: {
    background: "#ef4444",
    color: "white"
  },
  buttonOutline: {
    background: "transparent",
    border: "1px solid white",
    color: "white"
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.95)",
    marginBottom: 10,
    color: "#111827",
    fontSize: 14
  },
  select: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.95)",
    marginBottom: 10,
    color: "#111827",
    fontSize: 14
  },
  content: { padding: 24, flex: 1 },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20
  },
  card: {
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(16px)",
    borderRadius: 14,
    padding: 20,
    border: "1px solid rgba(255,255,255,0.15)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
  },
  cardTitle: { fontWeight: 700, marginBottom: 12, fontSize: "1rem" },
  label: { display: "block", marginBottom: 6, fontWeight: 600, fontSize: 13 },
  actions: { display: "flex", gap: 8, marginTop: 10 },
  questionItem: {
    borderBottom: "1px solid rgba(255,255,255,0.15)",
    padding: "12px 0"
  },
  pill: {
    padding: "4px 10px",
    borderRadius: 9999,
    background: "rgba(255,255,255,0.15)",
    fontSize: 12,
    fontWeight: 500
  },
  toast: {
    position: "fixed",
    bottom: 20,
    right: 20,
    background: "#10b981",
    color: "white",
    padding: "10px 14px",
    borderRadius: 10,
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
  }
};

export default function AdminDashboard({ onBack }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [list, setList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    question: "",
    optionsText: "",
    answer: "",
    category: "",
    difficulty: ""
  });
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("new");
  const [toast, setToast] = useState(null);

  const adminToken = useMemo(() => localStorage.getItem("admin_token") || "", []);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [qs, cs, ds] = await Promise.all([
        fetch("/api/questions").then((r) => r.json()),
        fetch("/api/categories").then((r) => r.json()),
        fetch("/api/difficulties").then((r) => r.json())
      ]);
      setList(Array.isArray(qs?.questions) ? qs.questions : []);
      setCategories(Array.isArray(cs?.categories) ? cs.categories : []);
      setDifficulties(Array.isArray(ds?.difficulties) ? ds.difficulties : []);
    } catch (e) {
      setError("Veriler yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setEditing(null);
    setForm({
      question: "",
      optionsText: "",
      answer: "",
      category: "",
      difficulty: difficulties[0] || "Easy"
    });
  };

  const startEdit = (q) => {
    setEditing(q);
    setForm({
      question: q.question,
      optionsText: (q.options || []).join(", "),
      answer: q.answer,
      category: q.category,
      difficulty: q.difficulty || "Easy"
    });
  };

  const save = async () => {
    const options = form.optionsText.split(",").map((s) => s.trim()).filter(Boolean);
    if (!form.question || options.length < 2 || !form.answer || !form.category) {
      setToast({ type: "error", message: "Lütfen tüm alanları doldurun" });
      return;
    }
    const payload = {
      question: form.question,
      answer: form.answer,
      options,
      category: form.category,
      difficulty: form.difficulty || "Easy"
    };
    const headers = { "Content-Type": "application/json", "x-admin-token": adminToken };
    try {
      setLoading(true);
      if (editing) {
        await fetch(`/api/admin/questions/${editing.id}`, { method: "PUT", headers, body: JSON.stringify(payload) });
      } else {
        await fetch("/api/admin/questions", { method: "POST", headers, body: JSON.stringify(payload) });
      }
      resetForm();
      await fetchData();
      setToast({ type: "success", message: editing ? "Soru güncellendi" : "Soru eklendi" });
    } catch (e) {
      setToast({ type: "error", message: "Kaydetme başarısız" });
    } finally {
      setLoading(false);
    }
  };

  const remove = async (q) => {
    if (!window.confirm("Bu soruyu silmek istediğinize emin misiniz?")) return;
    const headers = { "x-admin-token": adminToken };
    try {
      setLoading(true);
      await fetch(`/api/admin/questions/${q.id}`, { method: "DELETE", headers });
      await fetchData();
      setToast({ type: "success", message: "Soru silindi" });
    } catch (e) {
      setToast({ type: "error", message: "Silme başarısız" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <div style={styles.brand}>Admin Dashboard</div>
        <div style={styles.navActions}>
          <input
            placeholder="Ara..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ ...styles.input, margin: 0, width: 200 }}
          />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ ...styles.select, margin: 0, width: 160 }}>
            <option value="new">En yeni</option>
            <option value="old">En eski</option>
            <option value="category">Kategori</option>
            <option value="difficulty">Zorluk</option>
          </select>
          <button style={{ ...styles.button, ...styles.buttonOutline }} onClick={onBack}>Geri</button>
          <button style={{ ...styles.button, ...styles.buttonPrimary }} onClick={fetchData}>Yenile</button>
        </div>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {error && <div style={{ marginBottom: 12, color: "#fecaca" }}>{error}</div>}
        {loading && <div style={{ marginBottom: 12 }}>Yükleniyor...</div>}

        <div style={styles.grid}>
          {/* Form */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>{editing ? "Soruyu Düzenle" : "Yeni Soru Ekle"}</div>
            <label style={styles.label}>Soru</label>
            <textarea style={{ ...styles.input, height: 90 }} value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
            <label style={styles.label}>Seçenekler (virgülle)</label>
            <input style={styles.input} value={form.optionsText} onChange={(e) => setForm({ ...form, optionsText: e.target.value })} />
            <label style={styles.label}>Doğru Cevap</label>
            <input style={styles.input} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} />
            <label style={styles.label}>Kategori</label>
            <input list="cats" style={styles.input} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <datalist id="cats">
              {categories.map((c) => (<option key={c} value={c} />))}
            </datalist>
            <label style={styles.label}>Zorluk</label>
            <select style={styles.select} value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}>
              {["Easy", "Medium", "Hard", ...difficulties.filter((d) => !["Easy","Medium","Hard"].includes(d))].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <div style={styles.actions}>
              <button style={{ ...styles.button, ...styles.buttonPrimary }} onClick={save}>{editing ? "Güncelle" : "Ekle"}</button>
              {editing && <button style={{ ...styles.button, ...styles.buttonOutline }} onClick={resetForm}>İptal</button>}
            </div>
          </div>

          {/* Question List */}
          <div style={styles.card}>
            <div style={styles.cardTitle}>Sorular</div>
            <div style={{ marginBottom: 10 }}><span style={styles.pill}>Toplam: {list.length}</span></div>
            <div style={{ maxHeight: 520, overflow: "auto" }}>
              {list
                .filter(q => !query || q.question.toLowerCase().includes(query.toLowerCase()) || q.category.toLowerCase().includes(query.toLowerCase()))
                .sort((a, b) =>
                  sortBy === "old" ? 0 :
                  sortBy === "category" ? a.category.localeCompare(b.category) :
                  sortBy === "difficulty" ? (a.difficulty || "").localeCompare(b.difficulty || "") :
                  0
                )
                .map((q) => (
                  <div key={q.id} style={styles.questionItem}>
                    <div style={{ fontWeight: 600 }}>{q.question}</div>
                    <div style={{ fontSize: 12, opacity: 0.9 }}>Kategori: {q.category} • Zorluk: {q.difficulty || "Easy"}</div>
                    <div style={{ fontSize: 12, opacity: 0.9 }}>Seçenekler: {(q.options || []).join(", ")}</div>
                    <div style={styles.actions}>
                      <button style={{ ...styles.button, ...styles.buttonOutline }} onClick={() => startEdit(q)}>Düzenle</button>
                      <button style={{ ...styles.button, ...styles.buttonDanger }} onClick={() => remove(q)}>Sil</button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ ...styles.toast, background: toast.type === "error" ? "#ef4444" : "#10b981" }}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
