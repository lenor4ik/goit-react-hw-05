import {useEffect, useState} from 'react'
import {getTrendingMovies} from "../api.js";
import MovieList from "../components/MovieList.jsx";
import Loader from "../components/Loader/Loader.jsx";

const HomePage = () => {
 const [trendingMovies, setTrendingMovies] = useState();
 const [loading, setLoading] = useState(false);

  useEffect( () => {
    setLoading(true);
    getTrendingMovies()
      .then(response => setTrendingMovies(response.results))
      .finally(() => setLoading(false));
  }, []);

  return (
      <div>
        <h2>Trending today</h2>
        {loading && <Loader />}
        {trendingMovies && <MovieList movies={trendingMovies}/>}
    </div>
  )
}

export default HomePage
