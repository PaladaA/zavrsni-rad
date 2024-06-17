import pathsInObj from "./pathsInObj";

export const getFavoriteLeagues = async (user, sport) => {
  return fetch("http://localhost:3000/favorite-leagues/retrieve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: user.id, sport: sport }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export const getUsersFavMatches = async(user, sport) => {
  return fetch("http://localhost:3000/favorite-matches/retrieve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: user.id, sport: sport }),
  })
    .then((response) => response.json())
    .then((data) => {
      const updatedFav = {};
      data.forEach((el) => {
        updatedFav[el.matchId] = el.matchId;
      });
      return updatedFav;
    })
    .catch((err) => {
      //ukoliko je url valjan i dogodi se greska tjekom dohvacanja podatka ispisuje se greska u konzoli
      console.error(err);
    });
};


export const fetchAllLeagues = async (sport, id = "") => {
  return fetch(
    `https://${pathsInObj[sport].url}/${pathsInObj[sport].leagues}${id}`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": `${import.meta.env.VITE_REACT_APP_API_KEY}`,
        "X-RapidAPI-Host": `${pathsInObj[sport].url}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data.response;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export const fetchMatches = async (sport, path2) => {
  return fetch(
    `https://${pathsInObj[sport].url}/${pathsInObj[sport].liveScore}${path2}`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": `${import.meta.env.VITE_REACT_APP_API_KEY}`,
        "X-RapidAPI-Host": `${pathsInObj[sport].url}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const fetchStandings = async (sport, id, season) => {
  return fetch(
    `https://${pathsInObj[sport].url}/${pathsInObj[sport].standings}?league=${id}&season=${season}`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": `${import.meta.env.VITE_REACT_APP_API_KEY}`,
        "X-RapidAPI-Host": `${pathsInObj[sport].url}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.error(err));
};

export const fetchUsersList = async (input) => {
  return fetch(`http://localhost:3000/settings/users`, {
    //trazi usere ovisno o imenu
    method: "POST",
    headers: { "Content-Type": "application/json" }, //important!
    body: JSON.stringify({ input: input }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.error(err));
};

export const updateFavMatchInDb = async (path, sportName, user, match) => {
  fetch(`http://localhost:3000/favorite-matches/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: user.id,
      matchId: match.matchId,
      sport: sportName,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });};

    export const updateFavLeagueInDb = async (leagueName, leagueId, path, sport, user) => {
      fetch(`http://localhost:3000/favorite-leagues/${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          leagueId: leagueId,
          leagueName: leagueName,
          sport: sport,
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

export const fetchSportNews = async (input) => {
  return fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${import.meta.env.VITE_REACT_APP_API_KEY_SPORT_NEWS}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data.articles;
    })
    .catch((error) => console.error(error));
};
