import SearchBar from '../components/SearchBar/SearchBar';
import { Toaster } from 'react-hot-toast';
import {useState} from "react";
import MovieList from "../components/MovieList.jsx";
import {getMovieByQuery} from "../api.js";
import Pagination from "../components/Pagination.jsx";
import Loader from "../components/Loader/Loader.jsx";

const MoviesPage = () => {
  const [foundMovies, setFoundMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isIncludeAdult, setIsIncludeAdult] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = (searchTerm) => {
    setSearchQuery(searchTerm);
    setLoading(true);
    getMovieByQuery(searchTerm, currentPage, isIncludeAdult)
      .then(response => {
        setFoundMovies(response.results);
        setTotalPages(response.total_pages);
        console.log(response)
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }

  const onPageChange = (pageNumber) => {
    setLoading(true);
    setCurrentPage(pageNumber);
    getMovieByQuery(searchQuery, pageNumber, isIncludeAdult)
      .then(response => {
        setFoundMovies(response.results);
        console.log(response)
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }
  return (
    <div>
      <SearchBar onSubmit={onSubmit} isIncludeAdult={isIncludeAdult} setIsIncludeAdult={setIsIncludeAdult} />
      <MovieList movies={foundMovies} />
      <Toaster />
      {loading && <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}><Loader /></div>}
      {totalPages > 2 && <Pagination onPageChange={onPageChange} totalItems={totalPages} />}
    </div>
  );
};

export default MoviesPage
