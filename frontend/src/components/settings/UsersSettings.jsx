import React, { useState } from "react";
import { useContextComp } from "../MyContext";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import capitalize from "../../functions/capitalize";
import {
  fetchChangeUserName,
  fetchGetTokenForLogIn,
  fetchChangePassword,
} from "../../functions/apiFunctions";

const UsersSettings = ({ deleteAccountFun }) => {
  const { user, setUser, getTokenForLoginFun } = useContextComp();

  const [deleteAccount, setDeleteAccount] = useState(false);
  const [changeName, setChangeName] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("")
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  });

  const navigate = useNavigate();

  const changeNameFun = (e) => {
    e.preventDefault();

    const changeToken = () => {
      const userData = { name: name, id: user.id, email: user.email };
      getTokenForLoginFun(userData, "/settings/login");
    };

    const asyncFun = async () => {
      await fetchChangeUserName(name, user.id).then((data) => {
        console.log(data);
        changeToken(); //sad je potrbeno prominit token jer u tokenu se skriva zapravo ime i ako ga ne prominimo pri refreshu ce se upisati novo ime (pri loginu se ime usera upisuje unutar MyContext komponente). Iskoristit cemo istu funkciju na frontendu i poslat request backend funkciji koja nece zahtjevat password kao parametar...
        setUser({ name: name, id: user.id, email: user.email });
      });
    };
    asyncFun();
  };

  const changePasswordFun = (e) => {
    e.preventDefault()
    const asyncFun = async () => {
      const data = await fetchGetTokenForLogIn(
        { email: user.email, password: password.oldPassword },
        "/login"
      ); 
      console.log(data);//ako je kriva lozinka rec ce dae kriva i onemogucena ce bit promjena lozinke
      if (data.token) {
          await fetchChangePassword(password.newPassword, user.id).then((data) => {
            console.log(data)
            setMessage(capitalize(data.message))
            setPassword({
              oldPassword: "",
              newPassword: "",
              newPasswordConfirmation: "",
            })
        });
      }
      else{
        setMessage(data.message)
      }
    };
    asyncFun();
  };

  const inputFun = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const changePasswordObj = {
    oldPassword: {
      label: "Old Password",
      type: "password",
      name: "oldPassword",
      id: "oldPassword",
      value: password.oldPassword,
      onChange: inputFun,
    },
    newPassword: {
      label: "New Password",
      type: "password",
      name: "newPassword",
      id: "newPassword",
      value: password.newPassword,
      onChange: inputFun,
    },
    newPasswordConfirmation: {
      label: "Password Confirmation",
      type: "password",
      name: "newPasswordConfirmation",
      id: "newPasswordConfirmation",
      value: password.newPasswordConfirmation,
      onChange: inputFun,
    },
  };

  return (
    <div id="user-settings">
      <section id="change-name">
        <button onClick={() => setChangeName((prev) => !prev)}>
          Change name {capitalize(user.name)}
          <div className={`svg ${changeName ? "active" : ""}`}>
            <IoIosArrowDown />
          </div>
        </button>
        {changeName && (
          <form onSubmit={changeNameFun}>
            <div>
              <label htmlFor="changeName">New Name</label>
              <input
                id="changeName"
                type="text"
                placeholder="3 - 16 characters!"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button
              disabled={name.length > 2 && name.length < 17 ? false : true}
              type="submit"
            >
              Confirm
            </button>
          </form>
        )}
      </section>{" "}
      <section id="change-password">
        <button onClick={() => setChangePassword((prev) => !prev)}>
          Change password{" "}
          <div className={`svg ${changePassword ? "active" : ""}`}>
            <IoIosArrowDown />
          </div>
        </button>
        {changePassword && (
          <form onSubmit={changePasswordFun}>
            {Object.values(changePasswordObj).map((element) => {
              return (
                <div key={element.name}>
                  <label htmlFor={element.name}>{element.label}</label>
                  <input
                    {...element}
                    //   className={`input ${errors[element.name] ? "active" : ""}`}
                  />
                </div>
              );
            })}
            <button
              disabled={
                password.newPassword.length < 6 ||
                password.newPassword.length > 20 ||
                password.newPassword != password.newPasswordConfirmation
              }
              type="submit"
            >
              Confirm
            </button>
            <p>{message}</p>
          </form>
        )}{" "}
      </section>
      <section>
        {" "}
        <button onClick={() => setDeleteAccount((prev) => !prev)}>
          Delete your account{" "}
          <div className={`svg ${deleteAccount ? "active" : ""}`}>
            <IoIosArrowDown />
          </div>
        </button>{" "}
        <div className={`setting ${deleteAccount ? "active" : ""}`}>
          {deleteAccount && (
            <form action="">
              {" "}
              <button
                onClick={() => {
                  deleteAccountFun(user.email, user.id, true);
                  navigate("/sportnews");
                  setUser({ name: null, id: null, email: null });
                }}
              >
                Confirm
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default UsersSettings;
