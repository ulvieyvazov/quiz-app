import React, { useState } from "react";

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B73FF 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '24px',
    padding: '32px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
    color: 'white',
    width: '100%',
    maxWidth: '480px'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  input: {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.85)',
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: '12px',
    padding: '12px 14px',
    fontSize: '16px',
    outline: 'none',
    marginBottom: '12px'
  },
  button: {
    width: '100%',
    position: 'relative',
    padding: '14px 18px',
    background: 'linear-gradient(135deg, #00f5ff, #a855f7)',
    borderRadius: '16px',
    fontWeight: '600',
    color: 'white',
    fontSize: '1.05rem',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
  },
  error: { color: '#fecaca', marginTop: '8px' }
};

export default function NamePage({ onLoggedIn }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    if (!name.trim()) {
      setError("Lütfen adınızı girin");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() })
      });
      if (!res.ok) throw new Error('Login failed');
      const data = await res.json();
      if (data?.token) {
        localStorage.setItem('quiz_token', data.token);
      }
      onLoggedIn?.(name.trim());
    } catch (e) {
      setError("Giriş başarısız oldu");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') submit();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.title}>Adınızı Girin</div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ad"
          style={styles.input}
        />
        <button onClick={submit} style={styles.button} disabled={loading}>
          {loading ? 'Giriş yapılıyor...' : 'Devam et'}
        </button>
        {error && <div style={styles.error}>{error}</div>}
      </div>
    </div>
  );
}



