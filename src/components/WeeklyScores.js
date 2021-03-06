import React, {useState, useEffect} from 'react'
import { API_KEY, weekIndex, monthIndex } from '../creds';
import '../css/WeeklyScores.css';
import StdDropdown from './StdDropdown';
import NFLIcon from './NFLIcon';


function Score({game}) {
  
  const convertDate = () => {
    let date = new Date(game.DateTime);
    return (weekIndex[date.getDay()] + ", " + monthIndex[date.getMonth()] + " " + date.getDate() + " | " + date.toLocaleTimeString()).replace(":00 ", " ");
  }
  return (
    <div className="score__entry">
      <div className="score__date">
        <h4>{convertDate()}</h4> 
      </div>
      <div className="score__body">
        <div className="score__results">
          <NFLIcon team={game.AwayTeam} size={70} />
          <h1>{game.AwayTeam}</h1>
          {!game.HasStarted && 
            <h2>@</h2> }
          {game.HasStarted && <div className="score__information">
            <h2>{game.AwayScore} - {game.HomeScore}</h2>
            <p>{game.QuarterDescription}</p>
          </div>}
          <h1>{game.HomeTeam}</h1>
          <NFLIcon team={game.HomeTeam} size={70} />
        </div>
        <div className="score__update">
          <p>Last updated: {new Date(game.LastUpdated).toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

function WeeklyScores({season, standingsData, scoresData}) {
  // 
  const [activeWeek, setActiveWeek] = useState("18");
  const [seasonState, setSeasonState] = useState("REG")
  const [weekDropdownActive, setWeekDropdownActive] = useState(false);
  
  const [weekResults, setWeekResults] = useState([]);
  
  //const dropdownWeeks = ["Conference", "Divisional","Wild Card" , "18", "17", "16", "15", "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"];

  useEffect(() => {
    const url = `https://api.sportsdata.io/v3/nfl/scores/json/CurrentWeek?key=${API_KEY}`;
    const fetchWeek = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setActiveWeek(json);
    };
    fetchWeek();
    const today = new Date();
    if (today.getUTCMonth() <= 1){
      setSeasonState("POST");
    }
  }, []);


  useEffect(() => {
    const url = `https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/${season + seasonState}/${activeWeek}?key=${API_KEY}`;
    const fetchWeekResults = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setWeekResults(json);
    };
    fetchWeekResults();
  }, [season, seasonState, activeWeek]);

  const getWeekOptions = () => {
    let weeks = ["18", "17", "16", "15", "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"];
    const today = new Date();
    if (today.getUTCMonth() <= 1) {
      if (parseInt(activeWeek) <= 1) {weeks.unshift("Wild Card")};
      if (parseInt(activeWeek) <= 2) {weeks.unshift("Divisional")};
      //if (parseInt(activeWeek) <= 3) {weeks = ["Conference"] + [weeks]};
      //if (parseInt(activeWeek) <= 4) {weeks = ["Super Bowl"] + [weeks]};
    }
    return weeks;
  }

  const weekOptions = getWeekOptions();


  const onDropdownClick = () => setWeekDropdownActive(!weekDropdownActive);

  const onOptionClick = option => () => {
    if(option === "Wild Card") {
      setActiveWeek("1");
      setSeasonState("POST");
    } else if (option === "Divisional") {
      setActiveWeek("2");
      setSeasonState("POST");
    } else if (option === "Conference") {
      setActiveWeek("3");
      setSeasonState("POST");
    } else if (option === "Super Bowl") {
      setActiveWeek("4");
      setSeasonState("POST");
    } else {
      setActiveWeek(option)
      setSeasonState("REG");
    }
    setWeekDropdownActive(false);
  }

  const allScores = weekResults.sort(function(a, b){
    //This determines the ordering - later make games that are in progress at the top
    return new Date(a.DateTime) - new Date(b.DateTime)
  }).map(entry => 
    <Score game={entry}/>  
  )

  return (
    <div className='weeklyscores'>
      <div className='weeklyscores__header'>
        <h1> Scores </h1>
        <div className="weeklyscores__dropdown">
          <StdDropdown 
            value={activeWeek} 
            options={weekOptions}
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
