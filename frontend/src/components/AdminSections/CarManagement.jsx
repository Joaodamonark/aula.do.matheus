import React, { useState, useEffect } from 'react';
import './AdminSections.css';
import { getCarros, approveCarr, rejectCarro, removeCarro } from '../../../services/firebaseService';

function CarManagement() {
  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todos');

  useEffect(() => {
    const fetchCarros = async () => {
      try {
        setLoading(true);
        const data = await getCarros();
        setCarros(data);
      } catch (error) {
        console.error('Erro ao carregar carros:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarros();
  }, []);

  const handleRemoveCarro = async (carroId) => {
    if (window.confirm('Tem certeza que deseja remover este carro?')) {
      try {
        await removeCarro(carroId);
        setCarros(carros.filter(c => c.id !== carroId));
      } catch (error) {
        console.error('Erro ao remover carro:', error);
      }
    }
  };

  const filteredCarros = carros.filter(carro => {
    if (filter === 'todos') return true;
    return carro.status === filter;
  });

  return (
    <div className="admin-section">
      <h2>Gerenciar Carros</h2>
      
      <div className="section-controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
          <option value="todos">Todos os carros</option>
          <option value="disponivel">Disponíveis</option>
          <option value="vendido">Vendidos</option>
          <option value="reservado">Reservados</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Carregando carros...</div>
      ) : filteredCarros.length === 0 ? (
        <div className="no-data">Nenhum carro encontrado</div>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Marca/Modelo</th>
                <th>Placa</th>
                <th>Proprietário</th>
                <th>Preço</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredCarros.map((carro) => (
                <tr key={carro.id}>
                  <td>{carro.marca} {carro.modelo}</td>
                  <td>{carro.placa}</td>
                  <td>{carro.proprietarioId}</td>
                  <td>R$ {carro.preco.toLocaleString('pt-BR')}</td>
                  <td>
                    <span className={`status-badge status-${carro.status}`}>
                      {carro.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-action btn-view">Ver</button>
                    <button className="btn-action btn-remove" onClick={() => handleRemoveCarro(carro.id)}>
                      Remover
                    </button>
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

export default CarManagement;
