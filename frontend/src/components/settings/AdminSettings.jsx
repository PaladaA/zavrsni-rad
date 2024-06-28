import React, { useEffect, useState } from "react";
import capitalize from "../../functions/capitalize";
import { MdDelete } from "react-icons/md";
import { fetchUsersList } from "../../functions/apiFunctions";
import { IoIosArrowDown } from "react-icons/io";

const AdminSettings = ({ deleteAccountFun }) => {
  const [usersList, setUsersList] = useState([]);
  const [usersListVisibility, setUserListVisibility] = useState(false);

  useEffect(() => {
    getUsersList("");
  }, []);

  const getUsersList = async (input) => {
    const usersListTemp = await fetchUsersList(input);
    const usersList = usersListTemp.filter(user => user.name !== "Admin");
    setUsersList(usersList);
  };

  const handleDelete = (e, element) => {
    e.preventDefault();
    deleteAccountFun(element.email, element.id, false);
    const updatedUsersList = usersList.filter((user) => user.id !== element.id);
    setUsersList(updatedUsersList);
  };

  return (
    <div id="admins-settings">
      <button onClick={() => setUserListVisibility((prev) => !prev)}>
        Users List{" "}
        <div className={`svg ${usersListVisibility ? "active" : ""}`}>
          <IoIosArrowDown />
        </div>
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
              if (element.role != "admin")
                return (
                  <div key={element.id} className="user">
                    <h4>{capitalize(element.name)}</h4>
                    <button onClick={(e) => handleDelete(e, element)}>
                      <MdDelete />
                    </button>
                  </div>
                );
            })}
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminSettings;
