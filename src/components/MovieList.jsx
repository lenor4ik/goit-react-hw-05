import {NavLink} from "react-router-dom";

const MovieList = ({movies}) => {
  return (
    <ul>
      {movies && movies.map(movie => (
        <NavLink key={movie.id} to={`/movies/${movie.id}`}><li>{movie.title}</li></NavLink>
      ))}
    </ul>
  )
}

export default MovieList;
