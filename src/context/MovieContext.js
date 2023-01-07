import { createContext, useState } from 'react';

export const MovieContext = createContext({});
function MovieProvider({children}) {
    const [movie, setMovie] = useState({});

    return (
        <MovieContext.Provider value={{movie, setMovie}}>{children}</MovieContext.Provider>
    )
}

export default MovieProvider