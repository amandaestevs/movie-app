import { createContext, useState, useEffect } from "react"
import { useLocation } from "react-router-dom";

export const WindowContext = createContext({});

function WindowProvider({children}) {
    const [width, setWidth] = useState(window.innerWidth);
    const [active, setActive] = useState(0);
    const [isDesktop, setIsDesktop] = useState(false);
    const location = useLocation()
    
    const handleResize = () => {
        setWidth(window.innerWidth)
    }

    const checkActiveNavLink = () => {
        if (window.location.pathname === "/home") return setActive(0);
        if (window.location.pathname === "/search") return setActive(1);
        if (window.location.pathname === "/lists") return setActive(2);
        return setActive(null);
      };
    

    useEffect(() => {
       window.addEventListener('resize', handleResize);
       return () => window.removeEventListener('resize', handleResize);
    }, [])

    useEffect(() => {
        checkActiveNavLink()
    }, [location])

    useEffect(() => {
       const breakpoint = 700;
       const value = width >= breakpoint ? true : false;
       setIsDesktop(value);
    }, [width])

    useEffect(() => {

    }, [])

    return (
        <WindowContext.Provider value={{width, isDesktop, active, setActive}}>
            {children}
        </WindowContext.Provider>
    )
}

export default WindowProvider
