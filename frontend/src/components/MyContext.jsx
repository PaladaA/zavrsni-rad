import { createContext, useContext, useEffect, useState } from "react";
import UniversalCookie from "universal-cookie";

const MyContext = createContext();

export function useContextComp() {
  return useContext(MyContext);
}

import React from "react";
import { useNavigate } from "react-router-dom";
import Register from "./authForms/Register";
import LogIn from "./authForms/LogIn";

const MyContextComp = ({ children }) => {
  const [loginFormState, setLoginFormState] = useState(false);
  const [registerFormState, setRegisterFormState] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [user, setUser] = useState("");
  const [favMatch, setFavMatch] = useState("");
  const [favLeagues, setFavLeagues] = useState("");

  const cookies = new UniversalCookie();

  useEffect(() => {
    setServerMessage("");
    getUserData(cookies.get("token"));
  }, [registerFormState, loginFormState]);

  const getUsersFavMatches = (id, sport) => {
    return fetch("http://localhost:3000/favorite-matches/retrieve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: id, sport: sport }),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedFav = {};
        data.forEach((el) => {
          updatedFav[el.matchId] = el.matchId;
        });
        setFavMatch(updatedFav);
        console.log("222",updatedFav, favMatch)
        return updatedFav;
      })
      .catch((err) => {
        //ukoliko je url valjan i dogodi se greska tjekom dohvacanja podatka ispisuje se greska u konzoli
        console.error(err);
      });
  };

  const getUsersFavLeagues = (id, sport) => {
    return fetch("http://localhost:3000/favorite-leagues/retrieve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, sport: sport }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        //ukoliko je url valjan i dogodi se greska tjekom dohvacanja podatka ispisuje se greska u konzoli
        console.error(err);
      });
  };

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
        const { name, email, id } = data;
        setUser({ id: id ?? null, name: name ?? null, email: email ?? null });
        name && setLoginFormState(false);
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
        cookies.set("token", data.token, { path: "/", maxAge: "604800" }); //tjedan dana
        cookies.get("token") && getUserData(cookies.get("token"));
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
        favMatch,
        getUsersFavMatches,
        getUsersFavLeagues,
      }}
    >
      {children}
      {loginFormState && <LogIn />}
      {registerFormState && <Register />}
    </MyContext.Provider>
  );
};

export default MyContextComp;
