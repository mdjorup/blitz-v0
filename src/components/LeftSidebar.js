import React, {useState, useEffect} from 'react';
import '../css/LeftSidebar.css';
import Division from './Division.js';
import StdDropdown from './StdDropdown';

function LeftSidebar() {
  const apiKey = '518c5302f7b64762af932430314e90ee';

  const [season, setSeason] = useState('2021');
  const [isDropdownActive, setDropdownActive] = useState(false);

  const [standingsData, setStandingsData] = useState([]);
  const [standingsOption, setStandingsOption] = useState('divisional');

  const [scoresData, setScoresData] = useState([]);

  const seasons = [2021];

  useEffect(() => {
    const url = `https://api.sportsdata.io/v3/nfl/scores/json/Standings/${season}REG?key=${apiKey}`;
    const fetchStandingsData = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setStandingsData(json);
    };
    fetchStandingsData();
  }, [standingsOption, season]);

  useEffect(() => {
    const url = `https://api.sportsdata.io/v3/nfl/scores/json/Scores/${season}?key=${apiKey}`;
    const fetchScoresData = async() => {
      const response = await fetch(url);
      const json = await response.json();
      setScoresData(json);
    };
    fetchScoresData();
  }, [])

  

  const getDivisionData = (conf, subconf) => {
    let divisionData = standingsData.filter((team) => team.Conference === conf && team.Division === subconf);
    return divisionData;
  }

  const getConferenceData = (conf) => {
    let divisionData = standingsData.filter((team) => team.Conference === conf).sort((first, second) => (
      parseInt(first.ConferenceRank) - parseInt(second.ConferenceRank)
    ))
    return divisionData;
  }

  const onDropdownClick = () => setDropdownActive(!isDropdownActive);

  const onOptionClick = option => () => {
    setSeason(option);
    setDropdownActive(false);
  }

  const handleDivisionClick = () => {
    if(standingsOption === "divisional"){
      return;
    }
    setStandingsOption("divisional");
  }

  const handleConferenceClick = () => {
    if(standingsOption === "conference"){
      return;
    }
    setStandingsOption("conference");
  }

  return (
    <div className='leftsidebar'>
      <div className="leftsidebar__header">
        <h1>Standings</h1>
        <div className="year__dropdown">
          <StdDropdown 
            season={season} 
            options={seasons} 
            isActive={isDropdownActive}
            onDropdownClick={onDropdownClick}
            onOptionClick={onOptionClick}

          />
        </div>
      </div>
      <div className="standings__type">
        <div className={`divisional__${standingsOption==="divisional"?"active":"inactive"}`} onClick={handleDivisionClick}>
          <h4>Divisional</h4>
        </div>
        <div className={`conference__${standingsOption==="conference"?"active":"inactive"}`} onClick={handleConferenceClick}>
          <h4>Conference</h4>
        </div>
      </div>
      <div className="leftsidebar__divisions">
        <div className="leftsidebar__nfc">
          {standingsOption === 'divisional' && <Division conf='NFC' subconf='North' divisionData={getDivisionData('NFC', "North")} scoresData={scoresData}/>}
          {standingsOption === 'divisional' && <Division conf='NFC' subconf='South' divisionData={getDivisionData('NFC', "South")} scoresData={scoresData}/>}
          {standingsOption === 'divisional' && <Division conf='NFC' subconf='East' divisionData={getDivisionData('NFC', "East")} scoresData={scoresData}/>}
          {standingsOption === 'divisional' && <Division conf='NFC' subconf='West' divisionData={getDivisionData('NFC', "West")} scoresData={scoresData}/>}
          {standingsOption === 'conference' && <Division conf="NFC" subconf="" divisionData={getConferenceData("NFC")} scoresData={scoresData} />}
        </div>
        <div className="leftsidebar__afc">
          {standingsOption === 'divisional' && <Division conf='AFC' subconf='North' divisionData={getDivisionData('AFC', "North")} scoresData={scoresData}/>}
          {standingsOption === 'divisional' && <Division conf='AFC' subconf='South' divisionData={getDivisionData('AFC', "South")} scoresData={scoresData}/>}
          {standingsOption === 'divisional' && <Division conf='AFC' subconf='East' divisionData={getDivisionData('AFC', "East")} scoresData={scoresData}/>}
          {standingsOption === 'divisional' && <Division conf='AFC' subconf='West' divisionData={getDivisionData('AFC', "West")} scoresData={scoresData}/>}
          {standingsOption === 'conference' && <Division conf="AFC" subconf="" divisionData={getConferenceData("AFC")} scoresData={scoresData} />}
        </div>
      </div>


    </div>
  )
}

export default LeftSidebar
