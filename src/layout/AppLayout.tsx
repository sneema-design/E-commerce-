import type { ReactNode } from "react"

interface AppLayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="relative min-h-screen bg-background">
      
      {/* 🌳 soft wood warmth */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute inset-0 -z-10
          bg-[radial-gradient(1200px_600px_at_top,_oklch(0.97_0.03_85)_0%,_transparent_60%)]
        "
      />

      {/* subtle grain illusion */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute inset-0 -z-10
          opacity-[0.035]
          bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22/></filter><rect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22/></svg>')]
        "
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
