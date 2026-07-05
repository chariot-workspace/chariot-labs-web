/** Virtual scroll offsets for ScrollControls (pages=6 → 5 intervals). */
export const SECTION_OFFSETS = {
  hero: 0,
  about: 1 / 5,
  ecosystem: 2 / 5,
  contact: 1,
}

let scrollState = null

export function registerScrollState(state) {
  scrollState = state
}

export function scrollToSection(sectionId) {
  if (!scrollState?.el) return

  const offset = SECTION_OFFSETS[sectionId]
  if (offset === undefined) return

  const el = scrollState.el
  const scrollThreshold = el.scrollHeight - el.clientHeight
  el.scrollTo({
    top: offset * scrollThreshold,
    behavior: 'smooth',
  })
}
