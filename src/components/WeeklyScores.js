import React, {useState, useEffect} from 'react'
import { API_KEY } from '../creds';
import '../css/WeeklyScores.css';
import StdDropdown from './StdDropdown';

function ByeWeek({week, data}) {

  return (
    <p>Week {week} byes: {JSON.stringify(data.filter(team => team.Week === week))}</p>
  )
}

function Score({game}) {
  return (
    <div className="score__entry">
      <p>{game.AwayTeam}-{game.HomeTeam}</p>
    </div>
  )
}

function WeeklyScores({season, standingsData, scoresData}) {

  const [activeWeek, setActiveWeek] = useState("");
  const [weekDropdownActive, setWeekDropdownActive] = useState(false);

  const [byeWeeks, setByeWeeks] = useState([]);

  const [weekResults, setWeekResults] = useState([]);

  const weeks = ["18", "17", "16", "15", "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"]

  useEffect(() => {
    const url = `https://api.sportsdata.io/v3/nfl/scores/json/LastCompletedWeek?key=${API_KEY}`;
    const fetchWeek = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setActiveWeek(json);
    };
    fetchWeek();
  }, []);

  useEffect(() => {
    const url = `https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/${season}/${activeWeek}?key=${API_KEY}`;
    const fetchWeekResults = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setWeekResults(json);
    };
    fetchWeekResults();
  }, [activeWeek, season])

  useEffect(() => {
    const url = `https://api.sportsdata.io/v3/nfl/scores/json/Byes/2021?key=${API_KEY}`;
    const fetchByes = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setByeWeeks(json.filter(team => team.Week === activeWeek));
    };
    fetchByes();
  }, [activeWeek]);

  const onDropdownClick = () => setWeekDropdownActive(!weekDropdownActive);

  const onOptionClick = option => () => {
    setActiveWeek(option)
    setWeekDropdownActive(false);
  }

  const allScores = weekResults.map(entry => 
    <Score game={entry}/>  
  )

  return (
    <div className='weeklyscores'>
      {/* {Header that says Scores
      Dropdown to pick the week
      Bye: PHI, WAS, ..
      All game results or matchups
      } */}
      <div className='weeklyscores__header'>
        <h1> Scores </h1>
        <div className="weeklyscores__dropdown">
          <StdDropdown 
            value={activeWeek} 
            options={weeks}
            isActive={weekDropdownActive}
            onDropdownClick={onDropdownClick}
            onOptionClick={onOptionClick}
          />
        </div>   
      </div> 
      {allScores}
    </div>
  )
}

export default WeeklyScores
