import React from 'react';
import './Header.css'; // Import the CSS file

interface HeaderProps {
  title: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onLogout }) => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="medical-inquiry.svg" alt="Logo" className="logo" />
        <h1 className="title">{title}</h1>
      </div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      <button className="logout-button" onClick={onLogout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
