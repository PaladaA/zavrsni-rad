import "./App.css";
import {
  Navigate,
  Route,
  Routes,
  BrowserRouter,
  Outlet,
} from "react-router-dom";
import MyContextComp, { useContextComp } from "./components/MyContext";
import Header from "./components/Header";
import Standings from "./components/Standings";
import Protected from "./components/Protected";
import LiveScore from "./components/matches/LiveScore";
import LeftBar from "./components/leftBar/LeftBar";
import Home from "./components/home/Home";

function App() {
  function Dashboard() {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  }

  const Display = () => {
    return (
      <div id="body">
        <div id="display">
          <LeftBar/>
          <Outlet /> {/* omogucio prikaz LeftBar-a na svim stranicama koje su u putanji :sport i childeova LiveScore i Standings (pogledaj App.js)*/}
        </div>
      </div>
    );
  };


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
          </Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
          {/*ukoliko ruta ne postoji vraca na pocetnu*/}
        </Routes>
      </MyContextComp>
    </BrowserRouter>
  );
}

export default App;
