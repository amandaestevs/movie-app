import { useContext } from "react";
import { WindowContext } from "../context/WindowContext";

const useWindow = () => {
  const { width, isDesktop, active, setActive } = useContext(WindowContext);

  return { width, isDesktop, active, setActive };
};

export default useWindow;
