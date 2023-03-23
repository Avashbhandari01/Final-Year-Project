import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  let auth = { token: false };

  if (isLoggedIn) {
    auth.token = true;
  }

  return auth.token ? <Outlet /> : <Navigate to="/admin-login" />;
};

export default PrivateRoutes;
