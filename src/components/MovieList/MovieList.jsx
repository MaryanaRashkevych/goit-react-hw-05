import css from './MovieList.module.css'
import {Link, useLocation } from 'react-router-dom'


export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {movies.map(movie => (
        <li key={movie.id} className={css.movieItem}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            {movie.poster_path ? (
              <img 
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} 
                alt={movie.title} 
                className={css.moviePoster} 
              />
            ) : (
              <div className={css.noImage}>No Image</div>
            )}
            <p className={css.movieTitle}>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
