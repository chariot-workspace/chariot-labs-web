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

    let width = canvas.width = container.offsetWidth || window.innerWidth
    let height = canvas.height = container.offsetHeight || 600

    const updateSize = () => {
      if (!container) return
      width = canvas.width = container.offsetWidth || window.innerWidth
      height = canvas.height = container.offsetHeight || 600
    }

    updateSize()

    // ResizeObserver for reliable dimension tracking
    const resizeObserver = new ResizeObserver(() => {
      updateSize()
    })
    resizeObserver.observe(container)

    // Interactive mouse tracker
    const mouse = { x: width / 2, y: height / 2, active: false }
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }
    const handleMouseLeave = () => {
      mouse.active = false
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    // AI Nodes & Constellation Setup
    const nodeCount = 75
    const nodes = []
    const aiSymbols = ['01', 'AI', 'RAG', 'LLM', 'NODE', 'GPU', 'TENSOR', 'AGENT', '10', 'CORE', 'NEURAL', 'VISION', 'PROMPT']

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.4,
        vy: (Math.random() - 0.5) * 1.4,
        radius: Math.random() * 3 + 1.5,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.03 + Math.random() * 0.04,
        colorIndex: Math.floor(Math.random() * 3),
      })
    }

    // Floating Code Stream Tokens
    const tokenCount = 30
    const tokens = []
    for (let i = 0; i < tokenCount; i++) {
      tokens.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: -0.6 - Math.random() * 1.4,
        text: aiSymbols[Math.floor(Math.random() * aiSymbols.length)],
        opacity: Math.random() * 0.7 + 0.3,
      })
    }

    // Energy pulses traveling along network lines
    const pulses = []
    const addPulse = (n1, n2) => {
      pulses.push({
        x1: n1.x,
        y1: n1.y,
        x2: n2.x,
        y2: n2.y,
        progress: 0,
        speed: 0.025 + Math.random() * 0.035,
      })
    }

    let frameCount = 0

    const render = () => {
      frameCount++
      ctx.clearRect(0, 0, width, height)

      const isLight = document.documentElement.getAttribute('data-theme') === 'light'

      // Color Palettes
      const nodeColors = isLight
        ? ['#0052cc', '#7c3aed', '#0284c7']
        : ['#00f0ff', '#a855f7', '#ec4899']

      const lineAlphaBase = isLight ? 0.25 : 0.38
      const symbolColor = isLight ? 'rgba(0, 82, 204, ' : 'rgba(0, 240, 255, '

      // --- Draw Floating AI Code Stream Tokens ---
      ctx.font = '12px "Inter", monospace, sans-serif'
      for (let t of tokens) {
        t.y += t.vy
        if (t.y < -20) {
          t.y = height + 20
          t.x = Math.random() * width
          t.text = aiSymbols[Math.floor(Math.random() * aiSymbols.length)]
        }
        ctx.fillStyle = symbolColor + t.opacity + ')'
        ctx.fillText(t.text, t.x, t.y)
      }

      // --- Update Nodes & Physics ---
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        n.x += n.vx
        n.y += n.vy
        n.pulse += n.pulseSpeed

        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1

        // Mouse attraction
        if (mouse.active) {
          const dx = mouse.x - n.x
          const dy = mouse.y - n.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 200 && dist > 1) {
            n.x += (dx / dist) * 1.2
            n.y += (dy / dist) * 1.2
          }
        }
      }

      // --- Draw Connection Lines ---
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i]

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j]
          const dx = n1.x - n2.x
          const dy = n1.y - n2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 150) {
            const alpha = (1 - dist / 150) * lineAlphaBase
            ctx.beginPath()
            ctx.moveTo(n1.x, n1.y)
            ctx.lineTo(n2.x, n2.y)
            ctx.strokeStyle = nodeColors[n1.colorIndex]
            ctx.globalAlpha = alpha
            ctx.lineWidth = 1.2
            ctx.stroke()

            if (frameCount % 90 === 0 && Math.random() < 0.08 && pulses.length < 20) {
              addPulse(n1, n2)
            }
          }
        }

        // Draw Mouse Electric Rays
        if (mouse.active) {
          const mdx = mouse.x - n1.x
          const mdy = mouse.y - n1.y
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
          if (mdist < 180) {
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(n1.x, n1.y)
            ctx.strokeStyle = isLight ? '#0052cc' : '#00f0ff'
            ctx.globalAlpha = (1 - mdist / 180) * 0.6
            ctx.lineWidth = 1.5
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1.0

      // --- Draw Traveling Energy Pulses ---
      for (let pIdx = pulses.length - 1; pIdx >= 0; pIdx--) {
        const p = pulses[pIdx]
        p.progress += p.speed
        if (p.progress >= 1) {
          pulses.splice(pIdx, 1)
          continue
        }
        const px = p.x1 + (p.x2 - p.x1) * p.progress
        const py = p.y1 + (p.y2 - p.y1) * p.progress

        ctx.beginPath()
        ctx.arc(px, py, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = isLight ? '#0052cc' : '#00f0ff'
        ctx.shadowBlur = isLight ? 8 : 15
        ctx.shadowColor = isLight ? '#0052cc' : '#00f0ff'
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // --- Draw Node Spheres & Glow ---
      for (let n of nodes) {
        const r = n.radius + Math.sin(n.pulse) * 1.2
        ctx.beginPath()
        ctx.arc(n.x, n.y, Math.max(r, 1.5), 0, Math.PI * 2)
        ctx.fillStyle = nodeColors[n.colorIndex]
        ctx.shadowBlur = isLight ? 6 : 14
        ctx.shadowColor = nodeColors[n.colorIndex]
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Draw Mouse Core Beacon
      if (mouse.active) {
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 7, 0, Math.PI * 2)
        ctx.fillStyle = isLight ? '#0052cc' : '#00f0ff'
        ctx.shadowBlur = 20
        ctx.shadowColor = isLight ? '#0052cc' : '#00f0ff'
        ctx.fill()
        ctx.shadowBlur = 0
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      resizeObserver.disconnect()
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="hero-crazy-bg" aria-hidden="true">
      {/* High-Contrast Neon Plasma Orbs */}
      <div className="hero-plasma-orb hero-plasma-1" />
      <div className="hero-plasma-orb hero-plasma-2" />
      <div className="hero-plasma-orb hero-plasma-3" />

      {/* Holographic AI Core Ring */}
      <div className="hero-ai-ring hero-ai-ring-1" />
      <div className="hero-ai-ring hero-ai-ring-2" />

      {/* Cyber Grid Floor */}
      <div className="hero-cyber-grid" />

      {/* Interactive Neural Matrix Canvas */}
      <canvas ref={canvasRef} className="hero-constellation-canvas" style={{ width: '100%', height: '100%', display: 'block' }} />

      {/* Glowing Horizon Beam */}
      <div className="hero-horizon-glow" />
    </div>
  )
}
