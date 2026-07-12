import React from 'react';

const StatCard = ({ title, value, icon: Icon, colorClass }) => {
  return (
    <div className="glass-card p-6 flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
        <Icon size={24} />
      </div>
    </div>
  );
};

export default StatCard;
