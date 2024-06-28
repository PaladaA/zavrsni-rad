import React, { useEffect, useState } from "react";
import LeftBar from "./leftBar/LeftBar";
import { Outlet, useParams } from "react-router-dom";
import MobileHeader from "./MobileHeader";
import { useWindowSize } from "./useWindowSize";
import { useContextComp } from "./MyContext";

const Display = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [width, height] = useWindowSize();
  const { seasonsOfLeague, setPreviousPage } = useContextComp();
  const { sport, id } = useParams();

  useEffect(() => {
    console.log("window.location.pathnawindow.location.pathnamewindow.location.pathnameme", window.location.pathname)
    setPreviousPage((window.location.pathname).split("/")); // Logs the current path
  }, [sport, id]);

  useEffect(() => {
    setDataLoaded(true);
  }, [sport]);

  if (!dataLoaded) {
    // You might want to render a loading indicator here
    return <p>Loading...</p>;
  }

  return (
    <div id="body">
      <div id="display-if-mobile">
      {width <= 650 && <MobileHeader />}
          <div id="display">
            <LeftBar />
            <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Display;
