import React, { useState, useEffect } from 'react';
import './Home.css';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import CarCard from '../../components/CarCard';
import { getCarros } from '../../services/firebaseService';

function Home() {
  const [carros, setCarros] = useState([]);
  const [filteredCarros, setFilteredCarros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    marca: '',
    modelo: '',
    precoMin: '',
    precoMax: '',
    ano: '',
  });

  useEffect(() => {
    const fetchCarros = async () => {
      try {
        setLoading(true);
        const data = await getCarros();
        setCarros(data);
        setFilteredCarros(data);
      } catch (error) {
        console.error('Erro ao carregar carros:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarros();
  }, []);

  const handleSearch = (searchParams) => {
    setFilter(searchParams);
    const filtered = carros.filter((carro) => {
      const marcaMatch = carro.marca
        .toLowerCase()
        .includes(searchParams.marca.toLowerCase());
      const modeloMatch = carro.modelo
        .toLowerCase()
        .includes(searchParams.modelo.toLowerCase());
      const precoMinMatch = !searchParams.precoMin || carro.preco >= searchParams.precoMin;
      const precoMaxMatch = !searchParams.precoMax || carro.preco <= searchParams.precoMax;
      const anoMatch = !searchParams.ano || carro.ano === parseInt(searchParams.ano);

      return marcaMatch && modeloMatch && precoMinMatch && precoMaxMatch && anoMatch;
    });
    setFilteredCarros(filtered);
  };

  return (
    <div className="home">
      <Header />
      <main className="home-main">
        <div className="hero">
          <h1>Encontre seu carro ideal</h1>
          <p>Venda de carros de forma simples e segura</p>
        </div>

        <SearchBar onSearch={handleSearch} />

        <section className="carros-section">
          <h2>Carros Disponíveis</h2>
          
          {loading ? (
            <div className="loading">Carregando carros...</div>
          ) : filteredCarros.length === 0 ? (
            <div className="no-results">
              <p>Nenhum carro encontrado com os filtros selecionados.</p>
            </div>
          ) : (
            <div className="carros-grid">
              {filteredCarros.map((carro) => (
                <CarCard key={carro.id} carro={carro} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;
