import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll, Stars, Float } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import CoreEngine from './CoreEngine'
import ParticleField from './ParticleField'
import HoloGrid from './HoloGrid'
import { getScrollColor } from '../utils/colors'

/**
 * Scene3D — Master 3D scene with scroll-driven camera and post-processing.
 */
export default function Scene3D() {
  const scroll = useScroll()
  const { camera } = useThree()
  const lightRef = useRef()
  const rimLightRef = useRef()
  const smoothOffset = useRef(0)

  const cameraPositions = [
    new THREE.Vector3(0, 0.5, 8),
    new THREE.Vector3(3, 1.5, 9),
    new THREE.Vector3(-2.5, 0.8, 7),
    new THREE.Vector3(2, -0.8, 7.5),
    new THREE.Vector3(0, 1, 10),
  ]

  const cameraTargets = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.3, 0.2, 0),
    new THREE.Vector3(-0.4, 0, 0),
    new THREE.Vector3(0.2, -0.1, 0),
    new THREE.Vector3(0, 0, 0),
  ]

  useFrame((state) => {
    const offset = scroll.offset
    smoothOffset.current = THREE.MathUtils.lerp(
      smoothOffset.current,
      offset,
      0.05
    )
    const so = smoothOffset.current

    const phase = so * (cameraPositions.length - 1)
    const fromIdx = Math.min(Math.floor(phase), cameraPositions.length - 2)
    const toIdx = fromIdx + 1
    const t = phase - fromIdx

    const targetPos = cameraPositions[fromIdx]
      .clone()
      .lerp(cameraPositions[toIdx], t)
    const targetLookAt = cameraTargets[fromIdx]
      .clone()
      .lerp(cameraTargets[toIdx], t)

    // Subtle mouse parallax
    const mouseX = state.pointer.x * 0.3
    const mouseY = state.pointer.y * 0.2
    targetPos.x += mouseX
    targetPos.y += mouseY

    camera.position.lerp(targetPos, 0.06)

    const lookAtMatrix = new THREE.Matrix4()
    lookAtMatrix.lookAt(camera.position, targetLookAt, camera.up)
    const targetQuat = new THREE.Quaternion().setFromRotationMatrix(
      lookAtMatrix
    )
    camera.quaternion.slerp(targetQuat, 0.06)

    const lightColor = getScrollColor(so)
    if (lightRef.current) {
      lightRef.current.color.lerp(lightColor, 0.03)
    }
    if (rimLightRef.current) {
      rimLightRef.current.color.lerp(
        lightColor.clone().multiplyScalar(0.7),
        0.03
      )
    }
  })

  return (
    <>
      <ambientLight intensity={0.08} />
      <directionalLight position={[5, 8, 5]} intensity={0.3} color="#ffffff" />
      <pointLight
        ref={lightRef}
        position={[0, 2, 5]}
        intensity={3}
        color="#00f0ff"
        distance={20}
        decay={2}
      />
      <pointLight
        ref={rimLightRef}
        position={[-6, -2, -4]}
        intensity={1.5}
        color="#8b5cf6"
        distance={18}
        decay={2}
      />
      <pointLight
        position={[5, -3, 3]}
        intensity={0.8}
        color="#f59e0b"
        distance={14}
        decay={2}
      />

      <Stars
        radius={80}
        depth={50}
        count={3000}
        factor={3}
        saturation={0.2}
        fade
        speed={0.5}
      />

      <HoloGrid />

      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
        <CoreEngine />
      </Float>

      <ParticleField count={60} />

      <EffectComposer multisampling={0}>
        <Bloom
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          intensity={1.2}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.2} darkness={0.6} />
      </EffectComposer>
    </>
  )
}
