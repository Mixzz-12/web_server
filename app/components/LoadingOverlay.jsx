'use client'

export default function Loading() {
  return (
    <div className="loading-overlay">
      <div className="timeline-capsule">
        <svg viewBox="0 0 100 100" className="capsule-svg">
          {/* Left half */}
          <path className="capsule-left" d="M50 50 A14 14 0 0 1 50 10 Z" />
          {/* Right half */}
          <path className="capsule-right" d="M50 50 A14 14 0 0 0 50 10 Z" />
        </svg>

        {/* Falling Particles */}
        <div className="falling-particles">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`dot ${i === 2 ? 'red' : 'gray'}`}
              style={{
                left: `${-10 + i * 10}px`,
                animationDelay: `${2 + i * 0.2}s`, // Starts after capsule opens
              }}
            />
          ))}
        </div>
      </div>
      <p className="loading-text">กำลังเตรียมข้อมูลของคุณ...</p>
    </div>
  )
}
