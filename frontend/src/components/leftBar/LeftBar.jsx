import React, { useEffect, useState } from "react";
import capitalize from "../../functions/capitalize";
import pathsInObj from "../../functions/pathsInObj";
import { useNavigate, useParams } from "react-router-dom";
import LeaguesByCountries from "./LeaguesByCountries";
import { useContextComp } from "../MyContext";

const LeftBar = () => {
  const [leaguesList, setLeaguesList] = useState({});
  const [nameSearch, setNameSearch] = useState("");
  const [number, setNumber] = useState(10);
  const [searchBy, setSearchBy] = useState("league");
  const { user } = useContextComp();
  const navigate = useNavigate();
  const { sport } = useParams();

  useEffect(() => {
    setNameSearch("");
    typeof user === "object" && fetchData();
  }, [sport, user.id]);

  const mapper = (data, obj) => {
    //ova funkcija vraca array sa objektima random poredanima npr prvi element arraya ima objekt sa jednom hrvatskom ligom, drugi je albanija, treci moze bit opet objekt sa podatcima hrvatske lige. zato kad returnam ovaj array, u funkciji fun se svi objekti sortiraju po drzavama u zasebne array-eve
    if (sport == "football") {
      return data.map((element) => ({
        country: element.country.name,
        id: element.league.id,
        league: element.league.name,
        logo: element.league.logo,
        favoriteLeagues: obj[element.league.id] == element.league.id, //ako je id iz baze jednak apiju znaci da je to favorit korisnika
      }));
    } else {
      return data.map((element) => ({
        country: element.country.name,
        id: element.id,
        league: element.name,
        logo: element.logo,
        favoriteLeagues: obj[element.id] == element.id,
      }));
    }
  };

  const leaguesListMapper = (data, userData) => {
    console.log(userData)
    const obj = {};
    userData.forEach((el) => { // u objekt obj spremamo id-eve favorita kako bi lakse pristupili u func funkciji
      obj[el.leagueId] = el.leagueId;
    });
    const result = {};
    mapper(data, obj).forEach((element) => {
      if (result.hasOwnProperty(element.country)) {
        //u objekt result ako postoji key drzave npr croatia pushamo u key croatia objekt koji sadrzi ligu i ostale podatke koji su raspoređeni u gornjoj funkciji
        result[element.country].push(element);
      } else {
        //u objektu result ako ne postoji key imena npr croatia kreiramo key croatia sa valueom koji je array i u njega upisujemo prvu ligu koja je objekt (element je objekt ali posto je unutar [] postavili smo objekt unutar arraya)
        result[element.country] = [element];
      }
    });

    return result;
  };


  const fetchData = () => {
    setLeaguesList({});
    // fetch(`https://api-football-v1.p.rapidapi.com/v3/leagues`, {get data.response
    //           https://api-basketball.p.rapidapi.com/leagues
    //       //pathsInObj.football
    //       method: "GET",
    //       // headers: {
    //       //   "X-RapidAPI-Key": `${import.meta.env.VITE_REACT_APP_API_KEY}`,
    //       //   "X-RapidAPI-Host": `${pathsInObj[sport].url}`,
    //       // },
    try {
      //try catch blok je tu ako url ne postoji npr /golf dogodit ce se greska jer pathsObject[sport] ne sadrzi golf property unutar objekta te se zbog greske izvrsit catch(error){navigate('/')}

      const getUserData = fetch(
        "http://localhost:3000/favorite-leagues/retrieve",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, sport: sport }),
        }
      );
      const getLeaguesData = fetch(
        `http://${pathsInObj[sport].url}/${pathsInObj[sport].leagues}`
      );

      Promise.all([getUserData, getLeaguesData])
        .then((responses) => {
          return Promise.all(responses.map((response) => response.json()));
        })
        .then((data) => {
          // setLeaguesList(fun(data.response));

          const userData = data[0];
          const leaguesData = data[1];

          setLeaguesList(leaguesListMapper(leaguesData, userData));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (error) {
      navigate("/");
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

  const updateAfterPin = (id, country, val) =>{//update array-a kako bi sacuvao promjene koje smo napravili
    setLeaguesList(prevList => {
      const updatedList = { ...prevList };
  
      // Find the league with the provided id and country
      Object.keys(updatedList).forEach(continent => {
        updatedList[continent].forEach(league => {
          if (league.country === country && league.id === id) {
            // Update the favoriteLeagues property
            league.favoriteLeagues = val;
          }
        });
      });
  
      return updatedList;
    });
    }

  return (
    <div id="leftBar">
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
            //posto je leaguesList objekt pretvaramo ga u array, keyevi nam nisu potrebni nego value-i tog objekta i svaki value postaje ellement arraya npr ako je bilo 1000 valuea i keyeva u prvotnom objektu sad u arrayu imamo 1000 value-a tj 1000 elemenata arraya. svaki value je array koji sadrzi sve lige po drzavi. dakle imamo array sa arrayevima
            if (i < number)
              //number je state koji ima initial value 10 i omogucava prikaz 10 prvih drzava
              return (
                <LeaguesByCountries //svaka LeaguesFromBar komponenta je jedna drzava sa svojim ligama
                  key={element[0].country}
                  element={element}
                  updateAfterPin={updateAfterPin}
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
    </div>
  );
};

export default LeftBar;
