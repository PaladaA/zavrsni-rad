import { createContext, useContext, useEffect, useState } from "react";
import UniversalCookie from "universal-cookie";

const MyContext = createContext();

export function useContextComp() {
  return useContext(MyContext);
}

import React from "react";
import Register from "./authForms/Register";
import LogIn from "./authForms/LogIn";

const MyContextComp = ({ children }) => {
  const [loginFormState, setLoginFormState] = useState(false);
  const [registerFormState, setRegisterFormState] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [user, setUser] = useState("");
  const [seasonsOfLeague, setSeasonsOfLeague] = useState([]);
  const [mobileLeftBarDisplay, setMobileLeftBarDisplay] = useState(false);
  const [previousPage, setPreviousPage] = useState((window.location?.pathname).split("/"));
  const [openMenu, setOpenMenu] = useState(false);

  const cookies = new UniversalCookie();

  useEffect(() => {
    setServerMessage("");
    getUserData(cookies.get("token"));
  }, [registerFormState, loginFormState]);

  const registerFun = (userInfo) => {
    fetch(`http://localhost:3000/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }, //important!
      body: JSON.stringify(userInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setServerMessage(data.message);
        data.message == "data.message" && setRegisterFormState(false);
      })
      .catch((err) => console.error(err));
  };

  const getUserData = (token) => {
    fetch("http://localhost:3000/login", {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { name, email, id, role } = data;
        setUser({
          id: id ?? null,
          name: name ?? null,
          email: email ?? null,
          role: role ?? null,
        });
        name && setLoginFormState(false);
        setOpenMenu(false);
      })
      .catch((error) => console.error(error));
  };

  const loginFun = (userInfo, path) => {
    fetch(`http://localhost:3000${path}`, {
      // credentials: "omit", // for 3rd party cookie use 'include' u can also try 'same-origin'
      method: "POST",
      headers: { "Content-Type": "application/json" }, //important!
      body: JSON.stringify(userInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        setServerMessage(data.message);
        data.token &&
          cookies.set("token", data.token, { path: "/", maxAge: "604800" }); //tjedan dana
        data.token && cookies.get("token") && getUserData(cookies.get("token"));
      })
      .catch((err) => console.error(err));
  };

  return (
    <MyContext.Provider
      value={{
        setRegisterFormState,
        registerFormState,
        setLoginFormState,
        loginFormState,
        loginFun,
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
      }}
    >
      {children}
      {loginFormState && <LogIn />}
      {registerFormState && <Register />}
    </MyContext.Provider>
  );
};

export default MyContextComp;
