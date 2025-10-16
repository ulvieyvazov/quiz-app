import React from "react";

const posts = [
  { id: 1, title: 'Quiz Tüyoları', excerpt: 'Zamanı yönetmek ve dikkat dağıtıcıları azaltmak...' },
  { id: 2, title: 'Zorluk Seçimi', excerpt: 'Hangi zorluk seviyesini seçmeliyim?' },
  { id: 3, title: 'Kategoriye Göre Çalışma', excerpt: 'İlgi alanlarınıza göre kategori belirleyin.' }
];

export default function Blog() {
  return (
    <div style={{ minHeight: '100vh', padding: 24, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B73FF 100%)', color: 'white', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: 16 }}>Blog</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {posts.map(p => (
          <div key={p.id} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 16, padding: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>{p.title}</div>
            <div style={{ opacity: 0.95 }}>{p.excerpt}</div>
          </div>
        ))}
      </div>
    </div>
  );
}






