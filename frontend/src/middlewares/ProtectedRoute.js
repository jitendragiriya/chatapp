import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { TOKEN } from "../constants";
import { LOGIN } from "../constants/urls";
import { getLocalData } from "../hooks/localStorage";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  //check is user is authenticated or not
  const redirect = async () => {
    const token = await getLocalData(TOKEN);
    if (!token) {
      navigate(LOGIN);
    }
  };
  useEffect(() => {
    redirect();
  }, [navigate]);

  return <Outlet />;
};

export default ProtectedRoute;
