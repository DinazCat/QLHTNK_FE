import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Kiểm tra xem token có tồn tại hay không
  const isAuthenticated = !!localStorage.getItem("role"); // Kiểm tra token

  return isAuthenticated ? children : <Navigate to="/sign_in" />;
};

export default PrivateRoute;
