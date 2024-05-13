import React, { useEffect, useState } from "react";
import maximizeNum from "../../functions/maximizeNum";
import { useNavigate, useParams } from "react-router-dom";
const LeaguesFromBar = ({  nameSearch, league, country, searchBy }) => {  
  const navigate = useNavigate();   
  const { sport } = useParams();
  const [number, setNumber] = useState(3);


  return (
    <>
        <div className="state-leagues-sticky">
          <h4>{maximizeNum(league[0].country, 17)}</h4>{/*prikaz prvih 17 znakova ukoliko je naziv pre dug */}
        </div>
      {league.map((league, index) => {
          if (index < number)
            return (
              <div
                className="league-from-bar"
                key={index}
                onClick={() =>
                  league.id && navigate(`/${sport}/league/${league.id}`)
                }
              >
                <h5>{maximizeNum(league.league, 13)}</h5>{" "}
                {league.logo && <img src={league.logo} />}
              </div>
            );
        })}
      {league.length > number && (
        <button onClick={() => setNumber((prev) => prev + 10)}><div></div><div></div></button>
      )}
    </>
  );
};

export default LeaguesFromBar;
