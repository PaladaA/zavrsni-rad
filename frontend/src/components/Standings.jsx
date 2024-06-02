import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import maximizeNum from "../functions/maximizeNum";
import pathsInObj from "../functions/pathsInObj";
import getDate from "../functions/getDate";
import joinFirstAndCapital from "../functions/joinFirstAndCapital";
const Standings = () => {
  // const location = useLocation();
  const { id } = useParams();
  const [clubsStandings, setClubsStandings] = useState({});
  const [date, setDate] = useState(getDate());
  const { sport } = useParams();

  const fun = (data) => {
    if (sport == "football") {
      return data.map((element) => ({
        rank: element.rank,
        logo: element.team.logo,
        teamName: element.team.name,
        stats: {
          played: element.all.played,
          win: element.all.win,
          draw: element.all.draw,
          lose: element.all.lose,
          goalsFr: element.all.goals.for,
          goalsAgainst: element.all.goals.against,
          PTS: element.points,
        },
      }));
    }
    if (sport == "basketball") {
      return data.map((element) => ({
        rank: element.position,
        logo: element.team.logo,
        teamName: element.team.name,
        stats: {
          played: element.games.played,
          win: element.games.win.total,
          lose: element.games.lose.total,
          pointsFor: element.points.for,
          pointsAgainst: element.points.against,
        },
      }));
    }
    if (sport == "handball") {
      return data.map((element) => ({
        rank: element.position,
        logo: element.team.logo,
        teamName: element.team.name,
        stats: {
          played: element.games.played,
          win: element.games.win.total,
          draw: element.games.draw.total,
          lose: element.games.lose.total,
          goalsFor: element.goals.for,
          goalsAgainst: element.goals.against,
          points: element.points,
        },
      }));
    }
    if (sport == "volleyball") {
      return data.map((element) => ({
        rank: element.position,
        logo: element.team.logo,
        teamName: element.team.name,
        stats: {
          played: element.games.played,
          win: element.games.win.total,
          lose: element.games.lose.total,
          goalsFor: element.goals.for,
          goalsAgainst: element.goals.against,
          points: element.points,
        },
      }));
    }
  };
console.log('date',date)
  useEffect(() => {
    console.log(pathsInObj[sport].url);
    // fetch(`https://api-football-v1.p.rapidapi.com/v3/standings?season=2023&league=${id}`, {data.response[0].league.standings
    fetch(`http://${pathsInObj[sport].url}/${pathsInObj[sport].standings}`, {
      method: "GET",
      // headers: {
      //   "X-RapidAPI-Key": `${import.meta.env.VITE_REACT_APP_API_KEY}`,
      //   "X-RapidAPI-Host": `${pathsInObj[sport].url}`,
      // },
    })
      .then((response) => response.json())
      .then((data) => {
        // if (data.response?.length > 0)
        // setClubsStandings(fun(data.response[0].league?.standings[0] || data.response[0])); //sređuje podatke i sprema u state clubs
        setClubsStandings(fun(data)); // else setClubsStandings("No Current Leagues");
      })
      .catch((err) => console.error(err));
  }, [id]);
  
  console.log(clubsStandings);
  if (clubsStandings == "No Current Leagues") return <h1>{clubsStandings}</h1>;
  return (
    <div id="standings">
      <input
        type="date"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <div id="table-holder">
        {clubsStandings.length > 0 && (
          <div id="table">
            <div>
              <h6>#</h6>
              <h6>Team</h6>
              <h6></h6>
              <div className="form">
                {Object.keys(clubsStandings[0].stats).map((element) => {
                  return <h6 key={element}>{joinFirstAndCapital(element)}</h6>;
                })}
              </div>
            </div>
            {clubsStandings.length > 0 &&
              clubsStandings.map((element, index) => {
                return (
                  <div key={index}>
                    <div id="rank">
                      <p>{element.rank}.</p>
                    </div>
                    <img src={element.logo} />
                    <div>{maximizeNum(element.teamName, 17)}</div>
                    <div className="form">
                      {Object.values(element.stats).map((element, i) => {
                        return <p key={i}>{element}</p>;
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Standings;
