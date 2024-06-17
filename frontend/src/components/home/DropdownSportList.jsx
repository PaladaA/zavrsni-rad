import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import FavoriteMatches from "./FavoriteMatches";
import FavoriteLeagues from "./FavoriteLeagues";

const DropdownSportList = ({ sportName }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <button id="settings-button" onClick={() => setToggle((prev) => !prev)}>
        <p>{sportName.toUpperCase()}</p>{" "}
        <div className={`svg ${toggle ? "active" : ""}`}>
          <IoIosArrowDown />
        </div>
      </button>
      {toggle && (<>
            <FavoriteMatches sportName={sportName}/>
            <FavoriteLeagues sportName={sportName}/>
      </>)}
    </div>
  );
};

export default DropdownSportList;
