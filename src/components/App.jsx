import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react"; 
import css from "./App.module.css";
// import Navigation from "./Navigation/Navigation";
//import HomePage from "../pages/HomePage/HomePage"
//import MoviePage from "../pages/MoviePage/MoviePage"
//import ErrorPage from "../pages/ErrorPage/ErrorPage";
//import MovieDetailPage from "../pages/MovieDetailPage/MovieDetailPage";
import MovieCast from "./MovieCast/MovieCast";
import MovieReview from "./MovieReview/MovieReview";
 
const Navigation =lazy (()=> import("./Navigation/Navigation"));
const HomePage = lazy(()=> import("../pages/HomePage/HomePage"));
const MoviesPage = lazy(()=> import("../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(()=> import("../pages/MovieDetailsPage/MovieDetailsPage"));
const ErrorPage = lazy(()=> import("../pages/ErrorPage/ErrorPage"))

export default function App(){
  return (
      <div className={css.container}>
           <div className={css.titleCont}>
            <h1 className={css.title}>
              Enjoy the most up-to-date trending list of movies or search your favorites...
             </h1>
           </div>
            
<Navigation/>
<Suspense fallback={<div>Loading...</div>}>
           <Routes>
<Route path="/" element={<HomePage/>}/>
<Route path="/movies" element={<MoviesPage/>}/>
<Route path="/movies/:movieId" element={<MovieDetailsPage/>}>
  <Route path="/movies/:movieId/cast" element={<MovieCast/>}/>
  <Route path="/movies/:movieId/review" element={<MovieReview/>}/>
 </Route>
<Route path="*" element={<ErrorPage/>}/>

           </Routes>
           </Suspense>
           </div>);
}

