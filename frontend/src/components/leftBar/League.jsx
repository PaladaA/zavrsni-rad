import React, { useEffect, useState } from 'react'
import maximizeNum from "../../functions/maximizeNum";
import { useNavigate, useParams } from "react-router-dom";
import { useContextComp } from "../MyContext";
import { MdStar } from "react-icons/md";
import { MdStarBorder } from "react-icons/md";


const League = ({el, updateAfterPin}) => {
    const [favoriteLeague, setFavoriteLeagues] = useState(el.favoriteLeagues)
    const { user, setLoginFormState } = useContextComp();
    const { sport } = useParams();
    const navigate = useNavigate();
    
    const updateFavInDb = (leagueName, leagueId, path) => {
        fetch(`http://localhost:3000/favorite-leagues/${path}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            leagueId: leagueId,
            leagueName: leagueName,
            sport:sport
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
    

    const handleFavoriteButton = () =>{

      if(user.name){
          if(favoriteLeague){
            setFavoriteLeagues(false)
            updateFavInDb(el.league, el.id, "remove")
            updateAfterPin( el.id, el.country, false)
          }
          else{
            setFavoriteLeagues(true)
            updateFavInDb(el.league, el.id, "add")
            updateAfterPin(el.id, el.country, true)
          }
        }
      else
          setLoginFormState(true)
      }
    

    return (
        <div
        className="league-from-bar-holder"
        >
          <div
            className="league-from-bar"
            onClick={() =>
                el.id && navigate(`/${sport}/league/${el.id}`)
            }
          >
            <h5>{maximizeNum(el.league, 13)}</h5>{" "}
            {el.logo && <img src={el.logo} />}
          </div>
          <button
            className="favorite-button"
            onClick={()=>handleFavoriteButton()}
          >
            {favoriteLeague ? <MdStar /> : <MdStarBorder />}
          </button>
        </div>
      );

  
}

export default League
