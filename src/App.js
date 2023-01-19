import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Lists from "./pages/Lists";
import Protected from "./Protected";
import MoviePage from "./pages/MoviePage";
import ListPage from "./pages/ListPage.jsx";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Protected />}>
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/list/:name/:id" element={<ListPage />} />
        </Route>
      </Routes>
  );
}

export default App;
