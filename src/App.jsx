import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import Scene3D from './components/Scene3D'
import HeroOverlay from './components/HeroOverlay'
import AboutSection from './components/AboutSection'
import ProductShowcase from './components/ProductShowcase'
import ContactFooter from './components/ContactFooter'
import Loader from './components/Loader'
import ScrollBridge from './components/ScrollBridge'
import { scrollToSection } from './utils/scrollTo'

/**
 * App — Root composition.
 *
 * Architecture:
 * - A full-viewport Canvas hosts the 3D scene
 * - ScrollControls (5 pages, smooth damping) manages virtual scroll
 * - <Scroll>       → 3D content (Scene3D with CoreEngine + Particles)
 * - <Scroll html>  → HTML overlay sections positioned at page offsets
 *
 * The scroll offset (0→1) is read inside Scene3D via useScroll() and drives:
 * - Camera position interpolation between 5 keyframes
 * - CoreEngine mesh morph, rotation, and color transitions
 * - ParticleField color shifts
 * - Point light color animations
 */
export default function App() {
  return (
    <div
      id="app-root"
      style={{
        width: '100vw',
        height: '100vh',
        background: '#020617',
        overflow: 'hidden',
      }}
    >
      {/* Ambient gradient orbs */}
      <div className="ambient-orbs" aria-hidden="true" />

      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.5, 8], fov: 45, near: 0.1, far: 100 }}
        style={{ position: 'fixed', top: 0, left: 0 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 10, 35]} />

        <Suspense fallback={<Loader />}>
          <ScrollControls pages={6} damping={0.25} distance={1.2}>
            <ScrollBridge />

            {/* 3D Scene — driven by scroll */}
            <Scroll>
              <Scene3D />
            </Scroll>

            {/* HTML Overlay Sections */}
            <Scroll html style={{ width: '100%' }}>
              <HeroOverlay />
              <AboutSection />
              <ProductShowcase />
              <ContactFooter />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>

      {/* Fixed Navigation Bar */}
      <nav
        className="nav-bar glass"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 50,
          padding: '16px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          borderTop: 'none',
          borderLeft: 'none',
          borderRight: 'none',
          borderRadius: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            pointerEvents: 'auto',
          }}
        >
          <img
            src="/logo.jpg"
            alt="Chariot Labs Logo"
            width="32"
            height="32"
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
          <span
            style={{
              fontFamily: '"Outfit", system-ui',
              fontWeight: 700,
              fontSize: '1.05rem',
              color: '#f1f5f9',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Chariot Labs
          </span>
        </div>

        {/* Nav Links */}
        <div
          style={{
            display: 'flex',
            gap: '32px',
            pointerEvents: 'auto',
          }}
        >
          {['About', 'Ecosystem', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                fontFamily: '"Inter", system-ui',
                fontSize: '0.8rem',
                color: '#94a3b8',
                textDecoration: 'none',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                fontWeight: 500,
                transition: 'color 0.3s ease',
                cursor: 'pointer',
              }}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(item.toLowerCase())
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#00f0ff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
            >
              {item}
            </a>
          ))}
        </div>
      </nav>
    </div>
  )
}
