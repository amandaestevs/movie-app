import { useContext, useState, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineClose,
  AiOutlineLeft,
} from "react-icons/ai";
import { BsStopwatch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function MoviePage() {
  const [lists, setLists] = useState(null);
  const [showLists, setShowLists] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [reRender, setReRender] = useState(false);
  const { movie } = useContext(MovieContext);
  const { fetchListItems, fetchLists, updateListItems } =
    useContext(UserContext);
  const navigate = useNavigate();

  const getLists = async () => {
    const res = await fetchLists();
    setLists(res);
    setShowLists(true);
  };

  const checkIfMovieIsAFav = async () => {
    const favsList = await fetchListItems("favorites");
    const value = favsList.some((e) => e.id.toString() === movie.id.toString());
    setIsFav(value);
  };

  useEffect(() => {
    checkIfMovieIsAFav();
  }, [reRender]);

  const addToList = async (list) => {
    if (list === "favorites") {
      const action = isFav ? "delete" : "add";
      updateListItems(list, action, movie);
      setReRender(true);
    } else {
      updateListItems(list, "add", movie);
      setShowLists(false);
    }
  };

  return (
    <div className="movie-page">
      <div className="content">
        <div className="heading">
          <AiOutlineLeft className="go-back" onClick={() => navigate(-1)} />   
        </div>
        <div className="grid">
          <div className="left">
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.original_title || movie.original_name}
            />
          </div>
          <div className="middle">
            <div className="description">
              <h2 className="name">
                {movie.original_title || movie.original_name}
              </h2>
              <div className="media_info">
                <p className="release-year">
                  {movie.release_date && movie.release_date.slice(0, 4)}
                  {movie.first_air_date && movie.first_air_date.slice(0, 4)}
                </p>
                <p className="media-type">{movie.media_type}</p>
              </div>
              <p className="overview">{movie.overview}</p>
            </div>
          </div>
          <div className="right">
            <div className="options">
              <div className="icons">
                <span onClick={() => addToList("favorites")}>
                  {isFav ? <AiFillHeart /> : <AiOutlineHeart />}
                </span>
                <span onClick={() => addToList("watchlist")}>
                  <BsStopwatch />
                </span>
              </div>
              <div onClick={() => getLists()}>
                <button>Add To List</button>
              </div>
            </div>
          </div>
        </div>

        {showLists && (
          <ListsModal
            setShowLists={setShowLists}
            lists={lists}
            addToList={addToList}
          />
        )}
      </div>
    </div>
  );
}

export default MoviePage;

const ListsModal = ({ setShowLists, lists, addToList }) => {
  return (
    <div className="add-to-list-modal">
      <div className="modal_heading">
        <h3>Add to list</h3>
        <AiOutlineClose onClick={() => setShowLists(false)} className="icon" />
      </div>
      <div className="modal_container">
        {lists &&
          lists.map((list) => {
            return (
              <div
                key={list._id}
                className="list"
                onClick={() => addToList(list.name)}
              >
                {list.name}
              </div>
            );
          })}
      </div>
    </div>
  );
};
