import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import TopNav from "./components/TopNav";
import useAuth from "./hooks/useAuth";

const Component = () => {
    return (
      <>
        <TopNav />
        <Outlet />
        <BottomNav />
      </>
    );
  };

function Protected() {
  const [isAuth, setIsAuth] = useState(null)
  const { verifyUser } = useAuth();
  const auth = async () => {
    const res = await verifyUser();
    setIsAuth(res)
  }

  useEffect(() => {
    auth()
  }, [])

  if (isAuth === null) return null;
  return isAuth ? <Component /> : <Navigate to={"/"} />;
}

export default Protected;
