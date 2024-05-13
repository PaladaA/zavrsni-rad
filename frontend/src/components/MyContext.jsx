import { createContext, useContext, useEffect, useState } from "react";
import UniversalCookie from "universal-cookie";
import React from "react";
import { useNavigate } from "react-router-dom";
import Register from "./authForms/Register";
import LogIn from "./authForms/LogIn";

const cookies = new UniversalCookie(); 
const MyContext = createContext(); 

export function useContextComp() { 
  return useContext(MyContext);
}


const MyContextComp = ({ children }) => {  
  const [loginFormState, setLoginFormState] = useState(false);
  const [registerFormState, setRegisterFormState] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [user, setUser] = useState({ name: "", id: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    setServerMessage("");  
    console.log("cookies.ge",cookies.get("token")) 
    cookies.get("token") && getUserData(cookies.get("token")); 
  }, [registerFormState, loginFormState]);

  const getUserData = (token) => {   
    fetch("http://localhost:3000/login", { 
      headers: {
        Authorization: token, 
      },
    })
      .then((response) => response.json()) 
      .then((data) => { 
        console.log('data',data)
        const { name, email, id } = data;
        setUser({ id: id, name: name, email: email });
        name && setLoginFormState(false); 
      })
      .catch((error) => console.error(error));
  };



  const registerFun = (userInfo) => {
    fetch(`http://localhost:3000/register`, {  
      headers: { "Content-Type": "application/json" }, 
      method: "POST",
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


  const loginFun = (userInfo) => {
    fetch(`http://localhost:3000/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify(userInfo), 
    })
      .then((response) => response.json())
      .then((data) => { 
        console.log(data);
        setServerMessage(data.message); 
        cookies.set("token", data.token, { path: "/", maxAge: "1440" }); 
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
      }}
    >
      {children}  
      {loginFormState && <LogIn />}  
      {registerFormState && <Register />}
    </MyContext.Provider>
  );
};

export default MyContextComp;
