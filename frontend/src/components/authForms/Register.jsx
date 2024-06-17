import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContextComp } from "../MyContext";
import { IoCloseSharp } from "react-icons/io5";

const Register = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    name: "",
  });
  const [errorMessageState, setErrorMessageState] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    name: "",
  });

  const {
    setRegisterFormState,
    registerFormState,
    setLoginFormState,
    registerFun,
    serverMessage,
  } = useContextComp();

  const validationObject = {
    email: {
      regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      errorMessage: "e-mail is not valid",
    },
    password: {
      regex: /^.\S{5,19}$/,
      errorMessage: "password must contain 6 - 20 characters",
    },
    passwordConfirmation: {
      regex: /^.\S{5,19}$/,
      errorMessage: "password must contain 6 - 20 characters",
    },
    name: {
      regex: /^.{2,15}$/,
      errorMessage: "name can contain 3 - 16 characters",
    },
  };

  const inputFun = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
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
    passwordConfirmation: {
      label: "Password Confirmation",
      type: "password",
      name: "passwordConfirmation",
      id: "passwordConfirmation",
      value: inputData.passwordConfirmation,
      onChange: inputFun,
    },
    name: {
      label: "Name",
      type: "text",
      name: "name",
      id: "name",
      value: inputData.name,
      onChange: inputFun,
    },
  };
  console.log(serverMessage);

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrorMessage = false;
    setErrorMessageState({
      email: "",
      password: "",
      passwordConfirmation: "",
      name: "",
    });

    Object.entries(inputData).forEach((element) => {
      const key = element[0];
      const value = element[1];
      if (inputData.passwordConfirmation != inputData.password) {
        setErrorMessageState((prev) => ({
          ...prev,
          passwordConfirmation: "passwords aren't corresponding",
        }));
        tempErrorMessage = true;
      }
      if (!validationObject[key].regex.test(value)) {
        setErrorMessageState((prev) => ({
          ...prev,
          [key]: validationObject[key].errorMessage,
        }));
        tempErrorMessage = true;
      }
    });

    !tempErrorMessage && registerFun(inputData);
  };

  {
    if (serverMessage == "successfully registered") {
      return (
        <div id="register">
          <div id="form-holder">
            <h1>successfully registered</h1>
            <button
              id="exit"
              onClick={() => {
                setRegisterFormState(false);
              }}
            >
              X
            </button>
            <button
              onClick={() => {
                setRegisterFormState(false);
                setLoginFormState(true);
              }}
            >
              Log in
            </button>
          </div>
        </div>
      );
    } else if (registerFormState)
      return (
        <div id="register">
          <div id="form-holder">
            <form onSubmit={handleSubmit}>
              <h4>Register</h4>
              {Object.values(registerObj).map((element) => {
                return (
                  <div key={element.name}>
                    <label htmlFor={element.name}>{element.label}</label>
                    <input
                      {...element}
                      //   className={`input ${errors[element.name] ? "active" : ""}`}
                    />
                    {errorMessageState[element.name] && (
                      <span>{errorMessageState[element.name]}</span>
                    )}
                  </div>
                );
              })}
              <button type="submit">Submit</button>
              <p>{serverMessage}</p>
            </form>{" "}
            <div id="redirect">
              <p>Already have an account?</p>
              <button
                onClick={() => {
                  setRegisterFormState(false);
                  setLoginFormState(true);
                }}
              >
                Sign In
              </button>{" "}
            </div>
            <button
              id="exit"
              onClick={() => {
                setRegisterFormState(false);
              }}
            >
              <IoCloseSharp />
            </button>
          </div>
        </div>
      );
  }
};

export default Register;
