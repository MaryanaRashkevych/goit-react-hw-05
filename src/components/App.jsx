import { Routes, Route, NavLink } from "react-router-dom";
 

import css from "./App.module.css";
import Navigation from "./Navigation/Navigation";
import HomePage from "../pages/HomePage/HomePage"
import MoviePage from "../pages/MoviePage/MoviePage"
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import MovieDetailPage from "../pages/MovieDetailPage/MovieDetailPage";
import MovieCast from "./MovieCast/MovieCast";
import MovieReview from "./MovieReview/MovieReview";
 

export default function App(){
  return (
      <div className={css.container}>
           <div className={css.titleCont}>
            <h1 className={css.title}>
              Enjoy the most up-to-date trending list of movies or search your favorites...
             </h1>
           </div>
            
<Navigation/>
           <Routes>
<Route path="/" element={<HomePage/>}/>
<Route path="/movies" element={<MoviePage/>}/>
<Route path="/movies/:movieId" element={<MovieDetailPage/>}>
  <Route path="/movies/:movieId/cast" element={<MovieCast/>}/>
  <Route path="/movies/:movieId/review" element={<MovieReview/>}/>
 </Route>
<Route path="*" element={<ErrorPage/>}/>

           </Routes>
           </div>);
}

