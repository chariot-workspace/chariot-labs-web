import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, Line } from '@react-three/drei'
import * as THREE from 'three'
import { getScrollColor } from '../utils/colors'

const NODE_COUNT = 60
const CONNECT_DISTANCE = 2.8

function generateNodes(count) {
  const nodes = []
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = 4 + Math.random() * 12

    nodes.push({
      x: r * Math.sin(phi) * Math.cos(theta),
      y: r * Math.sin(phi) * Math.sin(theta) * 0.6,
      z: r * Math.cos(phi),
      speed: Math.random() * 0.2 + 0.05,
      offset: Math.random() * Math.PI * 2,
      size: Math.random() * 0.012 + 0.004,
    })
  }
  return nodes
}

function buildConnections(nodes) {
  const connections = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      const dz = nodes[i].z - nodes[j].z
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
      if (dist < CONNECT_DISTANCE) {
        connections.push([i, j, 1 - dist / CONNECT_DISTANCE])
      }
    }
  }
  return connections
}

function NetworkLines({ nodes, connections, colorRef }) {
  const groupRef = useRef()
  const positionsRef = useRef(nodes.map((n) => new THREE.Vector3(n.x, n.y, n.z)))

  useFrame((state) => {
    const time = state.clock.elapsedTime
    positionsRef.current.forEach((pos, i) => {
      const n = nodes[i]
      pos.set(
        n.x + Math.sin(time * n.speed + n.offset) * 0.15,
        n.y + Math.cos(time * n.speed * 0.8 + n.offset) * 0.12,
        n.z + Math.sin(time * n.speed * 0.6 + n.offset * 1.3) * 0.1
      )
    })

    if (groupRef.current) {
      groupRef.current.children.forEach((child, idx) => {
        const [i, j, strength] = connections[idx]
        if (child.geometry) {
          child.geometry.setFromPoints([
            positionsRef.current[i],
            positionsRef.current[j],
          ])
        }
        if (child.material) {
          child.material.color.lerp(colorRef.current, 0.02)
          child.material.opacity = strength * 0.12
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {connections.map(([i, j, strength], idx) => (
        <Line
          key={idx}
          points={[
            [nodes[i].x, nodes[i].y, nodes[i].z],
            [nodes[j].x, nodes[j].y, nodes[j].z],
          ]}
          color="#00f0ff"
          lineWidth={0.3}
          transparent
          opacity={strength * 0.12}
          toneMapped={false}
        />
      ))}
    </group>
  )
}

/**
 * ParticleField — Neural data network surrounding the core.
 * Nodes drift in 3D space with dynamic connection lines.
 */
export default function ParticleField({ count = NODE_COUNT }) {
  const meshRef = useRef()
  const scroll = useScroll()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const colorRef = useRef(new THREE.Color('#00f0ff'))

  const nodes = useMemo(() => generateNodes(count), [count])
  const connections = useMemo(() => buildConnections(nodes), [nodes])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.elapsedTime
    const scrollOffset = scroll.offset
    const currentColor = getScrollColor(scrollOffset)
    colorRef.current.copy(currentColor)

    nodes.forEach((node, i) => {
      const { x, y, z, size, speed, offset } = node
      const driftX = Math.sin(time * speed + offset) * 0.15
      const driftY = Math.cos(time * speed * 0.8 + offset) * 0.12
      const driftZ = Math.sin(time * speed * 0.6 + offset * 1.3) * 0.1

      dummy.position.set(x + driftX, y + driftY, z + driftZ)
      dummy.scale.setScalar(size)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true

    if (meshRef.current.material) {
      meshRef.current.material.color.lerp(currentColor, 0.03)
      meshRef.current.material.opacity = 0.5 + scrollOffset * 0.2
    }
  })

  return (
    <group>
      <NetworkLines nodes={nodes} connections={connections} colorRef={colorRef} />
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.6}
          toneMapped={false}
        />
      </instancedMesh>
    </group>
  )
}
