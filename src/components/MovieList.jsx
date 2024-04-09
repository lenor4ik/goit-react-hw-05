import {NavLink, useLocation} from "react-router-dom";
import {memo} from "react";

const MovieList = ({movies}) => {
  const location = useLocation();
  return (
    <ul>
      {movies && movies.map(movie => (
        <NavLink key={movie.id} to={`/movies/${movie.id}`} state={{from: location}}><li>{movie.title}</li></NavLink>
      ))}
    </ul>
  )
}

export default memo(MovieList);
