import { createContext, useState, useEffect } from "react";

export const MovieContext = createContext({});
function MovieProvider({ children }) {
  const [movie, setMovie] = useState(() => {
    return JSON.parse(window.localStorage.getItem("movie_info")) || {};
  });

  useEffect(() => {
    window.localStorage.setItem("movie_info", JSON.stringify(movie));
  }, [movie]);

  return (
    <MovieContext.Provider value={{ movie, setMovie }}>
      {children}
    </MovieContext.Provider>
  );
}

export default MovieProvider;
