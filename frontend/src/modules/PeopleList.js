import { GROUPS } from "../pages/SurveyForm";

// Helper function to remove added people from peopleData
const removePerson = (people, index) => {
    let tempArr = [...people.peopleData];
    tempArr.splice(index,1)
    people.setPeopleData(tempArr);
}

// Full featured display of all people

function PeopleList({ people, submitForm }) {

    // Sub-componant, displays people for each relationship group
    const renderPeople = (group) => (
        <div key={group.id}>
            <p className="text-2xl font-bold">{group.displayname}</p>
            {people.peopleData.map((person, index) => (
                person.group === group.id ? (
                    <div className={`border-r-4 ${person.problematic ? "border-yellow-500" : "border-green-500"} my-3 flex flex-row items-center`} key={person.nickname + person.group + person.reason}>
                        <p className="mr-10 text-red-600 cursor-pointer font-bold" onClick={e => removePerson(people, index)}>X</p>
                        <div>
                            <p className="text-lg italic">{person.nickname}</p>
                            {person.problematic ? <p className="text-sm italic">{person.reason}</p> : <p className="text-sm italic">Safe</p>}
                        </div>
                    </div>
                ) : null
            ))}
        </div>
    )

    return (
        <div className="container-md mx-8 p-5 rounded flex flex-col border justify-center my-5 py-5 text-white text-xl">
            
            {GROUPS.map((group) => renderPeople(group))}
            {people.peopleData.length > 0 ? <button className="border m-5 p-1 hover:bg-green-900 rounded transition" onClick={submitForm}>Submit</button> : null}
        </div>
    );
}

export {PeopleList, removePerson};
