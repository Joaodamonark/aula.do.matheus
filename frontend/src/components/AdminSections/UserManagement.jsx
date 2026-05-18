import React, { useState, useEffect } from 'react';
import './AdminSections.css';
import { getUsers, suspendUser, blockUser } from '../../../services/firebaseService';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todos');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSuspendUser = async (userId) => {
    if (window.confirm('Tem certeza que deseja suspender este usuário?')) {
      try {
        await suspendUser(userId);
        setUsers(users.map(u => u.id === userId ? { ...u, statusConta: 'suspenso' } : u));
      } catch (error) {
        console.error('Erro ao suspender usuário:', error);
      }
    }
  };

  const handleBlockUser = async (userId) => {
    if (window.confirm('Tem certeza que deseja bloquear este usuário? Esta ação é permanente.')) {
      try {
        await blockUser(userId);
        setUsers(users.map(u => u.id === userId ? { ...u, statusConta: 'bloqueado' } : u));
      } catch (error) {
        console.error('Erro ao bloquear usuário:', error);
      }
    }
  };

  const filteredUsers = users.filter(user => {
    if (filter === 'todos') return true;
    return user.statusConta === filter;
  });

  return (
    <div className="admin-section">
      <h2>Gerenciar Usuários</h2>
      
      <div className="section-controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
          <option value="todos">Todos os usuários</option>
          <option value="ativo">Usuários Ativos</option>
          <option value="suspenso">Usuários Suspensos</option>
          <option value="bloqueado">Usuários Bloqueados</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Carregando usuários...</div>
      ) : filteredUsers.length === 0 ? (
        <div className="no-data">Nenhum usuário encontrado</div>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Status</th>
                <th>Avaliação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.nome}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`status-badge status-${user.statusConta}`}>
                      {user.statusConta}
                    </span>
                  </td>
                  <td>⭐ {user.avaliacao || 'N/A'}</td>
                  <td>
                    {user.statusConta === 'ativo' && (
                      <>
                        <button className="btn-action btn-suspend" onClick={() => handleSuspendUser(user.id)}>
                          Suspender
                        </button>
                        <button className="btn-action btn-block" onClick={() => handleBlockUser(user.id)}>
                          Bloquear
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
