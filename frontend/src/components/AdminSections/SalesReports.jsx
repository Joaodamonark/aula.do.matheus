import React, { useState, useEffect } from 'react';
import './AdminSections.css';
import { getSales } from '../../../services/firebaseService';

function SalesReports() {
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalVendas: 0,
    totalReceita: 0,
    vendiasMes: 0,
  });

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);
        const data = await getSales();
        setVendas(data);
        
        // Calcular estatísticas
        const totalVendas = data.length;
        const totalReceita = data.reduce((sum, v) => sum + v.precoVenda, 0);
        const vendiasMes = data.filter(v => {
          const vendaDate = new Date(v.dataVenda);
          const hoje = new Date();
          return vendaDate.getMonth() === hoje.getMonth() && vendaDate.getFullYear() === hoje.getFullYear();
        }).length;

        setStats({
          totalVendas,
          totalReceita,
          vendiasMes,
        });
      } catch (error) {
        console.error('Erro ao carregar vendas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  return (
    <div className="admin-section">
      <h2>Relatório de Vendas</h2>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total de Vendas</h3>
          <p className="stat-value">{stats.totalVendas}</p>
        </div>
        <div className="stat-card">
          <h3>Receita Total</h3>
          <p className="stat-value">R$ {stats.totalReceita.toLocaleString('pt-BR')}</p>
        </div>
        <div className="stat-card">
          <h3>Vendas este Mês</h3>
          <p className="stat-value">{stats.vendiasMes}</p>
        </div>
      </div>

      {loading ? (
        <div className="loading">Carregando vendas...</div>
      ) : vendas.length === 0 ? (
        <div className="no-data">Nenhuma venda encontrada</div>
      ) : (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Carro</th>
                <th>Vendedor</th>
                <th>Comprador</th>
                <th>Valor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {vendas.map((venda) => (
                <tr key={venda.id}>
                  <td>{new Date(venda.dataVenda).toLocaleDateString('pt-BR')}</td>
                  <td>{venda.carroId}</td>
                  <td>{venda.vendedorId}</td>
                  <td>{venda.compradorId}</td>
                  <td>R$ {venda.precoVenda.toLocaleString('pt-BR')}</td>
                  <td>
                    <span className={`status-badge status-${venda.status}`}>
                      {venda.status}
                    </span>
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

export default SalesReports;
