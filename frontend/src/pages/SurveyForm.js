import { useState } from "react";
import PeopleList from "../modules/PeopleList";
import AddPerson from "../modules/AddPerson";

function SurveyForm() {

  const [peopleData, setPeopleData] = useState([]);
    return (
      <div className='container-md mx-8 p-5 rounded flex flex-col grid grid-cols-3 justify-center my-5 py-5 text-white text-xl'>
                <div className="col-span-2"><AddPerson people={{peopleData, setPeopleData}}/></div>
                <div className="col-span-1"><PeopleList people={{peopleData, setPeopleData}}/></div>
      </div>
    );
  }
  
  export default SurveyForm;
  