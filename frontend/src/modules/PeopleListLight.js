function PeopleListLight({ people }) {

    const removePerson = (index) => {
        let tempArr = [...people.peopleData];
        tempArr.splice(index)
        people.setPeopleData(tempArr);
    }

    console.log(people);

    

    return (
        <div className="container-md mx-8 p-5 rounded flex flex-col border justify-center my-5 py-5 text-white text-xl">
            {people.peopleData.map((person, index) => (
                <div key={index} className="flex flex-row justify-center">
                    <p className="mr-10 text-red-600 cursor-pointer font-bold" onClick={e => removePerson(index)}>X</p>
                    <p className="text-lg italic">{person.nickname} - {person.groupDisplayName}</p>
                </div>
            ))}

        </div>
    );
}

export default PeopleListLight;
