import { NavLink } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import css from "./App.module.css"
import clsx from "clsx";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import MoviesPage from "./pages/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MovieReviews from "./components/MovieReviews";
import MovieCast from "./components/MovieCast";

const getNavLinkClassName = ({ isActive }) => 
  clsx(css.navLink, {
    [css.active]: isActive,
  })

const App = () => {
  
  return (
    <div>
      <header>
        <nav className={css.nav}>
          <NavLink className={getNavLinkClassName} to="/">
            Home
          </NavLink>
          <NavLink className={getNavLinkClassName} to="/movies">
            Movies
          </NavLink>
        </nav>
      </header>
      <main>
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
          <Route path="/movies/:movieId/cast" element={<MovieCast />} />
          <Route path="/movies/:movieId/reviews" element={<MovieReviews />} />
          <Route path="/movies" element={<MoviesPage />} />
  		    <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
    </div>
  );
};

export default App
