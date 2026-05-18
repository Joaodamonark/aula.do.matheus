import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [search, setSearch] = useState({
    marca: '',
    modelo: '',
    precoMin: '',
    precoMax: '',
    ano: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  const handleReset = () => {
    setSearch({
      marca: '',
      modelo: '',
      precoMin: '',
      precoMax: '',
      ano: '',
    });
    onSearch({
      marca: '',
      modelo: '',
      precoMin: '',
      precoMax: '',
      ano: '',
    });
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          name="marca"
          placeholder="Marca"
          value={search.marca}
          onChange={handleChange}
          className="search-input"
        />
        <input
          type="text"
          name="modelo"
          placeholder="Modelo"
          value={search.modelo}
          onChange={handleChange}
          className="search-input"
        />
        <input
          type="number"
          name="precoMin"
          placeholder="Preço Mín"
          value={search.precoMin}
          onChange={handleChange}
          className="search-input"
        />
        <input
          type="number"
          name="precoMax"
          placeholder="Preço Máx"
          value={search.precoMax}
          onChange={handleChange}
          className="search-input"
        />
        <input
          type="number"
          name="ano"
          placeholder="Ano"
          value={search.ano}
          onChange={handleChange}
          className="search-input"
        />
        <button type="submit" className="btn-search">
          🔍 Buscar
        </button>
        <button type="button" onClick={handleReset} className="btn-reset">
          Limpar
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
