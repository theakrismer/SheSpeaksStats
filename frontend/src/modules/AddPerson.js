import { useState } from "react";
import PeopleListLight from "./PeopleListLight";

function AddPerson({ people }) {

    const GROUPS = [{ "id": "family", "displayname": "Family" }, { "id": "extendedfamily", "displayname": "Extended Family" }, { "id": "closefriends", "displayname": "Close Friends" }, { "id": "friends", "displayname": "Friends" }, { "id": "acquaintances", "displayname": "Acquaintances" }];

    const [nickname, setNickname] = useState("");
    const [group, setGroup] = useState("family");
    const [error, setError] = useState("");

    // Set error messages
    const handleError = () => {
        setError("");
        if (nickname === "") { setError("Please enter a nickname.") }
    }

    // Helper function, returns the human readable format of a group
    const getGroupDisplayName = (group) => {
        let displayName;
        GROUPS.forEach(element => {
            if (element.id === group)
                displayName = element.displayname
        })
        return displayName;
    }

    // Add the initial person to peopleData
    const handleSubmit = (e) => {
        e.preventDefault();
        handleError();
        if (error !== "" || nickname === "") return
        else{
            const groupDisplayName = getGroupDisplayName(group);
            people.setPeopleData([...people.peopleData,
            {
                "group": group,
                "nickname": nickname,
                "groupDisplayName": groupDisplayName
            }
            ])
            setNickname("");
        }
    }

    return (
        <div className="container-md mx-8 p-5 text-center rounded flex flex-col border justify-center my-5 py-5 text-white text-xl">
            <p className="text-3xl my-5 font-bold italic">Add men</p>
            <div className="p-3 w-8/12 text-center self-center">
                <p>In this step, identify all the men you know and their relationship to you.</p><br /><p>Try to be as complete as possible, adding everyone you can think of.</p>
                <br />
                <hr />
            </div>
            <form onSubmit={handleSubmit}>

            <div className="flex flex-row justify-evenly">
                <div className="my-5">
                    <label htmlFor="nickname">Nickname</label><br />
                    <input className="bg-gray-700 p-1 m-2" type="text" id="nickname" name="nickname" value={nickname} onChange={e => setNickname(e.target.value)} /><br />
                    <p className="text-sm italic">Nicknames are not saved on our servers.</p>
                    <p className="text-red-500 italic">{error}</p>
                </div>


                <div className="my-10">
                    <label htmlFor="group">Relationship</label><br />
                    <select className="bg-transparent border-b-4 focus:outline-none" name="group" id="group" value={group} onChange={e => setGroup(e.target.value)}>
                        <option className="bg-gray-700" value="family">Family</option>
                        <option className="bg-gray-700" value="extendedfamily">Extended Family</option>
                        <option className="bg-gray-700" value="closefriends">Close Friends</option>
                        <option className="bg-gray-700" value="friends">Friends</option>
                        <option className="bg-gray-700" value="acquaintances">Acquaintances</option>
                    </select><br />
                </div>
                </div>

                <input className="border m-5 p-1 hover:bg-green-900 rounded transition" type="submit" value="Add Person" />
                <PeopleListLight people={people}/>

            </form>
        </div>
    );
}

export default AddPerson;
