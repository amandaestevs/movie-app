import { BiSearch } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { BiListUl } from "react-icons/bi";
import useViewport from "../hooks/useViewport";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function BottomNav() {
  const { isDesktop } = useViewport();
  const [active, setActive] = useState(0);

  const checkActive = () => {
    if (window.location.pathname === "/home") return setActive(0);
    if (window.location.pathname === "/search") return setActive(1);
    if (window.location.pathname === "/lists") return setActive(2);
    if (window.location.pathname.includes('/movie')) return setActive(null);
  };

  useEffect(() => {
    checkActive();
  }, []);

  return (
    <nav className={isDesktop ? "hidden" : "bottom-nav"}>
      <div className="bottom-nav-link">
        <Link to="/home">
          <AiFillHome
            className={active === 0 ? "icon active" : "icon"}
            onClick={() => setActive(0)}
          />
        </Link>
      </div>
      <div className="bottom-nav-link">
        <Link to="/search">
          <BiSearch
            className={active === 1 ? "icon active" : "icon"}
            onClick={() => setActive(1)}
          />
        </Link>
      </div>
      <div className="bottom-nav-link">
        <Link to="/lists">
          <BiListUl
            className={active === 2 ? "icon active" : "icon"}
            onClick={() => setActive(2)}
          />
        </Link>
      </div>
    </nav>
  );
}

export default BottomNav;
