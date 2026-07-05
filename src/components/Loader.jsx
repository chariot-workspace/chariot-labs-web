import { useProgress, Html } from '@react-three/drei'

export default function Loader() {
  const { progress } = useProgress()

  return (
    <Html center>
      <div className="loader-container">
        {/* Logo Mark */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <img
            src="/logo.jpg"
            alt="Chariot Labs Logo"
            width="48"
            height="48"
            style={{ borderRadius: '50%', objectFit: 'cover' }}
          />
          <span
            style={{
              fontFamily: '"Outfit", system-ui, sans-serif',
              fontSize: '1.1rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#94a3b8',
            }}
          >
            Chariot Labs
          </span>
        </div>

        {/* Progress bar */}
        <div className="loader-bar-track">
          <div
            className="loader-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span
          style={{
            fontFamily: '"Inter", system-ui, sans-serif',
            fontSize: '0.75rem',
            color: '#475569',
            letterSpacing: '0.1em',
          }}
        >
          {Math.round(progress)}%
        </span>
      </div>
    </Html>
  )
}
