import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import pathsInObj from "../../functions/pathsInObj";
import getDate from "../../functions/getDate";
import Match from "../matches/Match";
import { useContextComp } from "../MyContext";
import matchDataStructuring from "../../functions/matchDataStructuring";

const LiveScore = () => {
  const [state, setState] = useState([]);
  const [date, setDate] = useState(getDate());
  const { sport } = useParams();
  const { user, getUsersFavMatches, favMatch } = useContextComp();


  useEffect(() => {
    getUsersFavMatches(user.id, sport)
  }, [user.id, sport]);

  useEffect(() => {
    //try catch blok je tu ako url ne postoji npr /golf dogodit ce se greska jer pathsObject[sport] ne sadrzi golf property unutar objekta te se zbog greske izvrsit catch(error){navigate('/')}
    const fetchData = () => {
      typeof user == "object" &&
        typeof favMatch == "object" &&
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
            setState(matchDataStructuring(data, sport, favMatch)); //slazem podatke u array sa objektima (data.map returna array sa objektima, svaki objekt ima league, leagueId...vidi gori)
            // fun(data.response);
          })
          .catch((err) => {
            //ukoliko je url valjan i dogodi se greska tjekom dohvacanja podatka ispisuje se greska u konzoli
            console.error(err);
          });
    };
    fetchData();

    const intervalId = setInterval(fetchData, 150000);
    return () => clearInterval(intervalId);
  }, [sport, user.id, favMatch]);

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
            //podatke koje smo slozili kako smo tili nakon fetchanja prikazujemo
            return <Match element={element} key={element.matchId} />;
          })}
      </div>
    </div>
  );
};

export default LiveScore;
