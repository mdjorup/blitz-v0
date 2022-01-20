import React, {useState, useEffect} from 'react';
import {auth} from './firebase.js';
import './App.css';
import { API_KEY } from './creds';
import Header from "./components/Header.js";
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import WeeklyScores from './components/WeeklyScores';
import Register from './components/authui/Register';
import Login from './components/authui/Login';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

  const [season, setSeason] = useState("2021");
  const [standingsData, setStandingsData] = useState([]);
  const [scoresData, setScoresData] = useState([]);

  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    auth.onAuthStateChanged(firebaseUser => {
      setUser(firebaseUser);
    })
  })

  useEffect(() => {
    const url = `https://api.sportsdata.io/v3/nfl/scores/json/CurrentSeason?key=${API_KEY}`
    const fetchSeason = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setSeason(json);
    }
    //fetchSeason();
  }, []);

  useEffect(() => {
    const url = `https://api.sportsdata.io/v3/nfl/scores/json/Standings/${season}REG?key=${API_KEY}`;
    const fetchStandingsData = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setStandingsData(json);
    };
    fetchStandingsData();
  }, [season]);

  useEffect(() => {
    const url = `https://api.sportsdata.io/v3/nfl/scores/json/Scores/${season}?key=${API_KEY}`;
    const fetchScoresData = async() => {
      const response = await fetch(url);
      const json = await response.json();
      setScoresData(json);
    };
    fetchScoresData();
  }, [season])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home user={user}season={season} standingsData={standingsData} scoresData={scoresData}/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  );
}

const Home = ({user, season, standingsData, scoresData}) => {

  return (
    <div className="home">
      <Header user={user}/>
      <div className="home__body">
        {/* Nfl Standings */}
        <LeftSidebar season={season} standingsData={standingsData} scoresData={scoresData}/>
        {/* Scores */}
        <WeeklyScores season={season} standingsData={standingsData} scoresData={scoresData}/>
        {/* Leaderboards*/}

      </div>
      {/* Footer */}
    </div>
  )
}

export default App;