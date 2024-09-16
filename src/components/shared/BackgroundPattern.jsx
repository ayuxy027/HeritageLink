export const BackgroundPattern = () => (
    <div className="absolute inset-0 z-0 opacity-10">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100" />
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="none" stroke="#4A5568" strokeWidth="1" />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
      </svg>
    </div>
  )