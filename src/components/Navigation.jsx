import Loader from "./Loader/Loader.jsx";
import {Route, Routes} from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";

import {lazy, Suspense} from "react";

const MovieDetailsPage = lazy(() => import('../pages/MovieDetailsPage.jsx'));
const MoviesPage = lazy(() => import('../pages/MoviesPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

const Navigation = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movies/:movieId" element={<MovieDetailsPage />} >
        <Route path="cast" element={<MovieDetailsPage />} />
        <Route path="reviews" element={<MovieDetailsPage />} />
      </Route>
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);

export default Navigation;
