import React, { useState } from "react";
import { useContextComp } from "./MyContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import UniversalCookie from "universal-cookie";
import { FaHome } from "react-icons/fa";


const Header = () => {
  const {
    setRegisterFormState,
    setLoginFormState,
    user,
    setUser,
  } = useContextComp();
  const { sport } = useParams();
const cookies = new UniversalCookie();

  console.log(sport)

  return (
    <header>
      <nav>
        {
          <li className={`nav-button ${sport == undefined ? "active" : ""}`}
            onClick={() => {
              !user.name && setLoginFormState(true);
            }}
          >
            <Link to="/"><FaHome /></Link>
          </li>
        }
        {
          <li className={`nav-button ${sport == 'football' ? "active" : ""}`}>
            <Link to="football">Football</Link>
          </li>
        }
        {
          <li className={`nav-button ${sport == 'basketball' ? "active" : ""}`}>
            <Link to="basketball">Basketball</Link>
          </li>
        }
        {
          <li className={`nav-button ${sport == 'handball' ? "active" : ""}`}>
            <Link to="handball">Handball</Link>
          </li>
        }
        {
          <li className={`nav-button ${sport == 'volleyball' ? "active" : ""}`}>
            <Link to="volleyball">Volleyball</Link>
          </li>
        }
        <div>
        {!user.name ? (
          <li className='nav-button'>
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
          <li className='nav-button'
            onClick={() => {
              cookies.remove("token"), setUser({ name: "", id: "", email: "" });
            }}
          >
           <a href="">Log out</a> 
          </li>
        )}
        {!user.name && (
          <li className='nav-button'>
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
        )}</div>
      </nav>
    </header>
  );
};

export default Header;
