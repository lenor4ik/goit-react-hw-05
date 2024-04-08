import {useEffect, useState} from 'react'
import {Link, Navigate, useLocation, useParams} from "react-router-dom";
import { getMovieDetails } from "../api.js";
import {IMAGE_BASE_URL} from "../constants/index.js";
import Loader from "../components/Loader/Loader.jsx";
import MovieCast from "../components/MovieCast.jsx";
import MovieReviews from "../components/MovieReviews.jsx";
import css from "./MovieDetailsPage.module.css";
import { useNavigate } from 'react-router-dom';

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState();
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();
  const { pathname } = useLocation();
  
  const isShowingCast = pathname.endsWith("/cast");
  const isShowingReviews = pathname.endsWith("/reviews");
  const voteAverage  = Math.round(movieDetails?.vote_average) * 10;
  const releasedate = (movieDetails?.release_date.split('-')[0] || movieDetails?.release_date.split('_')[0]);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    getMovieDetails(movieId)
      .then(response => setMovieDetails(response))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <>
      <div >
        <button className={css.backButton} onClick={() => navigate(-1)}>Back</button>
      </div>
      {loading && <Loader />}
      {movieDetails && (
        <>
          <div className={css.movieDetails}>
            <img className={css.imageMovie} src={`${IMAGE_BASE_URL}${movieDetails?.poster_path}`} alt={movieDetails?.title}/>
            <div>
              <h2>{movieDetails?.title} ({releasedate})</h2>
              <p>User Score: {voteAverage}%</p>
              <h4>Overview </h4>
                <p>{movieDetails?.overview}
              </p>
              <h4>Genres</h4> 
               <p>{movieDetails?.genres.map(element => (
                  <span className={css.genresName} key={element.id}>{element.name}</span>))}
              </p>
            </div>
          </div>
          <div className={css.lineDiv} >
            <p>Additional information</p>
            <ul>
              <li><Link to={`/movies/${movieId}/cast`}>Cast</Link></li>
              <li><Link to={`/movies/${movieId}/reviews`}>Reviews</Link></li>
            </ul>
          </div>
        </>
      )}
      {isShowingCast && <MovieCast />}
      {isShowingReviews && <MovieReviews />}
    </>
  )
}

export default MovieDetailsPage
