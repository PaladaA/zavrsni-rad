import React, { useState } from "react";
import { useContextComp } from "./MyContext";
import { Link, useNavigate } from "react-router-dom";
import UniversalCookie from "universal-cookie";
const cookies = new UniversalCookie();

const Header = () => {
  const {
    setRegisterFormState,
    setLoginFormState,
    user,
    setUser,
  } = useContextComp();

  return (
    <header>
      <nav>
        {
          <li
            onClick={() => { 
              !user.name && setLoginFormState(true);
            }}
          >
            <Link to="/">Home</Link>
          </li>
        }
        {!user.name ? (
          <li>
            <a
              onClick={(e) => {
                e.preventDefault(),
                  setRegisterFormState(false),
                  setLoginFormState(true);
              }}
            >
              Log in
            </a>
          </li>
        ) : (
          <li
            onClick={() => {
              cookies.remove("token", {domain:  'localhost', path:'/'}); 
            }}
          >
            <a href="">Log out</a>
          </li>
        )}
        {!user.name && (
          <li>
            <a
              onClick={(e) => { 
                e.preventDefault(),
                  setRegisterFormState(true),
                  setLoginFormState(false);
              }}
            >
              Register
            </a>
          </li>
        )}
        {false && (
          <li>
            <a>Log Out</a>
          </li>
        )}
        {
          <li>
            <Link to="football">Football</Link>
          </li>
        }
        {
          <li>
            <Link to="basketball">Basketball</Link>
          </li>
        }
        {
          <li>
            <Link to="handball">Handball</Link>
          </li>
        }
        {
          <li>
            <Link to="volleyball">Volleyball</Link>
          </li>
        }
      </nav>
    </header>
  );
};

export default Header;
