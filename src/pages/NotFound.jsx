import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-32 text-center">
      <div className="relative inline-block mb-8">
        <h1 className="text-9xl font-black text-white/5 select-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
           <h2 className="text-4xl md:text-5xl font-extrabold text-white">Oops!</h2>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-accent-cyan mb-4 tracking-tight">PAGE NOT FOUND</h3>
      <p className="text-gray-400 mb-12 max-w-md mx-auto">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/" className="bg-accent-blue hover:bg-blue-600 text-white font-bold py-4 px-10 rounded-xl flex items-center gap-2 shadow-lg shadow-accent-blue/20 transition-all">
          <Home size={18} /> Back to Home
        </Link>
        <Link to="/products" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-4 px-10 rounded-xl flex items-center gap-2 transition-all">
          <Search size={18} /> Search Products
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
