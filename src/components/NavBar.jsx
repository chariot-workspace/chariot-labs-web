import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { scrollToSection } from '../utils/scrollTo'

const NAV_ITEMS = ['About', 'Ecosystem', 'Contact']

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleNavClick = (item) => {
    scrollToSection(item.toLowerCase())
    setMenuOpen(false)
  }

  return (
    <>
      <nav className="nav-bar glass" aria-label="Main navigation">
        <div className="nav-logo">
          <img
            src="/logo.jpg"
            alt="Chariot Labs Logo"
            width="32"
            height="32"
            className="nav-logo-img"
          />
          <span className="nav-logo-text">Chariot Labs</span>
        </div>

        <div className="nav-links-desktop">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-link"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(item)
              }}
            >
              {item}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="nav-menu-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div
        className={`nav-mobile-menu ${menuOpen ? 'nav-mobile-menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="nav-mobile-links">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-mobile-link"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(item)
              }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="nav-mobile-backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}
