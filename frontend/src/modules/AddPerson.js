import { useState } from "react";

function AddPerson({ people }) {

    const [nickname, setNickname] = useState("");
    const [group, setGroup] = useState("family");
    const [problematic, setProblematic] = useState(null);
    const [reason, setReason] = useState("");
    const [stage, setStage] = useState(1);
    const [error, setError] = useState("");

    const handleError = () =>
    {
        
        setError("");
        if(stage == 4 && reason === "") {setError("Please provide a reason.")}
        if(stage == 1 && nickname === "") {setError("Please provide a reason.")}
        if(stage == 3 && problematic === null) setError("Please select an option.")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleError();
        people.setPeopleData([...people.peopleData,
        {
            "group": group,
            "problematic": problematic === "yes",
            "reason": reason,
            "nickname": nickname
        }
        ])
        setNickname("");
        setGroup("family");
        setProblematic(null);
        setReason("");
        setStage(1);
    }

    const nextButton = (e) => {
        e.preventDefault();
        handleError();
        if(stage === 1 && nickname !== "")
            setStage(stage + 1);
        if(stage === 2 && group !== "")
            setStage(stage + 1);

        if(stage === 3 && problematic !== null)
            setStage(stage + 1);
    }
    const prevButton = (e) => {
        e.preventDefault();
        setStage(stage - 1);
    }

    return (
        <div className="container-md mx-8 p-5 text-center rounded flex flex-col border justify-center my-5 py-5 text-white text-xl">
            <form onSubmit={handleSubmit}>

            {
                stage === 1 ? (
                <div>
                    <label htmlFor="nickname">What's a nickname we can use for this man?</label><br />
                    <input className="bg-gray-700 p-1 m-2" type="text" id="nickname" name="nickname" value={nickname} onChange={e => setNickname(e.target.value)} /><br />
                    <p className="text-sm italic">Nicknames are not saved on our servers.</p>
                </div>
                ) : null
            }

            {
                stage === 2 ? (
                    <div>
                    <label htmlFor="group">What is your relationship with this man?</label><br />
                    <select className="bg-transparent border-b-4 focus:outline-none" name="group" id="group" value={group} onChange={e => setGroup(e.target.value)}>
                        <option className="bg-gray-700" value="family">Family</option>
                        <option className="bg-gray-700" value="extendedfamily">Extended Family</option>
                        <option className="bg-gray-700" value="closefriends">Close Friends</option>
                        <option className="bg-gray-700" value="friends">Friends</option>
                        <option className="bg-gray-700" value="acquaintances">Acquaintances</option>
                    </select><br /></div>
                ) : null
            }

            {
                stage === 3 ? (
                    <div>
                    <label>Has this man exhibted problematic behavior of any kind?</label><br />

                    <span className="mx-5"><label htmlFor="problematic_no">No </label> 
                    <input type="radio" onChange={e => setProblematic(e.target.value)} value="no" id="problematic_no" name="problematic_no" checked={problematic==="no"} />
                    </span>

                    <span className="mx-5"><label htmlFor="problematic_yes">Yes </label>
                    <input type="radio" onChange={e => setProblematic(e.target.value)} value="yes" id="problematic_yes" name="problematic_yes" checked={problematic==="yes"} />
                    </span>
                </div>
                ) : null
            }
            {stage === 4 ? (
                <div>
                <label htmlFor="reason">What sort of problematic behavior?</label><br />
                <input className="bg-gray-700 p-1 m-2" type="text" id="reason" name="reason" value={reason} onChange={e => setReason(e.target.value)} /><br />
            </div>
            )
            :null}

                <div>
                {stage !== 1 ? <button className="border m-5 p-1 hover:bg-green-900 rounded transition" onClick={prevButton}> Back </button> : null}
                    {stage !== 4 && !(problematic === "no" && stage === 3) ? (   
                    <button className="border m-5 p-1 hover:bg-green-900 rounded transition" onClick={nextButton}>Next</button>
                    ) :
                    <input className="border m-5 p-1 hover:bg-green-900 rounded transition" type="submit" value="Add Person"/>
                }
                    
                </div>
                <div>
                    <p className="text-sm italic text-red-600">{error}</p>
                </div>
                
            </form>
        </div>
    );
}

export default AddPerson;
