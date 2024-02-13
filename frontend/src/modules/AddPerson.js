import { useState } from "react";

function AddPerson({ people }) {

    const [nickname, setNickname] = useState("");
    const [group, setGroup] = useState("family");
    const [problematic, setProblematic] = useState(null);
    const [reason, setReason] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        people.setPeopleData([...people.peopleData,
        {
            "group": group,
            "problematic": problematic,
            "reason": reason,
            "nickname": nickname
        }
        ])
        setNickname("");
        setGroup("family");
        setProblematic(null);
        setReason("");
    }

    return (
        <div className="container-md mx-8 p-5 text-center rounded flex flex-col border justify-center my-5 py-5 text-white text-xl">
            <form onSubmit={handleSubmit}>

                <label htmlFor="group">What is your relationship with this person?</label><br />
                <select className="bg-transparent border-b-4 focus:outline-none" name="group" id="group" value={group} onChange={e => setGroup(e.target.value)}>
                    <option className="bg-gray-700" value="family">Family</option>
                    <option className="bg-gray-700" value="extendedfamily">Extended Family</option>
                    <option className="bg-gray-700" value="closefriends">Close Friends</option>
                    <option className="bg-gray-700" value="friends">Friends</option>
                    <option className="bg-gray-700" value="acquaintances">Acquaintances</option>
                </select><br />
                <div>
                    <label htmlFor="nickname">What's a nickname we can use for this person?</label><br />
                    <input className="bg-gray-700 p-1 m-2" type="text" id="nickname" name="nickname" value={nickname} onChange={e => setNickname(e.target.value)} /><br />
                </div>

                <div>
                    <label>Has this person exhibted problematic behavior of any kind?</label><br />

                    <span className="mx-5"><label htmlFor="problematic_no">No </label> 
                    <input type="radio" onChange={e => setProblematic(e.target.value)} value="no" id="problematic_no" name="problematic_no" checked={problematic==="no"} />
                    </span>

                    <span className="mx-5"><label htmlFor="problematic_yes">Yes </label>
                    <input type="radio" onChange={e => setProblematic(e.target.value)} value="yes" id="problematic_yes" name="problematic_yes" checked={problematic==="yes"} />
                    </span>
                </div>

                <div>
                    <label htmlFor="reason">What sort of problematic behavior?</label><br />
                    <input className="bg-gray-700 p-1 m-2" type="text" id="reason" name="reason" value={reason} onChange={e => setReason(e.target.value)} /><br />
                </div>

                <input className="border m-5 p-1 hover:bg-green-900 rounded transition" type="submit" value="Add Person" />
            </form>
        </div>
    );
}

export default AddPerson;
