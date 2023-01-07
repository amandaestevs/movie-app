import { Link } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";

function MovieCard({ movie }) {
  const { setMovie } = useContext(MovieContext);
  const handleClick = () => {
    setMovie(movie);
  };
  return (
    <Link to={`/movie/${movie.id}`} onClick={handleClick}>
      <div className="movie-card">
        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} />
      </div>
    </Link>
  );
}

export default MovieCard;
