import React from "react";

export default function About() {
  return (
    <div style={{ minHeight: '100vh', padding: 24, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B73FF 100%)', color: 'white', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: 16 }}>Hakkında</h1>
      <p style={{ maxWidth: 800, lineHeight: 1.7 }}>
        Bu uygulama, kategorilere ayrılmış sorularla süreye karşı yarışmanıza olanak tanır. Zorluk seviyeleri, liderlik listeleri, admin paneli ile içerik yönetimi ve daha fazlası bulunur.
      </p>
    </div>
  );
}



