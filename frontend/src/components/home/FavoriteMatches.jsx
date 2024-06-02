import React, { memo, useEffect, useState } from "react";
import pathsInObj from "../../functions/pathsInObj";
import { useContextComp } from "../MyContext";
import DisplayFavMatch from "./DisplayFavMatch";

const FavoriteMatches = ({ sportName }) => {
  const { user, getUsersFavMatches, favMatch } = useContextComp();
  const [favInstance, setFavInstance] = useState({});
  
  useEffect(() => {
    getUsersFavMatches(user.id, sportName)
      .then((favData) => {
        setFavInstance(favData);
        console.log("favData",favData)
      })
      .catch((error) => {
        console.error("Error fetching favorite matches:", error);
      });
    // fetch(
    //     `https://${pathsInObj[sport].url}/${pathsInObj[sport]}?id=${id}`,
    //     {
    //       method: "GET",
    //       // headers: {
    //       //   "X-RapidAPI-Key": `${import.meta.env.VITE_REACT_APP_API_KEY}`,
    //       //   "X-RapidAPI-Host": `${pathsInObj[sport].url}`,
    //       // },
    //     }
    //   )
    //     .then((response) => response.json())
    //     .then((data) => {
    //       setState(fun(data)); //slazem podatke u array sa objektima (data.map returna array sa objektima, svaki objekt ima league, leagueId...vidi gori)
    //       // fun(data.response);
    //     })
    //     .catch((err) => {
    //       //ukoliko je url valjan i dogodi se greska tjekom dohvacanja podatka ispisuje se greska u konzoli
    //       console.error(err);
    //     });
  }, []);

  return (
    <div className="favorite-matches">
      <h3>Pinned Matches</h3>
      {Object.keys(favInstance).map((matchId) => {
        return <DisplayFavMatch favInstance={favInstance} sportName={sportName} key={matchId} />;
      })}
    </div>
  );
};

export default memo(FavoriteMatches);
