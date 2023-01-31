import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";

function Search() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  useEffect(() => {
    if (search == " ") return setResults([]);
    getResults();
  }, [search]);

  const getResults = async () => {
    const res = await axios.get(`http://localhost:8000/movies/search`, {
      params: { search },
    });
    if (res.status !== 200) return;
    setResults(res.data);
  };

  return (
    <div className="search-page">
      <div className="search-bar-container">
        <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
          <AiOutlineSearch className="icon" />
          <input
            type="search"
            className="search-input"
            placeholder="What are you looking for?"
            onChange={(e) => handleSearch(e)}
          />
        </form>
      </div>
      <div className="search-results-container">
        {results.length === 0 ? (
          <div className="no-results">
            <h2>Start Searching</h2>
          </div>
        ) : (
          results.map((movie) => {
            if (movie.poster_path == null) return null
            return <MovieCard key={movie.id} movie={movie} />;
          })
        )}
      </div>
    </div>
  );
}

export default Search;
