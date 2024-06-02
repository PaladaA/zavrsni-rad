import React, { useEffect, useState } from 'react'
import pathsInObj from '../../functions/pathsInObj';
import Match from '../matches/Match';
import matchDataStructuring from '../../functions/matchDataStructuring';

const DisplayFavMatch = ({favInstance, sportName}) => {
    const [match, setMatch] = useState({})

    useEffect(()=>{
        //https://api-football-v1.p.rapidapi.com/v3/fixtures?id=1141822
        //https://api-basketball.p.rapidapi.com/games?id=5335
        const fetchData = () =>{
        fetch(
            `http://${pathsInObj[sportName].url}/${pathsInObj[sportName].favMatch}`,
            {
              method: "GET",
            //   headers: {
            //     "X-RapidAPI-Key": `${import.meta.env.VITE_REACT_APP_API_KEY}`,
            //     "X-RapidAPI-Host": `${pathsInObj[sportName].url}`,
            //   },
            }
          )
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setMatch(matchDataStructuring(data, sportName, favInstance)); //slazem podatke u array sa objektima (data.map returna array sa objektima, svaki objekt ima league, leagueId...vidi gori)
              // fun(data.response);
            })
            .catch((err) => {
              //ukoliko je url valjan i dogodi se greska tjekom dohvacanja podatka ispisuje se greska u konzoli
              console.error(err);
            });}
            fetchData();

            const intervalId = setInterval(fetchData, 150000);
            return () => clearInterval(intervalId);
        
    },[])

    console.log(match, )

  return (
    <div id="live-score-table">
    {match &&
      match.length > 0 &&
      match.map((element, index) => {
        //podatke koje smo slozili kako smo tili nakon fetchanja prikazujemo
        return <Match element={element} key={index} sportName={sportName}/>;
      })}
  </div>
)
}

export default DisplayFavMatch
