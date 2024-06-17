import React, { useState } from "react";
import { useContextComp } from "../MyContext";
import AdminSettings from "./AdminSettings";
import { IoIosArrowDown } from "react-icons/io";
import UniversalCookie from "universal-cookie";

const Settings = () => {
  const { user, setUser, loginFun } = useContextComp();
  const [settings, setSettings] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [changeName, setChangeName] = useState(false);
  const [name, setName] = useState("");
  const cookies = new UniversalCookie();

  const changeNameFun = (e) => {
    e.preventDefault();

    const changeToken = () => {
      const userData = { name: name, id: user.id, email: user.email };
      loginFun(userData, "/settings/login");
    };

    fetch(`http://localhost:3000/settings/change`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" }, //important!
      body: JSON.stringify({ name: name, id: user.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        changeToken(); 
        setUser({ name: name, id: user.id, email: user.email }); 
      })
      .catch((err) => console.error(err));
  };

  const deleteAccountFun = (email, id, logOut) =>{
    fetch(`http://localhost:3000/settings/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }, //important!
      body: JSON.stringify({ email: email, id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        logOut && cookies.remove("token") && setUser({ name: "", id: "", email: "" })
      })
      .catch((err) => console.error(err));

  }

  return (
    <div id="settings">
      <button id="settings-button" onClick={() => setSettings((prev) => !prev)}>
        <p>Settings</p>{" "}
        <div className={`svg ${settings ? "active" : ""}`}>
          <IoIosArrowDown />
        </div>
      </button>
      <div className={`settings-panel ${settings ? "active" : ""}`}>
      {user.role == "admin" && <AdminSettings deleteAccountFun={deleteAccountFun}/>}
        <button onClick={() => setChangeName((prev) => !prev)}>
          Change name
        </button>
        <form
          onSubmit={changeNameFun}
          className={`setting ${changeName ? "active" : ""}`}
        >
          <input
            type="text"
            placeholder="3 up to 16 characters!"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button disabled={name.length > 2 && name.length < 17 ? false : true} type="submit">
            Confirm
          </button>
        </form>
        <button onClick={() => setDeleteAccount((prev) => !prev)}>
          Delete your account
        </button>
        <div className={`setting ${deleteAccount ? "active" : ""}`}>
          <button onClick={()=>deleteAccountFun(user.email, user.id, true)}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
