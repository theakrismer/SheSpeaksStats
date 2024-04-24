import React, { useState } from "react";
import { createRoot } from 'react-dom/client';
import './index.css';
import StatsDashboard from './pages/StatsDashboard';
import NavBar from './modules/NavBar';
import { SurveyForm } from "./pages/SurveyForm";
import OurProject from "./pages/OurProject";


// const API_URL = "http://127.0.0.1:3004/api"
const API_URL = "https://she-speaks-stats-backend.vercel.app/api" 
// const API_URL = process.env.API_URL 

function App() {

  const [activePage, setActivePage] = useState("stats");
  return (
    <>
      <NavBar page={{ activePage, setActivePage }} />
      {activePage === "stats" ? <StatsDashboard activePage={activePage} /> : null}
      {activePage === "survey" ? <SurveyForm /> : null}
      {activePage === "ourproject" ? <OurProject /> : null}
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
export { API_URL };