import { HiOutlineUserCircle } from "react-icons/hi";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import useWindow from "../hooks/useWindow";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { Link } from "react-router-dom";

const LogoutModal = ({logoutClicked, isLogoutVisible}) => {
   return (
    <div className={isLogoutVisible ? `logout-modal show-btn` : `logout-modal`} onClick={logoutClicked}>
      Log out
    </div>
   )
}

function TopNav() {
  const { isDesktop, active, setActive } = useWindow();
  const { logoutUser } = useAuth();
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);

  const logoutClicked = () => {
     setIsLogoutVisible(false);
     logoutUser();
  }

  return (
    <>
    <nav className={"top-nav"}>
      <div className="top-nav-container">
        <Link to={"/home"}><div className="logo">MovieApp</div></Link>
        {isDesktop && (
          <ul className="menu-options">
            <li
              onClick={() => setActive(0)}
              className={active === 0 ? "active" : " "}
            >
              <Link to="/home">Home</Link>
            </li>
            <li
              onClick={() => setActive(1)}
              className={active === 1 ? "active" : " "}
            >
              <Link to="/search">Search</Link>
            </li>
            <li
              onClick={() => setActive(2)}
              className={active === 2 ? "active" : " "}
            >
              <Link to="/lists">My Lists</Link>
            </li>
          </ul>
        )}
        <div className={isLogoutVisible ? "logout-button active" : "logout-button"} onClick={() => setIsLogoutVisible(!isLogoutVisible)}>
          {isLogoutVisible ? <AiOutlineUp className="icon arrow"/> : <AiOutlineDown className="icon arrow" />}
          <HiOutlineUserCircle className="icon" />
          {isLogoutVisible && <LogoutModal logoutClicked={logoutClicked} isLogoutVisible={isLogoutVisible}/>}
        </div>
      </div>
    </nav>

    </>
  );
}

export default TopNav;
