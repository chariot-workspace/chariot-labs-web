import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, Grid } from '@react-three/drei'

/**
 * HoloGrid — Holographic floor grid that shifts with scroll.
 */
export default function HoloGrid() {
  const gridRef = useRef()
  const scroll = useScroll()

  useFrame(() => {
    const scrollOffset = scroll.offset
    if (gridRef.current) {
      gridRef.current.position.y = -3 + scrollOffset * 1.5
    }
  })

  return (
    <Grid
      ref={gridRef}
      args={[40, 40]}
      cellSize={0.5}
      cellThickness={0.5}
      cellColor="#00f0ff"
      sectionSize={2}
      sectionThickness={1}
      sectionColor="#8b5cf6"
      fadeDistance={22}
      fadeStrength={1.2}
      followCamera={false}
      infiniteGrid
      position={[0, -3, 0]}
    />
  )
}
