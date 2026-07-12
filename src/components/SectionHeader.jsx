import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SectionHeader = ({ title, subtitle, link, className = "" }) => {
  return (
    <div className={`flex items-end justify-between mb-8 ${className}`}>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h2>
        {subtitle && <p className="text-gray-400 text-sm md:text-base">{subtitle}</p>}
      </div>
      {link && (
        <Link
          to={link}
          className="text-accent-cyan hover:text-white transition-colors flex items-center text-sm font-medium group"
        >
          View All
          <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
