import { useEffect, useRef } from 'react'

export default function HeroBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const container = canvas.parentElement
    if (!container) return

    const ctx = canvas.getContext('2d')
    let animationFrameId

    let width = (canvas.width = container.offsetWidth || window.innerWidth)
    let height = (canvas.height = container.offsetHeight || 750)

    const updateSize = () => {
      if (!container) return
      width = canvas.width = container.offsetWidth || window.innerWidth
      height = canvas.height = container.offsetHeight || 750
    }
    updateSize()

    const resizeObserver = new ResizeObserver(() => updateSize())
    resizeObserver.observe(container)

    // Interactive Mouse Lens & Physics
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      active: false,
    }

    const mouseTrail = []

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.targetX = e.clientX - rect.left
      mouse.targetY = e.clientY - rect.top
      mouse.active = true

      // Create glowing particle trail behind cursor
      if (Math.random() < 0.8) {
        mouseTrail.push({
          x: mouse.targetX + (Math.random() - 0.5) * 12,
          y: mouse.targetY + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: Math.random() * 3 + 1,
          life: 1.0,
          decay: 0.03 + Math.random() * 0.02,
        })
      }
    }

    const handleMouseLeave = () => {
      mouse.active = false
    }

    // Supernova Implosion -> Explosion physics on click
    const explosions = []
    const handleCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top

      // Multi-stage shockwaves
      for (let r = 1; r <= 4; r++) {
        explosions.push({
          isRing: true,
          x: clickX,
          y: clickY,
          radius: 5 * r,
          maxRadius: 300 + r * 70,
          opacity: 1.0,
          speed: 8 + r * 4,
        })
      }

      // 120 explosive tachyon sparks
      for (let i = 0; i < 120; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 5 + Math.random() * 16
        explosions.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 4 + 1.5,
          life: 1.0,
          decay: 0.015 + Math.random() * 0.018,
          colorIdx: Math.floor(Math.random() * 3),
        })
      }
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)
    container.addEventListener('click', handleCanvasClick)

    // Theme observer
    let isLight = document.documentElement.getAttribute('data-theme') === 'light'
    const themeObserver = new MutationObserver(() => {
      isLight = document.documentElement.getAttribute('data-theme') === 'light'
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    // --- Matrix Digital Stream Code Streams ---
    const streamCount = 36
    const symbols = ['0101', '1010', 'AI_DNA', '∇', 'Ψ', 'Ω', 'λ', 'PETA_FLOPS', 'SINGULARITY', 'CUDA', 'TENSOR']
    const streams = Array.from({ length: streamCount }, (_, i) => ({
      x: (i / streamCount) * width + Math.random() * 15,
      y: Math.random() * height,
      speed: 3 + Math.random() * 5,
      text: symbols[Math.floor(Math.random() * symbols.length)],
      opacity: Math.random() * 0.45 + 0.15,
    }))

    let frameCount = 0

    // Main 60 FPS Render Loop
    const render = () => {
      frameCount++
      ctx.clearRect(0, 0, width, height)

      // Smooth Mouse Lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.08
      mouse.y += (mouse.targetY - mouse.y) * 0.08

      const centerX = width / 2
      const centerY = height * 0.42

      // Color Palette
      const primaryColor = isLight ? '#0052cc' : '#00f0ff'
      const secondaryColor = isLight ? '#7c3aed' : '#a855f7'
      const accentPink = isLight ? '#0284c7' : '#ec4899'
      const palette = [primaryColor, secondaryColor, accentPink]

      // --- 1. Draw Digital Matrix Rain Streams ---
      ctx.font = '12px "Outfit", "Inter", monospace'
      for (let s of streams) {
        s.y += s.speed
        if (s.y > height + 30) {
          s.y = -30
          s.x = Math.random() * width
          s.text = symbols[Math.floor(Math.random() * symbols.length)]
        }
        ctx.fillStyle = isLight ? `rgba(0, 82, 204, ${s.opacity})` : `rgba(0, 240, 255, ${s.opacity})`
        ctx.fillText(s.text, s.x, s.y)
      }

      // --- 2. Draw Mouse Particle Spark Trail ---
      for (let tIdx = mouseTrail.length - 1; tIdx >= 0; tIdx--) {
        const pt = mouseTrail[tIdx]
        pt.x += pt.vx
        pt.y += pt.vy
        pt.life -= pt.decay

        if (pt.life <= 0) {
          mouseTrail.splice(tIdx, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(pt.x, pt.y, pt.radius * pt.life, 0, Math.PI * 2)
        ctx.fillStyle = primaryColor
        ctx.globalAlpha = pt.life * 0.8
        ctx.shadowBlur = 10
        ctx.shadowColor = primaryColor
        ctx.fill()
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1.0
      }

      // --- 3. Render Supernova Explosions ---
      for (let eIdx = explosions.length - 1; eIdx >= 0; eIdx--) {
        const exp = explosions[eIdx]

        if (exp.isRing) {
          exp.radius += exp.speed
          exp.opacity -= 0.02

          if (exp.opacity <= 0 || exp.radius >= exp.maxRadius) {
            explosions.splice(eIdx, 1)
            continue
          }

          ctx.beginPath()
          ctx.arc(exp.x, exp.y, exp.radius, 0, Math.PI * 2)
          ctx.strokeStyle = primaryColor
          ctx.globalAlpha = exp.opacity
          ctx.lineWidth = 3
          ctx.shadowBlur = 20
          ctx.shadowColor = primaryColor
          ctx.stroke()
          ctx.shadowBlur = 0
          ctx.globalAlpha = 1.0
        } else {
          exp.x += exp.vx
          exp.y += exp.vy
          exp.life -= exp.decay

          if (exp.life <= 0) {
            explosions.splice(eIdx, 1)
            continue
          }

          ctx.beginPath()
          ctx.arc(exp.x, exp.y, exp.radius * exp.life, 0, Math.PI * 2)
          ctx.fillStyle = palette[exp.colorIdx]
          ctx.globalAlpha = exp.life
          ctx.shadowBlur = 14
          ctx.shadowColor = palette[exp.colorIdx]
          ctx.fill()
          ctx.shadowBlur = 0
          ctx.globalAlpha = 1.0
        }
      }

      // --- 4. Draw Interactive Targeting Computer Reticle ---
      if (mouse.active) {
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(mouse.x, mouse.y)
        ctx.strokeStyle = primaryColor
        ctx.globalAlpha = 0.5
        ctx.lineWidth = 1.5
        ctx.setLineDash([8, 6])
        ctx.stroke()
        ctx.setLineDash([])
        ctx.globalAlpha = 1.0

        const rRad = 30 + Math.sin(frameCount * 0.15) * 5
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, rRad, 0, Math.PI * 2)
        ctx.strokeStyle = primaryColor
        ctx.lineWidth = 1.8
        ctx.shadowBlur = 18
        ctx.shadowColor = primaryColor
        ctx.stroke()
        ctx.shadowBlur = 0

        const len = 12
        ctx.strokeStyle = primaryColor
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(mouse.x - rRad - len, mouse.y)
        ctx.lineTo(mouse.x - rRad, mouse.y)
        ctx.moveTo(mouse.x + rRad, mouse.y)
        ctx.lineTo(mouse.x + rRad + len, mouse.y)
        ctx.moveTo(mouse.x, mouse.y - rRad - len)
        ctx.lineTo(mouse.x, mouse.y - rRad)
        ctx.moveTo(mouse.x, mouse.y + rRad)
        ctx.lineTo(mouse.x, mouse.y + rRad + len)
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 4.5, 0, Math.PI * 2)
        ctx.fillStyle = primaryColor
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      resizeObserver.disconnect()
      themeObserver.disconnect()
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      container.removeEventListener('click', handleCanvasClick)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="hero-crazy-bg" aria-hidden="true">
      {/* Ambient Plasma Orbs */}
      <div className="hero-plasma-orb hero-plasma-1" />
      <div className="hero-plasma-orb hero-plasma-2" />
      <div className="hero-plasma-orb hero-plasma-3" />

      {/* Cyber Grid Lines */}
      <div className="hero-cyber-grid" />

      {/* Main 2150 AD Canvas */}
      <canvas
        ref={canvasRef}
        className="hero-constellation-canvas"
        style={{ width: '100%', height: '100%', display: 'block' }}
      />

      {/* Sci-Fi Horizon Line */}
      <div className="hero-horizon-glow" />
    </div>
  )
}






