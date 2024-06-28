/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useContextComp } from "../MyContext";
import {
  fetchGetSearchHistory,
  fetchRemoveFromSearchHistory,
} from "../../functions/apiFunctions";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const formatDate = (originalDatetime) => {
  const dateObj = new Date(originalDatetime);

  // Format the date to YYYY-MM-DD HH:mm format
  const formattedDatetime = dateObj.toLocaleString('hr-HR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).replace(/\//g, '-').replace(',', '');

  return formattedDatetime;
}

const SearchHistoryLeagues = ({ nameSearch, setNameSearch }) => {
  const { leagueHistory, setLeagueHistory, user } = useContextComp();
  const { sport, id } = useParams();

  useEffect(() => {
    const asyncFun = async () => {
      const searchHistory = await fetchGetSearchHistory(user.id, sport);
      setLeagueHistory(searchHistory);
    };
    asyncFun();
  }, [user, id, sport]);

  const filterBySearch = (array) => {
    if (sport) {
      if (nameSearch == "") return [];

      return array.filter((league) =>
        league.leagueName.toLowerCase().includes(nameSearch.toLowerCase())
      );
    }
    return array;
  };

  return (
    <div className="leagues-search-history">
      {leagueHistory.length > 0 ? (
        filterBySearch(leagueHistory).map((element) => {
          return (
            <div
              onClick={() => sport && setNameSearch(element.leagueName)}
              key={element.leagueName + element.leagueId}
            >
              <p id="leagueNameEl">{element.leagueName}</p>
              <p id="sportEl">{element.sport}</p>
              <p>{formatDate(element.visitedDate)}</p>
            </div>
          );
        })
      ) : (
        <p>No search history available</p>
      )}
    </div>
  );
};

export default SearchHistoryLeagues;
