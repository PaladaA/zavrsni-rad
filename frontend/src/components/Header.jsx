import React, { useEffect, useState } from "react";
import { useContextComp } from "./MyContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import UniversalCookie from "universal-cookie";
import { FaHome } from "react-icons/fa";
import { useWindowSize } from "./useWindowSize";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const Header = () => {
  const {
    setRegisterFormState,
    setLoginFormState,
    user,
    setUser,
    openMenu,
    setOpenMenu,
  } = useContextComp();
  const { sport } = useParams();
  const navigate = useNavigate();
  const cookies = new UniversalCookie();
  const [width, height] = useWindowSize();

  const displayElements = () => {
    return (
      <div id="auth-buttons">
        {!user.name ? (
          <li className="nav-button">
            <a
              onClick={(e) => {
                e.preventDefault(),
                  setRegisterFormState(false),
                  setLoginFormState(true);
                setOpenMenu(false);
              }}
            >
              LOG IN
            </a>
          </li>
        ) : (
          <li
            className="nav-button"
            onClick={() => {
              cookies.remove("token", { path: "/", maxAge: "604800" });
              setUser({ name: null, id: null, email: null });
              navigate("/sportnews");
              setOpenMenu(false);
            }}
          >
            <a href="">LOG OUT</a>
          </li>
        )}
        {!user.name && (
          <li className="nav-button">
            <a
              onClick={(e) => {
                e.preventDefault(),
                  setRegisterFormState(true),
                  setLoginFormState(false);
              }}
            >
              REGISTER
            </a>
          </li>
        )}
      </div>
    );
  };

  return (
    <header>
      {width <= 650 && (
        <div id="mobile-header">
          <div id="sub-header1">
            <li
              className={`nav-button ${window.location?.pathname == "/" ? "active" : ""
                }`}
              onClick={() => {
                !user.name && setLoginFormState(true);
              }}
            >
              {user.name && (
                <Link
                  id="home-link"
                  to="/"
                  onClick={(e) => !user.id && e.preventDefault()}
                >
                  <FaHome />
                </Link>
              )}
            </li>
            <button id="header-bars" onClick={() => setOpenMenu(true)}>
              <FaBars />
            </button>
          </div>
        </div>
      )}

      <nav style={{ left: openMenu ? "0px" : "100vw" }}>
        {width >= 650 && (
          user.name && <li
            className={`nav-button ${window.location?.pathname == "/" ? "active" : ""
              }`}
            onClick={() => {
              !user.name && setLoginFormState(true);
            }}
          >

            <Link
              id="home-link"
              to="/"
              onClick={(e) => !user.id && e.preventDefault()}
            >
              HOME
            </Link>

          </li>
        )}
        {width <= 650 && (
          <button id="header-bars" onClick={() => setOpenMenu(false)}>
            <IoCloseSharp />
          </button>
        )}
        {
          <li
            onClick={() => setOpenMenu(false)}
            className={`nav-button ${sport == "football" ? "active" : ""}`}
          >
            <Link to="football">FOOTBALL</Link>
          </li>
        }
        {
          <li
            onClick={() => setOpenMenu(false)}
            className={`nav-button ${sport == "basketball" ? "active" : ""}`}
          >
            <Link to="basketball">BASKETBALL</Link>
          </li>
        }
        {
          <li
            onClick={() => setOpenMenu(false)}
            className={`nav-button ${sport == "handball" ? "active" : ""}`}
          >
            <Link to="handball">HANDBALL</Link>
          </li>
        }
        {
          <li
            onClick={() => setOpenMenu(false)}
            className={`nav-button ${sport == "volleyball" ? "active" : ""}`}
          >
            <Link to="volleyball">VOLLEYBALL</Link>
          </li>
        }
        {
          <li
            onClick={() => setOpenMenu(false)}
            className={`nav-button ${window.location?.pathname == "/sportnews" ? "active" : ""
              }`}
          >
            <Link to="sportnews">NEWS</Link>
          </li>
        }
        {user.name &&
          <li
            onClick={() => setOpenMenu(false)}
            className={`nav-button ${window.location?.pathname == "/settings" ? "active" : ""
              }`}
          >
            <Link to="settings">PROFILE</Link>
          </li>
        }
        {displayElements()}
      </nav>
    </header>
  );
};

export default Header;
