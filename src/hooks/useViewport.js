import { useContext } from "react"
import { WindowContext } from "../context/WindowContext"

const useViewport = () => {
    const  {width, isDesktop}  = useContext(WindowContext)

    return {width, isDesktop}
}

export default useViewport