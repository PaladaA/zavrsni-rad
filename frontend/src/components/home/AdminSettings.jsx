import React, { useEffect, useState } from "react";
import capitalize from "../../functions/capitalize"
import { MdDelete } from "react-icons/md";
import {fetchUsersList} from "../../functions/apiFunctions"

const AdminSettings = ({deleteAccountFun}) => {
  const [usersList, setUsersList] = useState([]);
  const [usersListVisibility, setUserListVisibility] = useState(false);

  useEffect(() => {
    getUsersList("");
  }, []);

  const getUsersList = async(input) => {
    const usersList = await fetchUsersList(input);
    setUsersList(usersList);
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
              if(element.role != 'admin')
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
