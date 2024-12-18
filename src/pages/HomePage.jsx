import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../ui/Navbar';
import styles from '../styles/HomePage.module.css'
import getAllPokemons from '../api/getAllPokemons';
import CardItem from '../components/CardItem';
import Loader from '../ui/Loader';
import { useFetching } from '../hooks/useFetching';
import { useAccessToken } from '../hooks/useAccessToken';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit] = useState(20);
  const [page, setPage] = useState(1);
  const [statusSelect, setStatusSelect] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [accessToken] = useAccessToken();
  
  const [fetchPokemon, isPokemonLoad, pokemonsError] = useFetching(async () => {
    if (!accessToken) return
    const response = await getAllPokemons(accessToken, { limit: limit, page: page });
    setPokemons(response.data);
    setTotalPages(response.pagination.totalPages);
  });

  useEffect(() => {
    fetchPokemon();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, page, limit]);

  const navigate = useNavigate();

  const handleSelectCard = (selectedItem) => {
    setStatusSelect(true);
    setSelectedPokemon(selectedItem)
  }

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleStartButton = () => {
    navigate('/battlePage',{
      state: { selectedPokemon }
    })
    console.log('selectedPokemon', selectedPokemon);
  }

  const memoizedPokemons = useMemo(() => pokemons, [pokemons]);
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.title}>
        <h1>Welcome to Pokemons!</h1>
        <p>Select your Pokemon and start the battle!</p>
      </div>

      {pokemonsError &&
        <h1 style={{ color: 'red' }}>Error loading pokemons list</h1>
      }

      {!isPokemonLoad
        ?
        <div className={styles.pokemonsContainer}>
          <div className={styles.pokemonsList}>
            {memoizedPokemons.map((item) =>
              <CardItem key={item.id} pokemon={item} onClick={() => handleSelectCard(item)} statusSelect={selectedPokemon?.id === item.id} />
            )}
          </div>
        </div>
        :
        <Loader />
      }

      <div className={styles.footer}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
        />

        <button className={styles.startButton} disabled={!statusSelect} onClick={handleStartButton}>
          START
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
