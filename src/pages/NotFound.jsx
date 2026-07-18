import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-24 text-center space-y-6 max-w-md mx-auto">
      <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-950/20 text-amber-500 border border-amber-500/20 shadow animate-bounce">
        <AlertTriangle className="h-10 w-10" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-white tracking-tight uppercase">404 - LOST IN THE MATRIX</h1>
        <p className="text-sm text-gray-400">
          The page or digital service you requested does not exist or has been relocated to another galaxy.
        </p>
      </div>

      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-xs font-black uppercase text-white shadow hover:from-blue-500 hover:to-cyan-400 transition"
        >
          <Home className="h-4 w-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
