import React, { memo, useEffect, useState } from "react";
import { useContextComp } from "../MyContext";
import {
  fetchMatches as fetchFavoriteMatches,
  getUsersFavMatches,
} from "../../functions/apiFunctions";
import MatchesByLeagues from "../matches/MatchesByLeagues";
import matchDataMapper from "../../dataStructuringFunctions/matchDataMapper";
import { all, pending, finished, postponed } from "../../functions/matchStatus"

const FavoriteMatches = ({ sportName }) => {
  const { user } = useContextComp();
  const [favMatches, setFavMatches] = useState([]);
  const [matchesFilter, setMatchesFilter] = useState(all);

  useEffect(() => {
    const favMatchesList = [];
    const asyncFun = async () => {
      const favMatchesIds = await getUsersFavMatches(user, sportName);
      const favMatchesIdsArray = Object.values(favMatchesIds);
      for (let i = 0; i < favMatchesIdsArray.length; i++) {
        const retrievedData = await fetchFavoriteMatches(
          sportName,
          `?id=${favMatchesIdsArray[i]}`
        );
        favMatchesList.push(retrievedData.response[0]);
      }
      setFavMatches(matchDataMapper(favMatchesList, sportName, favMatchesIds));
    };
    asyncFun();
  }, []);

  //not started
  return (
    <div className="favorite-matches">
      <h3>Pinned Matches</h3>
      <div id="matches-filter">
        <div id="matches-filter">
          <button style={{ background: pending.length == matchesFilter.length ? '#312f88' : "#d8a404" }} onClick={() => setMatchesFilter(pending)}>Live</button>
          <button style={{ background: all.length == matchesFilter.length ? '#312f88' : "#d8a404" }} onClick={() => setMatchesFilter(all)}>All Matches</button>
          <button style={{ background: finished.length == matchesFilter.length ? '#312f88' : "#d8a404" }} onClick={() => setMatchesFilter(finished)}>Finished</button>
          <button style={{ background: postponed.length == matchesFilter.length ? '#312f88' : "#d8a404" }} onClick={() => setMatchesFilter(postponed)}>Postponed</button>
        </div>          </div>
      {Object.values(favMatches).map((matches, i) => {
        //podatke koje smo slozili kako smo tili nakon fetchanja prikazujemo
        return (
          <MatchesByLeagues
            matches={matches}
            sportName={sportName}
            matchesFilter={matchesFilter}
            key={matches[0].matchId}
          />
        );
      })}
    </div>
  );
};

export default memo(FavoriteMatches);
