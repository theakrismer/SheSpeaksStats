import React, { useState } from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import './index.css';
import StatsDashboard from './pages/StatsDashboard';
import NavBar from './modules/NavBar';
import SurveyForm from "./pages/SurveyForm";

const API_URL = "http://127.0.0.1:3004/api"

function App() {

    const [activePage, setActivePage] = useState("stats");
    return (
      <>
          <NavBar page={{activePage, setActivePage}}/>
          {activePage === "stats" ? <StatsDashboard activePage={activePage}/> : <SurveyForm/>}
                  
      </>
    );
  }
const container = document.getElementById("root")
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  
);
export {API_URL};