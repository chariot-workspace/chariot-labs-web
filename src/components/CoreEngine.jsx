import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, Line } from '@react-three/drei'
import * as THREE from 'three'
import { getScrollColor } from '../utils/colors'

const holoVertexShader = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    vUv = uv;
    gl_Position = projectionMatrix * mvPosition;
  }
`

const holoFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uScroll;

  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;

  void main() {
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.5);

    float scanLine = sin(vUv.y * 80.0 + uTime * 2.0) * 0.5 + 0.5;
    scanLine = pow(scanLine, 8.0) * 0.4;

    float pulse = sin(uTime * 1.5) * 0.5 + 0.5;
    float core = fresnel * (0.6 + pulse * 0.2) + scanLine;

    vec3 color = uColor * core;
    float alpha = core * (0.5 + uScroll * 0.3);

    gl_FragColor = vec4(color, alpha);
  }
`

const SATELLITE_COUNT = 10

function SatelliteNode({ index, scrollRef, colorRef }) {
  const meshRef = useRef()
  const lineRef = useRef()
  const angle = (index / SATELLITE_COUNT) * Math.PI * 2
  const orbitRadius = 2.4 + (index % 3) * 0.35
  const orbitSpeed = 0.25 + (index % 4) * 0.08
  const yOffset = Math.sin(index * 1.7) * 0.6

  useFrame((state) => {
    const time = state.clock.elapsedTime
    const scrollOffset = scrollRef.current

    if (meshRef.current) {
      const a = angle + time * orbitSpeed
      const x = Math.cos(a) * orbitRadius
      const z = Math.sin(a) * orbitRadius
      const y = yOffset + Math.sin(time * 1.2 + index) * 0.25

      meshRef.current.position.set(x, y, z)
      meshRef.current.rotation.x = time * 0.8 + index
      meshRef.current.rotation.y = time * 1.1 + index * 0.5

      const pulse = 1 + Math.sin(time * 3 + index * 0.8) * 0.15
      meshRef.current.scale.setScalar(0.08 * pulse * (1 + scrollOffset * 0.2))

      if (meshRef.current.material) {
        meshRef.current.material.color.lerp(colorRef.current, 0.04)
        meshRef.current.material.emissive.lerp(
          colorRef.current.clone().multiplyScalar(0.5),
          0.04
        )
      }
    }

    if (lineRef.current && meshRef.current) {
      const pos = meshRef.current.position
      lineRef.current.geometry.setFromPoints([
        new THREE.Vector3(0, 0, 0),
        pos.clone(),
      ])
    }
  })

  return (
    <group>
      <Line
        ref={lineRef}
        points={[
          [0, 0, 0],
          [orbitRadius * Math.cos(angle), yOffset, orbitRadius * Math.sin(angle)],
        ]}
        color="#00f0ff"
        transparent
        opacity={0.15}
        toneMapped={false}
      />
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  )
}

/**
 * CoreEngine — Holographic torus knot with orbiting nodes and pulse rings.
 */
export default function CoreEngine() {
  const knotRef = useRef()
  const wireRef = useRef()
  const innerRef = useRef()
  const ringRefs = [useRef(), useRef(), useRef()]
  const shaderRef = useRef()
  const scroll = useScroll()
  const scrollRef = useRef(0)
  const colorRef = useRef(new THREE.Color('#00f0ff'))

  const shaderUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#00f0ff') },
      uScroll: { value: 0 },
    }),
    []
  )

  useFrame((state) => {
    const time = state.clock.elapsedTime
    const scrollOffset = scroll.offset
    scrollRef.current = scrollOffset

    const currentColor = getScrollColor(scrollOffset)
    colorRef.current.copy(currentColor)

    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = time
      shaderRef.current.uniforms.uColor.value.lerp(currentColor, 0.04)
      shaderRef.current.uniforms.uScroll.value = scrollOffset
    }

    if (knotRef.current) {
      knotRef.current.rotation.x = time * 0.12 + scrollOffset * Math.PI
      knotRef.current.rotation.y = time * 0.18 + scrollOffset * Math.PI * 1.5
      const pulse = 1 + Math.sin(time * 1.8) * 0.04
      knotRef.current.scale.setScalar(pulse * (1 + scrollOffset * 0.15))
    }

    if (wireRef.current) {
      wireRef.current.rotation.x = -time * 0.08
      wireRef.current.rotation.y = time * 0.14 + scrollOffset * Math.PI * 0.5
      wireRef.current.rotation.z = time * 0.06
      wireRef.current.material.color.lerp(currentColor, 0.04)
      wireRef.current.material.opacity = 0.08 + scrollOffset * 0.06
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = time * 0.3
      innerRef.current.rotation.z = time * 0.25
      const corePulse = 0.35 + Math.sin(time * 2.5) * 0.08
      innerRef.current.scale.setScalar(corePulse)
      innerRef.current.material.color.lerp(currentColor, 0.04)
      innerRef.current.material.opacity = 0.5 + Math.sin(time * 2) * 0.15
    }

    ringRefs.forEach((ref, i) => {
      if (!ref.current) return
      const speed = 0.2 + i * 0.08
      ref.current.rotation.x = Math.PI / 2 + time * speed + i * 0.5
      ref.current.rotation.z = time * (speed * 0.7) + scrollOffset * Math.PI
      ref.current.material.color.lerp(currentColor, 0.04)
      ref.current.material.opacity = 0.12 + Math.sin(time * 2 + i) * 0.05
    })
  })

  return (
    <group>
      <mesh ref={knotRef}>
        <torusKnotGeometry args={[1.1, 0.32, 256, 32, 2, 3]} />
        <shaderMaterial
          ref={shaderRef}
          vertexShader={holoVertexShader}
          fragmentShader={holoFragmentShader}
          uniforms={shaderUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.85, 2]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.1}
          toneMapped={false}
        />
      </mesh>

      <mesh ref={innerRef}>
        <dodecahedronGeometry args={[0.4, 0]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.5}
          toneMapped={false}
          wireframe
        />
      </mesh>

      {[2.0, 2.5, 3.1].map((radius, i) => (
        <mesh key={radius} ref={ringRefs[i]}>
          <torusGeometry args={[radius, 0.006, 8, 128]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.15 - i * 0.03}
            toneMapped={false}
          />
        </mesh>
      ))}

      {Array.from({ length: SATELLITE_COUNT }).map((_, i) => (
        <SatelliteNode
          key={i}
          index={i}
          scrollRef={scrollRef}
          colorRef={colorRef}
        />
      ))}
    </group>
  )
}
