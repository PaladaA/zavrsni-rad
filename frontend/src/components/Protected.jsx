import React, { useEffect } from "react";
import { useContextComp } from "./MyContext";
import { Navigate, Outlet } from "react-router";

const Protected = () => {
  const { user } = useContextComp();

  return user.id ? <Outlet /> : <Navigate to="/sportnews" />

};

export default Protected;
