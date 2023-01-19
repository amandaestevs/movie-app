import { useState, useContext, useEffect } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

function Lists() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [userLists, setUserLists] = useState(null);
  const { fetchListItems, fetchLists, setListItems, updateList } = useContext(UserContext);

  const submitForm = async (e) => {
    e.preventDefault();
    const list = newListName;
    const action = 'add';
    await updateList(list, action);
    setIsFormOpen(false)
    window.location.reload()
  };

  const listClicked = async (list) => {
     setListItems(null)
     const res = await fetchListItems(list);
     setListItems(res)
  };

  useEffect(() => {
    const fetchUserLists = async () => {
      const res = await fetchLists()
      setUserLists(res)
    }
    fetchUserLists()
  }, [])

  return (
    <div className="lists-page">
      <div className="content">
        <div className="lists-container">
          <Link to={`/list/favorites/1`}>
            <div className="favorites" onClick={() => listClicked("favorites")}>
              <div className="list-card"></div>
              <h3 className="list-title">Favorites</h3>
            </div>
          </Link>
          <Link to={`/list/watchlist/2`}>
            <div className="watchlist" onClick={() => listClicked("watchlist")}>
              <div className="list-card"></div>
              <h3 className="list-title">Watchlist</h3>
            </div>
          </Link>
          {userLists &&
            userLists.map((list) => {
              return (
                <Link to={`/list/${list.name}/${list._id}`} key={list._id}>
                  <div
                    className="list"
                    onClick={() => listClicked(list.name)}
                    key={list._id}
                  >
                    <div className="list-card"></div>
                    <h3 className="list-title">{list.name}</h3>
                  </div>
                </Link>
              );
            })}
        </div>
        <div className="new-list-btn">
          <AiOutlinePlus
            className="add-icon"
            onClick={() => setIsFormOpen(true)}
          />
        </div>
      </div>

      {isFormOpen && (
      <NewListForm setIsFormOpen={setIsFormOpen} submitForm={submitForm} setNewListName={setNewListName}/>
      )}
    </div>
  );
}

export default Lists;

const NewListForm = ({ setIsFormOpen, submitForm, setNewListName}) => {
  return (
    <div className="new-list-form">
      <div className="form-container">
        <div className="icon-container">
          <AiOutlineClose
            className="close-icon"
            onClick={() => setIsFormOpen(false)}
          />
        </div>
        <form onSubmit={(e) => submitForm(e)}>
          <label htmlFor="list-name-input">Give your list a name</label>
          <input type="text" id="list-name-input" placeholder="List name" name="listName" onChange={(e) => setNewListName(e.target.value)}/>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};
