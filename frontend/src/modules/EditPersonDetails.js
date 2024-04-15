import { useState } from "react";

function EditPersonDetails({ people }) {

    const GROUPS = [{ "id": "family", "displayname": "Family" }, { "id": "extendedfamily", "displayname": "Extended Family" }, { "id": "closefriends", "displayname": "Close Friends" }, { "id": "friends", "displayname": "Friends" }, { "id": "acquaintances", "displayname": "Acquaintances" }];
    const [problematic, setProblematic] = useState(null);
    const [personIndex, setPersonIndex] = useState(0);
    const [reason, setReason] = useState("");
    const [error, setError] = useState("");

    const handleError = () => {
        setError("");
    }

    const changePerson = (e) => {
        setProblematic(e.target.value);
        let temp = people.peopleData;
        temp[personIndex].problematic = e.target.value;
        console.log(temp);
        people.setPeopleData(temp);
    }



    const incrementPersonIndex = (e) => {
        e.preventDefault();
        console.log(personIndex);
        if( people && personIndex < people.peopleData.length - 1 && people.peopleData[personIndex].problematic){
            console.log("PERSON INDEX: " + personIndex);
            setPersonIndex(personIndex + 1);
        }
    }

    const decrementPersonIndex = (e) => {
        e.preventDefault();
        console.log(personIndex);
        if( people && personIndex > 0){
            console.log("PERSON INDEX: " + personIndex);
            setPersonIndex(personIndex - 1);
        }
    }

    console.log(people.peopleData);

    return (
        <div className="container-md mx-8 p-5 text-center rounded flex flex-col border justify-center my-5 py-5 text-white text-xl">
            <p className="text-3xl my-5 font-bold italic">Review</p>
            <div className="p-3 w-8/12 text-center self-center">
                <p>Now, think carefully about each man you entered before.</p><br /><p>Consider and list any problematic behavior you have since from this individual.</p>
                <br />
                <hr />
            </div>
            <form>
                <div className="flex flex-col justify-center">
                <div className="m-5">
                    <p className="font-bold text-2xl">{people ? people.peopleData[personIndex].nickname : null} - {people ? people.peopleData[personIndex].groupDisplayName : null}</p>
                    <label>Have they exhibted problematic behavior?</label><br />

                    <span className="mx-5"><label htmlFor="problematic_no">No </label>
                        <input type="radio" onChange={changePerson} value="no" id="problematic_no" name="problematic_no" checked={people && people.peopleData[personIndex].problematic === "no"} />
                    </span>

                    <span className="mx-5"><label htmlFor="problematic_yes">Yes </label>
                        <input type="radio" onChange={changePerson} value="yes" id="problematic_yes" name="problematic_yes" checked={people && people.peopleData[personIndex].problematic === "yes"} />
                    </span>
                </div>

                {problematic === "yes" ? <div className="m-5">
                    <label htmlFor="reason">What kind?</label><br />
                    <input className="bg-gray-700 p-1 m-2" type="text" id="reason" name="reason" value={reason} onChange={e => setReason(e.target.value)} /><br />
                </div> : null}

                </div>



            </form>
            <div className="display flex flex-row justify-center">
            {personIndex !== 0 ? <button className="border m-5 p-1 hover:bg-yellow-900 rounded transition"
            onClick={decrementPersonIndex}
            >	Previous Person</button> : null}
            
            {personIndex !== people.peopleData.length - 1 ? <button className="border m-5 p-1 hover:bg-green-900 rounded transition"
            onClick={incrementPersonIndex}
            >Next Person</button> : null}

            </div>
        </div>
    );
}

export default EditPersonDetails;
