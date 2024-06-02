const matchDataStructuring = (data, sport, favMatch ) => {
    if (sport == "football") {
      return data.map((element) => ({
        league: element.league.name,
        leagueId: element.league.id,
        teamAway: element.teams.away.name,
        teamHome: element.teams.home.name,
        teamAwayLogo: element.teams.away.logo,
        teamHomeLogo: element.teams.home.logo,
        teamAwayId: element.teams.away.id,
        teamHomeId: element.teams.home.id,
        scoresAway: element.goals.away,
        scoresHome: element.goals.home,
        status: element.fixture.status.long,
        elapsed: element.fixture.status.elapsed,
        date: element.fixture.date,
        matchId: element.fixture.id,
        favorite: favMatch[element.fixture.id] == element.fixture.id,
      }));
    } else {
      return data.map((element) => ({
        league: element.league.name,
        leagueId: element.league.id,
        teamAway: element.teams.away.name,
        teamHome: element.teams.home.name,
        teamAwayLogo: element.teams.away.logo,
        teamHomeLogo: element.teams.home.logo,
        teamAwayId: element.teams.away.id,
        teamHomeId: element.teams.home.id,
        scoresAway:
          sport == "basketball"
            ? element.scores.away?.total
            : element.scores.away,
        scoresHome:
          sport == "basketball"
            ? element.scores.home?.total
            : element.scores.home,
        status: element.status.long,
        date: element.date,
        matchId: element.id,
        favorite: favMatch[element.id] == element.id,
      }));
    }
  };


  export default matchDataStructuring;