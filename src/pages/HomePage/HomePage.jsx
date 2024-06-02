
import { useState, useEffect } from 'react';
import { getTrendMovies } from '../../components/ApiService/GetTrendMovies';

import css from './HomePage.module.css';
import { RotatingLines } from "react-loader-spinner";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import MovieList from '../../components/MovieList/MovieList';


export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
 
 

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const data = await getTrendMovies(page);
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMovies();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={css.container}>
      <h2>Trending Movies</h2>
      {isError && (
        <p className={css.warningText}>
          Sorry! There was an error. Try to reload!
        </p>
      )}
      {isLoading && (
        <div className={css.loaderContainer}>
          <RotatingLines visible={isLoading} />
        </div>
      )}
      <MovieList movies={movies} />
      {!isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
}
