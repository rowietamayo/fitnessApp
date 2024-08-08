import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Logout() {
  const { setIsLoggedIn } = useContext(UserContext);
  setIsLoggedIn(false);
  localStorage.clear();

  return <Navigate to="/login" />;
}
