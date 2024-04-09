import SearchBar from '../components/SearchBar/SearchBar';
import { Toaster } from 'react-hot-toast';
import {useCallback, useEffect, useState} from "react";
import MovieList from "../components/MovieList.jsx";
import {getMovieByQuery} from "../api.js";
import Pagination from "../components/Pagination.jsx";
import Loader from "../components/Loader/Loader.jsx";
import {useSearchParams} from "react-router-dom";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [foundMovies, setFoundMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(searchParams.get('page') ?? 1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const searchTerm = searchParams.get('query') ?? '';
    getMovieByQuery(searchTerm, currentPage)
      .then(response => {
        setFoundMovies(response.results);
        setTotalPages(response.total_pages);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));

  }, [currentPage, searchParams]);

  const onPageChange = useCallback((pageNumber) => {
    const params = {query: searchParams.get('query') ?? '', page: pageNumber};
    setCurrentPage(pageNumber);
    setSearchParams(params);
  }, [searchParams, setSearchParams])
  return (
    <div>
      <SearchBar />
      <MovieList movies={foundMovies} />
      <Toaster />
      {loading && <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}><Loader /></div>}
      {totalPages > 2 && <Pagination onPageChange={onPageChange} totalItems={totalPages} />}
    </div>
  );
};

export default MoviesPage
