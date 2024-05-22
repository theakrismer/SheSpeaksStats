import { useState } from "react";
import { PeopleList } from "../modules/PeopleList";
import AddPerson from "../modules/AddPerson";
import EditPersonDetails from "../modules/EditPersonDetails";
import axios from 'axios';
import { API_URL } from "..";
import MyInfo from "../modules/MyInfo";

const GROUPS = [{ "id": "family", "displayname": "Family" }, { "id": "extendedfamily", "displayname": "Extended Family" }, { "id": "closefriends", "displayname": "Close Friends" }, { "id": "friends", "displayname": "Friends" }, { "id": "acquaintances", "displayname": "Acquaintances" }];

// Helper function, returns the human readable format of a group
const getGroupDisplayName = (group) => {
  let displayName;
  GROUPS.forEach(element => {
    if (element.id === group)
      displayName = element.displayname
  })
  return displayName;
}

// Container for all steps of the tool

function SurveyForm() {

  const submitForm = () => {
    axios.post(API_URL + '/submissions', { "men": peopleData, "submission": {"age":age, "men":peopleData} }).then(setSubmitting("submitting")).finally(setSubmitting("finished"));
  }


  // Three states for data submission; filling, submitting, finished -- assists with situations where data is loading
  const [submitting, setSubmitting] = useState("filling");
  const [errorMessages, setErrorMessages] = useState([]);
  const [age, setAge] = useState("");
  const [peopleData, setPeopleData] = useState([]);
  const [stage, setStage] = useState(1);
  const FINAL_STAGE = 4;

  // Adds an error to the display
  const setError = (msg) => {
    // let errorList = [...errorMessages];
    // errorList.push(msg);
    setErrorMessages([msg]);
  }

  // Handles moving to the next 'stage' of the tool
  const nextButton = (e) => {
    e.preventDefault();
    setErrorMessages([]);

    // 
    if (stage === FINAL_STAGE) return;

    // handle no age being inputted correctly
    if (stage === 1 && (age === null || age === "")) {
      setError("Please enter a valid age.");
      return;
    }
    else if (stage === 2 && (peopleData.length === 0)) {
      // handle no people being added yet
      setError("Please add men before continuing.");
      return;
    }
    else if (stage === 3) {
      peopleData.forEach((person, index) => {
        if (person.problematic !== "yes" && person.problematic !== "no") {
          setError("Please classify all men in your list first.")
          return;
        }
        // If iterated through array completely, finding no issues
        else if (index === peopleData.length - 1) {
          setStage(stage + 1)};
      }
      )
    }
    else setStage(stage + 1); // Note: Does not handle stage 3
  }

  // Handles moving to the previous 'stage'
  const prevButton = (e) => {
    e.preventDefault();
    setErrorMessages([]);
    if (stage === 1) return;
    setStage(stage - 1);
  }

  return (
    <>
      <div className="text-white text-center my-10 flex justify-center">
        {
          submitting === "filling" ?
            <div className='container-md mx-8 p-5 rounded flex flex-col content-stretch grid grid-cols-4 justify-center my-5 py-5 text-white text-xl'>
              {stage === 1 ? <div className="col-span-4"><MyInfo age={{ age, setAge }} errorList={{ errorMessages, setErrorMessages, setError }} /></div> : null}
              {stage === 2 ? <div className="col-span-4"><AddPerson people={{ peopleData, setPeopleData }} errorList={{ errorMessages, setErrorMessages, setError }} /></div> : null}
              {stage === 3 ? <div className="col-span-4"><EditPersonDetails people={{ peopleData, setPeopleData }} errorList={{ errorMessages, setErrorMessages, setError }} /></div> : null}
              {stage === 4 ? <div className="col-span-4"><PeopleList people={{ peopleData, setPeopleData }} submitForm={submitForm} /></div> : null}
              {stage > 1 ? <button className="border col-span-2 m-5 p-1 hover:bg-orange-900 rounded transition" onClick={prevButton}> Back </button> : null}
              {stage !== FINAL_STAGE ? <button className="border col-span-2 m-5 p-1 hover:bg-green-900 rounded transition" onClick={nextButton}>Next</button> : null}
            </div> : null
        }
        {
          submitting === "submitting" ? <p>Submitting data... please wait.</p> : null
        }

        {
          submitting === "finished" ? <p>Success! Thank you for your submission.</p> : null
        }
      </div>

    </>
  );
}

export { SurveyForm, GROUPS, getGroupDisplayName };
