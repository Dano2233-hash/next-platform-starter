import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto text-center py-24 space-y-6">
      <span className="text-5xl block animate-bounce">👾</span>
      <h1 className="text-3xl font-black text-white uppercase tracking-tight">
        404 - Page Not Found
      </h1>
      <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
        We can't seem to locate the page you're looking for. It may have been relocated, or typed incorrectly. Explore our Kurdistan store instead.
      </p>

      <div className="flex justify-center gap-3 pt-2">
        <Link
          to="/"
          className="bg-gradient-to-r from-[#0066ff] to-[#7000ff] hover:glow-blue text-white text-xs font-black px-6 py-3 rounded-xl uppercase tracking-wider transition-premium shadow-md"
        >
          Return Home
        </Link>
        <Link
          to="/products"
          className="bg-[#0a0a16] border border-[#1a1a2e] hover:border-gray-700 text-gray-300 text-xs font-bold px-6 py-3 rounded-xl uppercase tracking-wider transition-premium"
        >
          Browse All Products
        </Link>
      </div>
    </div>
  );
}
