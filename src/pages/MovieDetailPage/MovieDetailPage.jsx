
import { useState, useEffect, useRef } from "react";
import { useParams, Outlet, Link, useLocation } from "react-router-dom";
import { getMovieDetails } from "../../components/ApiService/GetMovieDetails";
import css from "./MovieDetailPage.module.css";

export default function MovieDetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const backLink = useRef(location.state?.from || "/");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (isLoading) {
    return <div>Loading movie details...</div>;
  }

  if (isError) {
    return <div>Error loading movie details.</div>;
  }

  if (!movie) {
    return null;
  }

  return (
    <div className={css.container}>
    <Link to={backLink}><span className={css.link}>Go back </span></Link>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
        alt={movie.title}
        className={css.poster}
      />
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Rating:</strong> {movie.vote_average}
      </p>
      <p>
        <strong>Genres:</strong>{" "}
        {movie.genres.map((genre) => genre.name).join(", ")}
      </p>
      <ul className={css.links}>
        <Link to="review">Review</Link>
        <Link to="cast">Cast</Link>
      </ul>
      <Outlet />
    </div>
  );
}
