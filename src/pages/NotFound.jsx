import React from 'react';
import { Gamepad2, ArrowLeft } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export function NotFound() {
  const { navigate } = useNavigation();

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center p-6 text-center space-y-6">

        {/* Glow Ambient container */}
        <div className="relative p-6 sm:p-10 rounded-2xl bg-[#0d0d15] border border-brand-border/60 max-w-md w-full space-y-5 shadow-xl">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand-cyan/10 blur-2xl rounded-full" />

          <div className="inline-flex p-4 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-cyan">
            <Gamepad2 className="h-8 w-8 animate-spin" style={{ animationDuration: '6s' }} />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-black uppercase tracking-tight text-white">
              404 • LEVEL NOT FOUND
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              The page or digital redeem link you followed does not exist. It may have been relocated or deactivated.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate('#/')}
              className="w-full py-3 rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-xs font-extrabold uppercase tracking-widest text-white transition shadow shadow-brand-blue/20 btn-glow flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to Storefront
            </button>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}

export default NotFound;
