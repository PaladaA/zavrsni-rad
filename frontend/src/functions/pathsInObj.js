const pathsInObj = {
  football: {
    image: "football_img.avif",
    leagues: "v3/leagues",
    standings: "v3/standings",
    liveScore: "v3/fixtures",
    favMatch: "v3/fixtures?id=1141822",
    url: import.meta.env.VITE_REACT_APP_FOOTBALL_URL, 
  },
  basketball: {
    image: "basketball_img.jpg",
    leagues: "leagues",
    standings: "standings",
    liveScore: "games",
    url: import.meta.env.VITE_REACT_APP_BASKETBALL_URL,
  },
  handball: {
    image: "handball_img.jpg",
    leagues: "leagues",
    standings: "standings",
    liveScore: "games",
    url: import.meta.env.VITE_REACT_APP_HANDBALL_URL,
  },
  volleyball: {
    image: "volleyball_img.avif",
    leagues: "leagues",
    standings: "standings",
    liveScore: "games",
    url: import.meta.env.VITE_REACT_APP_VOLLEYBALL_URL,
  },

};

export default pathsInObj;
