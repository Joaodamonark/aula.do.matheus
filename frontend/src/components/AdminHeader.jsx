import React from 'react';
import './AdminHeader.css';

function AdminHeader() {
  return (
    <header className="admin-header">
      <div className="admin-header-container">
        <div className="admin-logo">
          <h1>⚙️ Painel Administrativo</h1>
        </div>
        <div className="admin-user">
          <span className="user-name">Admin</span>
          <button className="btn-logout">Sair</button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
