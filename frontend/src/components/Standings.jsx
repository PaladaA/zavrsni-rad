import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import maximizeNum from "../functions/maximizeNum";
import pathsInObj from "../functions/pathsInObj";
import getDate from "../functions/getDate";
const Standings = () => {
  const { id } = useParams();   
  const [clubsStandings, setClubsStandings] = useState({});
  const [date, setDate] = useState(getDate());
  const { sport } = useParams();

  const dataMapper = (data) => {
    if (sport == "football") {
      return (
        data.map((element) => ({
          rank: element.rank,
          logo: element.team.logo,
          teamName: element.team.name,
          stats: {
            P: element.all.played,//
            W: element.all.win,//win
            D: element.all.draw,//draw
            L: element.all.lose,//lose
            GF: element.all.goals.for,//goalsFor
            GA: element.all.goals.against,//goalsAgainst
            PTS: element.points,//
          },
        }))
      );
    }
    if (sport == "basketball") {
      return (
        data.map((element) => ({
          rank: element.position,
          logo: element.team.logo,
          teamName: element.team.name,
          stats: {
            P: element.games.played,//played
            W: element.games.win.total,//win
            L: element.games.lose.total,//lose
            PF: element.points.for,//pointsFor
            PA: element.points.against,//pointsAgainst
          },
        }))
      );
    }
    if (sport == "handball") {
      return (
        data.map((element) => ({
          rank: element.position,
          logo: element.team.logo,
          teamName: element.team.name,
          stats: {
            P: element.games.played,//played
            W: element.games.win.total,//win
            D: element.games.draw.total,//draw
            L: element.games.lose.total,//lose
            GF: element.goals.for,//goalsFor
            GA: element.goals.against,//goalsAgainst
            PTS: element.points,//points
          },
        }))
      );
    }
  };

  console.log(clubsStandings)

  useEffect(() => {
    console.log(pathsInObj[sport].url);
    fetch(`http://${pathsInObj[sport].url}/${pathsInObj[sport].standings}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setClubsStandings(dataMapper(data)); 
      })
      .catch((err) => console.error(err));
  }, [id]);


  if (clubsStandings == "No Current Leagues") return <h1>{clubsStandings}</h1>;
  return (
    <div id="standings">
      <input              /*kalendar */
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
                  return <h6 key={element}>{element}</h6>;
                })}
              </div>
            </div>
            {clubsStandings.length > 0 &&
              clubsStandings.map((club, index) => {
                return (
                  <div key={index}>
                    <div id="rank">
                      <p>{club.rank}.</p>
                    </div>
                    <img src={club.logo} />
                    <div>{maximizeNum(club.teamName, 17)}</div>
                    <div className="form">
                      {Object.values(club.stats).map((points, i) => {
                        return <p key={i}>{points}</p>;
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
