import React, { useEffect, useState } from "react";
import timeAdjustFun from "../../functions/timeAdjustFun";

import { MdStar } from "react-icons/md";
import { MdStarBorder } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useContextComp } from "../MyContext";

const Match = ({ element, sportName }) => {
  const [favoriteMatch, setFavoriteMatch] = useState(element.favorite);
  const { sport } = useParams();
  const { user, setLoginFormState } = useContextComp();

  useEffect(() => {
    setFavoriteMatch(element.favorite);
  }, [element.favorite, sport]);

  const updateFavInDb = (path) => {
    fetch(`http://localhost:3000/favorite-matches/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        matchId: element.matchId,
        sport: sport ?? sportName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleFavoriteButton = () => {
    if (user.name) {
      if (favoriteMatch) {
        setFavoriteMatch(false);
        updateFavInDb("remove");
      } else {
        setFavoriteMatch(true);
        updateFavInDb("add");
      }
    } else setLoginFormState(true);
  };

  return (
    <div className="one-match">
      <button
        className="favorite-button"
        onClick={() => handleFavoriteButton()}
      >
        {favoriteMatch ? <MdStar /> : <MdStarBorder />}
      </button>
      <h4>{element.league}</h4>
      <div className="time">
        <p>
          {element.status == "Not Started" ? "Starting  " : "Started  "}
          {timeAdjustFun(element.date).day}. {timeAdjustFun(element.date).month}
          . {timeAdjustFun(element.date).year}. at{" "}
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
};

export default Match;
