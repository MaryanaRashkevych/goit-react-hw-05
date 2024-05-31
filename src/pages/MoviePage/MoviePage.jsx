import { useEffect, useState } from "react";
import { getMovieSearched } from "../../components/ApiService/GetMovieSearched";
import { Link, useLocation } from "react-router-dom";
import css from './MoviePage.module.css';
import { RotatingLines } from "react-loader-spinner";
import toast from "react-hot-toast";

export default function MoviePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") || "";

  const [search, setSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNoResults, setIsNoResults] = useState(false);
  const location = useLocation();


  useEffect(() => {
    if (!query) {
      toast.error('Oops.. The query is empty. Start your search');
      return;
    }

    const fetchSearchedMovie = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const data = await getMovieSearched(query);

        if (data.results.length === 0) {
          setIsNoResults(true);
          setSearch([]);
          toast.error("There is no movie matching your request");
        } else {
          setIsNoResults(false);
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

      <ul className={css.movieList}>
        {search.map(movie => (
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
    </div>
  );
}


// import { useEffect, useState } from "react";
// import { useSearchParams, Link } from "react-router-dom";
// import { getMovieSearched } from "../../components/ApiService/GetMovieSearched";
// import css from './MoviePage.module.css';
// import { RotatingLines } from "react-loader-spinner";
// import toast from "react-hot-toast";

// export default function MoviesPage() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const query = searchParams.get("query") || "";
//   const [search, setSearch] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const [isNoResults, setIsNoResult] = useState(false);

//   useEffect(() => {
//     if (!query) return;

//     const fetchSearchedMovie = async () => {
//       try {
//         setIsLoading(true);
//         setIsError(false);

//         const data = await getMovieSearched(query);

//         if (data.results.length === 0) {
//           setIsNoResult(true);
//           setSearch([]);
//           toast.error("There is no movie matching your request");
//         } else {
//           setIsNoResult(false);
//           setSearch(data.results);
//         }
//       } catch (error) {
//         setIsError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchSearchedMovie();
//   }, [query]);

//   const handleSearch = (event) => {
//     event.preventDefault();
//     const form = event.currentTarget;
//     const newQuery = form.elements.query.value.trim();

//     if (newQuery === "") {
//       return toast.error('Oops.. The query is empty. Start your search');
//     }

//     setSearchParams({ query: newQuery });
//   };

//   return (
//     <div className={css.container}>
//       <h2 className={css.title}>Search Movies</h2>
//       <form onSubmit={handleSearch} className={css.searchForm}>
//         <input type="text" name="query" className={css.searchInput} defaultValue={query} />
//         <button type="submit" className={css.searchButton}>Search</button>
//       </form>
      
//       {isLoading && (
//         <div className={css.loaderContainer}>
//           <RotatingLines visible={isLoading} />
//         </div>
//       )}

//       {isError && <p className={css.warningText}>Error fetching movies. Please try again.</p>}

//       {isNoResults && <p className={css.warningText}>No results found.</p>}

//       <ul className={css.movieList}>
//         {search.map(movie => (
//           <li key={movie.id} className={css.movieItem}>
//             <Link to={`/movies/${movie.id}`}>
//               <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} className={css.moviePoster} />
//               <p>{movie.title}</p>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
