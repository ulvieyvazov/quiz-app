import { useEffect, useState } from 'react'
import './App.css'
import QuizApp from './Quiz'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'
import Home from './Home'
import Category from './Category'
import About from './About'
import Blog from './Blog'

function App() {
  const [playerName, setPlayerName] = useState('')
  const routeFromPath = (path) => {
    if (path === '/' || path === '') return 'home'
    if (path === '/quiz') return 'quiz'
    if (path === '/category') return 'category'
    if (path === '/about') return 'about'
    if (path === '/blog') return 'blog'
    if (path === '/admin') return 'admin'
    if (path === '/admin/dashboard') return 'dashboard'
    return 'home'
  }

  const pathFromRoute = (r) => {
    switch (r) {
      case 'home': return '/'
      case 'quiz': return '/quiz'
      case 'category': return '/category'
      case 'about': return '/about'
      case 'blog': return '/blog'
      case 'admin': return '/admin'
      case 'dashboard': return '/admin/dashboard'
      default: return '/'
    }
  }

  const [route, setRoute] = useState(routeFromPath(window.location.pathname))
  const [pickedCategory, setPickedCategory] = useState('')

  const navigate = (r) => {
    const path = pathFromRoute(r)
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path)
    }
    setRoute(r)
  }

  useEffect(() => {
    const onPop = () => setRoute(routeFromPath(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return (
    <>
      {route !== 'admin' && route !== 'dashboard' && (
        <div style={{ position: 'fixed', top: 12, left: 12, zIndex: 50, display: 'flex', gap: 8 }}>
          <a href="/admin" onClick={(e)=>{e.preventDefault(); navigate('admin')}} style={{ padding: '8px 12px', borderRadius: 12, border: 'none', background: 'rgba(255,255,255,0.85)', cursor: 'pointer', fontWeight: 600, textDecoration: 'none', color: '#111' }}>Admin</a>
          <a href="/" onClick={(e)=>{e.preventDefault(); navigate('home')}} style={{ padding: '8px 12px', borderRadius: 12, border: 'none', background: 'rgba(255,255,255,0.85)', cursor: 'pointer', fontWeight: 600, textDecoration: 'none', color: '#111' }}>Home</a>
          <a href="/quiz" onClick={(e)=>{e.preventDefault(); navigate('quiz')}} style={{ padding: '8px 12px', borderRadius: 12, border: 'none', background: 'rgba(255,255,255,0.85)', cursor: 'pointer', fontWeight: 600, textDecoration: 'none', color: '#111' }}>Quiz</a>
          <a href="/category" onClick={(e)=>{e.preventDefault(); navigate('category')}} style={{ padding: '8px 12px', borderRadius: 12, border: 'none', background: 'rgba(255,255,255,0.85)', cursor: 'pointer', fontWeight: 600, textDecoration: 'none', color: '#111' }}>Kategori</a>
          <a href="/about" onClick={(e)=>{e.preventDefault(); navigate('about')}} style={{ padding: '8px 12px', borderRadius: 12, border: 'none', background: 'rgba(255,255,255,0.85)', cursor: 'pointer', fontWeight: 600, textDecoration: 'none', color: '#111' }}>About</a>
          <a href="/blog" onClick={(e)=>{e.preventDefault(); navigate('blog')}} style={{ padding: '8px 12px', borderRadius: 12, border: 'none', background: 'rgba(255,255,255,0.85)', cursor: 'pointer', fontWeight: 600, textDecoration: 'none', color: '#111' }}>Blog</a>
        </div>
      )}
      {route === 'admin' ? (
        <AdminLogin onBack={() => navigate('home')} onSuccess={() => navigate('dashboard')} />
      ) : route === 'dashboard' ? (
        <AdminDashboard onBack={() => navigate('home')} />
      ) : route === 'home' ? (
        <Home />
      ) : route === 'category' ? (
        <Category onPick={(cat)=>{ setPickedCategory(cat); navigate('quiz') }} />
      ) : route === 'about' ? (
        <About />
      ) : route === 'blog' ? (
        <Blog />
      ) : (
        <QuizApp initialName={playerName} initialCategory={pickedCategory} autoStart={false} />
      )}
    </>
  )
}

export default App
