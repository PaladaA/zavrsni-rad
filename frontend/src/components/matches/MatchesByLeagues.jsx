import React, { useEffect, useState } from "react";
import Match from "./Match";
import { IoIosArrowDown } from "react-icons/io";

const MatchesByLeagues = ({ matches, sportName, matchesFilter, index }) => {
  const [toggle, setToggle] = useState(index < 1 ? true : false);
  //ako je livescroe onda koristimo display css, dok kad je u home-u micemo element is tree-a
  // ako je home window.location?.pathname != "/"  onda je false, ako nije onda je true
  //korišteno zbog updatea favorita...

  const myFilter = (matchArray) => {
    return matchArray.filter((match) => {
      return matchesFilter.includes(match.status);
    });
  };

  return (
    <div className="leagues-holder-in-ls">
      {myFilter(matches).length > 0 &&<button className="dropdown-button" onClick={() => setToggle((prev) => !prev)}>
       <p>{matches[0].league}</p>
        <div className={`svg ${toggle ? "active" : ""}`}>
          <IoIosArrowDown />
        </div>
      </button>}
      {window.location?.pathname != "/" && (
        <div style={{ display: toggle ? "block" : "none" }}>
          {myFilter(matches).map((match) => (
            <Match match={match} sportName={sportName} key={match.matchId} />
          ))}
        </div>
      )}
      {window.location?.pathname == "/" && toggle && (
        <div>
          {myFilter(matches).map((match) => (
            <Match match={match} sportName={sportName} key={match.matchId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchesByLeagues;
