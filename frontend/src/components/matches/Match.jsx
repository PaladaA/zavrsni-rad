import React, { useEffect, useState } from "react";
import timeAdjustFun from "../../functions/timeAdjustFun";
import { updateFavMatchInDb } from "../../functions/apiFunctions";

import { MdStar } from "react-icons/md";
import { MdStarBorder } from "react-icons/md";
import { useContextComp } from "../MyContext";

const Match = ({ match, sportName }) => {
  const [favoriteMatch, setFavoriteMatch] = useState(match.favorite);
  const { user, setLoginFormState } = useContextComp();

  useEffect(() => {
    setFavoriteMatch(match.favorite);
  }, [match.favorite, sportName]);

  const handleFavoriteButton = () => {
    if (user.name) {
      if (favoriteMatch) {
        setFavoriteMatch(false);
        updateFavMatchInDb("remove", sportName, user, match);
      } else {
        setFavoriteMatch(true);
        updateFavMatchInDb("add", sportName, user, match);
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
      <div className="match-description">
        <div className="time">
          <p>{match.status == "Not Started" ? "Starting  " : "Started  "} 
            {timeAdjustFun(match.date).day}. {timeAdjustFun(match.date).month}.{" "}
            {timeAdjustFun(match.date).year}. at{" "}
            {timeAdjustFun(match.date).hours}:
            {timeAdjustFun(match.date).minutes}
          </p>
        </div>
        <p>Status: {match.status}</p>
      </div>
      <div className="home-team">
        <div>
          <h5>{match.teamHome}</h5>
          <img src={match.teamHomeLogo} />
        </div>
        <h4>{match.scoresHome ?? "-"}</h4>
      </div>
      <div className="away-team">
        <div>
          <h5>{match.teamAway}</h5>
          <img src={match.teamAwayLogo} />
        </div>
        <h4>{match.scoresAway ?? "-"}</h4>
      </div>
      {match.elapsed && (
        <div className="elapsed">
          <p>
            {match.status == "Match Finished" ? match.status : match.elapsed}
          </p>
          {match.status != "Match Finished" && <p>'</p>}
        </div>
      )}
    </div>
  );
};

export default Match;
