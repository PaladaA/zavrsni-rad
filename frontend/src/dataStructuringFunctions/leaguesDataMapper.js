const leaguesDataMapper2 = (data, obj, sport) => {
    //ova funkcija vraca array sa objektima random poredanima npr prvi element arraya ima objekt sa jednom hrvatskom ligom, drugi je albanija, treci moze bit opet objekt sa podatcima hrvatske lige. zato kad returnam ovaj array, u funkciji fun se svi objekti sortiraju po drzavama u zasebne array-eve
    if (sport == "football") {
      return data.map((element) => ({
        country: element.country.name,
        id: element.league.id,
        league: element.league.name,
        logo: element.league.logo,
        favoriteLeagues: obj[element.league.id] == element.league.id,
        seasons: element.seasons //ako je id iz baze jednak apiju znaci da je to favorit korisnika
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
    userData.forEach((el) => { // u objekt obj spremamo id-eve favorita kako bi lakse pristupili u func funkciji
      obj[el.leagueId] = el.leagueId;
    });
    const result = {};

    leaguesDataMapper2(data, obj, sport).forEach((element) => {
      if (result.hasOwnProperty(element.country)) {
        //u objekt result ako postoji key drzave npr croatia pushamo u key croatia objekt koji sadrzi ligu i ostale podatke koji su raspoređeni u gornjoj funkciji
        result[element.country].push(element);
      } else {
        //u objektu result ako ne postoji key imena npr croatia kreiramo key croatia sa valueom koji je array i u njega upisujemo prvu ligu koja je objekt (element je objekt ali posto je unutar [] postavili smo objekt unutar arraya)
        result[element.country] = [element];
      }
    });
    return result;
  };