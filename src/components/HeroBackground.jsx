import { useEffect, useRef, useState } from 'react'

export default function HeroBackground() {
  const canvasRef = useRef(null)
  const [telemetry, setTelemetry] = useState({
    fps: 60,
    tokensPerSec: 1420,
    activeAgents: 48,
    latency: '0.8ms',
  })

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

    // Mouse tracking & 3D rotation inertia
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      rotX: 0,
      rotY: 0,
      targetRotX: 0,
      targetRotY: 0,
      active: false,
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.targetX = e.clientX - rect.left
      mouse.targetY = e.clientY - rect.top
      mouse.active = true

      // Map mouse position to 3D rotation angles (-0.6 to +0.6 rad)
      const normX = (mouse.targetX / width - 0.5) * 2
      const normY = (mouse.targetY / height - 0.5) * 2
      mouse.targetRotY = normX * 0.75
      mouse.targetRotX = -normY * 0.5
    }

    const handleMouseLeave = () => {
      mouse.active = false
      mouse.targetRotX = 0
      mouse.targetRotY = 0
    }

    // Particle Explosions on click
    const explosions = []
    const handleCanvasClick = (e) => {
      const rect = canvas.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top

      const particleCount = 45
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 3 + Math.random() * 8
        const life = 1.0
        explosions.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 3 + 1.5,
          life,
          decay: 0.018 + Math.random() * 0.02,
          colorIdx: Math.floor(Math.random() * 3),
        })
      }
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)
    container.addEventListener('click', handleCanvasClick)

    // Theme state observer
    let isLight = document.documentElement.getAttribute('data-theme') === 'light'
    const themeObserver = new MutationObserver(() => {
      isLight = document.documentElement.getAttribute('data-theme') === 'light'
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    // --- 3D Sphere Neural Globe Setup ---
    const sphereRadius = Math.min(width, height) * 0.32
    const sphereNodeCount = 180
    const sphereNodes = []

    // Golden Ratio Fibonacci distribution for uniform 3D sphere layout
    const phi = (1 + Math.sqrt(5)) / 2
    for (let i = 0; i < sphereNodeCount; i++) {
      const theta = (2 * Math.PI * i) / phi
      const y3d = 1 - (i / (sphereNodeCount - 1)) * 2
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y3d * y3d))
      const x3d = Math.cos(theta) * radiusAtY
      const z3d = Math.sin(theta) * radiusAtY

      sphereNodes.push({
        x0: x3d * sphereRadius,
        y0: y3d * sphereRadius,
        z0: z3d * sphereRadius,
        x: 0,
        y: 0,
        z: 0,
        projX: 0,
        projY: 0,
        scale: 1,
        colorIdx: Math.floor(Math.random() * 3),
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // --- 3D Orbital Rings ---
    const ringCount = 3
    const ringRadii = [sphereRadius * 1.15, sphereRadius * 1.35, sphereRadius * 1.6]
    const ringSpeeds = [0.008, -0.005, 0.012]
    const ringAngles = [0, 0, 0]

    // --- 3D Wave Matrix Grid Setup (Floor) ---
    const cols = 28
    const rows = 18
    const gridSpacing = 45
    const gridPoints = []

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        gridPoints.push({
          c,
          r,
          x0: (c - cols / 2) * gridSpacing,
          y0: 180 + r * 22,
          z0: r * 35,
          waveOffset: c * 0.3 + r * 0.2,
        })
      }
    }

    // --- Energy Pulses Traveling Across 3D Neural Connections ---
    const pulses = []
    const addPulse = (n1, n2) => {
      pulses.push({
        n1,
        n2,
        progress: 0,
        speed: 0.025 + Math.random() * 0.03,
      })
    }

    // Floating Code Stream Tokens
    const aiSymbols = [
      'QUANTUM_AI',
      'HYPER_RAG',
      'AGENT_CORE',
      'AUTONOMOUS',
      'LLM_V5',
      'DEEP_NEURAL',
      'VECTOR_DB',
      'CUDA_FLOPS',
      'ZERO_LATENCY',
      'FINE_TUNED',
      'TENSOR_OPS',
    ]

    const tokens = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vy: -0.5 - Math.random() * 1.2,
      text: aiSymbols[Math.floor(Math.random() * aiSymbols.length)],
      opacity: Math.random() * 0.5 + 0.2,
      size: Math.floor(Math.random() * 3) + 11,
    }))

    let frameCount = 0
    let autoRotY = 0

    // Telemetry updates
    const telemetryInterval = setInterval(() => {
      setTelemetry((prev) => ({
        fps: 58 + Math.floor(Math.random() * 5),
        tokensPerSec: 1400 + Math.floor(Math.random() * 80),
        activeAgents: 48,
        latency: (0.7 + Math.random() * 0.3).toFixed(1) + 'ms',
      }))
    }, 2000)

    // Render loop
    const render = () => {
      frameCount++
      ctx.clearRect(0, 0, width, height)

      // Lerp mouse coordinates & rotations
      mouse.x += (mouse.targetX - mouse.x) * 0.08
      mouse.y += (mouse.targetY - mouse.y) * 0.08
      mouse.rotX += (mouse.targetRotX - mouse.rotX) * 0.05
      mouse.rotY += (mouse.targetRotY - mouse.rotY) * 0.05

      autoRotY += 0.004

      const combinedRotX = mouse.rotX
      const combinedRotY = autoRotY + mouse.rotY

      // Colors
      const primaryGlow = isLight ? '#0052cc' : '#00f0ff'
      const nodeColors = isLight
        ? ['#0052cc', '#7c3aed', '#0284c7']
        : ['#00f0ff', '#a855f7', '#ec4899']

      const symbolColor = isLight ? 'rgba(0, 82, 204, ' : 'rgba(0, 240, 255, '
      const gridColor = isLight ? 'rgba(0, 82, 204, 0.15)' : 'rgba(0, 240, 255, 0.22)'

      const centerX = width / 2
      const centerY = height * 0.42

      // --- 1. Draw 3D Wave Matrix Grid at Bottom ---
      const fov = 400
      ctx.beginPath()
      for (let pt of gridPoints) {
        const waveY = Math.sin(frameCount * 0.04 + pt.waveOffset) * 16

        // Mouse displacement on wave grid
        const dx = mouse.x - (centerX + pt.x0)
        const dy = mouse.y - (centerY + pt.y0 + waveY)
        const dist = Math.sqrt(dx * dx + dy * dy)
        let pushY = 0
        if (dist < 180) {
          pushY = Math.sin((1 - dist / 180) * Math.PI) * 25
        }

        const worldY = pt.y0 + waveY - pushY
        const worldZ = pt.z0 + 200

        const scale = fov / (fov + worldZ)
        const screenX = centerX + pt.x0 * scale
        const screenY = centerY + worldY * scale

        pt.screenX = screenX
        pt.screenY = screenY
        pt.scale = scale
      }

      // Render Grid Lines
      for (let r = 0; r < rows; r++) {
        ctx.beginPath()
        for (let c = 0; c < cols; c++) {
          const pt = gridPoints[r * cols + c]
          if (c === 0) ctx.moveTo(pt.screenX, pt.screenY)
          else ctx.lineTo(pt.screenX, pt.screenY)
        }
        ctx.strokeStyle = gridColor
        ctx.lineWidth = 0.8
        ctx.stroke()
      }

      for (let c = 0; c < cols; c += 2) {
        ctx.beginPath()
        for (let r = 0; r < rows; r++) {
          const pt = gridPoints[r * cols + c]
          if (r === 0) ctx.moveTo(pt.screenX, pt.screenY)
          else ctx.lineTo(pt.screenX, pt.screenY)
        }
        ctx.strokeStyle = gridColor
        ctx.lineWidth = 0.8
        ctx.stroke()
      }

      // --- 2. Draw Floating Tech Code Tokens ---
      ctx.font = '12px "Outfit", "Inter", monospace'
      for (let t of tokens) {
        t.y += t.vy
        if (t.y < -30) {
          t.y = height + 20
          t.x = Math.random() * width
          t.text = aiSymbols[Math.floor(Math.random() * aiSymbols.length)]
        }
        ctx.fillStyle = symbolColor + t.opacity + ')'
        ctx.fillText(t.text, t.x, t.y)
      }

      // --- 3. Transform 3D Sphere Neural Globe ---
      const cosX = Math.cos(combinedRotX)
      const sinX = Math.sin(combinedRotX)
      const cosY = Math.cos(combinedRotY)
      const sinY = Math.sin(combinedRotY)

      for (let n of sphereNodes) {
        n.pulse += 0.03

        // Rotate Y
        let x1 = n.x0 * cosY - n.z0 * sinY
        let z1 = n.x0 * sinY + n.z0 * cosY

        // Rotate X
        let y1 = n.y0 * cosX - z1 * sinX
        let z2 = n.y0 * sinX + z1 * cosX

        n.x = x1
        n.y = y1
        n.z = z2

        // Perspective Projection
        const scale = fov / (fov + z2 + sphereRadius * 1.5)
        n.scale = scale
        n.projX = centerX + x1 * scale
        n.projY = centerY + y1 * scale
      }

      // Sort nodes by Z depth for realistic 3D occlusion
      sphereNodes.sort((a, b) => b.z - a.z)

      // --- 4. Draw 3D Neural Connections & Arc Rays ---
      const maxConnectDist = sphereRadius * 0.55
      for (let i = 0; i < sphereNodes.length; i++) {
        const n1 = sphereNodes[i]
        if (n1.z > sphereRadius * 0.6) continue // Backface culling optimization

        for (let j = i + 1; j < sphereNodes.length; j++) {
          const n2 = sphereNodes[j]
          const dx = n1.x - n2.x
          const dy = n1.y - n2.y
          const dz = n1.z - n2.z
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * 0.45 * Math.max(0.1, n1.scale)
            ctx.beginPath()
            ctx.moveTo(n1.projX, n1.projY)
            ctx.lineTo(n2.projX, n2.projY)
            ctx.strokeStyle = nodeColors[n1.colorIdx]
            ctx.globalAlpha = alpha
            ctx.lineWidth = 1.1 * n1.scale
            ctx.stroke()

            // Trigger travelling network energy pulses
            if (frameCount % 45 === 0 && Math.random() < 0.05 && pulses.length < 20) {
              addPulse(n1, n2)
            }
          }
        }
      }
      ctx.globalAlpha = 1.0

      // --- 5. Draw Traveling Energy Pulses ---
      for (let pIdx = pulses.length - 1; pIdx >= 0; pIdx--) {
        const p = pulses[pIdx]
        p.progress += p.speed
        if (p.progress >= 1) {
          pulses.splice(pIdx, 1)
          continue
        }

        const px = p.n1.projX + (p.n2.projX - p.n1.projX) * p.progress
        const py = p.n1.projY + (p.n2.projY - p.n1.projY) * p.progress

        ctx.beginPath()
        ctx.arc(px, py, 3.5 * p.n1.scale, 0, Math.PI * 2)
        ctx.fillStyle = primaryGlow
        ctx.shadowBlur = isLight ? 6 : 14
        ctx.shadowColor = primaryGlow
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // --- 6. Draw 3D Sphere Node Dots & Glow ---
      for (let n of sphereNodes) {
        const r = (2.2 + Math.sin(n.pulse) * 1.2) * n.scale
        ctx.beginPath()
        ctx.arc(n.projX, n.projY, Math.max(r, 0.8), 0, Math.PI * 2)
        ctx.fillStyle = nodeColors[n.colorIdx]
        ctx.shadowBlur = (isLight ? 4 : 10) * n.scale
        ctx.shadowColor = nodeColors[n.colorIdx]
        ctx.globalAlpha = Math.min(1, Math.max(0.25, (n.z + sphereRadius) / (sphereRadius * 2)))
        ctx.fill()
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1.0
      }

      // --- 7. Draw Rotating 3D Holographic Orbit Rings ---
      for (let rIdx = 0; rIdx < ringCount; rIdx++) {
        ringAngles[rIdx] += ringSpeeds[rIdx]
        const rRadius = ringRadii[rIdx]
        const rAngle = ringAngles[rIdx]

        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(rAngle + mouse.rotY * 0.5)
        ctx.scale(1, 0.35 + rIdx * 0.1)

        ctx.beginPath()
        ctx.arc(0, 0, rRadius, 0, Math.PI * 2)
        ctx.strokeStyle = rIdx === 0 ? primaryGlow : nodeColors[rIdx % nodeColors.length]
        ctx.lineWidth = 1.2
        ctx.setLineDash([12, 18])
        ctx.globalAlpha = isLight ? 0.3 : 0.45
        ctx.shadowBlur = isLight ? 6 : 12
        ctx.shadowColor = primaryGlow
        ctx.stroke()
        ctx.restore()
      }

      // --- 8. Render Click Explosion Particles ---
      for (let eIdx = explosions.length - 1; eIdx >= 0; eIdx--) {
        const p = explosions[eIdx]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.08 // slight gravity
        p.life -= p.decay

        if (p.life <= 0) {
          explosions.splice(eIdx, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * p.life, 0, Math.PI * 2)
        ctx.fillStyle = nodeColors[p.colorIdx]
        ctx.globalAlpha = p.life
        ctx.shadowBlur = 10
        ctx.shadowColor = primaryGlow
        ctx.fill()
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1.0
      }

      // --- 9. Interactive Mouse Cursor Glow & Gravitational Lens ---
      if (mouse.active) {
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2)
        ctx.fillStyle = primaryGlow
        ctx.shadowBlur = 20
        ctx.shadowColor = primaryGlow
        ctx.fill()
        ctx.shadowBlur = 0

        // External cursor ring
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 24 + Math.sin(frameCount * 0.1) * 4, 0, Math.PI * 2)
        ctx.strokeStyle = primaryGlow
        ctx.globalAlpha = 0.5
        ctx.lineWidth = 1.2
        ctx.stroke()
        ctx.globalAlpha = 1.0
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      resizeObserver.disconnect()
      themeObserver.disconnect()
      clearInterval(telemetryInterval)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      container.removeEventListener('click', handleCanvasClick)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="hero-crazy-bg" aria-hidden="true">
      {/* High-Tech Glowing Ambient Plasma Orbs */}
      <div className="hero-plasma-orb hero-plasma-1" />
      <div className="hero-plasma-orb hero-plasma-2" />
      <div className="hero-plasma-orb hero-plasma-3" />

      {/* Cyber Grid Mask Overlay */}
      <div className="hero-cyber-grid" />

      {/* Main 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="hero-constellation-canvas"
        style={{ width: '100%', height: '100%', display: 'block' }}
      />

      {/* Floating Holographic Sci-Fi HUD Telemetry Badges */}
      <div className="hero-hud-container">
        {/* Top Left: Neural Telemetry Status */}
        <div className="hero-hud-badge hero-hud-left">
          <div className="hero-hud-header">
            <span className="hero-hud-pulse" />
            <span className="hero-hud-title">NEURAL CORE ENGINE v5.2</span>
          </div>
          <div className="hero-hud-metrics">
            <div className="hero-hud-metric">
              <span className="hero-hud-label">STATUS</span>
              <span className="hero-hud-value text-accent">OPTIMAL</span>
            </div>
            <div className="hero-hud-metric">
              <span className="hero-hud-label">LATENCY</span>
              <span className="hero-hud-value">{telemetry.latency}</span>
            </div>
            <div className="hero-hud-metric">
              <span className="hero-hud-label">THROUGHPUT</span>
              <span className="hero-hud-value">{telemetry.tokensPerSec} T/s</span>
            </div>
          </div>
        </div>

        {/* Top Right: Agent Network Radar HUD */}
        <div className="hero-hud-badge hero-hud-right">
          <div className="hero-radar-box">
            <div className="hero-radar-sweep" />
            <div className="hero-radar-dot hero-radar-dot-1" />
            <div className="hero-radar-dot hero-radar-dot-2" />
            <div className="hero-radar-dot hero-radar-dot-3" />
          </div>
          <div className="hero-hud-info">
            <span className="hero-hud-sub">AUTONOMOUS AGENTS</span>
            <span className="hero-hud-bold">{telemetry.activeAgents} / 48 ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Glowing Horizon Beam Accent Line */}
      <div className="hero-horizon-glow" />
    </div>
  )
}


