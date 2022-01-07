import React from 'react';
import '../css/Division.css';

import Team from './Team.js';



function Division({conf, subconf, divisionData, scoresData}) {

  const getTeamScoresData = (team) => {
    let teamGames = scoresData.filter((entry) => (
      entry.AwayTeam === team || entry.HomeTeam === team
    ));
    return teamGames;
    
  };
  // Write getTeamScoresData function that returns json of all games where that team is involved

  const teamList = divisionData.map((teamData, index) => 
    <Team 
      rank={index+1}
      teamName={teamData.Team}
      wins={teamData.Wins}
      losses={teamData.Losses}
      ties={teamData.Ties}
      teamScoresData={getTeamScoresData(teamData.Team)}
    />
  )

  return (
    <div className='division'>
      <h4>{conf} {subconf}</h4>
      {teamList}
    </div>
  )
}

export default Division
