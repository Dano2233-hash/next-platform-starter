import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px] mx-auto">
        <div className="w-full h-full bg-[#050811] rounded-[15px] flex items-center justify-center">
          <Gamepad2 className="w-10 h-10 text-cyan-400" />
        </div>
      </div>

      <h1 className="text-4xl font-black text-white">404</h1>
      <h2 className="text-lg font-bold text-gray-200">Page Not Found</h2>
      <p className="text-xs text-gray-400">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link
        to="/"
        className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
}
