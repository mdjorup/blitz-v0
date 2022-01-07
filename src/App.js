import './App.css';
import Header from "./components/Header.js";
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import WeeklyScores from './components/WeeklyScores';

function App() {

  return (
    <div className="app">
      <Header />
      <div className="app__body">
        {/* Nfl Standings */}
        <LeftSidebar />
        {/* Scores */}
        <WeeklyScores />
        {/* Leaderboards*/}
        <RightSidebar />

      </div>

      {/* Footer */}
      
    </div>
  );
}

export default App;