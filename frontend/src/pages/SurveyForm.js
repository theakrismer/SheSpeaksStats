import { useState } from "react";
import PeopleList from "../modules/PeopleList";
import AddPerson from "../modules/AddPerson";
import EditPersonDetails from "../modules/EditPersonDetails";
import axios from 'axios';
import { API_URL } from "..";
import MyInfo from "../modules/MyInfo";

function SurveyForm() {

  const submitForm = () => {
    axios.post(API_URL + '/submissions', { "men": peopleData }).then(setSubmitting("submitting")).finally(setSubmitting("finished"));
  }

  // Three states for data submission; filling, submitting, finished
  const [submitting, setSubmitting] = useState("filling");
  const [age, setAge] = useState();
  const [peopleData, setPeopleData] = useState([]);

  const [stage, setStage] = useState(1);
  const nextButton = (e) => {
    e.preventDefault();
    if(stage === 1 && (age === null || age === "")) return;  // handle no age being inputted correctly
    else if (stage === 2 && (peopleData.length === 0)) return;
    else setStage(stage + 1);
}
const prevButton = (e) => {
    e.preventDefault();
    if(stage == 1) return;
    setStage(stage - 1);
}

  return (
    <>
    <div  className="text-white text-center my-10 flex justify-center">
      {
        submitting === "filling" ?
          <div className='container-md mx-8 p-5 rounded flex flex-col grid grid-cols-4 justify-center my-5 py-5 text-white text-xl'>
            {stage === 1 ? <div className="col-span-4"><MyInfo age={{age,setAge}}/></div> : null}
            {stage === 2 ? <div className="col-span-4"><AddPerson people={{ peopleData, setPeopleData }} /></div> : null}
            {stage === 3 ? <div className="col-span-4"><EditPersonDetails people={{ peopleData, setPeopleData }} /></div> : null }
            {stage === 4 ? <div className="col-span-4"><PeopleList people={{ peopleData, setPeopleData }} submitForm={submitForm} /></div> : null }
            {stage > 1 ? <button className="border col-span-2 m-5 p-1 hover:bg-orange-900 rounded transition" onClick={prevButton}> Back </button> : null}
            <button className="border col-span-2 m-5 p-1 hover:bg-green-900 rounded transition" onClick={nextButton}>Next</button>
          </div> : null
      }
      {
        submitting === "submitting" ? <p>Submitting data... please wait.</p> : null
      }

      {
        submitting === "finished" ?  <p>Success! Thank you for your submission.</p>: null
      }
      </div>

    </>
  );
}

export default SurveyForm;
