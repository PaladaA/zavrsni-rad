/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useContextComp } from "../MyContext";
import {
  fetchGetStringSearchHistory
} from "../../functions/apiFunctions";

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

const SearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContextComp();

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const searchHistoryData = await fetchGetStringSearchHistory(user.id);
        setSearchHistory(searchHistoryData);
      } catch (error) {
        console.error('Error fetching search history:', error);
        setSearchHistory([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchSearchHistory();
    }
  }, [user]);

  return (
    <div className="leagues-search-history">
      {loading
        ?
        (
          <p>Loading search history...</p>
        )
        :
        searchHistory.length > 0
          ?
          (
            searchHistory.map((element) => (
              <div key={`${element.userId}-${element.searchTerm}`}>
                <p id="leagueNameEl">{element.searchTerm}</p>
                <p>{formatDate(element.visitedDate)}</p>
              </div>
            ))
          )
          :
          (
            <p>No search history available</p>
          )
      }
    </div>
  );
};

export default SearchHistory;
