import { getSectionOffsets } from './sectionLayout'

let scrollState = null
let sectionOffsets = getSectionOffsets(false)

export function registerScrollState(state) {
  scrollState = state
}

export function setSectionOffsets(isMobile) {
  sectionOffsets = getSectionOffsets(isMobile)
}

export function scrollToSection(sectionId) {
  if (!scrollState?.el) return

  const offset = sectionOffsets[sectionId]
  if (offset === undefined) return

  const el = scrollState.el
  const scrollThreshold = el.scrollHeight - el.clientHeight
  el.scrollTo({
    top: offset * scrollThreshold,
    behavior: 'smooth',
  })
}
