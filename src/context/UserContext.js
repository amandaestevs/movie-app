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

  //fetch 
  const fetchLists = async () => {
    if (userId === null) return;
    const res = await axios.get(`http://localhost:8000/user/user_lists/${userId}`)
    const data = res.data[0].lists;
    return data
  };

  const fetchListItems = async (list) => {
    const res = await axios.get(`http://localhost:8000/user/${list}/${userId}`);
    if(list === 'favorites') return res.data[0].favorites;
    if(list === 'watchlist') return res.data[0].watchlist;
    return res.data[0].lists[0].items;
  };

  //update 
  const updateList = async (list, action) => {
    if(action === 'add') {
       const res = await axios.post(`http://localhost:8000/user/new_list/${userId}`, {list})
       return res
    } else if(action === 'delete') {
      const res = await axios.delete(`http://localhost:8000/user/delete_list/${userId}`, {params: {list}})
      return res
    }
  };

  const updateListItems = async (list, action, item ) => {
    if(action === 'add') {
      const res = await axios.post(`http://localhost:8000/user/new_item/${userId}`, {list, item});
      return res
    } else {
      const itemID = item.id;
      const res = await axios.delete(`http://localhost:8000/user/delete_item/${userId}`, {params: {list, itemID}});
      return res
    }
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        userLists,
        listItems,
        setUserLists,
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
