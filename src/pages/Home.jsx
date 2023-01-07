import MovieRow from "../components/MovieRow";

function Home() {
  const urls = {
    trending: "http://localhost:8000/movies/trending",
    top_rated_movies: "http://localhost:8000/movies/top_rated_movies",
    top_rated_tv: "http://localhost:8000/movies/top_rated_tv",
    comedy: "http://localhost:8000/movies/comedy",
    action: "http://localhost:8000/movies/action",
    drama: "http://localhost:8000/movies/drama",
    documentary: "http://localhost:8000/movies/documentary",
  };

  return (
      <div className="home-page">
        <div className="content-container">
          <MovieRow name="Trending Today" url={urls.trending} />
          <MovieRow name="Top Rated Movies" url={urls.top_rated_movies} />
          <MovieRow name="Top Rated TV shows" url={urls.top_rated_tv} />
          <MovieRow name="Comedies" url={urls.comedy} />
          <MovieRow name="Action" url={urls.action} />
          <MovieRow name="Drama" url={urls.drama} />
          <MovieRow name="Documentaries" url={urls.documentary} />
        </div>
      </div>
  );
}

export default Home;
