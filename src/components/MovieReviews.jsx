import {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {getMovieReviews} from "../api.js";
import Loader from "./Loader/Loader.jsx";
import {IMAGE_BASE_URL} from "../constants/index.js";
import css from "../components/Movie.module.css";
const MovieReviews = () => {
  const [movieReviews, setMovieReviews] = useState();
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    setLoading(true);
    getMovieReviews(movieId)
      .then(response => setMovieReviews(response.results))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <>
      {loading && <Loader />}
      {!loading && movieReviews?.length === 0 && <p>There are no reviews for this movie</p>}
      {movieReviews && movieReviews?.length > 0 && movieReviews.map(movie => (
          <div key={movie.id} className={css.contReviews} >
          <div className={css.contTitelReviews}
          >
              <img className={css.imageReviews}  src={`${IMAGE_BASE_URL}${movie?.author_details?.avatar_path}`}
                   alt={movie.author}/>
              <h3>{movie.author}</h3>
            </div>
            <p>{movie.content}</p>
          </div>
        ))
      }
    </>
  )
}

export default MovieReviews
