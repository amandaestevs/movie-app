import MovieCard from "./MovieCard";
import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MovieRow({ name, url }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(url);
      setMovies(response.data.results);
    };
    getData();
  }, [url]);

  const settings = {
    dots: true,
    infinite: false,
    swipeToSlide: false,
    initialSlide: 0,
    speed: 500,
    // slidesToShow: 6.2,
    // slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          initialSlide: 0,
          slidesToShow: 2.2,
          slidesToScroll: 1,
          arrows: false,
          dots: false
        },
      },
      {
        breakpoint: 600,
        settings: {
          initialSlide: 0,
          slidesToShow: 3.2,
          slidesToScroll: 1,
          arrows: false,
          dots: false
        },
      },
      {
        breakpoint: 950,
        settings: {
          initialSlide: 0,
          slidesToShow: 5.2,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 2000, 
        settings: {
          initialSlide: 0,
          slidesToShow: 6.2,
          slidesToScroll: 6,
        }
      },
    ],
  };

  return (
    <div className="movie-row">
      <h4 className="title">{name}</h4>
      <Slider {...settings} className="slider">
        { movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
      </Slider>
    </div>
  );
}

export default MovieRow;
