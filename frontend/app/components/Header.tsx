import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <div className="header-bar mb-6">
      <div className="logo-container">
        <Image
          src="/logo.png"
          alt="Pawa IT Logo"
          width={40}
          height={40}
          className="logo"
        />
        <div className="logo-text">
          <p className="font-bold text-xs">Powering your business</p>
          <p className="text-xs">through Cloud technology</p>
        </div>
      </div>
    </div>
  );
};

export default Header;