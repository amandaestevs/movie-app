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
    initialSlide: 0,
    slidesToScroll: 1,
    centerMode: false,
    responsive: [
      {
        breakpoint: 340,
        settings: {
          slidesToShow: 1.8,
          arrows: false,
          dots: false
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2.2,
          arrows: false,
          dots: false
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 3.2,
          arrows: false,
          dots: false
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 4.2,
          arrows: false,
          dots: false
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 5.2,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 2000, 
        settings: {
          slidesToShow: 6.2,
          slidesToScroll: 6,
        }
      },
    ],
  };

  return (
    <div className="movie-row">
      <h4 className="title">{name}</h4>
      <Slider {...settings}>
        { movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
      </Slider>
    </div>
  );
}

export default MovieRow;
