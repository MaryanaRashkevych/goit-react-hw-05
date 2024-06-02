import { useEffect, useState } from "react";
import { getMovieSearched } from "../../components/ApiService/GetMovieSearched";
import { useSearchParams } from "react-router-dom";
import css from './MoviesPage.module.css';
import { RotatingLines } from "react-loader-spinner";
import toast from "react-hot-toast";
import MovieList from '../../components/MovieList/MovieList';

export default function MoviePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [search, setSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNoResults, setIsNoResults] = useState(false);

  useEffect(() => {
    const fetchSearchedMovie = async () => {
      if (!query) {
        return; 
      }

      try {
        setIsLoading(true);
        setIsError(false);
        setIsNoResults(false);

        const data = await getMovieSearched(query);

        if (data.results.length === 0) {
          setIsNoResults(true);
          setSearch([]);
          toast.error("There is no movie matching your request");
        } else {
          setSearch(data.results);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchedMovie();
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const newQuery = form.elements.query.value.trim();

    if (newQuery === "") {
      toast.error('Please enter a valid search request.');
      return;
    }

    setSearchParams({ query: newQuery });
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Search Movies</h2>
      <form onSubmit={handleSearch} className={css.searchForm}>
        <input type="text" name="query" className={css.searchInput} defaultValue={query} />
        <button type="submit" className={css.searchButton}>Search</button>
      </form>
      
      {isLoading && (
        <div className={css.loaderContainer}>
          <RotatingLines visible={isLoading} />
        </div>
      )}

      {isError && <p className={css.warningText}>Error fetching movies. Please try again.</p>}

      {isNoResults && <p className={css.warningText}>No results found.</p>}

      <MovieList movies={search} />
    </div>
  );
}
