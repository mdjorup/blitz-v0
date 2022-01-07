import React from 'react';
import '../css/Team.css';


function GameResult({week, homeTrue, awayTeam, homeTeam, awayScore, homeScore}){
  // this is one entry that goes in the popup div
  return (
    <div className='gameresult'>
      <h6>{week}</h6>

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



  return (
    <div className="team__entry">
      <div className="team__rank">
        <h6>{rank}</h6>
      </div>
      <div className="team__body">
        <h6>{teamName}</h6>
      </div>
      <div className="team__record">
        <h6>{wins}-{losses}-{ties}</h6>
      </div>
    </div>
    
    
  )
}

export default Team
