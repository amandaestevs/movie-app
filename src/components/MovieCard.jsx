import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { BsTrash } from "react-icons/bs";
import { MovieContext } from "../context/MovieContext";

function MovieCard({ movie, page }) {
  const { setMovie } = useContext(MovieContext);
  const { updateListItems, setListItems, fetchListItems } =
    useContext(UserContext);
  const { name, id } = useParams();

  const deleteItems = async (e) => {
    e.preventDefault();

    if (name === "favorites" || name === "watchlist") {
      await updateListItems(name, "delete", movie);
      setListItems(null);
      const res = await fetchListItems(name);
      return setListItems(res);
    }

    await updateListItems(id, "delete", movie);
    const res = await fetchListItems(name);
    setListItems(null);
    setListItems(res);
  };

  return (
    <Link to={`/movie/${movie.id}`} onClick={() => setMovie(movie)}>
      <div className="movie-card">
        {page && (
          <div className="card-delete-btn" onClick={(e) => deleteItems(e)}>
            <BsTrash className="trash-icon" />
          </div>
        )}
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt={movie.name || movie.title}
        />
      </div>
    </Link>
  );
}

export default MovieCard;
