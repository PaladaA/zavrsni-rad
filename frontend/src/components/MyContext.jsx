import { createContext, useContext, useEffect, useState } from "react";
import UniversalCookie from "universal-cookie";

const MyContext = createContext();

export function useContextComp() {
  return useContext(MyContext);
}

import React from "react";
import Register from "./authForms/Register";
import LogIn from "./authForms/LogIn";
import {
  fetchGetTokenForLogIn,
  fetchLogInUserWithToken,
  fetchRegisterUser,
} from "../functions/apiFunctions";

const MyContextComp = ({ children }) => {
  const [loginFormState, setLoginFormState] = useState(false);
  const [registerFormState, setRegisterFormState] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [user, setUser] = useState("");
  const [seasonsOfLeague, setSeasonsOfLeague] = useState([]);
  const [mobileLeftBarDisplay, setMobileLeftBarDisplay] = useState(false);
  const [previousPage, setPreviousPage] = useState(
    (window.location?.pathname).split("/")
  );
  const [openMenu, setOpenMenu] = useState(false);
  const [leagueHistory, setLeagueHistory] = useState([]);

  const cookies = new UniversalCookie();

  useEffect(() => {
    setServerMessage("");
    getUserData(cookies.get("token"));
  }, [registerFormState, loginFormState]);

  const registerFun = async (userInfo) => {
    const data = await fetchRegisterUser(userInfo);
    setServerMessage(data.message);
    data.message == "data.message" && setRegisterFormState(false);
  };

  const getUserData = async (token) => {
    const data = await fetchLogInUserWithToken(token);
    const { name, email, id, role } = data;
    setUser({
      id: id ?? null,
      name: name ?? null,
      email: email ?? null,
      role: role ?? null,
    });
    name && setLoginFormState(false);
    setOpenMenu(false);
  };

  const getTokenForLoginFun = async (userInfo, path) => {
    const data = await fetchGetTokenForLogIn(userInfo, path);
    setServerMessage(data.message);
    data.token &&
      cookies.set("token", data.token, { path: "/", maxAge: "604800" }); //tjedan dana
    data.token && cookies.get("token") && getUserData(cookies.get("token"));
  };

  return (
    <MyContext.Provider
      value={{
        setRegisterFormState,
        registerFormState,
        setLoginFormState,
        loginFormState,
        getTokenForLoginFun,
        registerFun,
        serverMessage,
        user,
        setUser,
        getUserData,
        setSeasonsOfLeague,
        seasonsOfLeague,
        setMobileLeftBarDisplay,
        mobileLeftBarDisplay,
        previousPage,
        openMenu,
        setOpenMenu,
        setPreviousPage,
        setLeagueHistory,
        leagueHistory,
      }}
    >
      {children}
      {loginFormState && <LogIn />}
      {registerFormState && <Register />}
    </MyContext.Provider>
  );
};

export default MyContextComp;
