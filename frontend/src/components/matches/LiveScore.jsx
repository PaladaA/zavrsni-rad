import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pathsInObj from "../../functions/pathsInObj";
import getDate from "../../functions/getDate";
import { useContextComp } from "../MyContext";
import matchDataMapper from "../../dataStructuringFunctions/matchDataMapper";
import { fetchMatches, getUsersFavMatches } from "../../functions/apiFunctions";
import MatchesByLeagues from "./MatchesByLeagues";
import { all, pending, finished, postponed } from "../../functions/matchStatus";

const LiveScore = () => {
  const [matchesList, setMatchesList] = useState({});
  const [date, setDate] = useState(getDate());
  const [loading, setLoading] = useState(false);
  const [searchCharacter, setSearchCharacter] = useState("");
  const [matchesFilter, setMatchesFilter] = useState(all);
  const { sport } = useParams();
  const { user } = useContextComp();

  const fetchMatchesData = async (date) => {
    setLoading(true);
    try {
      const favMatch = await getUsersFavMatches(user, sport);
      const matches = await fetchMatches(sport, `?date=${date}`);
      if (matches.response.length) {
        setMatchesList(matchDataMapper(matches.response, sport, favMatch));
        setDate(date);
      }

      else setMatchesList([]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatchesData(getDate());
    setSearchCharacter("")
    setMatchesFilter(all);
  }, [sport, user.id]);

  const searchFilter = (array) => {
    return array
      .map((element) => {
        return element.filter((match) => {
          return (
            match.league.toLowerCase().includes(searchCharacter) ||
            match.teamAway.toLowerCase().includes(searchCharacter) ||
            match.teamHome.toLowerCase().includes(searchCharacter)
          );
        });
      })
      .filter((filteredArray) => filteredArray.length > 0);
  };

  const filterFun = (status) => {
    setMatchesFilter(status);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    };

    const filterButtons = {
      "Live": pending,
      "All":all,
      "Finished":finished,
      "Postponed": postponed
    }

  return (
    <div
      id="live-score"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/${pathsInObj[sport].image}")`,
      }}
    >
      <div id="filters-holder">
        {" "}
        <div id="matches-filter">
          {Object.entries(filterButtons).map(filterButton => <button
          key={filterButton[0]}
            style={{
              background:
              filterButton[1].length == matchesFilter.length ? "#312f88" : "#d8a404",
                color: filterButton[1].length == matchesFilter.length ? "white" : "black"
            }}
            onClick={() => {
              filterFun(filterButton[1]);
            }}
          >
            {filterButton[0]}
          </button>)}
        </div>
        <div>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => fetchMatchesData(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search for match"
            value={searchCharacter}
            onChange={(e) => {
              setSearchCharacter(e.target.value);    setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 200);
          
            }}
          />
        </div>
        <h3 id="live-score-title">Rezultati</h3>
      </div>
      {loading ? (
        <div className="loading-background">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div id="live-score-table">
            {Object.values(matchesList) &&
            Object.values(matchesList).length > 0 ? (
              searchFilter(Object.values(matchesList)).map((matches, index) => {
              
                return (
                  <MatchesByLeagues
                    index={index}
                    matches={matches}
                    matchesFilter={matchesFilter}
                    sportName={sport}
                    key={`${matches[0].matchId}-${searchCharacter}-${matchesFilter}`}
                  />
                );
              })
            ) : (
              <h1 className="no-data">There is no games for this date</h1>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LiveScore;
