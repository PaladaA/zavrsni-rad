import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import timeAdjustFun from "../functions/timeAdjustFun";
import pathsInObj from "../functions/pathsInObj";
import getDate from "../functions/getDate";


const LiveScore = () => {
  const [state, setState] = useState([]);
  const [date, setDate] = useState(getDate());
  const { sport } = useParams();
  const navigate = useNavigate();

  const fun = (data) => {      console.log('ele',data)

    if (sport == "football") {
      return data.map((element) => ({
        league: element.league.name,
        leagueId: element.league.id,
        teamAway: element.teams.away.name,
        teamHome: element.teams.home.name,
        teamAwayLogo: element.teams.away.logo,
        teamHomeLogo: element.teams.home.logo,
        teamAwayId: element.teams.away.id,
        teamHomeId: element.teams.home.id,
        scoresAway: element.goals.away,
        scoresHome: element.goals.home,
        status: element.fixture.status.long,
        elapsed: element.fixture.status.elapsed,
        date: element.fixture.date,
      }));
    } else {
      return data.map((element) => ({
        league: element.league.name,
        leagueId: element.league.id,
        teamAway: element.teams.away.name,
        teamHome: element.teams.home.name,
        teamAwayLogo: element.teams.away.logo,
        teamHomeLogo: element.teams.home.logo,
        teamAwayId: element.teams.away.id,
        teamHomeId: element.teams.home.id,
        scoresAway:
          sport == "basketball"
            ? element.scores.away?.total
            : element.scores.away,
        scoresHome:
          sport == "basketball"
            ? element.scores.home?.total 
            : element.scores.home,         
        status: element.status.long,       
        date: element.date,
      }));
    }
  };
  console.log(state);
  useEffect(() => {
      const fetchData = () => {
        console.log(`http://${pathsInObj[sport].url}/${pathsInObj[sport].liveScore}`, pathsInObj[sport])
        fetch(
          `http://${pathsInObj[sport].url}/${pathsInObj[sport].liveScore}`,
          {
            method: "GET",
            // headers: {
            //   "X-RapidAPI-Key": `${import.meta.env.VITE_REACT_APP_API_KEY}`,
            //   "X-RapidAPI-Host": `${pathsInObj[sport].url}`,
            // },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setState(fun(data)); 
          })
          .catch((err) => {
            console.error(err);
          });
      };
      fetchData();

      const intervalId = setInterval(fetchData, 150000); 
      return () => clearInterval(intervalId);  
  }, [sport]);

  console.log(sport);

  return (
    <div id="live-score">
      <input
        type="date"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <div id="live-score-table">
        {state &&
          state.length > 0 &&
          state.map((element, index) => {
            
            return (
              <div className="one-match" key={index}>
                <h4>{element.league}</h4>
                <div className="time">
                  <p>
                    {element.status == "Not Started"
                      ? "Starting  "
                      : "Started  "}
                    {timeAdjustFun(element.date).day}.{" "}
                    {timeAdjustFun(element.date).month}.{" "}
                    {timeAdjustFun(element.date).year}. at{" "}
                    {timeAdjustFun(element.date).hours}:
                    {timeAdjustFun(element.date).minutes}
                  </p>
                </div>
                <div className="home-team">
                  <div>
                    <h4>{element.teamHome}</h4>
                    <img src={element.teamHomeLogo} />
                  </div>
                  <h4>{element.scoresHome ?? "-"}</h4>
                </div>
                <div className="away-team">
                  <div>
                    <h4>{element.teamAway}</h4>
                    <img src={element.teamAwayLogo} />
                  </div>
                  <h4>{element.scoresAway ?? "-"}</h4>
                </div>
                {element.elapsed && (
                  <div className="elapsed">
                    <p>{element.elapsed}</p>
                    <p>'</p>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default LiveScore;
