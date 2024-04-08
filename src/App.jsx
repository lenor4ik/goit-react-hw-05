import { NavLink } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import css from "./App.module.css"
import clsx from "clsx";
import HomePage from "./pages/HomePage";
import {lazy, Suspense} from "react";
import Loader from "./components/Loader/Loader.jsx";

const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

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
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
            <Route path="/movies/:movieId/cast" element={<MovieDetailsPage />} />
            <Route path="/movies/:movieId/reviews" element={<MovieDetailsPage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
    </main>
    </div>
  );
};

export default App
