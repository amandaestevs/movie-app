import { BiSearch } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { BiListUl } from "react-icons/bi";
import useWindow from "../hooks/useWindow";
import { Link } from "react-router-dom";

function BottomNav() {
  const { isDesktop, active, setActive } = useWindow();

  return (
    <nav className={isDesktop ? "hidden-nav" : "bottom-nav"}>
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
