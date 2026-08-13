import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="py-24 text-center space-y-4 max-w-md mx-auto">
      <h1 className="text-4xl font-black text-[#00e5ff] uppercase tracking-wider">404</h1>
      <h2 className="text-xl font-bold text-white">Oops! Page Not Found</h2>
      <p className="text-xs text-gray-400 leading-relaxed">
        The route you are searching for does not exist on Dano Store. Click below to return to the premium digital dashboard.
      </p>
      <Link
        to="/"
        className="inline-block rounded-xl bg-gradient-to-r from-[#0066ff] to-[#7000ff] px-6 py-2.5 text-xs font-black uppercase text-white shadow-md hover:opacity-95 transition"
      >
        Go To Home
      </Link>
    </div>
  );
}
