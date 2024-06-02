import React, { useEffect, useState } from "react";
import { useContextComp } from "../MyContext";
import { useNavigate } from "react-router-dom";

const FavoriteLeagues = ({ sportName }) => {
  const { getUsersFavLeagues, user } = useContextComp();
  const [favInstance, setFavInstance] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getUsersFavLeagues(user.id, sportName)
      .then((favData) => {
        setFavInstance(favData);
      })
      .catch((error) => {
        console.error("Error fetching favorite matches:", error);
      });
  }, []);
  console.log("favInstance", favInstance);

  return (
    <div className="favorite-leagues">
      <h3>Pinned leagues</h3>
      {favInstance.length > 0 && favInstance.map((league) => {console.log(league)
        return <div onClick={() =>
          league.leagueId && navigate(`/${sportName}/league/${league.leagueId}`)
      }>{league.leagueName}</div>;
      })}
    </div>
  );
};

export default FavoriteLeagues;
