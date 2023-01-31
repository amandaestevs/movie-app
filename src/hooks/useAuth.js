import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const [cookies, setCookies, removeCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const { setUserId } = useContext(UserContext);

  const registerUser = async ({ name, email, password }) => {
    const response = await axios.post("http://localhost:8000/auth/signup", {
      name,
      email,
      password,
    });
    if (response.status === 201) {
      return "201";
    }
  };

  const loginUser = async ({ email, password }) => {
    const res = await axios.post("http://localhost:8000/auth/login", {
      email,
      password,
    });

    if (res.status === 200 && res.data.token) {
      setCookies("access_token", res.data.token, { path: "/" });
      setUserId(res.data.userId);
      return "logged in";
    }
    return res.data;
  };

  const logoutUser = () => {
    removeCookie("access_token");
    setUserId(null);
    navigate("/");
  };

  const verifyUser = async () => {
    const res = await axios.get("http://localhost:8000/auth/verify", {
      withCredentials: true,
    });

    if (res.data === "No token") return false;
    if (res.data === "valid") return true;
  };

  return { registerUser, loginUser, logoutUser, verifyUser };
}
