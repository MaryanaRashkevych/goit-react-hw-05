
import { useState, useEffect } from 'react';
import { getTrendMovies } from '../../components/ApiService/GetTrendMovies';
import { Link } from 'react-router-dom';
import css from './HomePage.module.css';
import { RotatingLines } from "react-loader-spinner";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";


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
      <ul className={css.movieList}>
        {movies.map((movie) => (
          <li key={movie.id} className={css.movieItem}>
            <Link to={`/movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt={movie.title}
                className={css.moviePoster}
              />
              <p>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
      {!isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
}
