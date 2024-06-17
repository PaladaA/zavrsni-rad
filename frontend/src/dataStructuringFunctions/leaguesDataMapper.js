const leaguesDataMapper2 = (data, obj, sport) => {
    if (sport == "football") {
      return data.map((element) => ({
        country: element.country.name,
        id: element.league.id,
        league: element.league.name,
        logo: element.league.logo,
        favoriteLeagues: obj[element.league.id] == element.league.id,
        seasons: element.seasons 
      }));
    } else {
      return data.map((element) => ({
        country: element.country.name,
        id: element.id,
        league: element.name,
        logo: element.logo,
        favoriteLeagues: obj[element.id] == element.id,
        seasons: element.seasons
      }));
    }
  };

 export const leaguesDataMapper = (data, userData, sport) => {
    const obj = {};
    userData.forEach((el) => { 
      obj[el.leagueId] = el.leagueId;
    });
    const result = {};

    leaguesDataMapper2(data, obj, sport).forEach((element) => {
      if (result.hasOwnProperty(element.country)) {
        result[element.country].push(element);
      } else {
        result[element.country] = [element];
      }
    });
    return result;
  };