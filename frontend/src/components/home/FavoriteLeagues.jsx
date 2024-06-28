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
          //posto je leaguesList objekt pretvaramo ga u array, keyevi nam nisu potrebni nego value-i tog objekta i svaki value postaje ellement arraya npr ako je bilo 1000 valuea i keyeva u prvotnom objektu sad u arrayu imamo 1000 value-a tj 1000 elemenata arraya. svaki value je array koji sadrzi sve lige po drzavi. dakle imamo array sa arrayevima
          //number je state koji ima initial value 10 i omogucava prikaz 10 prvih drzava
          return (
            <LeaguesByCountries //svaka LeaguesFromBar komponenta je jedna drzava sa svojim ligama
              key={element[0].country}
              element={element}
              sportName={sportName}
            />
          );
        })}

      {/* {favInstance.length > 0 && favInstance.map((league) =>
       <DisplayFavLeague key={league.leagueId} favInstance={favInstance} sportName={sportName} leagueId={league.leagueId} />)
      } */}
    </div>
  );
};

export default FavoriteLeagues;
