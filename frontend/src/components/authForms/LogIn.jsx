import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContextComp } from "../MyContext";
import { IoCloseSharp } from "react-icons/io5";

const LogIn = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [errorMessageState, setErrorMessageState] = useState({
    email: "",
    password: "",
  });

  const {
    setRegisterFormState,
    registerFormState,
    setLoginFormState,
    loginFormState,
    loginFun,
    serverMessage,
  } = useContextComp();


  const inputFun = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const validationObject = {
    email: {
      regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      errorMessage: "e-mail is not valid",
    },
    password: {
      regex: /^.\S{5,19}$/,
      errorMessage: "password must contain 6 - 20 characters",
    },
  };

  const registerObj = {
    email: {
      label: "E-mail",
      type: "text",
      name: "email",
      id: "email",
      value: inputData.email,
      onChange: inputFun,
    },
    password: {
      label: "Password",
      type: "password",
      name: "password",
      id: "password",
      value: inputData.password,
      onChange: inputFun,
    },
  };

  console.log(inputData);

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrorMessage = false;
    setErrorMessageState({ email: "", password: "" });

    Object.entries(inputData).forEach((element) => {
      const key = element[0];
      const value = element[1];
      if (!validationObject[key].regex.test(value)) {
        setErrorMessageState((prev) => ({
          ...prev,
          [key]: validationObject[key].errorMessage,
        }));
        tempErrorMessage = true;
      }
    });

    !tempErrorMessage && loginFun(inputData, '/login');
  };
  console.log(serverMessage);
  {
    if (loginFormState)
      return (
        <div id="login">
          <div id="form-holder">
            <form onSubmit={handleSubmit}>
              <h4>Log In</h4>
              {Object.values(registerObj).map((element) => {
                return (
                  <div key={element.name}>
                    <label htmlFor={element.name}>{element.label}</label>
                    <input
                      {...element}
                      // className={`input ${errors[element.name] ? "active" : ""}`}
                    />
                    {errorMessageState[element.name] && (
                      <span>{errorMessageState[element.name]}</span>
                    )}
                  </div>
                );
              })}{" "}
              <button type="submit">Submit</button>
              <p>{serverMessage}</p>
            </form>
            <button
              id="exit"
              onClick={() => {
                setLoginFormState(false);
              }}
            >
              <IoCloseSharp />
            </button>
            <div id="redirect">
              <p>Don't have an account?</p>
              <button
                onClick={() => {
                  setRegisterFormState(true);
                  setLoginFormState(false);
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      );
  }
};

export default LogIn;
