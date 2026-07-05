import * as THREE from 'three'

export const SCROLL_COLORS = [
  new THREE.Color('#00f0ff'),
  new THREE.Color('#8b5cf6'),
  new THREE.Color('#3b82f6'),
  new THREE.Color('#22c55e'),
  new THREE.Color('#f59e0b'),
]

export function getScrollColor(scrollOffset, colors = SCROLL_COLORS) {
  const phase = scrollOffset * (colors.length - 1)
  const fromIdx = Math.min(Math.floor(phase), colors.length - 2)
  const toIdx = fromIdx + 1
  const t = phase - fromIdx
  return colors[fromIdx].clone().lerp(colors[toIdx], t)
}
