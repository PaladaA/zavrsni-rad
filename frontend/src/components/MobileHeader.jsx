import React from "react";
import { useContextComp } from "./MyContext";
import { useNavigate, useParams } from "react-router-dom";

const MobileHeader = () => {
  const { setMobileLeftBarDisplay, mobileLeftBarDisplay, previousPage } = useContextComp();
  const navigate = useNavigate();
  const { sport } = useParams();

  console.log("QEFWE", sport)

  return (
    <div id="sub-header2">
      <button
        style={{
          background: mobileLeftBarDisplay ? "#ffa516" : "#312f88",
          color: mobileLeftBarDisplay ? "#312f88" : "#ffa516",
        }}
        onClick={()=>{
          setMobileLeftBarDisplay(true);
          navigate(`/${sport}`);
        }
        }
      >
        Leagues List
      </button>
      <button
        style={{
          background: previousPage != undefined && previousPage.length < 3 && !mobileLeftBarDisplay ? "#ffa516" : "#312f88",
          color: previousPage != undefined && previousPage.length < 3  && !mobileLeftBarDisplay ? "#312f88" : "#ffa516",
        }}
        onClick={()=>{
          setMobileLeftBarDisplay(false);
          navigate(`/${sport}`);
        }
          
        }
      >
        Matches
      </button>
    </div>
  );
};

export default MobileHeader;
