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
import NavBar from './components/NavBar'
import { useMediaQuery } from './hooks/useMediaQuery'
import { getSectionLayout } from './utils/sectionLayout'

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
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { pages } = getSectionLayout(isMobile)

  return (
    <div id="app-root">
      {/* Ambient gradient orbs */}
      <div className="ambient-orbs" aria-hidden="true" />

      <Canvas
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        camera={{ position: [0, 0.5, 8], fov: isMobile ? 50 : 45, near: 0.1, far: 100 }}
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 10, 35]} />

        <Suspense fallback={<Loader />}>
          <ScrollControls key={pages} pages={pages} damping={0.25} distance={1.2}>
            <ScrollBridge isMobile={isMobile} />

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

      <NavBar />
    </div>
  )
}
