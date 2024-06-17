import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import maximizeNum from "../functions/maximizeNum";
import pathsInObj from "../functions/pathsInObj";
import joinFirstAndCapital from "../functions/joinFirstAndCapital";
import standingDataMapper from "../dataStructuringFunctions/standingsDataMapper";
import { useContextComp } from "./MyContext";
import { fetchStandings } from "../functions/apiFunctions";

const Standings = () => {
  const { seasonsOfLeague } = useContextComp();
  const [clubsStandings, setClubsStandings] = useState([]);
  const [season, setSeason] = useState("");
  const [seasonList, setSeasonList] = useState([]);
  const [standingsHeader, setStandingsHeader] = useState("");
  const [loading, setLoading] = useState(false);
  const { sport, id } = useParams();

  const fetchFunction = async () => {
    setLoading(true);
    try {
      const standingsData =
        season && id && (await fetchStandings(sport, id, season));
      console.log(standingsData);
      if (standingsData.response?.length > 0) {
        console.log(standingsData);
        setClubsStandings(
          standingDataMapper(
            standingsData.response[0]?.league?.standings[0] ||
              standingsData.response[0],
            sport
          ),
          setStandingsHeader(
            standingsData.response[0]?.league?.name ||
              standingsData.response[0][0]?.league?.name
          )
        );
      }
      //sređuje podatke i sprema u state clubs
      else setClubsStandings([]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (seasonsOfLeague.length > 0) {
      const seasonsArray = seasonsOfLeague.map(
        (seasons) => seasons.season || seasons.year
      );

      if (
        seasonsOfLeague[0].hasOwnProperty("season") &&
        typeof seasonsOfLeague[0].season == "string"
      ) {
        seasonsArray.sort((a, b) => {
          const startYearA = parseInt(a.split("-")[0]);
          const startYearB = parseInt(b.split("-")[0]);

          return startYearB - startYearA;
        });
      } else {
        seasonsArray.sort((a, b) => b - a);
      }
      setSeasonList(seasonsArray);
      setSeason(seasonsArray[0]);
    }
  }, [id]);

  useEffect(() => {
    fetchFunction();
  }, [id, season]);

  if (!clubsStandings.length)
    return (
      <div
        id="standings"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/${pathsInObj[sport].image}")`,
        }}
      >
        <div id="standings-header-holder">
          {" "}
          <select
            id="date"
            onChange={(e) => setSeason(e.target.value)}
            value={season.toString()}
          >
            {seasonList.map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
          <h3 id="standings-header">{standingsHeader}</h3>
        </div>
        <h1 className="no-data">
          There is no data for this league this season
        </h1>
      </div>
    );
  return (
    <div
      id="standings"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/${pathsInObj[sport].image}")`,
      }}
    >
      {loading ? (
        <div className="loading-background">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div id="standings-header-holder">
            <select
              id="date"
              onChange={(e) => setSeason(e.target.value)}
              defaultValue={season.toString()}
            >
              {seasonList.map((seasonElement) => (
                <option key={seasonElement} value={seasonElement}>
                  {seasonElement}
                </option>
              ))}
            </select>
            <h3 id="standings-header">{standingsHeader}</h3>
          </div>
          <div id="table-holder">
            {clubsStandings.length > 0 && (
              <div id="table">
                <div>
                  <h6>#</h6>
                  <h6>Team</h6>
                  <h6></h6>
                  <div className="form">
                    {Object.keys(clubsStandings[0].stats).map((element) => {
                      return (
                        <h6 key={element}>{joinFirstAndCapital(element)}</h6>
                      );
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
        </>
      )}
    </div>
  );
};

export default Standings;
