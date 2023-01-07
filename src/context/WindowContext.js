import { createContext, useState, useEffect } from "react"

export const WindowContext = createContext({});

function WindowProvider({children}) {
    const [width, setWidth] = useState(window.innerWidth);
    const [isDesktop, setIsDesktop] = useState(false);
    
    const handleResize = () => {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
       window.addEventListener('resize', handleResize);
       return () => window.removeEventListener('resize', handleResize);
    }, [])

    useEffect(() => {
       const breakpoint = 700;
       const value = width >= breakpoint ? true : false;
       setIsDesktop(value);
    }, [width])

    return (
        <WindowContext.Provider value={{width, isDesktop}}>
            {children}
        </WindowContext.Provider>
    )
}

export default WindowProvider
