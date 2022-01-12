import React, {useState} from 'react';
import '../css/Team.css';
import NFLIcon from './NFLIcon';


function GameResult({week, homeTrue, awayTeam, homeTeam, awayScore, homeScore}){
  // this is one entry that goes in the popup div

  const result = () => {
    if(!awayScore && !homeScore){
      return "";
    }
    if ((homeTrue && homeScore > awayScore) || (!homeTrue && awayScore > homeScore)){
      return "W";
    } else if (homeScore !== awayScore){
      return "L";
    } else {
      return "T";
    }
  }

  return (
    <div className='gameresult'>
      {/* 1  GB  @ MIN   W28-17
          2  CHI @ GB    W16-20 */}
      <div className="gameresult__week">
        <p>{week}</p>
      </div>
      <div className="gameresult__matchup">
        <p>{awayTeam} </p>
        <p>@</p>
        <p> {homeTeam}</p>
      </div>
      <div className={`gameresult__result__${result()}`}>
        <p>{result()}{awayScore}-{homeScore}</p>
      </div>

    </div>

  )
}

function SchedulePopup({teamName, teamScoresData}) {
  // this is the popup div full of entries 

  const entryList = teamScoresData.map((entry) => 
    <GameResult 
      week={entry.Week}
      homeTrue={teamName === entry.HomeTeam}
      awayTeam={entry.AwayTeam}
      homeTeam={entry.HomeTeam}
      awayScore={entry.AwayScore}
      homeScore={entry.HomeScore}
    
    />
  )
  
  return (
    <div className='schedulepopup'>
      {entryList}
    </div>
  )


}


function Team({rank, teamName, wins, losses, ties, teamScoresData}) {
  const [isHovering, setIsHovering] = useState(false);
  const [delayHandler, setDelayHandler] = useState(null);
  
  const handleMouseHover = () => {
    setDelayHandler(setTimeout(() => {
      setIsHovering(true);
    }, 500))
  };

  const handleMouseOut = () => {
    setIsHovering(false);
    clearTimeout(delayHandler);
  };

  return (
    <div className="team">
      <div className="team__entry" onMouseOver={handleMouseHover} onMouseOut={handleMouseOut}>
        <div className="team__rank">
          <h6>{rank}</h6>
        </div>
        <div className="team__body">
          <h6>{teamName}</h6>
          <NFLIcon team={teamName} size={30} />
        </div>
        <div className="team__record">
          <h6>{wins}-{losses}-{ties}</h6>
        </div>
      </div>
      {isHovering && <SchedulePopup teamName={teamName} teamScoresData={teamScoresData}/>}

    </div>


    
    
  )
}

export default Team
