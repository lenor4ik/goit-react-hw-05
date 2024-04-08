import {useEffect, useState} from 'react'
import {getMovieCast} from "../api.js";
import {useParams} from "react-router-dom";
import Loader from "./Loader/Loader.jsx";
import {IMAGE_BASE_URL} from "../constants/index.js";
import css from "../components/Movie.module.css";

const MovieCast = () => {
  const [casts, setCasts] = useState();
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    setLoading(true);
    getMovieCast(movieId)
      .then(response => setCasts(response.cast))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <>
      {loading && <Loader />}
      {!loading && casts?.length === 0 && <p>There are no casts for this movie</p>}
      {casts?.length > 0 && casts.map(cast => (
          <div key={cast.id}  >
            <h3>{cast.name}</h3>
            <p>Character: {cast.character}</p>
            <img className={css.imageCharacter} src={`${IMAGE_BASE_URL}${cast?.profile_path}`} alt={cast.name}/>
          </div>
        ))
      }
    </>
  )
}

export default MovieCast
