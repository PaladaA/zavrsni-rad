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
import SearchHistoryLeagues from "../settings/SearchHistoryLeagues";

const LeftBar = () => {
  const [leaguesList, setLeaguesList] = useState({});
  const [nameSearch, setNameSearch] = useState("");
  const [number, setNumber] = useState(10);
  const [searchBy, setSearchBy] = useState("league");
  const [loading, setLoading] = useState(false);
  const { user } = useContextComp();
  const { sport } = useParams();
  const { mobileLeftBarDisplay, setSeasonsOfLeague } = useContextComp();
  const [width, height] = useWindowSize();

  useEffect(() => {
    setNameSearch("");
    fetchData();
  }, [sport, user.id]);

  const fetchData = async () => {
    setLoading(true);
    setLeaguesList({});
    try {
      //try catch blok je tu ako url ne postoji npr /golf dogodit ce se greska jer pathsObject[sport] ne sadrzi golf property unutar objekta te se zbog greske izvrsit catch(error){navigate('/')}
      const favLeagues = await getFavoriteLeagues(user, sport);

      const leaguesDataFromApi = await fetchAllLeagues(sport);

      window.location?.pathname.split("/")[2] == "league" &&
        leaguesDataFromApi.forEach((element) => {
          if (
            (element.league?.id ?? element.id) ==
            window.location?.pathname.split("/")[3]
          ) {
            setSeasonsOfLeague(element.seasons);
          }
        });

      setLeaguesList(leaguesDataMapper(leaguesDataFromApi, favLeagues, sport));
    } catch (error) {
      console.log(error);
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
      return newArr; //vracamo array sa ligama/drzavama (ovisno o select elementu) koje sadrze slova upisana
    }
  };

  return (
    <div
      id="leftBar"
      style={{
        display: !mobileLeftBarDisplay && width <= 650 ? "none" : "flex",
      }}
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
              autoComplete="off"
            />{" "}
          </form>
          <div>
            {Object.values(leaguesList).length > 0 &&
              myFilter(Object.values(leaguesList)).map((element, i) => {
                //posto je leaguesList objekt pretvaramo ga u array, keyevi nam nisu potrebni nego value-i tog objekta i svaki value postaje ellement arraya npr ako je bilo 1000 valuea i keyeva u prvotnom objektu sad u arrayu imamo 1000 value-a tj 1000 elemenata arraya. svaki value je array koji sadrzi sve lige po drzavi. dakle imamo array sa arrayevima
                if (i < number)
                  //number je state koji ima initial value 10 i omogucava prikaz 10 prvih drzava
                  return (
                    <LeaguesByCountries //svaka LeaguesFromBar komponenta je jedna drzava sa svojim ligama
                      key={element[0].country}
                      element={element}
                    />
                  );
              })}
            {myFilter(Object.values(leaguesList)).length > number && ( //ako je broj prikazanih drzava (number) manji od max broja botun je vidljiv i mozemo klikom na botun dolje povecat broj drzava za 15
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
