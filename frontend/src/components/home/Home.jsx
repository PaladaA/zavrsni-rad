import React from "react";
import { useContextComp } from "../MyContext";
import Settings from "./Settings";
import capitalize from "../../functions/capitalize";
import pathsInObjs from "../../functions/pathsInObj";
import DropdownSportList from "./DropdownSportList";

const Home = () => {
  const { user } = useContextComp();

  return (
    <div id="home">
      <div id="home-header">
        <h3>Welcome {capitalize(user.name)}</h3>
        <Settings />
      </div>
      <div className="favorites-from-sports">
        {Object.keys(pathsInObjs).map((sportName) => {
          return <DropdownSportList key={sportName} sportName={sportName} />;
        })}
      </div>
    </div>
  );
};

export default Home;
