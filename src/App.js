import React, {useState, useEffect} from 'react';
import './App.css';
import { API_KEY } from './creds';
import Header from "./components/Header.js";
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import WeeklyScores from './components/WeeklyScores';
import Register from './components/authui/Register';
import Login from './components/authui/Login';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';

function App() {

  const [season, setSeason] = useState("2021");
  const [standingsData, setStandingsData] = useState([]);
  const [scoresData, setScoresData] = useState([]);

  useEffect(() => {
    const url = `https://api.sportsdata.io/v3/nfl/scores/json/CurrentSeason?key=${API_KEY}`
    const fetchSeason = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setSeason(json);
    }
  }, [])

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
  }, [])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home season={season} standingsData={standingsData} scoresData={scoresData}/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  );
}

const Home = ({season, standingsData, scoresData}) => {

  return (
    <div className="home">
      <Header />
      <div className="home__body">
        {/* Nfl Standings */}
        <LeftSidebar season={season} standingsData={standingsData} scoresData={scoresData}/>
        {/* Scores */}
        <WeeklyScores season={season} standingsData={standingsData} scoresData={scoresData}/>
        {/* Leaderboards*/}
        <RightSidebar />

      </div>
      {/* Footer */}
    </div>
  )
}

const Example = () => {

  const navigate = useNavigate();
  return (
    <div className='example' onClick={() => {navigate('/')}}>
      <h1>Thank goodness this worked!</h1>
    </div>
  )
}

export default App;