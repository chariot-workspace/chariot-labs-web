import { useEffect } from 'react'
import { useScroll } from '@react-three/drei'
import { registerScrollState } from '../utils/scrollTo'

/** Registers drei scroll state so HTML overlays & nav can scroll programmatically. */
export default function ScrollBridge() {
  const scroll = useScroll()

  useEffect(() => {
    registerScrollState(scroll)
    return () => registerScrollState(null)
  }, [scroll])

  return null
}
