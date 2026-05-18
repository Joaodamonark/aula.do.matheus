import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>🚗 CarSell</h1>
        </div>
        <nav className="nav">
          <a href="/" className="nav-item">Home</a>
          <a href="/meus-carros" className="nav-item">Meus Carros</a>
          <a href="/compras" className="nav-item">Compras</a>
          <a href="/perfil" className="nav-item">Perfil</a>
        </nav>
        <div className="header-actions">
          <a href="/anunciar" className="btn-primary">Anunciar Carro</a>
          <a href="/login" className="btn-secondary">Login</a>
        </div>
      </div>
    </header>
  );
}

export default Header;
