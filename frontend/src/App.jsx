import { useEffect, useState } from "react";
import "./App.css";
import {
  Navigate,
  Route,
  Routes,
  BrowserRouter,
  Outlet,
} from "react-router-dom";
import MyContextComp, { useContextComp } from "./components/MyContext";
import Display from "./components/Display";
import Header from "./components/Header";
import Standings from "./components/Standings";
import Protected from "./components/Protected";
import LiveScore from "./components/matches/LiveScore";
import Home from "./components/home/Home";
import SportNews from "./components/SportNews";
import Settings from "./components/settings/Settings";

function App() {
  function Dashboard() {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  }

  return (
    <BrowserRouter>
      <MyContextComp>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route element={<Protected />}>
              <Route index element={<Home />} />
            </Route>
            <Route path=":sport" element={<Display />}>
              {/*:sport ovakav pristup omogucava dinamicki pristup useParams hook-u */}
              <Route index element={<LiveScore />} />
              {/*index je omogucio da na pathu /:sport(football npr) bude prikazan livescore, ako nemoa indexa ne prikazuje se nista na pathu /footbal npr */}
              <Route path="league/:id" element={<Standings />} />
            </Route>
            <Route path="sportnews" element={<SportNews />}/>
            <Route path="settings" element={<Settings />}/>
          </Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
          {/*ukoliko ruta ne postoji vraca na pocetnu*/}
        </Routes>
      </MyContextComp>
    </BrowserRouter>
  );
}

export default App;
