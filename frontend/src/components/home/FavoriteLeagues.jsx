import React, { useEffect, useState } from "react";
import { useContextComp } from "../MyContext";
import { getFavoriteLeagues } from "../../functions/apiFunctions";
import { leaguesDataMapper } from "../../dataStructuringFunctions/leaguesDataMapper";
import { fetchAllLeagues as fetchFavoriteLeagues } from "../../functions/apiFunctions";
import LeaguesByCountries from "../leftBar/LeaguesByCountries";

const FavoriteLeagues = ({ sportName }) => {
  const { user } = useContextComp();
  const [favLeagues, setFavLeagues] = useState([]);

  useEffect(() => {
    const favLeaguesList = [];
    const asyncFun = async () => {
      const favLeaguesIds = await getFavoriteLeagues(user, sportName);
      const favLeaguesIdsArray = Object.values(favLeaguesIds);
      for (let i = 0; i < favLeaguesIdsArray.length; i++) {
        const retrievedData = await fetchFavoriteLeagues(sportName,`?id=${favLeaguesIdsArray[i].leagueId}`);
        favLeaguesList.push(retrievedData[0]);
      }
      setFavLeagues(
        leaguesDataMapper(favLeaguesList, favLeaguesIds, sportName)
      );
    };
    asyncFun();
  }, []);

  console.log("favLeagues", favLeagues);
  return (
    <div className="favorite-leagues">
      <h3>Pinned leagues</h3>
      {Object.values(favLeagues).length > 0 &&
        Object.values(favLeagues).map((element, i) => {
        
          return (
            <LeaguesByCountries
              key={element[0].country}
              element={element}
              sportName={sportName}
            />
          );
        })}


    </div>
  );
};

export default FavoriteLeagues;
