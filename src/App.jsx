import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Pricing from './pages/Pricing'
import Auth from './pages/Auth'
import Events from './pages/Events'
import Series from './pages/Series'
import AllSeries from './pages/AllSeries'
import AllBlogs from './pages/AllBlogs'
import AllJournals from './pages/AllJournals'
import Journal from './pages/Journal'
import JournalPost from './pages/JournalPost'
import BlogPost from './pages/BlogPost'
import Blogs from './pages/Blogs'
import CreatePost from './pages/CreatePost'
import CreateJournal from './pages/CreateJournal'
import CreateSeries from './pages/CreateSeries'
import CreateBlogs from './pages/CreateBlogs'
import SeriesDetail from './pages/SeriesDetail'
import SeasonDetail from './pages/SeasonDetail'
import Profile from './pages/Profile'
import './styles.css'

function App() {
  const location = useLocation()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    setIsAuthenticated(!!token)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('refreshToken')
    setIsAuthenticated(false)
  }

  return (
    <div className="page">
      {showSplash && <Splash />}
      <nav className="nav">
        <Link to="/" className="logo link-plain">
          Mind Matrix
        </Link>
        <div className="nav-links">
          <Link to="/journal" className={location.pathname === '/journal' ? 'active' : ''}>
            Journal
          </Link>
          <Link to="/blogs" className={location.pathname === '/blogs' ? 'active' : ''}>
            Blogs
          </Link>
          <Link to="/series" className={location.pathname === '/series' ? 'active' : ''}>
            Series
          </Link>
          <Link to="/events" className={location.pathname === '/events' ? 'active' : ''}>
            Events
          </Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            About
          </Link>
          <Link to="/pricing" className="pricing-link">
            Pricing
          </Link>
        </div>
        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="profile-icon" title="Profile">
                <div className="profile-avatar">
                  <span style={{ fontSize: '18px' }}>👤</span>
                </div>
              </Link>
              <button onClick={handleSignOut} className="ghost link-button">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="ghost link-button">
                Sign in
              </Link>
              <Link to="/journal/new" className="primary link-button">
                Start Writing
              </Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/all" element={<AllJournals />} />
        <Route path="/journal/:slug" element={<JournalPost />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/all" element={<AllBlogs />} />
        <Route path="/blogs/:slug" element={<BlogPost />} />
        <Route path="/series" element={<Series />} />
        <Route path="/series/all" element={<AllSeries />} />
        <Route path="/series/new" element={<CreateSeries />} />
        <Route path="/series/:slug" element={<SeriesDetail />} />
        <Route path="/series/:slug/season/:seasonSlug" element={<SeasonDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/journal/new" element={<CreateJournal />} />
        <Route path="/blogs/new" element={<CreateBlogs />} />
        <Route path="/signin" element={<Auth mode="signin" />} />
        <Route path="/signup" element={<Auth mode="signup" />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}

const Splash = () => (
  <div className="splash">
    <div className="splash-grid" />
    <div className="splash-aurora">
      <div className="splash-orb orb-1" />
      <div className="splash-orb orb-2" />
      <div className="splash-orb orb-3" />
    </div>
    <div className="splash-mist" />
    <div className="splash-ring" />
    <div className="splash-particles">
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
    <div className="splash-glyphs">
      <span>MM</span>
      <span>MM</span>
      <span>MM</span>
    </div>
    <div className="splash-streaks">
      <span />
      <span />
      <span />
    </div>
    <div className="splash-core">
      <div className="splash-logo-container">
        <img src="/Logo.png" alt="Mind Matrix" className="splash-logo-img" />
      </div>
      <div className="splash-logo">Mind Matrix</div>
      <div className="splash-tagline">Upgrade Your Mental Operating System</div>
      <div className="splash-progress">
        <div className="splash-bar" />
      </div>
      <div className="splash-sparkles">
        <span />
        <span />
        <span />
      </div>
    </div>
  </div>
)

export default App
