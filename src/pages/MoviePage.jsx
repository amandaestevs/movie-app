import React from "react";
import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import { AiOutlineHeart } from "react-icons/ai";
import { BsStopwatch } from "react-icons/bs";

function MoviePage() {
  const { movie } = useContext(MovieContext);

  return (
    <div className="movie-page">
      <div className="content">
        <div className="left">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="middle">
          <div className="description">
            <h2 className="name">
              {movie.media_type === "movie"
                ? `${movie.title}`
                : `${movie.name}`}
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
              <span>
                <AiOutlineHeart />
              </span>
              <span>
                <BsStopwatch />
              </span>
            </div>
            <div>
              <button>Add To List</button>
            </div>
          </div>
          <div className="ratings"></div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;