import { useState } from "react";
import PeopleListLight from "./PeopleListLight";

function EditPersonDetails({ people }) {

    const GROUPS = [{ "id": "family", "displayname": "Family" }, { "id": "extendedfamily", "displayname": "Extended Family" }, { "id": "closefriends", "displayname": "Close Friends" }, { "id": "friends", "displayname": "Friends" }, { "id": "acquaintances", "displayname": "Acquaintances" }];
    const [problematic, setProblematic] = useState(null);
    const [reason, setReason] = useState("");
    const [error, setError] = useState("");

    const handleError = () => {
        setError("");
    }

    const getGroupDisplayName = (group) => {
        let displayName;
        GROUPS.forEach(element => {
            if (element.id === group)
                displayName = element.displayname
        })
        return displayName;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        handleError();
        if (error !== "") return
        else {

            people.setPeopleData([...people.peopleData,
            {
                "problematic": problematic === "yes",
                "reason": reason,
            }
            ])
        }


        setProblematic(null);
        setReason("");
    }

    return (
        <div className="container-md mx-8 p-5 text-center rounded flex flex-col border justify-center my-5 py-5 text-white text-xl">
            <p className="text-3xl my-5 font-bold italic">Review</p>
            <div className="p-3 w-8/12 text-center self-center">
                <p>Now, think carefully about each man you entered before.</p><br /><p>Consider and list any problematic behavior you have since from this individual.</p>
                <br />
                <hr />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col justify-center">
                <div className="m-5">
                    <label>Have they exhibted problematic behavior?</label><br />

                    <span className="mx-5"><label htmlFor="problematic_no">No </label>
                        <input type="radio" onChange={e => setProblematic(e.target.value)} value="no" id="problematic_no" name="problematic_no" checked={problematic === "no"} />
                    </span>

                    <span className="mx-5"><label htmlFor="problematic_yes">Yes </label>
                        <input type="radio" onChange={e => setProblematic(e.target.value)} value="yes" id="problematic_yes" name="problematic_yes" checked={problematic === "yes"} />
                    </span>
                </div>

                {problematic === "yes" ? <div className="m-5">
                    <label htmlFor="reason">What kind?</label><br />
                    <input className="bg-gray-700 p-1 m-2" type="text" id="reason" name="reason" value={reason} onChange={e => setReason(e.target.value)} /><br />
                </div> : null}

                </div>



            </form>
        </div>
    );
}

export default EditPersonDetails;
