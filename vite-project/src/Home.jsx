import React from "react";

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B73FF 100%)', color: 'white', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 24, padding: 32, maxWidth: 720 }}>
        <h1 style={{ fontSize: '2.25rem', marginBottom: 12 }}>Quiz Uygulamasına Hoş Geldiniz</h1>
        <p style={{ opacity: 0.95, lineHeight: 1.6 }}>
          Kategorilere göre sorular çözün, zorluk seçin, süreye karşı yarışın ve liderlik tablosunda yerinizi alın. Sol üstteki Admin ile soru yönetimi yapabilirsiniz.
        </p>
      </div>
    </div>
  );
}



