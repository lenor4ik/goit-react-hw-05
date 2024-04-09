import SearchBar from '../components/SearchBar/SearchBar';
import { Toaster } from 'react-hot-toast';
import {useEffect, useState} from "react";
import MovieList from "../components/MovieList.jsx";
import {getMovieByQuery} from "../api.js";
import Pagination from "../components/Pagination.jsx";
import Loader from "../components/Loader/Loader.jsx";
import {useSearchParams} from "react-router-dom";

const MoviesPage = () => {
  const [foundMovies, setFoundMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

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

  const onPageChange = (pageNumber) => {
    const params = {query: searchParams.get('query') ?? '', page: pageNumber};
    setCurrentPage(pageNumber);
    setSearchParams(params);
  }
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
