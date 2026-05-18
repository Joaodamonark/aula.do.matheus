import React, { useState, useEffect } from 'react';
import './AdminSections.css';
import { getAvaliacoes, removeAvaliacao } from '../../../services/firebaseService';

function ReviewsModeration() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todas');

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        setLoading(true);
        const data = await getAvaliacoes();
        setAvaliacoes(data);
      } catch (error) {
        console.error('Erro ao carregar avaliações:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvaliacoes();
  }, []);

  const handleRemoveAvaliacao = async (avaliacaoId) => {
    if (window.confirm('Tem certeza que deseja remover esta avaliação?')) {
      try {
        await removeAvaliacao(avaliacaoId);
        setAvaliacoes(avaliacoes.filter(a => a.id !== avaliacaoId));
      } catch (error) {
        console.error('Erro ao remover avaliação:', error);
      }
    }
  };

  const filteredAvaliacoes = avaliacoes.filter(avaliacao => {
    if (filter === 'todas') return true;
    if (filter === 'negativas') return avaliacao.estrelas <= 2;
    if (filter === 'com-comentario') return avaliacao.comentario && avaliacao.comentario.length > 0;
    return true;
  });

  return (
    <div className="admin-section">
      <h2>Moderação de Avaliações</h2>
      
      <div className="section-controls">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
          <option value="todas">Todas as avaliações</option>
          <option value="negativas">Avaliações Negativas</option>
          <option value="com-comentario">Com Comentário</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Carregando avaliações...</div>
      ) : filteredAvaliacoes.length === 0 ? (
        <div className="no-data">Nenhuma avaliação encontrada</div>
      ) : (
        <div className="avaliacoes-container">
          {filteredAvaliacoes.map((avaliacao) => (
            <div key={avaliacao.id} className="avaliacao-card">
              <div className="avaliacao-header">
                <div>
                  <h4>Avaliação de {avaliacao.compradorId}</h4>
                  <p className="avaliacao-rating">
                    {'⭐'.repeat(avaliacao.estrelas)}
                    {avaliacao.estrelas < 5 && '☆'.repeat(5 - avaliacao.estrelas)}
                  </p>
                </div>
                <button className="btn-action btn-remove" onClick={() => handleRemoveAvaliacao(avaliacao.id)}>
                  Remover
                </button>
              </div>
              {avaliacao.comentario && (
                <p className="avaliacao-comment">{avaliacao.comentario}</p>
              )}
              <small className="avaliacao-date">
                {new Date(avaliacao.dataCriacao).toLocaleDateString('pt-BR')}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewsModeration;
