import React, { useState } from "react";
import ReactDOM from "react-dom";
import './index.css';
import StatsDashboard from './pages/StatsDashboard';
import NavBar from './modules/NavBar';
import SurveyForm from "./pages/SurveyForm";

function App() {

    const [activePage, setActivePage] = useState("stats");
    console.log("ind: " + activePage);

    return (
      <>
          <NavBar page={{activePage, setActivePage}}/>
          {activePage == "stats" ? <StatsDashboard/> : <SurveyForm/>}
                  
      </>
    );
  }

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);