import React, { useEffect, useState } from "react";
import {
  getFavoriteLeagues,
  fetchAllLeagues,
} from "../../functions/apiFunctions";
import capitalize from "../../functions/capitalize";
import { useNavigate, useParams } from "react-router-dom";
import LeaguesByCountries from "./LeaguesByCountries";
import { useContextComp } from "../MyContext";
import { leaguesDataMapper } from "../../dataStructuringFunctions/leaguesDataMapper";
import { useWindowSize } from "../useWindowSize";

const LeftBar = () => {
  const [leaguesList, setLeaguesList] = useState({});
  const [nameSearch, setNameSearch] = useState("");
  const [number, setNumber] = useState(10);
  const [searchBy, setSearchBy] = useState("league");
  const [loading, setLoading] = useState(false);
  const { user } = useContextComp();
  const { sport } = useParams();
  const { mobileLeftBarDisplay } = useContextComp();
  const [width, height] = useWindowSize();

  useEffect(() => {
    setNameSearch("");
    typeof user === "object" && fetchData();
  }, [sport, user.id]);

  const fetchData = async () => {
    setLoading(true);
    setLeaguesList({});
    try {
      //try catch blok je tu ako url ne postoji npr /golf dogodit ce se greska jer pathsObject[sport] ne sadrzi golf property unutar objekta te se zbog greske izvrsit catch(error){navigate('/')}
      const favLeagues = await getFavoriteLeagues(user, sport);

      const leaguesDataFromApi = await fetchAllLeagues(sport);

      setLeaguesList(leaguesDataMapper(leaguesDataFromApi, favLeagues, sport));
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const myFilter = (array) => {
    const newArr = [];
    if (searchBy == "league") {
      array.forEach((element, index) => {
        const x = element.filter((el) => {
          return el.league.toLowerCase().includes(nameSearch.toLowerCase());
        });

        x.length > 0 && newArr.push(x);
      });

      return newArr;
    } else {
      array.forEach((element, index) => {
        const x = element.filter((el) => {
          return el.country.toLowerCase().includes(nameSearch.toLowerCase());
        });
        x.length > 0 && newArr.push(x);
      });
      return newArr; 
    }
  };

  return (
    <div
      id="leftBar"
      style={{ display: !mobileLeftBarDisplay && width <= 650 ? "none" : "flex" }}
    >
      {loading ? (
        <div className="loading-background">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <form id="search-bar">
            <h3>{capitalize(sport)}</h3>
            <div id="search-by">
              <select
                onClick={(e) => setSearchBy(e.target.value)}
                id="select-dropdown"
              >
                <option value="league">Search by leagues</option>
                <option value="country">Search by countries</option>
              </select>
            </div>
            <input
              id="input"
              type="text"
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)}
              placeholder={`type ${searchBy} name`}
            />
          </form>
          <div>
            {Object.values(leaguesList).length > 0 &&
              myFilter(Object.values(leaguesList)).map((element, i) => {
                
                if (i < number)
                  return (
                    <LeaguesByCountries 
                      key={element[0].country}
                      element={element}
                    />
                  );
              })}
            {myFilter(Object.values(leaguesList)).length > number && ( 
              <button
                className="expand-league-button"
                onClick={() => setNumber((prev) => prev + 15)}
              >
                <div></div>
                <div></div>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LeftBar;
