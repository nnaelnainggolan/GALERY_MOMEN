export function BackgroundWaves() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <svg
        className="h-full w-full text-primary"
        viewBox="0 0 1440 1024"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="currentColor" strokeWidth="1" opacity="0.05">
          <path d="M-100 120 C 250 40, 500 200, 800 100 S 1300 40, 1600 160" />
          <path d="M-100 260 C 220 340, 480 160, 780 260 S 1280 360, 1600 260" />
          <path d="M-100 420 C 260 360, 520 480, 820 400 S 1320 320, 1600 420" />
          <path d="M-100 600 C 240 520, 500 660, 800 580 S 1300 500, 1600 600" opacity="0.7" />
          <path d="M-100 760 C 260 840, 520 700, 820 780 S 1320 860, 1600 760" opacity="0.6" />
          <path d="M-100 900 C 220 840, 500 960, 800 880 S 1300 820, 1600 900" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}
