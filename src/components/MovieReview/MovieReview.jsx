import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMovieReview } from "../ApiService/GetMovieReview";
import css from "./MovieReview.module.css";

export default function MovieReview() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovieReview = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const data = await getMovieReview(movieId);
        setReviews(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieReview();
  }, [movieId]);

  if (isLoading) {
    return;
    <div>Loading movie reviews...</div>;
  }
  if (isError) {
    return <div>Error loading movie reviews...</div>;
  }

  if (!reviews) {
    return null;
  }
  return (
    <div className={css.reviewsContainer}>
      <h2>Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id} className={css.review}>
          <p>
            <strong>{review.author}</strong>
          </p>
          <p>{review.content}</p>
        </div>
      ))}
      <Link to="/">
        <span className={css.link}>Go back </span>
      </Link>
    </div>
  );
}
