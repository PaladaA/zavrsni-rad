const standingDataMapper = (data, sport) => {
    if (sport == "football") {
      return data.map((element) => ({
        rank: element.rank,
        logo: element.team.logo,
        teamName: element.team.name,
        stats: {
          played: element.all.played,
          win: element.all.win,
          draw: element.all.draw,
          lose: element.all.lose,
          goalsFor: element.all.goals.for,
          goalsAgainst: element.all.goals.against,
          PTS: element.points,
        },
      }));
    }
    if (sport == "basketball") {
      return data.map((element) => ({
        rank: element.position,
        logo: element.team.logo,
        teamName: element.team.name,
        stats: {
          played: element.games.played,
          win: element.games.win.total,
          lose: element.games.lose.total,
          pointsFor: element.points.for,
          pointsAgainst: element.points.against,
        },
      }));
    }
    if (sport == "handball") {
      return data.map((element) => ({
        rank: element.position,
        logo: element.team.logo,
        teamName: element.team.name,
        stats: {
          played: element.games.played,
          win: element.games.win.total,
          draw: element.games.draw.total,
          lose: element.games.lose.total,
          goalsFor: element.goals.for,
          goalsAgainst: element.goals.against,
          points: element.points,
        },
      }));
    }
    if (sport == "volleyball") {
      return data.map((element) => ({
        rank: element.position,
        logo: element.team.logo,
        teamName: element.team.name,
        stats: {
          played: element.games.played,
          win: element.games.win.total,
          lose: element.games.lose.total,
          goalsFor: element.goals.for,
          goalsAgainst: element.goals.against,
          points: element.points,
        },
      }));
    }
  };

  export default standingDataMapper;