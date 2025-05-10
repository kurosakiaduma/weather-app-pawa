import React from 'react';
import { Cloud } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <div className="header-bar">
      <div className="logo-container">
        <div className="logo-icon flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full w-10 h-10 mr-3">
          <Cloud className="h-6 w-6 text-white" />
        </div>
        <div className="logo-text">
          <p className="font-bold text-xs">Weather App</p>
          <p className="text-xs">Pawa IT Assessment</p>
        </div>
      </div>
    </div>
  );
};

export default Header;