const pathsInObj = {
  football: {
    leagues: "v3leagues", //v3/leagues
    standings: "standings",  //v3/standings?season=2020&league=39
    liveScore: "livescore",  //v3/fixtures?live=all
    favMatch: "favMatch",    //v3/fixtures?id=1141822
    url: import.meta.env.VITE_REACT_APP_FOOTBALL_URL, //pathInObject.football.url
  },
  basketball: {
    leagues: "leagues",  //leagues
    standings: "standings2", //standings?league=12&season=2019-2020',
    liveScore: "handballscore", //games?date=2024-02-19
    url: import.meta.env.VITE_REACT_APP_BASKETBALL_URL,
  },
  handball: {
    leagues: "leagues", //leagues
    standings: "standings",  //standings?league=1&season=2021'
    liveScore: "handballscore", //games?date=2024-02-19
    url: import.meta.env.VITE_REACT_APP_HANDBALL_URL,
  },
  volleyball: {
    leagues: "leagues",//leagues
    standings: "standings",//standings?league=1&season=2021'
    liveScore: "handballscore", //games?date=2024-02-19
    url: import.meta.env.VITE_REACT_APP_VOLLEYBALL_URL,
  },

};

export default pathsInObj;
