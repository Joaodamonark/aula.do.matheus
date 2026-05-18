import React from 'react';
import './AdminNavigation.css';

function AdminNavigation({ activeSection, setActiveSection }) {
  const sections = [
    { id: 'users', label: '👥 Usuários', icon: '👥' },
    { id: 'carros', label: '🚗 Carros', icon: '🚗' },
    { id: 'vendas', label: '📊 Vendas', icon: '📊' },
    { id: 'avaliacoes', label: '⭐ Avaliações', icon: '⭐' },
  ];

  return (
    <nav className="admin-nav">
      <div className="nav-container">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            <span className="nav-icon">{section.icon}</span>
            <span className="nav-label">{section.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default AdminNavigation;
