import React, {useState, useEffect} from 'react';
import './App.css';
import { API_KEY } from './creds';
import Header from "./components/Header.js";
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import WeeklyScores from './components/WeeklyScores';

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
    <div className="app">
      <Header />
      <div className="app__body">
        {/* Nfl Standings */}
        <LeftSidebar season={season} standingsData={standingsData} scoresData={scoresData}/>
        {/* Scores */}
        <WeeklyScores season={season} standingsData={standingsData} scoresData={scoresData}/>
        {/* Leaderboards*/}
        <RightSidebar />

      </div>
      {/* <p>{scoresData[0]}</p> */}
      {/* Footer */}
      
    </div>
  );
}

export default App;