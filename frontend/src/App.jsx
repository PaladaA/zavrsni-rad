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
import Header from "./components/Header";
import Standings from "./components/Standings";
import LiveScore from "./components/LiveScore";
import Home from "./components/Home";
import LeftBar from "./components/leftBar/LeftBar"
function App() {
  
  function Dashboard() {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  }

  const Sport = () => {
    return (
      <div id="body">
        <div id="display">
          <LeftBar />
          <Outlet /> 
        </div>
      </div>
    );
  };
  

  return (
    <BrowserRouter>
      <MyContextComp>
        <Routes>
          <Route path="/" element={<Dashboard />}>
          <Route index element={<Home />} />
            <Route path=":sport" element={<Sport />}>
              <Route index element={<LiveScore />} />
              <Route path="league/:id" element={<Standings />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      </MyContextComp>
    </BrowserRouter>
  );
}

export default App;
