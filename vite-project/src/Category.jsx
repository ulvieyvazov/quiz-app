import React from "react";

export default function Category({ onPick }) {
  const items = ["Informatika", "Mentiq"];

  return (
    <div style={{ minHeight: '100vh', padding: 24, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B73FF 100%)', color: 'white', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: 16 }}>Kategoriler</h1>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
        {items.map(cat => (
          <li key={cat} onClick={() => onPick?.(cat)} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 16, padding: 16, cursor: 'pointer' }}>
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
}


