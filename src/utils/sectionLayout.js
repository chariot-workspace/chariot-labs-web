/** Scroll slot layout — vh offsets must not overlap on any breakpoint. */
const DESKTOP = {
  pages: 6,
  sections: {
    hero: { top: 0, minHeight: 100 },
    about: { top: 100, minHeight: 100 },
    ecosystem: { top: 200, minHeight: 260 },
    contact: { top: 500, minHeight: 100 },
  },
}

const MOBILE = {
  pages: 9,
  sections: {
    hero: { top: 0, minHeight: 100 },
    about: { top: 100, minHeight: 135 },
    ecosystem: { top: 240, minHeight: 420 },
    contact: { top: 670, minHeight: 120 },
  },
}

export function getSectionLayout(isMobile) {
  return isMobile ? MOBILE : DESKTOP
}

export function vh(value) {
  return `${value}vh`
}

/** Scroll offset ratios (0–1) aligned to section tops. */
export function getSectionOffsets(isMobile) {
  const { pages, sections } = getSectionLayout(isMobile)
  const totalVh = pages * 100

  return {
    hero: sections.hero.top / totalVh,
    about: sections.about.top / totalVh,
    ecosystem: sections.ecosystem.top / totalVh,
    contact: sections.contact.top / totalVh,
  }
}

export function getSectionStyle(sectionId, isMobile) {
  const { sections } = getSectionLayout(isMobile)
  const section = sections[sectionId]
  if (!section) return {}

  return {
    top: vh(section.top),
    minHeight: vh(section.minHeight),
  }
}
