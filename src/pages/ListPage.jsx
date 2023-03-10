import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import { UserContext } from "../context/UserContext";
import MovieCard from "../components/MovieCard";
import axios from "axios";

function ListPage() {
  const [items, setItems] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { listItems, updateList, setListItems, fetchListItems } = useContext(UserContext);
  const { name, id } = useParams();
  const navigate = useNavigate()

  const str1 = name.charAt(0).toUpperCase();
  const str2 = name.slice(1);
  const capitalizedName = str1 + str2;

  const deleteList = (confirm) => {
    if(confirm === 'yes') {
      updateList(id, 'delete')
      navigate('/lists')
    }
    return setShowModal(false) 
  };


  useEffect(() => {
  const fetchMovies = async () => {
    if (listItems == null) return
    const res = await axios.get("http://localhost:8000/movies/list", {
      params: { listItems },
    });
    res.data === "empty" ? setItems([]) : setItems(res.data);
  };
    fetchMovies();
  }, [listItems]);

  useEffect(() => {
   const fetch = async () => {
     const res = await fetchListItems(name);
     setListItems(null);
     setListItems(res);
   }
   fetch();
  }, []);

  return (
    <div className="lists-page">
      <div className="content">
        {showModal && <DeleteModal deleteList={deleteList}/>}
        <div className="list-heading">
          <AiOutlineLeft className="arrow" onClick={() => navigate('/lists')}/>
          <h3>{capitalizedName}</h3>
          <DeleteButton name={name} setShowModa={setShowModal} />
        </div>
        <div className="movies-container">
          {items &&
            items.map((item) => {
              return <MovieCard key={item.id} movie={item} page={'list'} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default ListPage;

const DeleteButton = ({ name, setShowModal }) => {
  if (name === "favorites" || name === "watchlist") return;
  return <button onClick={() => setShowModal(true)}>Delete List</button>;
};

const DeleteModal = ({deleteList}) => {
  return (
    <div className="are-u-sure">
      <h4>Are you sure?</h4> 
      <div className="options">
        <button onClick={() => deleteList('no')}>Cancel</button>
        <button onClick={() => deleteList('yes')}>Delete</button>
      </div>
    </div>
  );
};
