import "../scss/navbar.scss";
import { HiOutlineUserCircle } from "react-icons/hi";
import useViewport from "../hooks/useViewport";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LogoutPopUp = ({logoutClicked, isLogoutVisible}) => {
   return (
    <div className={isLogoutVisible ? `logout-popup show-btn` : `logout-popup`} onClick={logoutClicked}>
      Log out
    </div>
   )
}

function TopNav() {
  const { isDesktop } = useViewport();
  const { logoutUser } = useAuth();
  const [active, setActive] = useState(0);
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);

  const checkActive = () => {
    if (window.location.pathname === "/home") return setActive(0);
    if (window.location.pathname === "/search") return setActive(1);
    if (window.location.pathname === "/lists") return setActive(2);
    if (window.location.pathname.includes('/movie')) return setActive(null);
  };

  const logoutClicked = () => {
     setIsLogoutVisible(false);
     logoutUser();
  }

  useEffect(() => {
    checkActive();
  }, []);

  return (
    <>
    <nav className={"top-nav"}>
      <div className="top-nav-container">
        <div className="logo">MovieApp</div>
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
        <div className="profile-icon">
          <HiOutlineUserCircle className="icon" onClick={() => setIsLogoutVisible(!isLogoutVisible)}/>
        </div>
      </div>
    </nav>

    {isLogoutVisible && <LogoutPopUp logoutClicked={logoutClicked} isLogoutVisible={isLogoutVisible}/>}
    </>
  );
}

export default TopNav;
