/** Root-level noise filter for shiny headline (multiply). Id must match gradientStyle `url(#c3-noise)`. */
export function RootFilters() {
  return (
    <svg
      className="pointer-events-none fixed w-0 h-0 overflow-hidden"
      aria-hidden
    >
      <defs>
        <filter id="c3-noise" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0"
          />
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
        </filter>
      </defs>
    </svg>
  )
}
