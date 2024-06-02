import React, { useEffect, useState } from "react";
import capitalize from "../../functions/capitalize"
import { MdDelete } from "react-icons/md";

const AdminSettings = ({deleteAccountFun}) => {
  const [usersList, setUsersList] = useState([]);
  const [usersListVisibility, setUserListVisibility] = useState(false);

  useEffect(() => {
    getUsersList("");
  }, []);

  const getUsersList = (input) => {
    fetch(`http://localhost:3000/settings/users`, {
      //trazi usere ovisno o imenu
      method: "POST",
      headers: { "Content-Type": "application/json" }, //important!
      body: JSON.stringify({ input: input }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setUsersList(data);
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (e, element) =>{
    e.preventDefault()
    deleteAccountFun(element.email, element.id, false);
    const updatedUsersList = usersList.filter(user => user.id !== element.id);
    setUsersList(updatedUsersList);
    }

  return (
    <>
      <button onClick={() => setUserListVisibility((prev) => !prev)}>
        Users List
      </button>
      {usersListVisibility && (
        <form
          id="admins-form"
          // className={`setting ${changeName ? "active" : ""}`}
        >
          <input
            type="text"
            placeholder="user name"
            onChange={(e) => getUsersList(e.target.value)}
          />

          <div>
            {usersList.map((element) => {
              if(element.name != 'admin')
              return (
                <div key={element.id} className="user">
                  <h3>{capitalize(element.name)}</h3>
                  <button onClick={(e)=>handleDelete(e, element)}><MdDelete /></button>
                </div>
              );
            })}
          </div>
        </form>
      )}
    </>
  );
};

export default AdminSettings;
