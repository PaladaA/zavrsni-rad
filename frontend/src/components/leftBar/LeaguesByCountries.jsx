import React, { useEffect, useState } from "react";
import maximizeNum from "../../functions/maximizeNum";
import League from "./League";

const LeaguesFromBar = ({ element, sportName }) => {
  const [number, setNumber] = useState(3);

  return (
    <>
      <div className="state-leagues-sticky">
        <h4>{maximizeNum(element[0].country, 17)}</h4>
  
      </div>
      {element.map((el, index) => {
        if (index < number) 
        return <League el={el} sportName={sportName} key={el.id}/>;
       
      })}
      {element.length > number && ( 
        <button onClick={() => setNumber((prev) => prev + 10)}>
          <div></div>
          <div></div>
        </button>
      )}
    </>
  );
};

export default LeaguesFromBar;
