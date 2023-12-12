import React from 'react';

const Header = ({ title }) => {
  return (
    <header className="navbar navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand">{title}</span>
      </div>
    </header>
  );
};

export default Header;
