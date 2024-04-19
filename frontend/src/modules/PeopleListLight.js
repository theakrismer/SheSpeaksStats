function PeopleListLight({ people }) {

    const removePerson = (index) => {
        let tempArr = [...people.peopleData];
        tempArr.splice(index, 1)
        people.setPeopleData(tempArr);
    }



    return (
        <div className="container-md mx-8 p-5 rounded flex shadow justify-center flex-col justify-center my-5 py-5 text-white text-xl">
            <p className="font-bold italic pb-2">People you've added:</p>
            {people.peopleData.length > 0 ? people.peopleData.map((person, index) => (
                <div key={index} className="flex flex-row justify-center">
                    <div className="flex flex-row align-center">
                        <p className="mr-10 text-red-600 self-left cursor-pointer font-bold" onClick={e => removePerson(index)}>X</p>
                        <p className="text-lg italic">{person.nickname} - {person.groupDisplayName}</p>

                    </div>
                </div>
            )):<p className="italic">Nobody added yet.</p>}

        </div>
    );
}

export default PeopleListLight;
