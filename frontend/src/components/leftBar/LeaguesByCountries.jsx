import React, { useEffect, useState } from "react";
import maximizeNum from "../../functions/maximizeNum";
import League from "./League";

const LeaguesFromBar = ({ element, updateAfterPin }) => {
  const [number, setNumber] = useState(3);

  return (
    <>
      <div className="state-leagues-sticky">
        <h4>{maximizeNum(element[0].country, 17)}</h4>
        {/*prikaz prvih 17 znakova ukoliko je naziv pre dug */}
      </div>
      {element.map((el, index) => {
        if (index < number) 
        return <League el={el} key={el.id} updateAfterPin={updateAfterPin}/>;
        //ako je broj prikazanih liga manji od zadanog (na pocetku 3) prikazi te prve 3 tj 0., 1., 2. (number ode nema veze sa numberom iz parent komponente)
      })}
      {element.length > number && ( //ako je broj ligi određene drzave veci od postavljenog broja prikazi botun za prikaz jos ligi (3 + 10 ako kliknes)
        <button onClick={() => setNumber((prev) => prev + 10)}>
          <div></div>
          <div></div>
        </button>
      )}
    </>
  );
};

export default LeaguesFromBar;
