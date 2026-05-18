import React from 'react';
import './CarCard.css';

function CarCard({ carro }) {
  return (
    <div className="car-card">
      <div className="car-image">
        <img
          src={carro.imagens && carro.imagens[0] ? carro.imagens[0] : '/placeholder-car.jpg'}
          alt={`${carro.marca} ${carro.modelo}`}
        />
        <span className="car-status">{carro.status}</span>
      </div>
      <div className="car-info">
        <h3 className="car-title">
          {carro.marca} {carro.modelo}
        </h3>
        <div className="car-details">
          <span className="detail">📅 {carro.ano}</span>
          <span className="detail">🛣️ {carro.quilometragem.toLocaleString()} km</span>
          <span className="detail">⛽ {carro.combustivel}</span>
        </div>
        <p className="car-description">{carro.descricao}</p>
        <div className="car-footer">
          <p className="car-price">R$ {carro.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          <button className="btn-details">Ver Detalhes</button>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
