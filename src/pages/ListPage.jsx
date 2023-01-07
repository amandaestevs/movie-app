import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import MovieCard from "../components/MovieCard";
import axios from "axios";

function ListPage() {
  const [items, setItems] = useState(null);
  const { listItems } = useContext(UserContext);

  useEffect(() => {
    const fetchMovies = async () => {
      if (listItems == null) return
      const res = await axios.get("http://localhost:8000/movies/list", {
        params: { listItems },
      });
      setItems(res.data);
    };
    fetchMovies();
  }, [listItems]);

  return (
    <div className="lists-page">
      <div className="content">
        <div className="movies-container">
          {items &&
            items.map((item) => {
              return <MovieCard key={item.id} movie={item} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default ListPage;
