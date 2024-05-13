import React, { memo, useEffect, useState } from "react";
import maximizeNum from "../../functions/maximizeNum";
import capitalize from "../../functions/capitalize";
import pathsInObj from "../../functions/pathsInObj";
import { useNavigate, useParams } from "react-router-dom";
import LeaguesFromBar from "./LeaguesFromBar";

const LeftBar = () => {   
  const [leaguesList, setLeaguesList] = useState({});
  const [nameSearch, setNameSearch] = useState("");
  const [number, setNumber] = useState(10);
  const [searchBy, setSearchBy] = useState("league");
  const { sport } = useParams();


  useEffect(() => {
    setNameSearch(""); 
    setLeaguesList({});  
    getLeagues(); 
    console.log("leftbar");
  }, [sport]); 


  const mapper = (data) => {
    if (sport == "football") {
      let finalArr = data.map((element) =>{ 
        // console.log(element)
       let newObj = {
        country: element.country.name,
        id: element.league.id,
        league: element.league.name,
        logo: element.league.logo,
      }
    return newObj;
  });
  
  return finalArr;
    } else {
      return data.map((element) => ({
        country: element.country.name,
        id: element.id,
        league: element.name,
        logo: element.logo,
      }));
    }
  };


  const leaguesListMapper = (data) => {  
    const result = {}; 
    mapper(data).forEach((element) => {
      if (result.hasOwnProperty(element.country)) {
        result[element.country].push(element);
      } else {
        result[element.country] = [element];
      }
    });

    return result;
  };

  const getLeagues = () => {
      fetch(`http://${pathsInObj[sport].url}/${pathsInObj[sport].leagues}`, {
        method: "GET",
      })
        .then((response) => response.json()) 
        .then((data) => { 
          setLeaguesList(leaguesListMapper(data)); 
        })
        .catch((err) => {
          console.error(err);
        });
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
          myFilter(Object.values(leaguesList)).map((league, i) => { 
            if (i < number)
              
              return (
                <LeaguesFromBar 
                  key={i}
                  league={league}
                  nameSearch={nameSearch}
                  searchBy={searchBy}
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
    </div>
  );
};

export default LeftBar;
