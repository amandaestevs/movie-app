import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext(null);

function UserProvider({ children }) {
  const [userId, setUserId] = useState(() => {
    return window.localStorage.getItem("userId") || null;
  });
  const [userLists, setUserLists] = useState(null);
  const [listItems, setListItems] = useState(null);

  useEffect(() => {
    window.localStorage.setItem("userId", userId);
  }, [userId]);

  const fetchLists = () => {
    if (userId === null) return;
  };

  const fetchListItems = async (list) => {
    const res = await axios.get(`http://localhost:8000/user/${list}/${userId}`);
    const data = res.data[0].favorites;
    return data;
  };

  const updateList = ({ list, action }) => {};

  const updateListItems = ({ list, action, item }) => {};

  return (
    <UserContext.Provider
      value={{
        userId,
        userLists,
        listItems,
        setListItems,
        setUserId,
        fetchLists,
        fetchListItems,
        updateList,
        updateListItems,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
