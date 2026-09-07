import React from 'react'
import { Link } from 'react-router-dom'
import { Gamepad2, ArrowLeft } from 'lucide-react'

export function NotFound() {
  return (
    <div className="py-20 text-center space-y-6 max-w-md mx-auto">
      <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mx-auto shadow-xl">
        <Gamepad2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-4xl font-extrabold text-cyan-400">404</span>
        <h1 className="text-2xl font-extrabold text-white">Page Not Found</h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          The page you are looking for might have been moved, renamed, or does not exist.
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home Page</span>
      </Link>
    </div>
  )
}
