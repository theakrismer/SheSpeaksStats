function PeopleList({ people }) {

    const removePerson = (index) => {
        let tempArr = [...people.peopleData];
        tempArr.splice(index)
        people.setPeopleData(tempArr);
        }

        const GROUPS = [{"id":"family", "displayname": "Family"},{"id":"extendedfamily","displayname":"Extended Family"},{"id":"closefriends","displayname":"Close Friends"},{"id":"friends","displayname":"Friends"},{"id":"acquaintances","displayname":"Acquaintances"}];

    const renderPeople = (group) => (
        <>
            <p className="text-2xl font-bold">{group.displayname}</p>
            {people.peopleData.map((person, index) => (
                person.group === group.id ? (
                    <div className={`border-r-4 ${person.problematic ? "border-yellow-500" : "border-green-500"} my-3 flex flex-row items-center`} key={person.nickname + person.group + person.reason}>
                        <p className="mr-10 text-red-600 cursor-pointer font-bold" onClick={e => removePerson(index)}>X</p>
                        <div>
                            <p className="text-lg italic">{person.nickname}</p>
                            {person.problematic ? <p className="text-sm italic">{person.reason}</p> : <p className="text-sm italic">Safe</p>}
                        </div>
                    </div>
                ) : null
            ))}
        </>
    )

    return (
        <div className="container-md mx-8 p-5 rounded flex flex-col border justify-center my-5 py-5 text-white text-xl">
            
            {GROUPS.map((group) => renderPeople(group))}
                
        </div>
    );
}

export default PeopleList;
