import { useEffect } from 'react'
import { useScroll } from '@react-three/drei'
import { registerScrollState, setSectionOffsets } from '../utils/scrollTo'

export default function ScrollBridge({ isMobile }) {
  const scroll = useScroll()

  useEffect(() => {
    setSectionOffsets(isMobile)
  }, [isMobile])

  useEffect(() => {
    registerScrollState(scroll)
    return () => registerScrollState(null)
  }, [scroll])

  return null
}
