import React, { useEffect, useState } from 'react'
import maximizeNum from "../../functions/maximizeNum";
import { useNavigate, useParams } from "react-router-dom";
import { useContextComp } from "../MyContext";
import { MdStar } from "react-icons/md";
import { MdStarBorder } from "react-icons/md";
import { useWindowSize } from '../useWindowSize';
import { updateFavLeagueInDb } from '../../functions/apiFunctions';


const League = ({el, sportName}) => {
    const [favoriteLeague, setFavoriteLeagues] = useState(el.favoriteLeagues)
    const { user, setLoginFormState, setSeasonsOfLeague, setMobileLeftBarDisplay} = useContextComp();
    const { sport } = useParams();
    const navigate = useNavigate();
    const [width, height] = useWindowSize();

    useEffect(()=>{
      setSeasonsOfLeague(el.seasons)
    },[])    

    const handleFavoriteButton = () =>{

      if(user.name){
          if(favoriteLeague){
            setFavoriteLeagues(false)
            updateFavLeagueInDb(el.league, el.id, "remove", sport ?? sportName, user)
          }
          else{
            setFavoriteLeagues(true)
            updateFavLeagueInDb(el.league, el.id, "add", sport ?? sportName, user)
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
            onClick={() =>{
              setSeasonsOfLeague(el.seasons);
                el.id && navigate(`/${sport ?? sportName}/league/${el.id}`);
                setMobileLeftBarDisplay(false)
              }
            }
          >
            {window.location?.pathname == "/" && <h5>{maximizeNum(el.league, 40)}</h5>}
            {window.location?.pathname != "/" && <h5>{maximizeNum(el.league, width >= 650 ? 13 : 30)}</h5>}
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
