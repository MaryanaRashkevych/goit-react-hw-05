
import { getMovieCast } from '../ApiService/GetMovieCast';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const data = await getMovieCast(movieId);
        setCast(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  if (isLoading) {
    return <div>Loading movie cast...</div>;
  }

  if (isError) {
    return <div>Error loading movie cast...</div>;
  }

  if (!cast.length) {
    return <div>No cast found for this movie.</div>;
  }

  return (
    <div className={css.castContainer}>
      <h2>Cast</h2>
      {cast.map((member) => (
        <div key={member.id} className={css.castMember}>
          <p><strong>{member.name}</strong> as {member.character}</p>
        </div>
      ))}
      <Link to="/">
        <span className={css.link}>Go back</span>
      </Link>
    </div>
  );
}


   





