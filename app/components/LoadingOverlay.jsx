'use client'
import React from 'react'

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm overflow-hidden">
      {/* Custom Capsule Animation */}
      <div className="relative w-24 h-24 animate-spinSlow">
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="capsuleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="#f43f5e" />
              <stop offset="50%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <g>
            <rect x="16" y="24" width="32" height="16" rx="8" ry="8" fill="url(#capsuleGradient)" stroke="#555" strokeWidth="2" />
          </g>
        </svg>
        {/* Drop Shadow */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gray-400 opacity-30 blur-md rounded-full animate-pulse" />
      </div>

      {/* Text */}
      <p className="mt-6 text-gray-800 text-lg animate-pulse">Preparing your data...</p>
    </div>
  )
}
