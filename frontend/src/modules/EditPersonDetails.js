import { useState, useEffect } from "react";
import { ErrorDisplay } from "./ErrorDisplay";

function EditPersonDetails({ people, errorList }) {

    const [personIndex, setPersonIndex] = useState(0);
    const [reason, setReason] = useState("");
    const [problematic, setProblematic] = useState(undefined);

    // Change peopleData when problematic is updated
    const changeProblematic = (e) => {
        setProblematic(e.target.value === "yes");
        let temp = [...people.peopleData];
        temp[personIndex].problematic = e.target.value;
        people.setPeopleData(temp);
    }

    // Change peopleData when the reason is updated
    const changeProblemReason = (e) => {
        setReason(e.target.value);
        let temp = [...people.peopleData];
        temp[personIndex].reason = e.target.value;
        people.setPeopleData(temp);

    }

    // Reset problematic and reason when the peopleData or the index changes
    useEffect(() => {
        if (people && people.peopleData[personIndex]) {
            // Prevent problematic from being set unless it is set in peopleData
            if (people.peopleData[personIndex].problematic && people.peopleData[personIndex].problematic.length > 0) {
                setProblematic(people.peopleData[personIndex].problematic === "yes");
            }

            setReason(people.peopleData[personIndex].reason);
        }
    }, [personIndex, people]);

    // Go to the next the person to be edited
    const incrementPersonIndex = (e) => {
        e.preventDefault();
        if (people && personIndex < people.peopleData.length - 1 && people.peopleData[personIndex].problematic) {
            setPersonIndex(personIndex + 1);
            setProblematic(undefined); // Reset problematic to nothing
        }
    }

    // Go to the previous person to be edit
    const decrementPersonIndex = (e) => {
        e.preventDefault();
        if (people && personIndex > 0) {
            setPersonIndex(personIndex - 1);
            setProblematic(undefined); // Reset problematic to nothing
        }
    }

    return (
        <div className="container-md mx-8 p-5 text-center rounded flex flex-col border justify-center my-5 py-5 text-white text-xl">
            <p className="text-3xl my-5 font-bold italic">Review</p>
            <div className="p-3 w-8/12 text-center self-center">
                <p>Now, think carefully about each man you entered before.</p><br /><p>Consider and list any problematic behavior you have since from this individual.</p>
                <br />
                <ErrorDisplay errorList={errorList}/>
                <hr />
            </div>
            <form>
                <div className="flex flex-col justify-center">
                    <div className="m-5">
                        <p className="font-bold text-2xl">{people ? people.peopleData[personIndex].nickname : null} - {people ? people.peopleData[personIndex].groupDisplayName : null}</p>
                        <label>Have they exhibted problematic behavior?</label><br />

                        <span className="mx-5"><label htmlFor="problematic_no">No </label>
                            <input type="radio" onChange={changeProblematic} value="no" id="problematic_no" name="problematic_no" checked={problematic === false} />
                        </span>

                        <span className="mx-5"><label htmlFor="problematic_yes">Yes </label>
                            <input type="radio" onChange={changeProblematic} value="yes" id="problematic_yes" name="problematic_yes" checked={problematic === true} />
                        </span>
                    </div>

                    {people && people.peopleData[personIndex].problematic === "yes" ? <div className="m-5">
                        <label htmlFor="reason">What kind?</label><br />
                        <input className="bg-gray-700 p-1 m-2" type="text" id="reason" name="reason" value={reason} onChange={changeProblemReason} /><br />
                    </div> : null}

                </div>



            </form>
            <div className="display flex flex-row justify-center">
                {personIndex !== 0 ? <button className="border m-5 p-1 hover:bg-yellow-900 rounded transition"
                    onClick={decrementPersonIndex}
                >	Previous Person</button> : null}

                {personIndex !== people.peopleData.length - 1 ? ((problematic === true && reason && reason.length > 0) || problematic === false) ? <button className="border m-5 p-1 hover:bg-green-900 rounded transition"
                    onClick={incrementPersonIndex}
                >Next Person</button> : <button className="border m-5 p-1 bg-gray-600 rounded transition"
                    disabled
                >Next Person</button> : null}

            </div>
        </div>
    );
}

export default EditPersonDetails;