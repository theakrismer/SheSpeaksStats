import { GROUPS } from "../pages/SurveyForm";

// Helper function to remove added people from peopleData
const removePerson = (people, index) => {
    let tempArr = [...people.peopleData];
    tempArr.splice(index,1)
    people.setPeopleData(tempArr);
}

// Helper function, determins if a group has anyone in it
const isGroupEmpty = (people, groupName) =>{
    let groupEmpty = true;
    people.forEach(person => {
        if(person.group === groupName) 
            groupEmpty = false;
    });
    return groupEmpty;
}

// Full featured display of all people

function PeopleList({ people, submitForm }) {

    // Sub-componant, displays people for each relationship group
    const renderPeople = (group) => (
        <div key={group.id}>
            
            {!isGroupEmpty(people.peopleData, group.id) ? <p className="text-2xl font-bold">{group.displayname}</p> : null}
            {people.peopleData.map((person, index) => {
                return(
                    <>
                    {person.group === group.id ? (
                    <div className={`border-r-4 ${person.problematic === "yes" ? "border-yellow-500" : "border-green-500"} my-3 flex flex-row items-center text-justify`} key={person.nickname + person.group + person.reason}>
                        <div>
                            <p className="text-lg italic">{person.nickname}</p>
                            {person.problematic === "yes" ? <p className="text-sm italic">Problematic: {person.reason}</p> : <p className="text-sm italic">Safe</p>}
                        </div>
                    </div>
                ) : null}
                    </>
                )
                
                })}
        </div>
    )

    return (
        <div className="container-md mx-8 p-5 text-center rounded flex flex-col border justify-center my-5 py-5 text-white text-xl">
            <p className="text-3xl my-5 font-bold italic">Reflection</p>
            <p className="mb-5">This is a summary of what you've reported.</p>
            <p className="mb-5">Take some time to reflect on what you've found. Who adds to your life, and who detracts from it?</p>
            <p className="mb-5">Who might you mindfully choose to spend more time with, and who might you avoid?</p>
            <hr/>
            <div className="my-5">
                {GROUPS.map((group) => renderPeople(group))}
                {people.peopleData.length > 0 ? <button className="border m-5 p-1 hover:bg-green-900 rounded transition" onClick={submitForm}>Submit</button> : null}
            </div>
        </div>
    );
}

export {PeopleList, removePerson};
