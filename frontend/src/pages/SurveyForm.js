import { useState } from "react";
import PeopleList from "../modules/PeopleList";
import AddPerson from "../modules/AddPerson";
import axios from 'axios';
import { API_URL } from "..";

function SurveyForm() {

  const submitForm = () => {
    axios.post(API_URL + '/submissions', { "men": peopleData }).then(setSubmitting("submitting")).finally(setSubmitting("finished"));
  }

  // Three states for data submission; filling, submitting, finished
  const [submitting, setSubmitting] = useState("filling");

  const [peopleData, setPeopleData] = useState([]);
  return (
    <>
    <div  className="text-white text-center my-10">
      {
        submitting === "filling" ?
          <div className='container-md mx-8 p-5 rounded flex flex-col grid grid-cols-4 justify-center my-5 py-5 text-white text-xl'>
            <div className="col-span-3"><AddPerson people={{ peopleData, setPeopleData }} /></div>
            <div className="col-span-1"><PeopleList people={{ peopleData, setPeopleData }} submitForm={submitForm} /></div>
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
